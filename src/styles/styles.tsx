// styles.ts
import { StyleSheet } from 'react-native';
import { fontSize, spacing } from '../constants/dimensions';
import { colors } from '../constants/color';
import { fontFamily } from '../constants/fontFamily';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md
  },
  profileImage: {
    height:140,
    width:140,
    borderRadius: 15,
  }, 
  editIconContainer: {
    height:31,
    width:31, 
    backgroundColor: colors.orange,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: -18, 
    marginLeft: 60
  }, 
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20
  }, 
  nameRoleContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.extraLarge,
    color: colors.textPrimary,
  },
  role:{
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
    color: colors.textSecondary,
  },
  inputFieldsContainer: {
    borderWidth: 1,
    borderColor: "#F1ECEC",
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    marginVertical: spacing.md
  }, 
  inputLabel :{
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.medium,
    color: colors.textPrimary,
    marginVertical: spacing.sm
  }, 
  icon:{
    marginHorizontal: spacing.sm
  },
  container2:{
    marginVertical: spacing.sm
  },
  textInput:{
    flex: 1,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.medium,
  },
  scrollViewContent: {
    flexGrow: 1
  },
});