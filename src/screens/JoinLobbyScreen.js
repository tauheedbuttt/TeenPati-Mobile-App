import React, {useState} from "react";
import {View, ImageBackground, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import MyButton from "../components/Reusable/MyButton";
import MyCard from "../components/Reusable/MyCard";
import BackButton from "../components/Reusable/BackButton";
import MyTextBox from "../components/Reusable/MyTextbox";
import MyListCard from "../components/Reusable/MyListCard";
import MyProfile from "../components/Reusable/MyProfile";


const JoinLobbyScreen = ({ navigation: { goBack, navigate }} ) => {
    // extra state
    const [startDisabled, setStartDisabled] = useState(true);
    // username
    const [username, setUsername] = useState("");
    // lobby code
    const [lobbyCode, setServerCode] = useState("");
    // selected lobby
    const [server, setServer] = useState({});
    
    // servers
    const servers = [
        {name: "btcks", code: "HUHUHH"},
        {name: "asdds", code: "GGSD$#"},
        {name: "asfasf", code: "SDGG%6"},
        {name: "fdsdfsd", code: "GHRF6"},
        {name: "fdsdfsd", code: "GDRHF6"},
        {name: "fdsdfsd", code: "GHGHF6"},
        {name: "fdsdfsd", code: "GHAHF6"},
        {name: "fdsdfsd", code: "GHRGF6"},
        {name: "fdsdfsd", code: "GHRHA6"},
        {name: "fdsdfsd", code: "GHQHF6"},
    ]

    // ----------------------- Input Functions ---------------------------
    
    // Selecting lobby from multiple public servers 
    const selectLobby = (item) => {
        // select server
        let selectedServer = item;
        if (item.code == server.code) selectedServer={}

        // assign values
        item.color = selectedServer == {} ? "#F4F4F4" : "#C9E265";
        setServer(selectedServer);
        // if disabled, enable it. if enabled, check if same server selected. if same server then disable it
        setStartDisabled(startDisabled == true ? false : ((item.code == server.code) && (lobbyCode=="")) ? true : startDisabled);
    }

    // Entering Lobby Through Code
    const inputLobbyCode = (newValue) => {
        setServerCode(newValue);
        setStartDisabled(startDisabled == true ? false : ((newValue=="") && (Object.keys(server)==0)) ? true : startDisabled);
    }

    const startGame = () => {
        let code = lobbyCode == "" ? server.code : lobbyCode;
        navigate('Game', {
            username: username, 
            against: "USER", 
            code: code
            }
        );
    }

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
                            <MyListCard style={styles.lobbyContainerStyle}>
                                <TouchableOpacity
                                    onPressIn={()=>{console.log("Refresh");}}
                                    style={{position:"absolute", alignSelf: "flex-end", paddingRight: 15, paddingTop: 5}}
                                >
                                    <Ionicons 
                                        name="refresh" 
                                        size={30} 
                                        color="#545454" 
                                    />
                                </TouchableOpacity>
                                <FlatList 
                                    data={servers}
                                    keyExtractor={(item)=>{item.code}}
                                    style={styles.lobbyListStyle}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({item})=>{
                                        let color = (item.code == server.code) ? server.color : "#F4F4F4";
                                        return (
                                            <TouchableOpacity onPress={() => selectLobby(item)} >
                                                <MyListCard style={[styles.lobbyItemStyle, {backgroundColor: color}]}>
                                                        <Text style={styles.txtStyle}>{item.name}: {item.code}</Text>
                                                </MyListCard>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </MyListCard>
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
    lobbyContainerStyle:{
        flex: 1,
        margin: 10,
        marginBottom: 0,
    },
    lobbyListStyle:{
        margin: 10,
        marginHorizontal: 25,
        marginRight: 50,
    }, 
    lobbyItemStyle: {
        elevation: 0,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
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