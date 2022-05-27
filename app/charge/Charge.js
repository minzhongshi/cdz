import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {CHARGE_URL, FETTLE_URL, STOP_CHARGING_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";
import Button from "../logIn/button/Button";
import {pxToDp} from "../utils/stylesKits";
import AsyncStorage from "@react-native-community/async-storage";

export default class Charge extends Component {
    constructor(props) {
        super(props);
    }

    state={
        charge_num:0,
        display:false,
        id:this.props.id,
        charge_status:0,
        touken:''
    }
    //http://47.111.72.160:7001/mqtt/pile/start


    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                this.setState({'touken': value})
            }

        } catch (e) {
            console.log(e);
        }
    }


    // componentWillMount(){
    //     this.getData()
    // }

    //循环计时
    getData(){
        console.log('充电!')
        const intervalID = setInterval(() => {
            if(this.state.display===true){
                fetch(FETTLE_URL,{
                    method:'GET',
                    headers: {
                        "Authorization":`Bearer ${this.state.touken}`,
                    }
                })
                    .then(response => response.json())
                    .then(responseData=>{
                        if (responseData.code==="200"){
                            console.log(responseData);
                            console.log(responseData.data);
                            this.setState({
                                charge_num:responseData.data.charge_num,
                                charge_status:responseData.data.charge_status,
                            })
                        }else {
                            Toast.message("获取状态失败",2000,"center");
                        }

                    })
                    .catch(error => {
                        console.error(error);
                        Toast.message("获取失败",2000,"center");
                    })
                    .done()
            }

            //移除
            if (this.state.display === false){
                clearInterval(intervalID);
            }

        }, 5000)


    }
    //停止充电
    stopCharging=(id)=>{
        this.setState({display:false});
        fetch(STOP_CHARGING_URL,{
            method:'POST',
            headers: {
                "Authorization":`Bearer ${this.state.touken}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `clientId=${id}`
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    console.log(responseData.data.records)
                    this.setState({
                        charge_num:responseData.data.records.charge_num
                    })
                }else {
                    Toast.message("停止失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
                // Toast.message("服务器出现异常",2000,"center");
            })
            .done()
    }

    //开始充电
    startCharging=(id)=>{
        if (id!==""){
            this.setState({display:true});
            fetch(CHARGE_URL, {
                method:'POST',
                headers: {
                    "Authorization":`Bearer ${this.state.touken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `clientId=${id}`
            }
            ,new Promise(function (resolve,reject){
                setTimeout(()=> reject(new Error('连接超时')),6000)

            })
            )
                .then(response => response.json())
                .then(responseData=>{
                    Toast.showLoading("连接中，请稍后")
                    if (responseData.code==="ES601"){
                        Toast.message("当前有订单正在进行",2000,"center");
                        Toast.hideLoading();
                        return;
                    }
                    if (responseData.code==="200"){
                        Toast.hideLoading();
                        console.log(responseData.data.records)
                        this.setState({
                            charge_num:responseData.data.records.charge_num
                        })

                    }else {
                        Toast.hideLoading();
                        Toast.message("充电失败",2000,"center");
                    }

                })
                .catch(error => {
                    Toast.hideLoading();
                    console.error(error);
                    Toast.message("服务器出现异常",2000,"center");
                })
                .done()
            Toast.hideLoading();
        }else {
            Toast.message("请选择充电站和终端",2000,"center");
            Atomics.Nav();
        }

    }

    render() {
        const {charge_num,id,display}=this.state;



        return (
            <View style={styles.button}>
                {
                    display?
                        <TouchableHighlight onPress={this.getData.bind(this)}>
                            <Text onPress={this.getData}  style={{color:'#2B2B2B',height:pxToDp(50),fontSize:pxToDp(28,)}}>当前已充电：{charge_num}度</Text>
                        </TouchableHighlight>
                        :
                        <TouchableHighlight>
                        <Text style={{color:'#2B2B2B',height:pxToDp(50),fontSize:pxToDp(28,)}}>未开始充电</Text>
                    </TouchableHighlight>


                }

                {
                  display?
                      <Button onPress={()=>this.stopCharging(id)} style={{marginTop:pxToDp(100),width:'80%',height: pxToDp(70)}}>停止充电</Button>
                      :<Button onPress={()=>this.startCharging(id)} style={{ marginTop:pxToDp(100),width:'80%',height: pxToDp(70)}}>开始充电</Button>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        // height:pxToDp(300),
        marginTop:pxToDp(200),
        alignItems:'center',
        justifyContent:'center'
    }
})
