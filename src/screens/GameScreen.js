import React, {useEffect, useRef, useContext} from "react";
import {View, Text, ImageBackground, StyleSheet, Dimensions, BackHandler} from 'react-native';
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

const win = Dimensions.get('window');


const GameScreen = ({ navigation, navigation:{goBack, state:{params}}} ) => {
    const {against, code} = params;

    const [players, allReady, backButton, leaveGame] = useGame(navigation, against);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButton);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButton);
            // leaveGame();
        };
    }, []);

    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style={styles.mainViewStyle}>
                    <View style={{marginHorizontal: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between'}}>
                        {/* Back Button */}
                        <View>
                            <BackButton onPress={backButton}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', right: win.width/24}} >
                            {against == "USER" ? <Code code={code}/> : null}
                        </View>
                    </View>
                </View>
                <GameBoard 
                    players = {players}
                    allReady = {allReady}
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // CONTAINER STYLES
    mainViewStyle: {
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