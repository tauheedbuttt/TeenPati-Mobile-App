EXPRESS_URL = process.env.EXPRESS_URL;
import io from 'socket.io-client';

import { useState, useEffect, useContext, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Context as LobbyContext} from "../context/LobbyContext";
import {Context as AuthContext} from "../context/AuthContext";
import {Context as GameContext} from "../context/GameContext.js";

export default () => {

    const {setLobbies} = useContext(LobbyContext);
    const {state:{token}, updateSocketID} = useContext(AuthContext);
    const {updateGame, setGame} = useContext(GameContext);

    useEffect(()=>{
        const socket = io(`${EXPRESS_URL}/socket`);
        
        socket.on("connect", async ()=>{
            await AsyncStorage.setItem("socketID", socket.id);
            updateSocketID(token);
        });
        socket.on("gameUpdate", ({move, lobby}) =>{
            updateGame(move, lobby);
        });
        socket.on("gameCreate", ({lobby}) =>{
            setGame(lobby);
        });
        socket.on("lobbyUpdate", ({lobbies})=>{
            setLobbies(lobbies);
        });


        return async () => {
            await AsyncStorage.removeItem("socketID");
            socket.disconnect();
        }
    },[token])

    return [];
};