import React from "react";
import {View, Text, ImageBackground, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyCard from "../components/Reusable/MyCard";
import BackButton from "../components/Reusable/BackButton";
import BulletPoint from "../components/BulletPoint";
import MyButton from "../components/Reusable/MyButton";
import GameBoard from "../components/GameBoard";
import Code from "../components/Reusable/Code";


let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = (Dimensions.get('window').width);
const GameScreen = ({ navigation, navigation:{goBack, state:{params}}} ) => {
    // console.log("GameScreen: "+ params.players);
    const {username, players, unkownMode, moves, against, code} = params
    let codeView = null;
    if (against == "USER"){
        codeView = (
            <Code
                code={code}
            />
        );
    }
    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style={styles.mainViewStyle}>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                        {/* Back Button */}
                        <View style={{alignSelf: "flex-start", marginLeft: 10}}>
                            <BackButton onPress={()=>{goBack()}}/>
                        </View>
                        <View style={{flex: 1}} >
                            {codeView}
                        </View>
                    </View>
                </View>
                <GameBoard 
                    style = {styles.boardStyle}
                    players = {players}
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