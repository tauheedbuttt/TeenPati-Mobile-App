import React, {useEffect, useRef, useContext} from "react";
import {View, Text, ImageBackground, StyleSheet, AppState, BackHandler} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyCard from "../components/Reusable/MyCard";
import BackButton from "../components/Reusable/BackButton";
import BulletPoint from "../components/BulletPoint";
import MyButton from "../components/Reusable/MyButton";
import GameBoard from "../components/GameBoard";
import Code from "../components/Reusable/Code";

import useGame from "../hooks/useGame";

import {Context as LobbyContext} from "../context/LobbyContext";
import {Context as AuthContext} from "../context/AuthContext";
import {Context as GameContext} from "../context/GameContext";




const GameScreen = ({ navigation, navigation:{goBack, state:{params}}} ) => {
    const {username, against, limit, unkownMode, specialMoves, code, players} = params;
    const {state} = useContext(GameContext);

    const [backButton] = useGame(navigation, against);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButton);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButton);
            backButton();
        };
    }, []);

    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style={styles.mainViewStyle}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {/* Back Button */}
                        <View style={{alignSelf: "flex-start", marginLeft: 10}}>
                            <BackButton onPress={backButton}/>
                        </View>
                        <View style={{flex: 1}} >
                            {against == "USER" ? <Code code={code}/> : null}
                        </View>
                    </View>
                </View>
                <GameBoard 
                    style = {styles.boardStyle}
                    players = {limit}
                    username = {username}
                />

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // CONTAINER STYLES
    mainViewStyle: {
    },
    boardStyle:{
        flex: 1,
        margin: 10,
        marginHorizontal: 20,
    },
    // Content Styles
    heading:{
        paddingLeft: 40,
        marginTop: 15,
        color: "#272727",
        fontSize: 40,
        fontFamily: "OpenSauceSans",
    },
    bulletStlyes:{
        paddingLeft: 60,
        marginRight: 50,
        marginTop: 10,
    },
    btnStyle: {
        alignSelf: "center",
        justifyContent: "center",
        width: 170,
        height: 60,
        marginBottom: 20
    },
    // App Styles
    safeViewStyle:{
        backgroundColor: "#72A604", 
        height: "100%" 
    },
    bgStyle:{
        position:"absolute",  
        paddingTop: 25, 
        ...StyleSheet.absoluteFill
    },
    
});

export default GameScreen;