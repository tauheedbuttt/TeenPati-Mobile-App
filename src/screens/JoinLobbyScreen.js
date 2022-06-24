import React, {useState} from "react";
import {View, ImageBackground, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyButton from "../components/MyButton";
import MyCard from "../components/MyCard";
import BackButton from "../components/BackButton";
import MyTextBox from "../components/MyTextbox";
import MyListCard from "../components/MyListCard";
import MyProfile from "../components/MyProfile";


const JoinLobbyScreen = ({ navigation: { goBack, navigate }} ) => {
    // username
    const [username, setUsername] = useState("");
    // lobby code
    const [lobbyCode, setLobbyCode] = useState("");

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
                            username = {username}
                            setUsername = {(value) => setUsername(value)}
                        />
                        {/* Right Card */}
                        <MyCard cardStyle={styles.mainCard2Style}>
                            <MyListCard style={styles.lobbyListStyle}>

                            </MyListCard>
                            <View style={styles.bottomInputControlsStyle}>
                                <MyTextBox
                                    hint={"Or a Lobby Code"}
                                    style={styles.lobbyCodeStyle}
                                    value = {lobbyCode}
                                    onChangeText = {(newValue) => {setLobbyCode(newValue)}}
                                />
                                <MyButton 
                                    text={"Start"}
                                    btnStyle={styles.btnStyle}
                                    onPress = {()=>{navigate('Game', {username: username, against: "USER", code: lobbyCode});}}
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