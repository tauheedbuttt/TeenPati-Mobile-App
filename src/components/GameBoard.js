import React from "react";
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyCard from "./MyCard";

const GameBoard = ({username, players, style}) => {
    return (
        <MyCard cardStyle={[styles.boardStyle, style]}>
            <Text>{username}</Text>
            <Text>{players}</Text>
        </MyCard>
    );
};

const styles = StyleSheet.create({
    boardStyle:{
        alignItems: "center",
        justifyContent: "center"
    }
});

export default GameBoard;