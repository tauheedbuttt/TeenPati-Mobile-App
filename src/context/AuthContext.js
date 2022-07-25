import createDataContext from "./createDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ngrok from "../api/ngrok";
import { navigate } from "../navigationRef";

const authReducer = (state, action) =>{
    switch(action.type){
        case "create":
            return {...state, token: action.payload};
        case "join":
            // reset error
            return {error: "", token: action.payload};
        case "error":
            return {...state, error: action.payload};
        case "clearError":
            return {...state, error: ""};
        case "delete":
            return { token: null, error: ""};
        case "leave":
            return { token: null, error: ""};
    }
};

// actions
// extracting functionality from reducer


// add new lobby to db
const addLobby = (dispatch) => async (lobby, username) => {
    try{
        
        const response = await ngrok.post('/create', lobby);
        
        dispatch({type: 'create', payload: response.data.token})
        await AsyncStorage.setItem("token", response.data.token);
        
        // navigate to Game Screen
        navigate('Game', {
            ...lobby,
            username: username, 
            against: "USER",
            number: 1,
        });
    }
    catch(err){
        dispatch({type: 'error', payload: err.response.data.error});
        console.log(err.response.data.error);
    }
};

// join a lobby
const joinLobby = (dispatch) => async (code, username, socketID) => {
    try{
        const response = await ngrok.post('/join', {code, username, socketID});
        dispatch({type: 'join', payload: response.data.token});
        await AsyncStorage.setItem("token", response.data.token);
    
        // navigate to Game Screen
        navigate('Game', {
            username: username, 
            against: "USER", 
            code: code,
            }
        );
    }
    catch(err){
        dispatch({type: 'error', payload: err.response.data.error});
        console.log(err.response.data.error);
    }
};

// leave a lobby
const leaveLobby = (dispatch) => async () => {
    try{
        const token = await AsyncStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await ngrok.post('/leave', {}, {headers: headers});
        await AsyncStorage.removeItem("token");
        dispatch({type: 'leave'})
    }
    catch(err){
        dispatch({type: 'error', payload: err.response.data.error});
        console.log(err.response.data.error);
    }
};

const updateSocketID = (dispatch) => async (token) =>{
    if (!token){
        return null;
    }
    try{
        const socketID = await AsyncStorage.getItem("socketID");
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        await ngrok.post('/update', {socketID}, {headers: headers});
    }catch(err){
        console.log(err.response.data.error);
    }
};

const clearError = (dispatch) => async () =>{
    dispatch({type: "clearError"})
}

// initial State
const initialState = {
    token: null,
    error: ""
};


// Exporting Context and Provider
export const {Context, Provider} = createDataContext(
    authReducer, 
    {addLobby, joinLobby, clearError, leaveLobby, updateSocketID}, 
    initialState
);