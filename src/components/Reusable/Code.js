import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Clipboard} from 'react-native';
import Toast from 'react-native-simple-toast';
import Ionicons from '@expo/vector-icons/Ionicons';

// import { useHistory } from "react-router-dom";

// FONTS
import { useFonts } from 'expo-font';


const Code = ({code, style}) => {
    const [myCode, setCode]=useState(code);
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    return (
        <View style={[styles.container, style]}>
            {/* Label */}
            <Text style={[styles.codeStyle, {color: "#FFDF5C"}]}>Code: </Text>
            {/* Actual Code */}
            <TouchableOpacity
                onPress = {()=>{
                    // show message that the code is copied
                    Toast.showWithGravity('Code copied to clipboard.', Toast.SHORT, Toast.CENTER);
                    Clipboard.setString(code);
                }}
            >
                <Text style = {styles.codeStyle}>{myCode} </Text>
            </TouchableOpacity>
            {/* Eye Icon */}
            <TouchableOpacity
                onPress={()=>{
                    if (myCode != "XXXXXX"){setCode("XXXXXX");}
                    else{setCode(code);}
                }}
            >
                <Ionicons 
                    name="md-eye-off-outline"
                    size = {27}
                    color = "#545454"
                    />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
    },
    codeStyle: {
        fontSize: 25,
        fontFamily: "OpenSauceSans",
    }
});

export default Code;