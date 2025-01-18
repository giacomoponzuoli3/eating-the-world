import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FC, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';  // Assicurati di avere questa importazione

const {height} = Dimensions.get("window");

interface CameraScreenProps {
  onQrScanned: () => void;
  onClose: () => void;  
}

const CameraScreen: FC<CameraScreenProps> = ({ onQrScanned, onClose }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarCodeScanned = (scanningResult: any) => {
    const { data } = scanningResult;
    if (data){
      onQrScanned();
    }
  };

  if (!permission) {
    return <View/>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Eating The World would Like to access the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Allow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Don't allow</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={onClose}
      >
        <Icon name="times" size={24} color="white" />
      </TouchableOpacity>

      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={(data) => {
          handleBarCodeScanned(data);
        }}
        onMountError={(error) => {
          console.error("Errore durante il montaggio della fotocamera:", error);
        }}
      />
    </View>
  );
}

export default CameraScreen;

const styles = StyleSheet.create({
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