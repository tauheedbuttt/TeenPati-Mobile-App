import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// FONTS
import { useFonts } from 'expo-font';

var isDisabled = false;

const MyButton = ({text, onPress, btnStyle, disabled}) => {
    isDisabled = disabled;
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    return (
        <TouchableOpacity 
            style={[styles.tchStyle, btnStyle]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.txtStyle, {color: (disabled ? "#A4A2A2" : "#272727")}]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    txtStyle: {
        color: "#272727",
        fontSize: 18,
        fontFamily: "OpenSauceSans",
        alignSelf: "center"
    },
    tchStyle: {
        borderColor: "#272727",
        borderWidth: 5,
        borderRadius: 10,

        backgroundColor: "#FFF5F5",
        shadowColor: "#000000",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 15
    }
});

export default MyButton;