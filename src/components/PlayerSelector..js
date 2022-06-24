import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// import { useHistory } from "react-router-dom";
import Ionicons from '@expo/vector-icons/Ionicons';



const PlayerSelector = ({value, onIncrease, onDecrease, style}) => {
    return (
        <View style = {[styles.container, style]}>
            <TouchableOpacity
                onPress={onDecrease}
            >
                <Ionicons name="remove-circle-outline" size={50} color="#72A604"/>
            </TouchableOpacity>
            <Text style={styles.txtStyle}>{value}</Text>
            <TouchableOpacity
                onPress={onIncrease}
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

export default PlayerSelector;