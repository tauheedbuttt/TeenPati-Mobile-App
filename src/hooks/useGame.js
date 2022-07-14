import { useState, useContext } from "react";

import {Context as AuthContext} from "../context/AuthContext";

import useAuthentication from "./useAuthentication";


import { NavigationActions, StackActions } from 'react-navigation';
const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export default (navigation, number, against) => {
    const [leave] = useAuthentication();
    const multiplayerBack = () =>{
        leave(number);
        navigation.dispatch(resetAction);
        // deleteLobby(code);
        return true;
    }
    const singleplayerBack = () =>{
        navigation.dispatch(resetAction);
        return true;
    }
    const backButton = (against == "USER") ? ()=>multiplayerBack(number) : singleplayerBack;
    

    return [backButton, multiplayerBack, singleplayerBack];
};