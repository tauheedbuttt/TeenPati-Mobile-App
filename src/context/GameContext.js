import createDataContext from "./createDataContext";

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

const initialState = {

};

export const {Context, Provider} = createDataContext(
    reducer,
    {setGame, resetGame, updateGame},
    initialState
);