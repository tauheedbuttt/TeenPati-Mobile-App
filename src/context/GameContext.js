import createDataContext from "./createDataContext";
import ngrok from '../api/ngrok';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const reducer = (state, action) => {
    switch (action.type){
        case "set":
            return action.payload;
        case "update":
            const game = action.payload.game;
            const move = action.payload.move;
            const moves = state.moves;
            if (moves == undefined){
                return {...game, moves: move};
            }
            else if (moves[moves.length-1] != move){
                moves.push(move);
            }
            return {...game, moves: moves};
        case "reset":
            return {};
        default:
            return state;
    }
};

const setGame = (dispatch) => (game) =>{
    dispatch({type: "set", payload: game});
}
const resetGame = (dispatch) => () =>{
    dispatch({type: "reset"});
}
const updateGame = (dispatch) => (move, game) =>{
    dispatch({type: "update", payload: {move, game}});
}

const startGame = (dispatch) => async () => {
    try{
        const token = await AsyncStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        await ngrok.post('/start', {}, {headers: headers});
    }catch(err){
        console.log(err.response.data.error);
        Toast.showWithGravity(err.response.data.error, Toast.SHORT, Toast.CENTER);
    }
}

const readyPlayer = (dispatch) => async () => {
    try{
        const token = await AsyncStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        await ngrok.post('/ready', {}, {headers: headers});
    }catch(err){
        console.log(err.response.data.error);
    }
}

const initialState = {

};

export const {Context, Provider} = createDataContext(
    reducer,
    {setGame, resetGame, updateGame, startGame, readyPlayer},
    initialState
);