import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { styles } from "../styles/styles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/color";
import { iconSize } from "../constants/dimensions";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { User } from "../../App";

type CustomInputProps = {
  label?: string;
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  placeholder,
  type,
  ...rest
}) => {
  return (
    <View style={styles.container2}>
      <View style={styles.inputFieldsContainer}>
        {label && <Text style={styles.label2}>{label}</Text>}
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.iconSecondary}
          editable={false}
          {...rest}
        />
      </View>
    </View>
  );
};

interface ProfileScreenProps {
  user: User | undefined;
  users: User[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  qrCodeLink: string;
}

interface QRCodeData {
  restaurantName: string;
  discount: string;
  expiryDate: string;
}

const qrCode: QRCodeData = {
  restaurantName: "Ristorante La Pergola",
  discount: "20%",
  expiryDate: "2025-01-31",
};

const userImages: { [key: string]: any } = {
  giacomo_gugu: require("../../assets/img/profile/giacomo_gugu.png"),
  alice_gugu: require("../../assets/img/profile/alice_gugu.png"),
  lorenzo_gugu: require("../../assets/img/profile/lorenzo_gugu.png"),
  francesca_gugu: require("../../assets/img/profile/francesca_gugu.png"),
};

const ProfileScreen: FC<ProfileScreenProps> = ({ user, users, setUser, qrCodeLink }) => {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    user?.username
  );


  const showActionSheet = () => {
    const options = users.map((user) => user.username).concat("Cancel");
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length - 1) {
          const selectedUsername = options[buttonIndex];
          const selected = users.find((u) => u.username === selectedUsername);
          if (selected) {
            setUser(selected);
            setSelectedUser(selected.username);
          }
        }
      }
    );
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
            <TouchableOpacity onPress={showActionSheet}>
              <Text style={styles.name}>
                {user?.username || "Username non disponibile"}
              </Text>
              <Text style={styles.role}>{"Tap to change user"}</Text>
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
        <View >
          {/* All the input fields */}
          <CustomInput
            label="First name:"
            placeholder="John"
            value={user?.name}
          />
          <CustomInput
            label="Last name:"
            placeholder="Doe"
            value={user?.surname}
          />
          <CustomInput
            placeholder="example@gmail.com"
            icon={<Ionicons name="mail-outline" size={iconSize.medium} />}
            value={user?.email}
          />
          <CustomInput
            placeholder="+39 1234567890"
            icon={<Feather name="phone" size={iconSize.medium} />}
            value={user?.phone_number}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export { ProfileScreen };