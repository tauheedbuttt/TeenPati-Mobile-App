import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Clipboard} from 'react-native';
// import { useHistory } from "react-router-dom";
import Ionicons from '@expo/vector-icons/Ionicons';


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
                    ToastAndroid.showWithGravityAndOffset(
                        "Code copied to clipboard",
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );                  
                    // copy the code to clipboard
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
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 200
    },
    codeStyle: {
        fontSize: 25,
        fontFamily: "OpenSauceSans",
    }
});

export default Code;