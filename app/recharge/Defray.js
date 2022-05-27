import React, {Component} from "react";
import {AsyncStorage, Text, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import {Actions} from "react-native-router-flux";
import Button from "../logIn/button/Button";
import {DEFRAY_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";

export default class Defray extends Component {
    constructor(props) {
        super(props);
    }

    state={
        CourseList: false,
        defray: this.props.defray,
        orderNumber:this.props.orderNumber,
        couponId:"",
        touken:''
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

    }
    //返回调用
    // componentWillUnmount() {
    //     Actions.pop({refresh:({'defray':this.state.defray})})
    // }

    defray=async()=>{
        let url = DEFRAY_URL; //接口地址
        let obj = {"transferId": this.state.orderNumber};
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
        console.log(data)
        Toast.message("支付成功",2000,"center");
        // fetch(DEFRAY_URL,{
        //     method:'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization":`Bearer ${this.state.touken}`
        //     },
        //     body:{
        //         "transferId": this.state.orderNumber,
        //     }
        // })
        //     .then(response => response.json())
        //     .then(responseData=>{
        //         console.log(responseData)
        //         if (responseData.code==="200"){
        //             if(responseData.data!==null){
        //                 this.setState({
        //                     data:responseData.data.record,
        //                     displays:true,
        //                     total:data.total,
        //
        //                 })
        //             }
        //         }
        //
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })
        //     .done()
    }

    render() {

        const {defray,orderNumber}=this.state;
        console.log(orderNumber);
        return (
            <View >
                <Text style={{color:'#2B2B2B',marginLeft:pxToDp(10),marginTop:pxToDp(20),fontSize:pxToDp(18)}}>账单号:{orderNumber}</Text>
                <View style={{width:'100%',height:pxToDp(600),alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#2B2B2B',fontSize:pxToDp(30)}}>需要支付：{defray}元</Text>

                    <Button onPress={this.defray} style={{marginTop:pxToDp(50),height:pxToDp(50),width:'80%'}}>支付</Button>
                </View>
            </View>
        );
    }





}
