import React, {useState, useContext, useEffect} from "react";
import {View, ImageBackground, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyButton from "../components/Reusable/MyButton";
import MyCard from "../components/Reusable/MyCard";
import BackButton from "../components/Reusable/BackButton";
import MyTextBox from "../components/Reusable/MyTextbox";
import MyProfile from "../components/Reusable/MyProfile";
import LobbyList from "../components/LobbyList";
import useJoinLobby from "../hooks/useJoinLobby";
import {Context as LobbyContext} from "../context/LobbyContext";
import {Context as AuthContext} from "../context/AuthContext";


const JoinLobbyScreen = ({ navigation: { goBack, navigate, addListener }} ) => {
    // username
    const username="created in join  screen"
    
    const {state, joinLobby} = useContext(AuthContext);

    const [startDisabled, lobbyCode, server, selectLobby, inputLobbyCode] = useJoinLobby();

    // ----------------------- Input Functions ---------------------------

    const startGame = async () => {
        const code = lobbyCode == "" ? server.code : lobbyCode;
        const username = await AsyncStorage.getItem("username");
        const defaultUsername = await AsyncStorage.getItem("defaultUsername");
        navigate('Loading', {
                action: () => joinLobby(code, username=="" ? defaultUsername: username, server.players.length+1),
                msg: "Joining Lobby"
            }
        );
        
    };
    console.log(state);

    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style={styles.mainViewStyle}>
                    {/* Back Button */}
                    <View style={{alignSelf: "flex-start", marginLeft: 10}}>
                        <BackButton onPress={()=>{goBack()}}/>
                    </View>
                    {/* 2 Cards */}

                    <View style={styles.cardRowStyle}>
                        {/* Left Card */}
                        <MyProfile
                            style = {styles.mainCard1Style}
                        />
                        {/* Right Card */}
                        <MyCard cardStyle={styles.mainCard2Style}>
                            <LobbyList
                                style = {styles.lobbyListStyle}
                                onLobbyPress = {selectLobby}
                                currentLobby = {server}
                            />
                            <View style={styles.bottomInputControlsStyle}>
                                <MyTextBox
                                    hint={"Or a Lobby Code"}
                                    style={styles.lobbyCodeStyle}
                                    value = {lobbyCode}
                                    onChangeText = {inputLobbyCode}
                                    maxLength = {6}
                                />
                                <MyButton 
                                    text={"Start"}
                                    btnStyle={styles.btnStyle}
                                    onPress = {startGame}
                                    disabled = {startDisabled}
                                />
                            </View>
                        </MyCard>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // CONTAINER STYLES
    mainViewStyle: {
        alignItems: "center",
    },
    cardRowStyle: {
        flexDirection: "row",
    },
    mainCard1Style:{
        flex: 1,
    },
    mainCard2Style:{
        flex: 2,
        margin: 10,
    },
    lobbyListStyle:{
        flex: 1,
        margin: 10,
        marginBottom: 0,
    },
    bottomInputControlsStyle:{
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    // INPUT CONTROL STYLES
    lobbyCodeStyle:{
        width: 180,
        margin: 10,
        paddingLeft: 10,
    },
    btnStyle: {
        width: 150,
        margin: 10,
        paddingVertical: 5,
        paddingTop: 9,
        borderWidth: 3,
        alignItems: "flex-end"
    },
    txtStyle: {
        color: "#272727",
        fontSize: 15,
        fontFamily: "OpenSauceSans",
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

export default JoinLobbyScreen;