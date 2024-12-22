import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { styles } from "../styles/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/color";
import { iconSize } from "../constants/dimensions";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { getUsers } from "../dao/usersDAO";

type CustomInputProps = {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  placeholder,
  type,
  ...rest
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container2}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputFieldsContainer}>
        {icon}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.iconSecondary}
          secureTextEntry={type === "password" ? secureTextEntry : false}
          {...rest}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <Feather
              name={secureTextEntry ? "eye" : "eye-off"}
              size={iconSize.medium}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

type User = {
  name: string;
  surname: string;
  username: string;
  email: string;
};

const Dropdown = ({ users, selectedValue, onValueChange }: any) => {
  return (
    <View style={styles.container3}>
      <Text style={styles.label}> Seleziona un utente:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {/* Popola il Picker con gli username degli utenti */}
        {users.map((user: User) => (
          <Picker.Item key={user.username} label={user.username} value={user.username} />
        ))}
      </Picker>
    </View>
  );
};

const ProfileScreen = () => {
  const [users, setUsers] = useState<User[]>([]); // users è un array di utenti
  const [user, setUser] = useState<User | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const allUsers = await getUsers();
        if (allUsers && Array.isArray(allUsers)) {
          setUsers(allUsers);
          setUser(allUsers[0]); // Imposta il primo utente come quello corrente
          setSelectedUser(allUsers[0]?.username); // Imposta l'utente selezionato al primo utente
        } else {
          console.error("Error in the response format of the getUsers");
        }
      } catch (error) {
        console.error("Error in the getUsers: ", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // Quando l'utente seleziona un username, trova l'utente corrispondente
      const foundUser = users.find((user) => user.username === selectedUser);
      setUser(foundUser);
    }
  }, [selectedUser, users]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContent}
      enableOnAndroid={true}
    >
      <Text>Logged in User: {user?.username || "N/A"}</Text>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Dropdown per selezionare l'utente */}
        <Dropdown
          users={users} // Passiamo gli utenti al Dropdown
          selectedValue={selectedUser} // Valore selezionato nel dropdown
          onValueChange={setSelectedUser} // Funzione per aggiornare la selezione
        />

        <View style={styles.profileImageContainer}>
          <Image
            source={require("../../assets/profile-screenshot.png")}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIconContainer}>
            <Feather
              name="edit-3"
              size={iconSize.medium}
              color={colors.iconWhite}
            />
          </TouchableOpacity>
        </View>
        {/* Profile details container */}
        <View style={styles.nameRoleContainer}>
          {/* Visualizza il nome dell'utente selezionato */}
          <Text style={styles.name}>{user?.name || "Nome non disponibile"}</Text>
          <Text style={styles.role}>{user?.surname || "Cognome non disponibile"}</Text>
        </View>
        {/* Input fields container */}
        <View>
          {/* All the input fields */}
          <CustomInput
            label="Your Email"
            placeholder="example@gmail.com"
            icon={<Ionicons name="mail-outline" size={iconSize.medium} />}
          />
          <CustomInput
            label="Your Name"
            placeholder="John Doe"
            icon={<Ionicons name="person-outline" size={iconSize.medium} />}
          />
          <CustomInput
            label="Your Phone"
            placeholder="+1234567890"
            icon={<Ionicons name="call-outline" size={iconSize.medium} />}
          />
          <CustomInput
            label="Your Password"
            placeholder="*******"
            type="password"
            icon={<Feather name="lock" size={iconSize.medium} />}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export { ProfileScreen };
