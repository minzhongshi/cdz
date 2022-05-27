import React, {Component} from "react";
import {Text, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";

export default class Bill extends Component {

    render() {
        return (
            <View style={{width:'100%',height:pxToDp(300),alignItems:'center',justifyContent:'center'}}>
               <Text style={{fontSize:pxToDp(40),color:'#2B2B2B'}}>该功能还在完善中！敬请期待！！！</Text>
            </View>
        );
    }
}
