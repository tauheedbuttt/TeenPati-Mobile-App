import { useState } from "react";

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

    const makeID = (length)=>{
        var id           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            id += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return id;
    }

    const generateCode = (length) => {
        var lobbiesRegistered = [];
        var code = "";
        do{
            code = makeID(length)
        }while(lobbiesRegistered.includes(code));
        return code;
    }

    return [createGameDisabled, serverName, inputServerName, generateCode];
}