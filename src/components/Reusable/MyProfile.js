import React, {useState,useEffect} from "react";
import {View, StyleSheet, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';




import MyButton from "./MyButton";
import MyCard from "./MyCard";
import MyTextBox from "./MyTextbox";

function randomUsername(){
    const prefix = "Guest#";
    const postfix = `${Math.floor(Math.random() * 999999)+100000}`;
    return (prefix+postfix);
}

var defaultUsername = randomUsername();

const MyProfile = ({style}) => {
    
    const [username, setUsername] = useState();

    const typeUsername = async (value) =>{
        // show on screen
        setUsername(value)
        // store in storage
        await AsyncStorage.setItem("username", value);
    };
    
    useEffect(()=>{
        // store in storage
        const store = async () => {
            var previousValue = await AsyncStorage.getItem("username");
            if (previousValue!=undefined && previousValue!=""){
                setUsername(previousValue);
            }
            await AsyncStorage.setItem("defaultUsername", defaultUsername);
        }
        store();
    },[]);

    return (
        <MyCard cardStyle={[styles.mainCardStyle, style]}>
            <Ionicons 
                name="person" 
                size={90} 
                color="green"
                style={styles.profileImg} 
            />
            <MyTextBox
                hint={defaultUsername}
                style={[styles.userNameStyle]}
                value={username}
                align="center"
                onChangeText={typeUsername}
            />
            <MyButton 
                text={"Server"}
                btnStyle={styles.btnStyle}
                />
        </MyCard>
    );
};

const styles = StyleSheet.create({
    // Container Styles
    mainCardStyle:{
        margin: 10,
        padding: 10,
        alignItems: "center",
    },
    userNameStyle:{
        marginTop: 10,
        width: "100%",
    },
    btnStyle: {
        width: 150,
        paddingVertical: 8,
        marginTop: 33,
        margin: 10,
        borderWidth: 3,
    }
});

export default MyProfile;