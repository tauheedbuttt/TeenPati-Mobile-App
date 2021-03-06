
import React, {useEffect, useState, useContext, useCallback} from "react";
import {RefreshControl, View, TouchableOpacity , Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import MyListCard from "./Reusable/MyListCard";
import Error from "./Reusable/Error";
import {Context as LobbyContext} from "../context/LobbyContext";

// FONTS
import { useFonts } from 'expo-font';

const LobbyList = ({onLobbyPress, currentLobby, style}) => {

    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });

    // from database
    const {state, getLobbies} = useContext(LobbyContext);
    const data=state;

    // used to reload the fetching of lobbies
    // START
    const [refreshing, setRefreshing] = useState(false);
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getLobbies(() => setRefreshing(false));
    }, []);
    
    useEffect(()=>{
        onRefresh();
    },[])
    // END

    return (
        <MyListCard style={[style]}>
            {refreshing ? 
                <View style={{flex: 1, justifyContent: "center"}}>
                    <ActivityIndicator size={60} color="#72A604" />
                </View>
                :
                <>
                    <TouchableOpacity
                        onPressIn={onRefresh}
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
                        ListEmptyComponent={<Error msg="No lobby found" size={100} color="#A4A2A2" style={{flex: 1}}/>}
                        renderItem={({item})=>{
                            let color = (item.code == currentLobby.code) ? currentLobby.color : "#F4F4F4";
                            let disableColor = item.started ? {color: "#A4A2A2"} : null;
                            return (
                                <TouchableOpacity onPress={() => onLobbyPress(item)} disabled = {item.started}>
                                    <MyListCard style={[styles.itemStyle, {backgroundColor: color}]}>
                                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={[styles.txtStyle, disableColor]}>{item.name}</Text>
                                            {item.started ? <Text style={[styles.txtStyle, {color: "#A4A2A2"}]}>Started</Text>: null}
                                            <Text style={[styles.txtStyle, disableColor]}>{item.players.length}/{item.limit}</Text>
                                        </View>
                                    </MyListCard>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </>
            }
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