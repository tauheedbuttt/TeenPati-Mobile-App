import React, {useState, useContext} from "react";
import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';


import MyButton from "./Reusable/MyButton";
import {Context as GameContext} from "../context/GameContext";

// FONTS
import { useFonts } from 'expo-font';
const win = Dimensions.get('window');

const PlayButton = ({host, ready}) => {
    const {state: {started}, startGame, readyPlayer} = useContext(GameContext);
    return (
        <>
            {!started && host ? 
                // Play Button
                <TouchableOpacity
                onPress={startGame}
                >
                    <Ionicons name='play-circle' size={win.width/9} color='purple' />
                </TouchableOpacity>

                : !ready && started ? 
                // Ready Button
                <MyButton
                    btnStyle = {styles.btnStyle}
                    text = 'Ready'
                    onPress = {readyPlayer}
                />
                : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        justifyContent: 'center',
        width: "100%",
        height: win.height/8
    }
});

export default PlayButton;