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

// Tipi delle props per il componente
interface CouponCardProps {
  restaurant: {
    name: string;
    logo?: string; // URL del logo
  };
  discount: string; // Testo dello sconto
  expiryDate: string; // Data di scadenza del coupon
  qrCodeLink: string; // Valore del QR Code (es. URL o stringa univoca)
  onPressQRCode: (code: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({ restaurant, discount, expiryDate, qrCodeLink, onPressQRCode }) => {
  return (
    <View style={styles.qrCardContainer}>
      {/* Titolo del Coupon */}
      <Text style={styles.qrCardTitle}>{restaurant.name}</Text>

      {/* Dettagli del Coupon */}
      <Text style={styles.qrCardDiscount}>{discount}</Text>
      <Text style={styles.qrCardExpiry}>Valid until: {expiryDate}</Text>

      {/* QR Code */}
      <TouchableOpacity
        style={styles.qrDataCard}
        onPress={() => onPressQRCode(qrCodeLink)}
      >
      <QRCode value={qrCodeLink} size={150} />
      </TouchableOpacity>

      {/* Istruzioni */}
      <Text style={styles.qrDataText}>
      Scan the QR code to redeem your discount!
      </Text>
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

// Mapping delle immagini
const userImages: { [key: string]: any } = {
  giacomo_gugu: require("../../assets/giacomo_gugu.png"),
  alice_gugu: require("../../assets/alice_gugu.png"),
  lorenzo_gugu: require("../../assets/lorenzo_gugu.png"),
  francesca_gugu: require("../../assets/francesca_gugu.png"),
};

const ProfileScreen: FC<ProfileScreenProps> = ({ user, users, setUser, qrCodeLink }) => {
  const [selectedUser, setSelectedUser] = useState<string | undefined>(
    user?.username
  );

  // Stato per il QR Code selezionato e la visibilità del Modal
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUserChoice, setModalUserChoice] = useState(false);

  // Funzione per aprire il Modal
  const openModal = (code: string) => {
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

  const restaurant = {
    name: "Ristorante Bella Italia",
   // logo: "../../icon.png", // Sostituisci con un URL reale
  };

  const discount = "20% discount on your current meal";
  const expiryDate = "31/01/2025";
  const qrValue = "https://ristorantebellaitalia.com/riscatta-sconto";

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
        <View>
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

      {/* Coupon Card */}
      
     {/*<CouponCard
        restaurant={restaurant}
        discount={discount}
        expiryDate={expiryDate}
        qrCodeLink={qrCodeLink}
        onPressQRCode={openModal}
      /> */}
     
    </View>
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
            <Text style={styles.modalText}>Scan the QR Code</Text>
            {/* Bottone per chiudere il Modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
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
