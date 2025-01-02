import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { styles } from "../styles/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/color";
import { iconSize } from "../constants/dimensions";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { User } from "../../App";
import { updateUser } from "../dao/usersDAO";
import QRCode from "react-native-qrcode-svg";

type CustomInputProps = {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  placeholder,
  type,
  ...rest
}) => {
  return (
    <View style={styles.container2}>
      <View style={styles.inputFieldsContainer}>
        <View style={styles.icon}>{icon}</View>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.iconSecondary}
          {...rest}
        />
      </View>
    </View>
  );
};

const Dropdown = ({ users, selectedValue, onValueChange }: any) => {
  return (
    <View style={styles.container3}>
      <Text style={styles.modalTitle}> Select a user:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {/* Popola il Picker con gli username degli utenti */}
        {users.map((user: User) => (
          <Picker.Item
            key={user.username}
            label={user.username}
            value={user.username}
          />
        ))}
      </Picker>
    </View>
  );
};

interface ProfileScreenProps {
  user: User | undefined;
  users: User[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const qrCodes: string[] = [
  "https://example.com/profile/1",
  "https://example.com/profile/2",
  "https://example.com/profile/3",
  "https://example.com/profile/4",
];

// Mapping delle immagini
const userImages: { [key: string]: any } = {
  giacomo_gugu: require("../../assets/giacomo_gugu.png"),
  alice_gugu: require("../../assets/alice_gugu.png"),
  lorenzo_gugu: require("../../assets/lorenzo_gugu.png"),
  francesca_gugu: require("../../assets/francesca_gugu.png"),
};

const ProfileScreen: FC<ProfileScreenProps> = ({ user, users, setUser }) => {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    user?.username
  );

  // Stato per il QR Code selezionato e la visibilità del Modal
  const [selectedQR, setSelectedQR] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUserChoice, setModalUserChoice] = useState(false);

  // Funzione per aprire il Modal
  const openModal = (code) => {
    setSelectedQR(code);
    setModalVisible(true);
  };

  // Funzione per chiudere il Modal
  const closeModal = () => {
    setSelectedQR(null);
    setModalVisible(false);
  };

  useEffect(() => {
    if (user) {
      setSelectedUser(user.username);
    }
  }, [user]);

  useEffect(() => {
    const selected = users.find((u) => u.username === selectedUser);
    if (selected) {
      setUser(selected);
    }
  }, [selectedUser, users, setUser]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContent}
      enableOnAndroid={true}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <View style={styles.profileHeaderContainer}>
          <View style={styles.nameRoleContainer}>
            <TouchableOpacity onPress={() => setModalUserChoice(true)}>
              <Text style={styles.name}>
                {user?.username || "Username non disponibile"}
              </Text>
              <Text style={styles.role}>
                {"Tap to change user"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                user
                  ? userImages[user.username]
                  : require("../../assets/profile-screenshot.png")
              }
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
        </View>
        {/* Input fields container */}
        <View>
          {/* All the input fields */}
          <CustomInput
            placeholder="example@gmail.com"
            icon={<Ionicons name="mail-outline" size={iconSize.medium} />}
            value={user?.email}
          />
          <CustomInput
            placeholder="John001"
            icon={<Ionicons name="person-outline" size={iconSize.medium} />}
            value={user?.username}
          />
          <CustomInput
            placeholder="+39 1234567890"
            icon={<Feather name="phone" size={iconSize.medium} />}
            value={user?.phone_number}
          />
        </View>
      </View>
      {/* QR codes */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.qrList}
      >
        {qrCodes.map((code, index) => (
          <TouchableOpacity
            key={index}
            style={styles.qrContainer}
            onPress={() => openModal(code)} // Apre il Modal al clic
          >
            <QRCode value={code} size={150} />
            <Text style={styles.qrText}>QR Code {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal per mostrare il QR Code ingrandito */}
      <Modal
        visible={modalVisible}
        transparent={true} // Sfondo trasparente
        animationType="fade" // Animazione
        onRequestClose={closeModal} // Chiude il Modal
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* QR Code ingrandito */}
            {selectedQR && <QRCode value={selectedQR} size={300} />}
            <Text style={styles.modalText}>Scansiona il QR Code</Text>
            {/* Bottone per chiudere il Modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalUserChoice}
        transparent={true} // Sfondo trasparente
        animationType="fade" // Animazione
        onRequestClose={() => setModalUserChoice(false)} // Chiude il Modal
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Dropdown per selezionare l'utente */}
            <Dropdown
              users={users} // Passiamo gli utenti al Dropdown
              selectedValue={selectedUser} // Valore selezionato nel dropdown
              onValueChange={setSelectedUser} // Funzione per aggiornare la selezione
            />
            <View style={styles.modalButtonsContainer}>
              {/* Bottone per confermare la selezione */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  const selected = users.find(
                    (u) => u.username === selectedUser
                  );
                  if (selected) {
                    setUser(selected);
                  }
                  setModalUserChoice(false); // Chiudi il Modal
                }}
              >
                <Text style={styles.confirmButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
};

export { ProfileScreen };