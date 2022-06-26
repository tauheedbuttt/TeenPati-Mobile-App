import React, {useState} from "react";
import { View, StyleSheet,Text, FlatList, ImageBackground, Image, Dimensions } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import MyButton from "../components/Reusable/MyButton";
import MyCard from "../components/Reusable/MyCard";
import MyListCard from "../components/Reusable/MyListCard";

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

let ScreenWidth = Dimensions.get("window").width;
const ResultPageScreen = ({ navigation,navigation:{goBack, state:{params}} }) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    // const {username, players, unkownMode, moves, against, code} = params
    let username = "btck";
    let players = [
        {name: "btck", score: 3},
        {name: "lmao", score: 4},
        {name: "huhs", score: 5},
        {name: "shsh", score: 6}
    ]
    let winner = "shsh";

    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style = {styles.mainViewStyle}>
                    
                    {/* Score Grid */}
                    <MyCard cardStyle={styles.cardStyle}>
                        <FlatList 
                            data={players}
                            keyExtractor={(item)=>item.name}
                            numColumns = {2}
                            renderItem = {({item})=>{
                                let color = (item.name == winner) ? "#CDEDFF" : "#F4F4F4";
                                return (
                                    <MyListCard style={[styles.scoresStyle, {backgroundColor: color}]}>
                                        <View style={{flexDirection:"row", justifyContent: "center", width: "100%"}}>
                                            {item.name==username ? <Text style={[styles.txtStyle, {color: "#A8A8A8"}]}>{"You\t"}</Text>: null}
                                            <Text style={styles.txtStyle}>{item.name}</Text>
                                        </View>
                                        <Text style={styles.txtStyle}>{item.score}</Text>
                                    </MyListCard>
                                );
                            }}
                        />
                    </MyCard>
                    {/* Logo */}
                    <Image
                        source={require("../../assets/images/scoreHeading.png")}
                        style={styles.logoStyle}
                    />
                    {/* Buttons */}
                    <View style={styles.btnRowStyle}>
                        <MyButton 
                            text= {"Play Again"}
                            btnStyle = {styles.btnStyle}
                            onPress = {() => {goBack()}}
                            />
                        <MyButton 
                            text={"Quit"}
                            btnStyle = {styles.btnStyle}
                            onPress = {() => {
                                navigation.dispatch(resetAction);
                            }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {
        alignItems: "center",
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
    gridStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardStyle: {
        alignSelf: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        paddingTop: 15,
        height: 160,
        top: 100
    },
    scoresStyle: {
        width: 180,
        paddingVertical: 3,
        borderRadius: 8,
        margin: 5,
        alignItems: "center",
        elevation: 0,
    },
    logoStyle: {
        height: 110,
        top: 10,
        resizeMode: 'contain',
        position: "absolute"
    },
    txtStyle: {
        color: "#272727",
        fontSize: 15,
        fontFamily: "OpenSauceSans",
    },
    btnRowStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: ScreenWidth,
        paddingHorizontal: 60,
        top: 85,
    },
    btnStyle: {
        width: 150,
        paddingVertical: 15,
        margin: 18,
    }
});

export default ResultPageScreen;