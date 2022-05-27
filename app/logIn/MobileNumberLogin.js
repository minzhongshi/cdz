import React, {Component} from "react";
import {Image, StatusBar, StyleSheet, Text, View} from "react-native";
import {pxToDp} from '../utils/stylesKits'
import {Input} from 'react-native-elements'
import validator from '../utils/validatir'
import request from "../utils/request";
import {CAPTCHA_URL, PERSONAL_URL, VERIFICATION_CODE_URL} from "../utils/pathMap"
import Button from "./button/Button";
import {CodeField, Cursor,} from 'react-native-confirmation-code-field';
import Toast from "../utils/Toast";
import {Actions} from "react-native-router-flux";
import AsyncStorage from '@react-native-community/async-storage';
import base64 from 'react-native-base64'


export default class MobileNumberLogin extends Component {
    constructor(props) {
        super(props);
    }

    state={
        phoneNumber:'',
        phoneValid:true,
        //显示登录页面
        showLogin:true,
        //验证码输入框值
        vcodeTxt:"",
        btnText:'重新获取',
        //是否在倒计时中
        isCountDowning:false,
        token:"",
        demo:"",
    }



    phoneNumberChangeText=(phoneNumber)=>{
        this.setState({phoneNumber})
    }
    phoneNumberSubmitEditing=async ()=>{

        //validator.validatePhone()
        const {phoneNumber}=this.state;
        console.log(phoneNumber)
        const phoneValid=validator.validatePhone(phoneNumber);
        console.log(phoneValid)
        if (!phoneValid){
            //未通过
            this.setState({phoneValid});
            return;
        }
        const res=await request.get(CAPTCHA_URL+phoneNumber)
        console.log(res);
        if (res.code==="200"){
            if (res.message==="验证码获取成功"){
                //请求成功
                this.setState({showLogin:false});
                //开启定时器
                this.countDown(60)
            }else {
                //开启定时器
                this.countDown(600)
                Toast.message("请10分钟后重试", 2000, "center");
            }
        }else {
            Toast.message("验证码获取失败", 2000, "center");
        }
    }

    //开启回去验证码定时器
    countDown=(time)=>{
        if (this.state.isCountDowning){
            return
        }
        this.setState({isCountDowning:true})
        let seconds=time;
        this.setState({btnText:`重新获取(${seconds}s)`});
        let timeId=setInterval(()=>{
            seconds--;
            this.setState({btnText:`重新获取(${seconds}s)`});
            if(seconds===0){
                clearInterval(timeId);
                this.setState({btnText:"重新获取",isCountDowning:false});
            }
        },1000);

    }
    //验证码值改变事件
    onVcodeChangeText=(vcodeTxt)=>{
        this.setState({vcodeTxt})
    }

    //点击重新获取按钮
    repGetVcode=()=>{
        this.countDown();
}



    //验证码输入完成
    onVcodeSubmitEditing=async () => {


        //校验长度
       const {vcodeTxt, phoneNumber,demo} = this.state;
       console.log(this.state)
        if (vcodeTxt.length !== 6) {
            Toast.message("验证码格式不正确", 2000, "center");
            return;
        }
        //后台验证






         await fetch(PERSONAL_URL+VERIFICATION_CODE_URL, {
            // grant_type:'mobile_code',
            // mobile1:phonNumber,
            // verifyCode:vcodeTxt
        method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Basic ' + base64.encode('android' + ":" + 'charge_android')
            },
            body:`grant_type=mobile_code&mobile=${phoneNumber}&verifyCode=${vcodeTxt}`,

        }).then(response => response.json())
            .then(responseData=>{
                this.setState({
                    'token':responseData.access_token,
                })

                AsyncStorage.setItem('token', responseData.access_token);
            })
            .catch(error => {
                console.error(error);
            })
            .done(
            )
        const vu=AsyncStorage.getItem('token');
        if(vu!==""){
                Actions.Nav();
            Toast.message("登录成功",2000,"center");
        }else {
            Toast.message("验证码输入不正确",2000,"center");

        }

    }

    //填写验证码
    renderVcode=()=>{

        const {phoneNumber,phoneValid,vcodeTxt,btnText,isCountDowning}=this.state;
        console.log(phoneNumber+"1111111111111")
        return  <View>
            <View><Text style={{fontSize:pxToDp(25),color:'#317DEE',fontWeight:'bold'}}>输入六位验证码</Text></View>
            <View style={{marginTop:pxToDp(15)}}><Text style={{color:'#888'}}>已发送到：+86{phoneNumber}</Text></View>
            <View><CodeField
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={vcodeTxt}
                onChangeText={this.onVcodeChangeText}
                onSubmitEditing={this.onVcodeSubmitEditing}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                    >
                        {symbol || (isFocused ? <Cursor/> : null)}
                    </Text>
                )}
            /></View>
            <View style={{marginTop:pxToDp(60)}}>
                <Button disabled={isCountDowning} onPress={this.repGetVcode} style={{width:"85%",height:pxToDp(42),alignSelf:"center",borderRadius:pxToDp(20)}}>{btnText}</Button>

            </View>
        </View>
    }
    //登录页面
    renderLogin=()=>{
        const {phoneNumber,phoneValid}=this.state;
        return(

            <View>
            <View>
                <Text style={{fontSize:pxToDp(25),color:'#2D7CEE',fontWeight:'bold'}}>手机号登陆注册</Text>
            </View>
            <View style={{marginTop:pxToDp(30)}}>
                <Input
                    inputStyle={{
                        color:'#2D7CEE'
                    }}
                    placeholder='请输入手机号码'
                    maxLength={11}
                    keyboardType={'phone-pad'}
                    value={phoneNumber}
                    errorMessage={phoneValid?"":'手机号码格式不正确'}
                    onSubmitEditing={this.phoneNumberSubmitEditing}
                    inputContainerStyle={{color:'#333'}}
                    onChangeText={this.phoneNumberChangeText}
                    leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                />
            </View>
            <View style={{marginTop:pxToDp(60)}}>
                <View>
                    <Button onPress={this.phoneNumberSubmitEditing}  style={{width:"85%",height:pxToDp(42),alignSelf:"center",borderRadius:pxToDp(20)}}>获取验证码</Button>
                </View>
            </View>
        </View>
        )}
    render() {
        const {phoneNumber,phoneValid,showLogin}=this.state;
        return (
            <View>
                <StatusBar backgroundColor={"transparent"} translucent={true}/>
                <Image style={{width:"100%",height:pxToDp(300)}} source={require("../../assets/lonin.png")}/>

                <View style={{padding:pxToDp(20)}}>
                    {showLogin? this.renderLogin(): this.renderVcode()}
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: '#2F7CEE',
        textAlign: 'center',
        color:'#2F7CEE',
    },
    focusCell: {
        borderColor: '#7d53ea',
    },
});
