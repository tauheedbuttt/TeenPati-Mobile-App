import React, { useState, useContext } from "react";

import {Context as AuthContext} from "../context/AuthContext";
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';
import MyButton from "../components/Reusable/MyButton";

export default () => {
    // create game button
    const [createGameDisabled, setCreateGameDisabled] = useState(true);
    // server name from text box
    const [serverName, setServerName] = useState("");
    
    // -------------------- Input Functions --------------------
    // Entering Lobby Through Code
    const inputServerName = (newValue) => {
        setServerName(newValue);
        setCreateGameDisabled(createGameDisabled == true ? false : (newValue=="") ? true : createGameDisabled);
    }
    
    const generateCode = (length)=>{
        var id           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return id;
    }

    return [createGameDisabled, serverName, inputServerName, generateCode];
}