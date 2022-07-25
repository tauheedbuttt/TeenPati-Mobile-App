import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Clipboard} from 'react-native';
// import { useHistory } from "react-router-dom";
import Ionicons from '@expo/vector-icons/Ionicons';


// FONTS
import { useFonts } from 'expo-font';


const Error = ({msg, size, color, style}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    return (
        <View style={[styles.container, style]}>
            <Ionicons name="warning-sharp" color={color} size={size}/>
            <Text style={styles.txtStyle}>{msg}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
    },
    txtStyle: {
        color: "#272727",
        fontSize: 18,
        fontFamily: "OpenSauceSans",
    }
});

export default Error;