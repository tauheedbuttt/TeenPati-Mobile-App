import React from "react";
import {View, TouchableOpacity , Text, StyleSheet, FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import MyListCard from "./Reusable/MyListCard";

// FONTS
import { useFonts } from 'expo-font';

const LobbyList = ({data, onLobbyPress, onRefresh, currentLobby, style}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    return (
        <MyListCard style={style}>
            <TouchableOpacity
                onPressIn={() => onRefresh()}
                style={styles.refreshStyle}
            >
                <Ionicons 
                    name="refresh" 
                    size={30} 
                    color="#545454" 
                />
            </TouchableOpacity>
            <FlatList 
                data={data}
                keyExtractor={(item)=>{item.code}}
                style={styles.listStyle}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item})=>{
                    let color = (item.code == currentLobby.code) ? currentLobby.color : "#F4F4F4";
                    return (
                        <TouchableOpacity onPress={() => onLobbyPress(item)} >
                            <MyListCard style={[styles.itemStyle, {backgroundColor: color}]}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={styles.txtStyle}>{item.name}</Text>
                                    <Text style={styles.txtStyle}>{item.playing}/{item.players}</Text>
                                </View>
                            </MyListCard>
                        </TouchableOpacity>
                    );
                }}
            />
        </MyListCard>
      );
}

const styles = StyleSheet.create({
    txtStyle: {
        color: "#272727",
        fontSize: 17,
        fontFamily: "OpenSauceSans",
    },
    listStyle:{
        margin: 10,
        marginHorizontal: 25,
        marginRight: 50,
    }, 
    itemStyle: {
        elevation: 0,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    refreshStyle: {
        position:"absolute", 
        alignSelf: "flex-end", 
        paddingRight: 15, 
        paddingTop: 5
    }
});

export default LobbyList;