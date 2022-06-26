import React, { useState } from "react";
import {View, Text, ImageBackground, StyleSheet, Switch, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'react-native-check-box'
import RollPickerNative from 'roll-picker-native'
import Ionicons from '@expo/vector-icons/Ionicons';



import MyButton from "../components/Reusable/MyButton";
import MyCard from "../components/Reusable/MyCard";
import BackButton from "../components/Reusable/BackButton";
import MyTextBox from "../components/Reusable/MyTextbox";
import MyListCard from "../components/Reusable/MyListCard";
import MyProfile from "../components/Reusable/MyProfile";
import Counter from "../components/Reusable/Counter";
import envs from "../config/env";



// FONTS
import { useFonts } from 'expo-font';
import { FlatList } from "react-native-gesture-handler";


const CreateLobbyScreen = ({ navigation: { goBack, navigate }}) => {
    const {MONGO_URL} = envs;


    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    // create game button
    const [createGameDisabled, setCreateGameDisabled] = useState(true);
    // username
    const [username, setUsername] = useState("");
    // server name from text box
    const [serverName, setServerName] = useState("");
    // Total PPLayers
    const [players, setPlayers] = useState(1);
    // unkown gameplay mode
    const [isUnkownMode, setisUnkownMode] = useState(false);
    // special moves that user can engage in
    const moves = [
        {key: "0", move: "Swap Cards"},
        {key: "1", move: "Reveal Cards"},
        {key: "2", move: "Attack Cards"},
    ];
    const [specialMoves, setSpecialMoves] = useState([false,false,false]);

    // -------------------- Input Functions --------------------
    const moveAllowed = (specialMoves, i) => {
        let temp_state = [...specialMoves];
        temp_state[i] = !temp_state[i];
        setSpecialMoves(temp_state);
    }

    // Entering Lobby Through Code
    const inputServerName = (newValue) => {
        setServerName(newValue);
        setCreateGameDisabled(createGameDisabled == true ? false : (newValue=="") ? true : createGameDisabled);
    }
    // On Create Game
    const onCreateGameClick = () => {
        navigate('Game', {
                username: username, 
                players: players,
                unkownMode: isUnkownMode,
                moves: specialMoves, 
                against: "USER", 
                code: "BRU4H1"
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
                            <MyTextBox
                                hint="Server Name   "
                                style={styles.serverNameStyle}
                                value={serverName}
                                onChangeText={inputServerName}
                            />
                            {/* Players Row */}
                            <View style={styles.rowStyle}>
                                <Text style={styles.txtStyle}>Players</Text>
                                <Counter
                                    value = {players}
                                    func = {setPlayers}
                                    max = {4}
                                    min = {1}
                                    style = {{flex:0.65}}
                                />
                            </View>
                            {/* Game Mode Row */}
                            <View style={styles.rowStyle}>
                                <Text style={styles.txtStyle}>Unkown Mode</Text>
                                <View style = {styles.switchStyle}>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#4FD155' }}
                                        thumbColor={isUnkownMode ? 'white' : 'white'}
                                        onValueChange={() => {setisUnkownMode(!isUnkownMode);}}
                                        value={isUnkownMode}
                                    />
                                </View>
                            </View>
                            <View style={styles.rowStyle}>
                                {/* Label and Button Below */}
                                <View style={{justifyContent: "space-between", height: 80}}>
                                    <Text style={styles.txtStyle}>Special Moves</Text>
                                    <MyButton
                                        text="Create"
                                        btnStyle={[styles.btnStyle, {height: 50}]}
                                        onPress = {onCreateGameClick}
                                        disabled = {createGameDisabled}
                                    />
                                </View>
                                {/* Special Moves */}
                                <MyListCard style={styles.movesListStyle}>
                                    <FlatList
                                        data={moves}
                                        keyExtractor={(item)=>item.key}
                                        renderItem = {({item})=>{
                                            return(
                                                <View style={{flexDirection:"row", alignItems: "center"}}>
                                                    <CheckBox
                                                        onClick={()=>{moveAllowed(specialMoves, item.key)}}
                                                        isChecked={specialMoves[item.key]}
                                                    />
                                                    <Text style={[styles.txtStyle, {fontSize: 15}]}>{"\t"}{item.move}</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                </MyListCard>
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
        alignItems: "center"
    },
    rowStyle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "70%"
    },
    movesListStyle:{
        width: 150,
        borderRadius: 5,
        paddingLeft: 6,
    },
    // INPUT CONTROL STYLES
    serverNameStyle:{
        width: "75%",
        margin: 10,
        alignItems: "center"
    },
    btnStyle: {
        width: 120,
        paddingVertical: 5,
        borderWidth: 3,
        justifyContent: "center"
    },
    dropDownStyle: {
        width: 120,
        borderWidth: 2,
        borderColor: "#272727",
        borderRadius: 10,
        backgroundColor: "#FFF5F5",
    },
    switchStyle: {
        flex: 0.87,
        alignSelf: "flex-start",
        alignItems: "center"
    },  
    txtStyle: {
        color: "#272727",
        fontSize: 18,
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

export default CreateLobbyScreen;