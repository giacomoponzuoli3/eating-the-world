import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface RestaurantNotFoundProps {
    onClose: () => void; // Funzione per chiudere la finestra
}

const RestaurantNotFound: React.FC<RestaurantNotFoundProps> = ({ onClose }) => {
    return (
        <View style={styles.overlay}>
            <View style={styles.notFound}>
                <Text style={styles.text}>
                    Ehi GuGu volevi provare a cercare un ristorante eh?
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Chiudi</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Sfondo semi-trasparente
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    notFound: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: "#ff6347", // Colore del pulsante
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RestaurantNotFound;
