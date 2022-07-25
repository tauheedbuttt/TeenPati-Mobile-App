import { useState, useContext } from "react";

import {Context as AuthContext} from "../context/AuthContext";
import {Context as GameContext} from "../context/GameContext.js";


import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default (navigation, against) => {
    const {leaveLobby} = useContext(AuthContext);
    const {resetGame} = useContext(GameContext);

    const multiplayerBack = () =>{
        leaveLobby();
        resetGame();
        navigation.dispatch(resetAction);
        // deleteLobby(code);
        return true;
    }
    const singleplayerBack = () =>{
        resetGame();
        navigation.dispatch(resetAction);
        return true;
    }
    const backButton = (against == "USER") ? multiplayerBack : singleplayerBack;
    

    return [backButton, multiplayerBack, singleplayerBack];
};