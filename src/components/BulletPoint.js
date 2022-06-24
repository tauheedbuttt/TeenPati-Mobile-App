import React from "react";
import {View, Text, StyleSheet, FlatList} from 'react-native';

// FONTS
import { useFonts } from 'expo-font';

const BulletPoint = ({data, style}) => {
    let [fontsLoaded] = useFonts({
        'OpenSauceSans': require("../../assets/fonts/OpenSauceSans-SemiBold.ttf")
    });
    return (
        <View style={style}>
          <FlatList
            data={data}
            keyExtractor = {(Data) => Data.id}
            renderItem={({item}) => <Text style={styles.txtStyle}>{'\u2B24' + '\t\t'}{item.key}</Text>}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    txtStyle: {
        flex: 1, 
        marginTop: 6,
        color: "#272727",
        fontSize: 17,
        fontFamily: "OpenSauceSans",
    },
});

export default BulletPoint;