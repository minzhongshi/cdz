import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import Button from "../logIn/button/Button";
import {ActionSheet} from 'teaset';
import Toast from "../utils/Toast";
import {Actions} from "react-native-router-flux";

export default class SignOut extends Component {
    state={
        signOut:this.props.signOut
    }


    logout=async()=>{
        const tmplogout=async ()=>{
            console.log("退出");
            await AsyncStorage.clear();
          Toast.smile("退出成功",2000);

          setTimeout(()=>{
              //this.props.navigation.navigate("Tab")
              Actions.App();
          })
        }
        const  opts=[
            {title:"退出",onPress:tmplogout}
        ]
        ActionSheet.show(opts,{title:"取消"});
    }
    render() {
        return (
            <View style={{width:'100%',height:pxToDp(300),alignItems:'center',justifyContent:'center'}}>
                {this.state.signOut?
                    <Button onPress={this.logout} style={{height:pxToDp(40),width:'80%'}}>退出登录</Button>
                : <Button onPress={()=>{Actions.login()}} style={{height:pxToDp(40),width:'80%'}}>登录</Button>
                }
            </View>
        );
    }
}
