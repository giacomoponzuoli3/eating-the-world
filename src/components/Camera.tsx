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
  const [qrData, setQrData] = useState<string | null>(null);

  const handleBarCodeScanned = (scanningResult: any) => {
    const { data } = scanningResult;
    console.log("dati", data);
    setQrData(data);
  };

  if (!permission) {
    return <View/>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Eating The World would Like to access the camera</Text>
        <Button onPress={requestPermission} title="Allow" />
        <Button onPress={requestPermission} title="Don't allow" />
      </View>
    );
  }

  if (qrData) {
    onQrScanned();
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
});