import React, {useState, useContext} from "react";
import {View, Text, Image,Dimensions, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import Card from "./Reusable/Card";

import {Context as GameContext} from "../context/GameContext";
const win = Dimensions.get('window');

const CardStack = ({side, ready}) => {
    const {state} = useContext(GameContext);
    const cards = side=='deck' ? state.deck : state.table;
    
    return (
        <View style = {styles.container}>
            {
                cards.map((card) => {
                    const rotate = {transform: [{rotate: `${Math.floor(Math.random() * 20) + (-20)}deg`}]}
                    const disabled = (card != cards[cards.length-1] || side=='table') || !(ready);
                    return (
                        <Card 
                            card={card}
                            reveal={side=='table'}
                            disabled={disabled}
                            style={[styles.card, rotate]}
                        />
                    );
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: win.width/15.5,
        height: win.width/11.2
    },
    card: {
        position: 'absolute',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hand:{
        flexDirection: 'row',
    }
});

export default CardStack;