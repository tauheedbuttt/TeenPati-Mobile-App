import createDataContext from "./createDataContext";

// reducers
// These will define te functionality we can do with data
const lobbyReducer = (state, action) =>{
    // state = { [] }
    // action = {type: 'add' || 'edit' || 'delete' || 'read', payload: lobby info}
    switch (action.type){
        case 'add':
            return [...state, action.payload];
        case 'delete':
            // only those values returned which satisfy the condition
            return state.filter((lobby)=>lobby.code != action.payload);
        case 'edit':
            return state.map((lobby)=>{
                return (lobby.code == action.payload.code) ? action.payload.newValue : lobby;
            })
        case 'read':
        default:
            return state;
    }
}
// actions
// extracting functionality from reducer
const addLobby = (dispatch) => {
    return ((lobby) => {
        dispatch({type: 'add', payload: lobby})
    });
};
const deleteLobby = (dispatch) => {
    return ((code) => {
        dispatch({type: 'delete', payload: code})
    });
};
const editLobby = (dispatch) => {
    return ((code, newValue) => {
        dispatch({type: 'edit', payload: {code, newValue}})
    });
};

// initial State
const initialState = [
    { name: "btcks", code: "HUHUHH", players: 4, playing: 2 },
    { name: "asdds", code: "GGSD$#", players: 4, playing: 1 },
    { name: "asfasf", code: "SDGG%6", players: 4, playing: 3 },
    { name: "fdsdfsd", code: "GHRF6", players: 4, playing: 4 },
    { name: "fdsdfsd", code: "GDRHF6", players: 4, playing: 2 },
    { name: "fdsdfsd", code: "GHGHF6", players: 4, playing: 1 },
    { name: "fdsdfsd", code: "GHAHF6", players: 4, playing: 4 },
    { name: "fdsdfsd", code: "GHRGF6", players: 4, playing: 2 },
    { name: "fdsdfsd", code: "GHRHA6", players: 4, playing: 3 },
    { name: "fdsdfsd", code: "GHQHF6", players: 4, playing: 2 },
];


// Exporting Context and Provider
export const {Context, Provider} = createDataContext(
    lobbyReducer, 
    {addLobby, deleteLobby, editLobby}, 
    initialState
);