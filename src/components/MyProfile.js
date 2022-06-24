import React from "react";
import {View, StyleSheet, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


import MyButton from "../components/MyButton";
import MyCard from "../components/MyCard";
import MyTextBox from "../components/MyTextbox";



const MyProfile = ({username, setUsername, style}) => {
    
    return (
        <MyCard cardStyle={[styles.mainCardStyle, style]}>
            <Ionicons 
                name="person" 
                size={90} 
                color="green"
                style={styles.profileImg} 
            />
            <MyTextBox
                hint={"Username  "}
                style={[styles.userNameStyle]}
                value={username}
                onChangeText={setUsername}
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
        alignItems: "center",
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