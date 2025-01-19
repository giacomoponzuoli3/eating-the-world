import { StyleSheet } from "react-native";
import { fontSize, spacing } from "../constants/dimensions";
import { colors } from "../constants/color";


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
  button: { backgroundColor: "#6200ee", padding: 10, borderRadius: 5 },
  profileContainer: { flex: 1, backgroundColor: "#fff", padding: 20 },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.md,
  },
  profileImage: { height: 140, width: 140, borderRadius: 15 },
  profileHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  nameRoleContainer: {
    alignItems: "center",
    marginVertical: spacing.md,
    marginLeft: 15,
  },
  name: {
    fontFamily: "Poppins-Bold",
    fontSize: fontSize.extraLarge,
    color: colors.textPrimary,
    textAlign: "center",
  },
  role: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSize.medium,
    color: colors.textSecondary,
    textAlign: "center",
  },
  inputFieldsWrapper: { marginTop: 20 },
  inputFieldsContainer: {
    borderWidth: 1,
    borderColor: "#F1ECEC",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.sm,
    marginVertical: spacing.xs,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins-Medium",
    fontSize: fontSize.medium,
  },
  container2: { marginVertical: spacing.xs, marginBottom: 5 },
  icon: { marginHorizontal: spacing.md },
  label: { marginRight: 10, fontSize: 16, color: colors.iconSecondary },
  scrollViewContent: { flexGrow: 1 },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    textAlign: "center",
    marginVertical: 20,
  },
  container3: {
    padding: 20,
    zIndex: 1,
    marginBottom: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  label2: { fontSize: 16, marginRight: 10 },
  picker: { height: 50, width: 200 },
  closeButton: {
    backgroundColor: "#ff5555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButtonText: { fontSize: 16, fontWeight: "bold" },
  loadingText: {
    marginTop: 10,
    fontSize: 22,
    fontFamily: "Poppins-ExtraLight",
  },
});
