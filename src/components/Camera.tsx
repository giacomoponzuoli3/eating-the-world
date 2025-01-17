import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FC, useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';

const {height} = Dimensions.get("window");

interface CameraScreenProps{
    onQrScanned: () => void;
  }  

const CameraScreen: FC<CameraScreenProps> = ({ onQrScanned }) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [qrData, setQrData] = useState<string | null>(null);

  const handleBarCodeScanned = (scanningResult: any) => {
    const { data } = scanningResult; // Ottieni i dati dal risultato della scansione
    console.log("dati", data);
    setQrData(data);
  };

  if (!permission) {
    // Camera permissions are still loading.
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
    // Se i dati del QR code sono disponibili, mostra il quiz
    onQrScanned();
    console.log('preso');
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarCodeScanned}
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
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    //backgroundColor: 'blue'
  },
});
