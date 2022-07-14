import { useState, useContext } from "react";

import {Context as LobbyContext} from "../context/LobbyContext";

export default () => {
    // extra state
    const [startDisabled, setStartDisabled] = useState(true);
    // lobby code
    const [lobbyCode, setServerCode] = useState("");
    // selected lobby
    const [server, setServer] = useState({});

    // ----------------------------- Based on INPUT controls --------------------------------
    const selectLobby = (item) => {
        // select server
        let selectedServer = item;
        if (item.code == server.code) selectedServer={}

        // assign values
        item.color = selectedServer == {} ? "#F4F4F4" : "#C9E265";
        setServer(selectedServer);
        // if disabled, enable it. if enabled, check if same server selected. if same server then disable it
        setStartDisabled(startDisabled == true ? false : ((item.code == server.code) && (lobbyCode=="")) ? true : startDisabled);
    }

    // Entering Lobby Through Code
    const inputLobbyCode = (newValue) => {
        setServerCode(newValue);
        setStartDisabled(startDisabled == true ? false : ((newValue=="") && (Object.keys(server)==0)) ? true : startDisabled);
    }

    return [startDisabled, lobbyCode, server, selectLobby, inputLobbyCode];
};