import createDataContext from "./createDataContext";
import ngrok from "../api/ngrok";

// reducers
// These will define te functionality we can do with data
const lobbyReducer = (state, action) =>{
    // state = { [] }
    // action = {type: 'get', payload: lobby info}
    switch (action.type){
        case 'get':
            return action.payload;
        case 'add':
            return [...state, action.payload]
        default:
            return state;
    }
}
const getLobbies = (dispatch) => async(callback) =>{
    try{
        let response;
        do{
            response = await ngrok.get('/lobbies');
        }while(typeof response.data == "string");
        dispatch({type: 'get', payload: response.data});
        if (callback!=undefined){
            callback();
        }
    }
    catch (err){
        console.log(err.message);
    }
};

const addLobby = (dispatch) => async(lobby) =>{
    dispatch({type: 'add', payload: lobby});
};

// initial State
const initialState = [];


// Exporting Context and Provider
export const {Context, Provider} = createDataContext(
    lobbyReducer, 
    {getLobbies, addLobby}, 
    initialState
);