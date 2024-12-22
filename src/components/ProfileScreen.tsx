import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { styles } from '../styles/styles';
import { Feather, Ionicons } from '@expo/vector-icons'; 
import { colors } from '../constants/color';
import { iconSize, spacing } from '../constants/dimensions';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type CustomInputProps = {
  label: string,
  icon: React.ReactNode,
  placeholder: string, 
  type?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ label, icon, placeholder, type, ...rest }) => {
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
          <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
            <Feather name={secureTextEntry ? "eye" : "eye-off"} size={iconSize.medium} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const ProfileScreen = () => (
  <KeyboardAwareScrollView
    contentContainerStyle={styles.scrollViewContent}
    enableOnAndroid={true}
  >
    <View>             
      {/* Profile image container */}
      <View style={styles.profileImageContainer}>
        <Image source={require("../../assets/profile-screenshot.png")} style={styles.profileImage} />
        <TouchableOpacity style={styles.editIconContainer}>
          <Feather name="edit-3" size={iconSize.medium} color={colors.iconWhite} />
        </TouchableOpacity>
      </View>
      {/* Profile details container */}
      <View style={styles.nameRoleContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.role}>Software Engineer</Text>
      </View>
      {/* Input fields container */}
      <View>
        {/* All the input fields */}
        <CustomInput label='Your Email' placeholder='example@gmail.com' icon={<Ionicons name="mail-outline" size={iconSize.medium} />} />
        <CustomInput label='Your Name' placeholder='John Doe' icon={<Ionicons name="person-outline" size={iconSize.medium} />} />
        <CustomInput label='Your Phone' placeholder='+1234567890' icon={<Ionicons name="call-outline" size={iconSize.medium} />} />
        <CustomInput label='Your Password' placeholder='*******' type="password" icon={<Feather name="lock" size={iconSize.medium} />} />
      </View>
    </View>
  </KeyboardAwareScrollView>
);

export { ProfileScreen };