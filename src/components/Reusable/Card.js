import React, {useEffect, useState, useContext} from "react";
import {StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
// import Animated, {useSharedValue, useAnimatedStyle, withSpring, withRepeat} from 'react-native-reanimated';

import { Cards } from "../../../assets/images/cards";
import { Context } from "../../context/GameContext";

const win = Dimensions.get('window');

const Card = ({card, reveal, ready, disabled, style}) => {
    const source = reveal ? Cards[card] : Cards['card'];
    const {state} = useContext(Context);

    // const scale = useSharedValue(0);

    // // // styling on animation
    // const cardStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             {scale: scale.value}
    //         ]
    //     }
    // }, []);
    // // const backCard = useAnimatedStyle(() => {
    // //     return {
    // //         position: 'absolute',
    // //         transform: [
    // //             {rotateY: backFlip.value}
    // //         ]
    // //     }
    // // }, []);

    // useEffect(()=>{
    //     if(state.started){
    //         scale.value = withSpring(1);
    //     }
    //     if(ready){
    //         // backFlip.value = withSpring(`${180 + parseInt(backFlip.value.split('deg')[0])}deg`);
    //         // frontFlip.value = withSpring(`${180 + parseInt(frontFlip.value.split('deg')[0])}deg`);
    //     }
    // },[ready])

    return (
        <TouchableOpacity style={style} disabled={disabled || !ready}>
            {/* <Animated.View style={cardStyle}> */}
                <Image
                    source={source} 
                    style = {styles.card}
                />
            {/* </Animated.View> */}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: win.width/13.5,
        height: win.width/11.0,
    }
});

export default Card;