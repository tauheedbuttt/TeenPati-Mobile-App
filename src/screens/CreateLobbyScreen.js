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
import MyProfile from "../components/Reusable/MyProfile";
import Counter from "../components/Reusable/Counter";
import CheckBoxList from "../components/CheckBoxList";
import useCreateLobby from "../hooks/useCreateLobby";



// FONTS
import { useFonts } from 'expo-font';
import { FlatList } from "react-native-gesture-handler";


const CreateLobbyScreen = ({ navigation: { goBack, navigate }}) => {
    

    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    // username
    const [username, setUsername] = useState("");
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

    const [createGameDisabled, serverName, inputServerName, generateCode] = useCreateLobby();

    
    // On Create Game
    const onCreateGameClick = () => {
        navigate('Game', {
                username: username, 
                players: players,
                unkownMode: isUnkownMode,
                moves: specialMoves, 
                against: "USER", 
                code: generateCode(6)
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
                                <CheckBoxList
                                    data = {moves}
                                    selected = {specialMoves}
                                    setSelected=  {setSpecialMoves}
                                    style = {styles.movesListStyle}
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