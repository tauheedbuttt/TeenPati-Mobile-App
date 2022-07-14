import createDataContext from "./createDataContext";
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
const joinLobby = (dispatch) => async (code, username, number) => {
    try{
        const response = await ngrok.post('/join', {code, username, cards:[]});
        dispatch({type: 'join', payload: response.data.token});
    
        // navigate to Game Screen
        navigate('Game', {
            username: username, 
            against: "USER", 
            code: code,
            number
            }
        );
    }
    catch(err){
        dispatch({type: 'error', payload: err.response.data.error});
        console.log(err.response.data.error);
    }
};

// leave a lobby
const leaveLobby = (dispatch) => async (number, token) => {
    try{
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await ngrok.post('/leave', {number}, {headers: headers});
        dispatch({type: 'leave'})
    }
    catch(err){
        dispatch({type: 'error', payload: err.response.data.error});
        console.log(err.response.data.error);
    }
};

// delete a lobby
const deleteLobby = (dispatch) => async (code, callback) => {
    await ngrok.post('/remove', code);
    dispatch({type: 'delete'})
    if (callback != undefined){
        callback();
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
    {addLobby, joinLobby, deleteLobby, clearError, leaveLobby}, 
    initialState
);