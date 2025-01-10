import React from "react";
import { Text, TouchableOpacity } from "react-native";

const BookTable = (props: any) => {
    return (
        <>
        <TouchableOpacity onPress={props.onClose}>
            <Text>Go to back</Text>
        </TouchableOpacity>
        </>
    );
}

export {BookTable}