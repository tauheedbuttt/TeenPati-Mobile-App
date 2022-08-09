import React, {useState, useContext} from "react";
import {View, Text, Image,Dimensions, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Card from "./Reusable/Card";

// FONTS
import { useFonts } from 'expo-font';
const win = Dimensions.get('window');

const Hand = ({cards, username, position, style, disabled, turn, ready, reveal}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    
    
    const rotate = (position) => {
        switch(position){
            case 'top':
                return {transform: [{rotate: '180deg'}]};
            case 'bottom':
                return {transform: [{rotate: '0deg'}]};
            case 'left':
                return {transform: [{rotate: '90deg'}]};
            case 'right':
                return {transform: [{rotate: '270deg'}]};
        }
    }
    const textRotation = (position == 'top') ? rotate(position) : null;
    return (
        <View style={[styles.container, rotate(position), style]}>
            <View style={styles.hand}>
                {
                    cards.map((card) => {
                        return (
                            <Card 
                                card = {card}
                                reveal = {reveal}
                                ready = {ready}
                                disabled = {disabled}
                                style = {{marginHorizontal: 5}}
                            />
                        );
                    })
                }
            </View>
            <Text style={[styles.txt, textRotation, turn ? {color: 'red'} : null, ready ? {color: 'blue'} : null]}>{username}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: win.width/15.5,
        height: win.width/11.2,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    hand:{
        flexDirection: 'row',
        marginTop: 5
    },
    txt: {
        color: "#7c7c7c",
        fontSize: 15,
        fontFamily: "OpenSauceSans",
    }
});

export default Hand;