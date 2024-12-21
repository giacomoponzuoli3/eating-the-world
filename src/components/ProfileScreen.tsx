import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { Feather, Ionicons } from '@expo/vector-icons'; // Icone da Expo
import { colors } from '../constants/color';
import { iconSize } from '../constants/dimensions';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';

//stato con users e user attuale
//con uno useeffect la prima volta che renderizzo la pagina carico gli utenti nello stato 
type CustomInputProps = {
  label: string,
  icon: React.FC,
  placeholder: string, 
  type?: string

}
const CustomInput: React.FC<CustomInputProps> = ({ label, icon, placeholder, type, ...rest}) => {
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
    <View >             
      
      {/* Profile image container */}
      <View style={styles.profileImageContainer}>
        <Image source={require("../../assets/profile-screenshot.png")} style = {styles.profileImage}/>
        <TouchableOpacity style={styles.editIconContainer}>
       <Feather name = {"edit-3"} size = {iconSize.medium} color = {colors.iconWhite}></Feather>
        </TouchableOpacity>
      </View>
      {/* Profile details container */}
      <View style={styles.nameRoleContainer}>
        <Text style={styles.name}>Johnggg Doe</Text>
        <Text style={styles.role}>Softwareuuu Engineer</Text>

      </View>

      {/* imput fields container*/}
      <View>
  {/* All the input fields */}
 {/* <CustomInput label='Your Email' placeholder='example@gmail.com' icon={<Ionicons name="mail-outline" size={iconSize.medium} />} />*/}
  <CustomInput label='Your Name' placeholder='John Doe' icon={<Ionicons name="person-outline" size={iconSize.medium} />} />
  <CustomInput label='Your Phone' placeholder='+1234567890' icon={<Ionicons name="call-outline" size={iconSize.medium} />} />
  <CustomInput label='Your Password' placeholder='*******' icon={<Feather name="lock" size={iconSize.medium}  type = 'password'/>} />
</View>


    </View>

);




export {ProfileScreen}