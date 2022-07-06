import { useState, useContext } from "react";
import Yelp from "../api/Yelp";

import {Context as LobbyContext} from "../context/LobbyContext";

export default () => {
    // extra state
    const [startDisabled, setStartDisabled] = useState(true);
    // lobby code
    const [lobbyCode, setServerCode] = useState("");
    // selected lobby
    const [server, setServer] = useState({});
    // Lobby CRUD
    const {addLobby, deleteLobby, editLobby} = useContext(LobbyContext);


    const onRefresh = async () => {
        // console.log("Refresh");
        
        // ------------------------------- API DATA FETCH ------------------------------
        // const response = await Yelp.get('/search', {
            //     params: {
                //         limit: 50,
                //         term: "Bund",
                //         location: "san jose"
        //     }
        // });
        // console.log((response.data.businesses).length);

        // ------------------------------- PROVIDER DATA FETCH ------------------------------
        // addLobby({name: "NEW LOBBIE", code: "asdasd", players: 4, playing: 2});
        // deleteLobby("HUHUHH");
        editLobby("GGSD$#", {name: "BRUH LOL", code: "asdasdd", players: 4, playing: 2});
    };

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

    return [startDisabled, lobbyCode, server, onRefresh, selectLobby, inputLobbyCode];
};