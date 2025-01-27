import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import { styles } from "../styles/styles";
import { stylesPageRestaurant } from "../styles/stylesPageRestaurant";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../constants/color";
import { iconSize } from "../constants/dimensions";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { User } from "../../App";

// CustomInput Component
const CustomInput: React.FC<{
  label?: string;
  icon?: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
  textStyle?: object;
}> = ({
  label,
  icon,
  placeholder,
  type,
  textStyle,
  ...rest
}) => {
  return (
    <View style={styles.container2}>
      <View style={styles.inputFieldsContainer}>
        {label && <Text style={[styles.label2, textStyle]}>{label}</Text>}
        {icon && (
          <View style={[stylesPageRestaurant.iconInformationWrapper, { marginRight: 10 }]}>
            {icon}
          </View>
        )}
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

// Define supported languages
export const LANGUAGES = {
  ENGLISH: 'en',
  ITALIAN: 'it',
  GERMAN: 'de',
  FRENCH: 'fr'
};

type LanguageOption = {
  code: string;
  name: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: LANGUAGES.ENGLISH, name: 'English' },
  { code: LANGUAGES.ITALIAN, name: 'Italiano' },
  { code: LANGUAGES.GERMAN, name: 'Deutsch' },
  { code: LANGUAGES.FRENCH, name: 'Français' }
];

interface ProfileScreenProps {
  user: User | undefined;
  users: User[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ProfileScreen: FC<ProfileScreenProps> = ({ user, users, setUser }) => {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    user?.username
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    user?.language || LANGUAGES.ENGLISH
  );

  const showUserActionSheet = () => {
    const options = users.map((user) => user.username).concat("Cancel");
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: options.length - 1,
        destructiveButtonIndex: options.length - 1,
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

  const showLanguageActionSheet = () => {
    const options = LANGUAGE_OPTIONS.map(lang => lang.name).concat("Cancel");
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: options.length - 1,
        destructiveButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex !== options.length - 1) {
          const selectedLangName = options[buttonIndex];
          const selectedLang = LANGUAGE_OPTIONS.find(lang => lang.name === selectedLangName);
          if (selectedLang) {
            setSelectedLanguage(selectedLang.code);
            if (user) {
              setUser({
                ...user,
                language: selectedLang.code
              });
            }
          }
        }
      }
    );
  };

  useEffect(() => {
    if (user) {
      setSelectedUser(user.username);
      setSelectedLanguage(user.language || LANGUAGES.ENGLISH);
    }
  }, [user]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.scrollViewContent}
      enableOnAndroid={true}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileHeaderContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                user
                  ? userImages[user.username]
                  : require("../../assets/profile-screenshot.png")
              }
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.name}>
            {user?.username || "Username not available"}
          </Text>
          <TouchableOpacity onPress={showUserActionSheet}>
            <Text style={styles.role}>{"Tap to change user"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputFieldsWrapper}>
          <CustomInput
            label="First name:"
            placeholder="John"
            value={user?.name}
            textStyle={{ color: 'rgba(98, 0, 238, 1)' }}
          />
          <CustomInput
            label="Last name:"
            placeholder="Doe"
            value={user?.surname}
            textStyle={{ color: 'rgba(98, 0, 238, 1)' }}
          />
          <Text style={[styles.headerText, { fontSize: 20, textAlign: 'left' }]}>Contacts</Text>
          <CustomInput
            placeholder="example@gmail.com"
            icon={<Ionicons name="mail-outline" style={stylesPageRestaurant.iconInformation} size={iconSize.medium} />}
            value={user?.email}
          />
          <CustomInput
            placeholder="+39 1234567890"
            icon={<Feather name="phone" style={stylesPageRestaurant.iconInformation} size={iconSize.medium} />}
            value={user?.phone_number}
          />
          <Text style={[styles.headerText, { fontSize: 20, textAlign: 'left' }]}>App Language </Text>
          <TouchableOpacity onPress={showLanguageActionSheet}>
            <CustomInput
           
              placeholder="Select Language"
              value={LANGUAGE_OPTIONS.find(lang => lang.code === selectedLanguage)?.name}
              icon={<MaterialIcons name="language" style={stylesPageRestaurant.iconInformation} size={iconSize.medium} />}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const userImages: { [key: string]: any } = {
  giacomo_gugu: require("../../assets/img/profile/giacomo_gugu.png"),
  alice_gugu: require("../../assets/img/profile/alice_gugu.png"),
  lorenzo_gugu: require("../../assets/img/profile/lorenzo_gugu.png"),
  francesca_gugu: require("../../assets/img/profile/francesca_gugu.png"),
};

export { ProfileScreen };