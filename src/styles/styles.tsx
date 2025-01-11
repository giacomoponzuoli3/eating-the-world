// styles.ts
import { StyleSheet } from "react-native";
import { fontSize, spacing } from "../constants/dimensions";
import { colors } from "../constants/color";
import { fontFamily } from "../constants/fontFamily";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  profileImage: {
    height: 140,
    width: 140,
    borderRadius: 15,
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  editIconContainer: {
    height: 31,
    width: 31,
    backgroundColor: colors.orange,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -18,
    marginLeft: 120,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  nameRoleContainer: {
    alignItems: "center",
    marginVertical: spacing.md,
    marginLeft: 15,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.extraLarge,
    color: colors.textPrimary,
  },
  role: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
    color: colors.textSecondary,
  },
  inputFieldsContainer: {
    borderWidth: 1,
    borderColor: "#F1ECEC",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    marginVertical: spacing.xs, // Riduci il margine verticale
  },
  textInput: {
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
  },
  container2: {
    marginVertical: spacing.xs, // Riduci il margine verticale
    marginBottom: 5,
  },
  icon: {
    marginHorizontal: spacing.md
  
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    color: colors.iconSecondary,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary, // Assicurati che il colore esista nella tua definizione
    textAlign: "center",
    marginVertical: 20,
  },
  container3: { padding: 20, zIndex: 1 , marginBottom: 110, justifyContent: "center", alignItems: "center" },
  label2: { fontSize: 16, marginRight: 10 },
  picker: { height: 50, width: 200 },
  qrList: {
    flexDirection: 'row', // Dispone gli elementi in fila orizzontale
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  qrContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  qrText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sfondo semi-trasparente
  },
  modalContent: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#ff5555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  pickerItem: {
    color: '#000', // Colore del testo degli elementi del Picker
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  confirmButton: {
    
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButtonText: {
    
    fontSize: 16,
    fontWeight: "bold",
  },
  qrCardContainer: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },
  qrCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  qrCardDiscount: {
    fontSize: 16,
    color: colors.textPrimary,
    marginVertical: 5,
  },
  qrCardExpiry: {
    fontSize: 14,
    color: colors.iconSecondary,
  },
  qrCardButton: {
    backgroundColor: colors.textPrimary,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  qrCardButtonText: {
    color: colors.iconWhite,
    fontSize: 16,
  },
  qrDataCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  qrDataText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 22,
    fontFamily: 'Poppins-ExtraLight'

  }

});
