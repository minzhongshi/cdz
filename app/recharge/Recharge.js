import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import {Input} from "react-native-elements";
import Button from "../logIn/button/Button";
import {RECHARGE_YRL} from "../utils/pathMap";
import {Actions} from "react-native-router-flux";
import Toast from "../utils/Toast";

export default class Recharge extends Component {
    state={
        money:"",
        balance:"",
        invoicableAmount:"",
        totalConsumption:"",
        chargingCoin:"",
        touken:'',
    }

    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                this.setState({'touken': value})
            }

        } catch (e) {
            console.log(e);
        }
        console.log(this.props)

    }

    phoneNumberChangeText=(money)=>{
        this.setState({money})
    }

    moneys=async () => {
        let url = RECHARGE_YRL; //接口地址
        let obj = {"money": this.state.money};
        obj = JSON.stringify(obj); //发送JSON字符串给后台
        let options = {
            //请求头
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${this.state.touken}`
            },
            body: obj
        };
        let data = await fetch(url, options); //获取后台数据
        data = await data.json(); //解析获取的数据
        Toast.message("充值成功",2000,"center");
        // alert(JSON.stringify(data));
        this.setState({
            //更新页面状态
            balance:data.balance,
            invoicableAmount:data.invoicableAmount,
            totalConsumption:data.totalConsumption,
            chargingCoin:data.chargingCoin
        });

        Actions.pop({refresh:({'balance':data.balance, "invoicableAmount":data.invoicableAmount,"totalConsumption":data.totalConsumption, "chargingCoin":data.chargingCoin})})
    }

    render() {
        const {money}=this.state
        return (
            <View style={{width:'100%',height:pxToDp(300),justifyContent:'center'}}>
                <View style={{marginTop:pxToDp(30)}}>
                    <Input
                        inputStyle={{
                            color:'#2B2B2B'
                        }}
                        placeholder='请输入充值金额'
                        keyboardType={'phone-pad'}
                        maxLength={5}
                        value={money}
                        inputContainerStyle={{color:'#333'}}
                        onChangeText={this.phoneNumberChangeText}

                    />
                </View>
                <Button onPress={this.moneys} style={{height:pxToDp(60)}}>充值</Button>
            </View>
        );
    }
}
