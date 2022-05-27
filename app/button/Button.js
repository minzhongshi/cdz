import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

export default class Button extends Component {

    render() {
        return (
            <View style={styles.button}>
                <Text style={{alignItems: 'center',color:"#DEE1E6", fontSize:20,}}>没有更多内容了！</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    button:{
        height:70,
        alignItems:'center',
        justifyContent:'center'
    }
})
