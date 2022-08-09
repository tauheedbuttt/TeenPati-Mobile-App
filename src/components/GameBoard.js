import React, {useContext, useState} from "react";
import {View, Dimensions, StyleSheet} from 'react-native';

import MyCard from "./Reusable/MyCard";
import Hand from "./Hand";
import CardStack from "./CardStack";
import PlayButton from "./PlayButton";

import {Context as GameContext} from "../context/GameContext";
import {Context as AuthContext} from "../context/AuthContext";


const win = Dimensions.get('window');

const GameBoard = ({}) => {
    const {state: {players}} = useContext(GameContext);
    if(players == undefined) return null;
    const topPlayer = players.length <= 2 ? players[1] : players[2];

    const allReady = () => {
        var count = 0;
        players.forEach(player => {
            if (player.ready)
                count++;
        });
        return players.length == count;
    }

    return (
        <MyCard cardStyle={styles.boardStyle}>
            <View style={styles.leftHand}>
                {players.length > 2 ? 
                    <Hand 
                        cards={players[1].cards} 
                        username = {players[1].username}
                        position='left'
                        style={{right: 80}}
                        disabled={true}
                        ready={players[1].ready}
                        reveal={false}
                    />
                    : null
                }
            </View>
            <View style={styles.middle}>
                <View style={styles.topHand}>
                    {players.length >= 2 ? 
                        <Hand 
                            cards={topPlayer.cards} 
                            username = {topPlayer.username}
                            position='top'
                            disabled={true}
                            ready={topPlayer.ready}
                            reveal={false}
                        />
                        : null
                    }
                </View>
                <View style={styles.extra}>
                    <View style={styles.table}>
                        <CardStack side='table' ready = {allReady()}/>
                    </View>
                    <View style={styles.show}>
                        <PlayButton
                            host={players[0].host}
                            ready={players[0].ready}
                        />
                    </View>
                    <View style={styles.deck}>
                        <CardStack side='deck' ready = {allReady()}/>
                    </View>
                </View>
                <View style={styles.bottomHand}>
                    <Hand 
                        cards={players[0].cards} 
                        username = {players[0].username}
                        position='bottom'
                        ready={players[0].ready}
                        reveal = {!players[0].ready}
                    />
                </View>
            </View>
            <View style={styles.rightHand}>
                {players.length > 3 ? 
                    <Hand 
                        cards={players[3].cards} 
                        username = {players[3].username}
                        position='right'
                        style={{left: 80}}
                        disabled={true}
                        ready={players[3].ready}
                        reveal={false}
                    />
                    : null
                }
            </View>
        </MyCard>
    );
};

const styles = StyleSheet.create({
    boardStyle:{
        flexDirection: "row",
        flex: 1,
        margin: 10,
        marginHorizontal: 20,
    },
    // middle
    middle:{
        flex: 2.5,
    },
    // Table
    extra: {
        flex: 1,
        flexDirection: 'row',
    },
    deck: {
        flex: 1,
    },
    show: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    table: {
        flex: 1,
    },

    // Hands
    leftHand: {
        flex: 1,
    },
    rightHand: {
        flex: 1,
    },
    topHand: {
        flex: 1,
    },
    bottomHand: {
        flex: 1,
    },
});

export default GameBoard;