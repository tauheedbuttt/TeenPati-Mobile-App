import React, {useState} from "react";
import { View, StyleSheet,Text, ImageBackground, Image } from 'react-native';
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog';


import MyButton from "../components/Reusable/MyButton";
import MyCard from "../components/Reusable/MyCard";
import Counter from "../components/Reusable/Counter";
import LobbyContext from "../context/LobbyContext";

import { SafeAreaView } from 'react-native-safe-area-context';



const HomeScreen = ({ navigation }) => {

    // Dialog Box Appearence
    const [selection, setSelection] = useState(false);
    // navigation.navigate('Game', {players: 2, against:"PC"});} 

    // Drop Down List elements
    const [players, setPlayers] = useState(1);

    const buttons = [
        { title: "Join Lobby", onPress: () => { navigation.navigate('JoinLobby') } },
        { title: "Create Lobby", onPress: () => { navigation.navigate('CreateLobby') } },
        { title: "Practice", onPress: () => { setSelection(true) }},
        { title: "Help", onPress: () => { navigation.navigate('Help') } },
    ]

    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style = {styles.mainViewStyle}>
                    {/* Logo */}
                    <Image
                        source={require("../../assets/images/logo.png")}
                        style={styles.logoStyle}
                    />
                    {/* 3 Cards in Row */}
                    <View style={styles.flagStyle}>
                        <Image
                            source={require("../../assets/images/threeCards.png")}
                            style={styles.imgStyle}
                        />
                        <Image
                            source={require("../../assets/images/threeCards.png")}
                            style={[styles.imgStyle, { transform: [{ rotateY: '180deg' }] }]}
                        />
                    </View>
                    {/* Button Grid */}
                    <MyCard cardStyle={styles.cardStyle}>
                        {/* Row1 of buttons */}
                        <View style={styles.gridStyle}>
                            <MyButton
                                onPress={buttons[0].onPress}
                                text={buttons[0].title}
                                btnStyle={[styles.btnStyle, { marginBottom: 0 }]}
                            />
                            <MyButton
                                onPress={buttons[1].onPress}
                                text={buttons[1].title}
                                btnStyle={[styles.btnStyle, { marginBottom: 0 }]}
                            />
                        </View>
                        {/* Row2 of buttons */}
                        <View style={styles.gridStyle}>
                            <MyButton
                                onPress={buttons[2].onPress}
                                text={buttons[2].title}
                                btnStyle={styles.btnStyle}
                            />
                            <MyButton
                                onPress={buttons[3].onPress}
                                text={buttons[3].title}
                                btnStyle={styles.btnStyle}
                            />
                        </View>
                    </MyCard>
                    <Dialog 
                        visible={selection} 
                        width = {250}
                        dialogTitle = {
                            <DialogTitle 
                                title="Select Players"
                            />
                        }
                        onTouchOutside ={() => setSelection(false)}
                    >
                        <DialogContent style={styles.diaglogStyle}>
                                <Counter
                                    value = {players}
                                    func = {setPlayers}
                                    max = {4}
                                    min = {1}
                                    style = {{marginTop: 10}}
                                />
                                <MyButton
                                    text={"OK"}
                                    onPress={()=>{
                                        navigation.navigate('Game', {players: players, against:"PC"});
                                        setSelection(false);
                                    }}
                                    btnStyle = {styles.dialogButtonStyle}
                                />
                        </DialogContent>
                    </Dialog>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {
        alignItems: "center"
    },
    safeViewStyle:{
        backgroundColor: "#72A604", 
        height: "100%" 
    },
    bgStyle:{
        position:"absolute",  
        paddingTop: 25, 
        ...StyleSheet.absoluteFill
    },
    diaglogStyle:{
        marginHorizontal: 20,
    },
    btnStyle: {
        width: 200,
        paddingVertical: 15,
        margin: 18,
    },
    dialogButtonStyle: {
        marginTop: 10,
        paddingVertical: 10,
    },
    gridStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardStyle: {
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        bottom: 110,
    },
    imgStyle: {
        height: 120,
        resizeMode: 'contain',
        marginHorizontal: 170,
    },
    flagStyle: {
        // top: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        bottom: 80,
    },
    logoStyle: {
        height: 120,
        resizeMode: 'contain',
    },
});

export default HomeScreen;