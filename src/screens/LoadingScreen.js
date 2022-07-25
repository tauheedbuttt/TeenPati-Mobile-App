import React, {useState, useEffect, useContext} from "react";
import { View, StyleSheet,Text, ImageBackground, ActivityIndicator, BackHandler } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import { Context } from "../context/AuthContext";
import MyButton from "../components/Reusable/MyButton";
import Error from "../components/Reusable/Error";

const LoadingScreen = ({ navigation, navigation:{goBack, state:{params}} }) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });

    const {action, msg} = params;
    const {state, clearError} = useContext(Context);

    useEffect(()=>{
        // Perform the action
        action();
    },[])
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", ()=>{ clearError();});
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", ()=>{ clearError();});
        };
    }, []);
    return (
        <SafeAreaView style={styles.safeViewStyle}>
            <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bgStyle}>
                <View style = {styles.mainViewStyle}>
                    {/* Loading Icon */}
                    {
                        state.error!="" ? 
                        <>
                            <Error msg={state.error} size={100} color="#DF0000"/>  
                            <MyButton 
                                text="Go Back"
                                btnStyle={styles.btnStyle}
                                onPress={()=>{ clearError(); goBack();}}
                            />
                        </>
                        :
                        <>
                            <ActivityIndicator size={100} color="#272727"/>
                            <Text style={styles.txtStyle}>{state.error!="" ? state.error : msg}</Text>
                        </>
                    }
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainViewStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    txtStyle: {
        color: "#272727",
        fontSize: 18,
        fontFamily: "OpenSauceSans",
    },
    btnStyle: {
        width: 160,
        paddingVertical: 12,
        borderWidth: 3,
        top: 60,
        justifyContent: "center"
    }
});

export default LoadingScreen;