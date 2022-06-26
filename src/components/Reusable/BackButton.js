import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import { useHistory } from "react-router-dom";
import Ionicons from '@expo/vector-icons/Ionicons';



const BackButton = ({onPress, Style}) => {
    // let history = useHistory();
    return (
        <TouchableOpacity 
            style={[styles.tchStyle, Style]}
            onPress={onPress}
        >
            <Ionicons name="arrow-back" size={32} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tchStyle: {
        width: 80,
        alignItems: "center",

        borderColor: "#272727",
        borderWidth: 2.5,
        borderRadius: 6,

        backgroundColor: "#72A604",
        shadowColor: "#000000",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 15
    }
});

export default BackButton;