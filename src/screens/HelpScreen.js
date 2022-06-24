import React from "react";
import {View, Text, ImageBackground, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MyCard from "../components/MyCard";
import BackButton from "../components/BackButton";
import BulletPoint from "../components/BulletPoint";
import MyButton from "../components/MyButton";


const HelpLobbyScreen = ({ navigation: { goBack }} ) => {

    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style={styles.mainViewStyle}>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        >
                        {/* Back Button */}
                        <View style={{alignSelf: "flex-start", marginLeft: 10}}>
                            <BackButton onPress={()=>{goBack()}}/>
                        </View>
                        <MyCard cardStyle={styles.mainCard}>
                            <Text style={styles.heading}>Rules</Text>
                            <BulletPoint
                                data={
                                    [
                                        {id: "1", key: 'Each Player gets dealt 3 cards.They can see their cards at the start of the game, but can\'t see them for the rest of the game until the end.'},
                                        {id: "2", key: 'Each move consists of 2 steps. Take card from the deck. Either put it on board and discard it or swap with one of the cards in your hand.'},
                                        {id: "3", key: 'If card containing number 7 is thrown, player is allowed to swap one of their cards with one of the other opponents.'},
                                        {id: "4", key: 'Player with the least amount of score is the winner.'},
                                    ]
                                }
                                style = {styles.bulletStlyes}
                            />
                            <Text style={styles.heading}>Scores</Text>
                            <BulletPoint
                                data={
                                    [
                                        {id: "1", key: 'Card category does not matter (i.e Clubs, Diamonds, Hearts and Spades)'},
                                        {id: "2", key: 'Ace -> 1'},
                                        {id: "3", key: 'Numbers -> Their Respective Number'},
                                        {id: "4", key: 'Jack -> 11'},
                                        {id: "5", key: 'Queen -> 12'},
                                    ]
                                }
                                style = {styles.bulletStlyes}
                            />
                        </MyCard>
                        <MyButton
                            text={"OK"}
                            btnStyle={styles.btnStyle}
                            onPress={()=>{goBack()}}
                        />
                    </ScrollView>

                </View>
                
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // CONTAINER STYLES
    mainViewStyle: {
    },
    mainCard:{
        margin: 10,
        marginHorizontal: 20,
        paddingBottom: 15,
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

export default HelpLobbyScreen;