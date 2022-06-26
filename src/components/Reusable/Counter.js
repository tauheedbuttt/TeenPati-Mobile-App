import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// import { useHistory } from "react-router-dom";
import Ionicons from '@expo/vector-icons/Ionicons';



const Counter = ({value, func, max, min, style}) => {
    return (
        <View style = {[styles.container, style]}>
            <TouchableOpacity
                onPress={() => func(value-1 >= min ? value-1 : value)}
            >
                <Ionicons name="remove-circle-outline" size={50} color="#72A604"/>
            </TouchableOpacity>
            <Text style={styles.txtStyle}>{value}</Text>
            <TouchableOpacity
                onPress={() => func(value+1 <= max ? value+1 : value)}
            >
                <Ionicons name="add-circle-outline" size={50} color="#72A604"/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // borderWidth: 1,
    },
    txtStyle: {
        color: "#272727",
        fontSize: 18,
        fontFamily: "OpenSauceSans",
    }
});

export default Counter;