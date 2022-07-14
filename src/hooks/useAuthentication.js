import React, {useContext} from 'react';

import { Context } from '../context/AuthContext';

export default () =>{
    const {state: {token}, leaveLobby} = useContext(Context);

    const leave = (number) =>{
        leaveLobby(number, token);
    }

    return [leave];
}