import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FC, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';  // Assicurati di avere questa importazione
import { stylesCamera } from '../styles/stylesCamera'; 
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
      <View style={stylesCamera.container}>
        <Text style={stylesCamera.message}>Eating The World would Like to access the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={stylesCamera.button}>
          <Text style={stylesCamera.buttonText}>Allow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={requestPermission} style={stylesCamera.button}>
          <Text style={stylesCamera.buttonText}>Don't allow</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={stylesCamera.container}>
      <TouchableOpacity 
        style={stylesCamera.closeButton} 
        onPress={onClose}
      >
        <Icon name="times" size={24} color="white" />
      </TouchableOpacity>

      <CameraView 
        style={stylesCamera.camera} 
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
