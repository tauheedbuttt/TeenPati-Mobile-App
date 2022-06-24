import React, { useState } from "react";
import {View, Text, ImageBackground, StyleSheet, Switch, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from 'react-native-check-box'
import RollPickerNative from 'roll-picker-native'
import Ionicons from '@expo/vector-icons/Ionicons';



import MyButton from "../components/MyButton";
import MyCard from "../components/MyCard";
import BackButton from "../components/BackButton";
import MyTextBox from "../components/MyTextbox";
import MyListCard from "../components/MyListCard";
import MyProfile from "../components/MyProfile";
import PlayerSelector from "../components/PlayerSelector.";

// FONTS
import { useFonts } from 'expo-font';
import { FlatList } from "react-native-gesture-handler";


const CreateLobbyScreen = ({ navigation: { goBack, navigate }}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    // username
    const [username, setUsername] = useState("");
    // server name from text box
    const [serverName, setServerName] = useState("");
    // unkown gameplay mode
    const [isUnkownMode, setisUnkownMode] = useState(false);
    // special moves that user can engage in
    const moves = [
        {key: "0", move: "7 Pati"},
        {key: "1", move: "10 Pati"},
        {key: "2", move: "King Pati"},
    ];
    const [specialMoves, setSpecialMoves] = useState([false,false,false]);
    // 
    const moveAllowed = (specialMoves, i) => {
        let temp_state = [...specialMoves];
        temp_state[i] = !temp_state[i];
        setSpecialMoves(temp_state);
    }

    // Total PPLayers
    const [players, setPlayers] = useState(1);
    
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
                                onChangeText={(newValue)=>{setServerName(newValue)}}
                            />
                            {/* Players Row */}
                            <View style={styles.rowStyle}>
                                <Text style={styles.txtStyle}>Players</Text>
                                <PlayerSelector
                                    value = {players}
                                    onIncrease = {() => setPlayers(players+1 <= 4 ? players+1 : players)}
                                    onDecrease = {() => setPlayers(players-1 > 0 ? players-1 : players)}
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
                                        onPress = {()=>{navigate('Game', {username: username, players: players, against: "USER", code: "BRU4H1"});}}
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
                                                    <Text style={styles.txtStyle}>{"\t"}{item.move}</Text>
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