import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class ActivityTop extends Component{
    render() {
        return (
            <View>
                <Text style={styles.text}>活动 Activity</Text>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    text: {
        fontSize: 25,
        textAlign:'center',
        color: '#2B2B2B',
    },

})
