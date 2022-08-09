import { useState, useContext } from "react";

import {Context as AuthContext} from "../context/AuthContext";
import {Context as GameContext} from "../context/GameContext.js";


import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default (navigation, against) => {
    const {state: {id}, leaveLobby} = useContext(AuthContext);
    const {state, resetGame} = useContext(GameContext);

    // re-orderd players with end-user at the top
    var players = [];

    if (state.players != undefined){
        const player1 = state.players.find(({_id}) => _id == id);
        var index = state.players.indexOf(player1);
        
        players.push(player1);
        for (let i=1 ; i<state.players.length ; i++){
            const player = state.players[(++index)%state.players.length];
            players.push(player);
        }
    }


    const leaveGame = (against == "USER") 
                    ? () => {leaveLobby(); resetGame();} 
                    : () => {resetGame();} 
                    
    const backButton = () =>{
        leaveGame();
        navigation.dispatch(resetAction);
        return true;
    }

    const allReady = () => {
        var count = 0;
        players.forEach(player => {
            if (player.ready)
                count++;
        });
        return players.length == count;
    }

    return [players, allReady(), backButton, leaveGame, ];
};