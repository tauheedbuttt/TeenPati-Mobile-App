import React from "react";
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CheckBox from 'react-native-check-box'

import MyListCard from "./Reusable/MyListCard";

// FONTS
import { useFonts } from 'expo-font';

const CheckBoxList = ({data, selected, setSelected, style}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    // on item selection
    const checkItem = (i) => {
        let temp_state = [...selected];
        temp_state[i] = !temp_state[i];
        setSelected(temp_state);
    }
    return (
        <MyListCard style={style}>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.key}
                renderItem = {({item})=>{
                    return(
                        <View style={{flexDirection:"row", alignItems: "center"}}>
                            <CheckBox
                                onClick={()=>{checkItem(item.key)}}
                                isChecked={selected[item.key]}
                            />
                            <Text style={styles.txtStyle}>{"\t"}{item.move}</Text>
                        </View>
                    );
                }}
            />
        </MyListCard>
      );
}

const styles = StyleSheet.create({
    txtStyle: {
        color: "#272727",
        fontSize: 15,
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

export default CheckBoxList;