import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// FONTS
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const MyCard = ({children, cardStyle}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    if (!fontsLoaded){
        return <AppLoading/>;
    }
    
    return (
        <View style = {[styles.viewStyle, cardStyle]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        borderColor: "#272727",
        borderWidth: 5,
        borderRadius: 25,

        backgroundColor: "#C9E265",
        shadowColor: "#545454",
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 200
    }
});

export default MyCard;