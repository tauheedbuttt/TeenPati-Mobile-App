import React from "react";
import {View, Text, StyleSheet, TextInput } from 'react-native';

// FONTS
import { useFonts } from 'expo-font';

const MyTextBox = ({hint, onChangeText, style, maxLength, value, align}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    return (
        <View
            style={[styles.boxStyle, style]}
            >
            <TextInput 
                style={styles.txtStyle}
                onChangeText={onChangeText}
                placeholder={hint}
                autoCapitalize="characters"
                autoCorrect={false}
                value={value}
                maxLength = {maxLength}
                textAlign={align}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    txtStyle: {
        color: "#272727",
        fontSize: 16,
        fontFamily: "OpenSauceSans",
    },
    boxStyle: {
        paddingVertical: 5,
        borderColor: "#72A604",
        borderWidth: 5,
        borderRadius: 10,

        backgroundColor: "#F4F4F4",
        shadowColor: "#000000",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 15
    }
});

export default MyTextBox;