import { Dimensions, StyleSheet } from 'react-native';

const {height} = Dimensions.get("window");

export const stylesCamera = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      height: height - 170,
      overflow: 'hidden',
      position: 'relative', 
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
      fontSize: 18,
      width: '80%',
      alignSelf: 'center',
      fontFamily: 'Poppins-Light',
    },
    camera: {
      flex: 1,
    },
    closeButton: {
      position: 'absolute',
      top: 5,
      right: 4,
      zIndex: 10,
      padding: 4,
      borderRadius: 10,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    button: {
      backgroundColor: '#6200ee',  
      paddingVertical: 12,         
      paddingHorizontal: 10,       
      borderRadius: 25,            
      justifyContent: 'center',    
      alignItems: 'center',        
      marginTop: 20,               
      shadowColor: '#000',         
      shadowOffset: { width: 0, height: 2 },  
      shadowOpacity: 0.4,          
      shadowRadius: 4,    
      color: '#fff',               
      fontSize: 18,                
      fontFamily: 'Poppins-Light'  ,
      width: '40%',  
      alignSelf: 'center',    
    },
    buttonText: {
      color: '#fff',               
      fontSize: 16,                
      fontFamily: 'Poppins-Light'
    },
  });
  