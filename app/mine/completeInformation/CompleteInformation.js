import React, {Component} from "react";
import {Image, Text, View,} from "react-native";
import {pxToDp} from "../../utils/stylesKits";
import {Input} from "react-native-elements"
import Button from "../../logIn/button/Button";
import Toast from "../../utils/Toast";
import ImagePicker from "react-native-image-crop-picker";
import {Overlay} from "teaset"
import {AvatarUpload_URL, SUBMIT_CHANGES_URL} from "../../utils/pathMap";
import validator from '../../utils/validatir'
import {Actions} from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";
// import {inject,observer}from "mobx-react"
// @inject("RootStore")
// @observer


export default class CompleteInformation extends Component {
    constructor(props) {
        super(props);
    }
    state={
        mobile:"",
        username:"",
        header:"",
        verificationCode:"",
        imageId:"",
        btnText:'获取验证码',
        //是否在倒计时中
        isCountDowning:false,
        phoneValid:true,
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

    }

//修改头像
    chooseHeadImg=async () => {
        const {username, header,imageId,mobile,touken} = this.state;
        const image=await ImagePicker.openPicker({
            width:300,
            height:400,
            cropping:true,
            includeBase64:true,
        });
       // console.log(image)
        let overlayView = (
            <Overlay.View
                style={{flex:1,backgroundColor:'#000'}}
                modal={true}
                overlayOpacity={0}
                ref={v => this.overlayView = v}
            >
                <View style={{
                    flex:1,
                    marginTop:pxToDp(30),
                    alignSelf:'center',
                    width:pxToDp(334),
                    height:pxToDp(334),
                    position:'relative',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <Image source={{uri: image.path}} style={{width: "90%", height: "40%",}}/>

                </View>
                <View style={{height:pxToDp(50),width:pxToDp(70), justifyContent:'center', alignItems:'center',marginLeft:'40%',marginBottom:pxToDp(50)}}>
                    <Button onPress={() => this.overlayView && this.overlayView.close()} >关闭</Button>
                </View>

            </Overlay.View>
        );
        Overlay.show(overlayView);
        Toast.showLoading("上传中")
        //构造参数 发送到后台


        //头像请求上传
        fetch(AvatarUpload_URL,{
            method:'POST',
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${touken}`
            },
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    Toast.hideLoading();
                    Toast.message("上传头像成功",2000,"center");
                    this.setState({imageId})
                }else {
                    Toast.hideLoading();
                    Toast.message("上传失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()

       // Toast.hideLoading();
    }

    //获取修改电话验证码
    // verification=async()=>{
    //     const {username, header,imageId,mobile} = this.state;
    //     Toast.showLoading("发送中")
    //     //发送修改手机号验证码请求
    //     let formData=new FormData();
    //     formData.append("verificationCode",{
    //         //用户手机号
    //         mobile:this.this.props.RootStore.mobile,
    //     })
    //     //修改手机验证码请求
    //     const res0=await request.get(MODIFY_MOBILE_PHONE_VERIFICATION_CODE_URL,formData,{
    //         headers:{
    //             "Content-Type":"application/json",
    //             "Authorization":`Bearer ${this.state.touken}`
    //         }
    //     })
    //
    //     if (res0==="200"){
    //         Toast.hideLoading();
    //         Toast.message("已经发送短信到该手机号注意查收",2000,"center");
    //         this.countDown();
    //
    //     }else {
    //         Toast.hideLoading();
    //         Toast.message("发送失败",2000,"center");
    //     }
    //
    //
    // }
    //开启回去验证码定时器
    // countDown=()=>{
    //     if (this.state.isCountDowning){
    //         return
    //     }
    //     this.setState({isCountDowning:true})
    //     let seconds=60;
    //     this.setState({btnText:`重新获取(${seconds}s)`});
    //     let timeId=setInterval(()=>{
    //         seconds--;
    //         this.setState({btnText:`重新获取(${seconds}s)`});
    //         if(seconds===0){
    //             clearInterval(timeId);
    //             this.setState({btnText:"重新获取",isCountDowning:false});
    //         }
    //     },1000);
    //
    // }

    //提交
    submitChanges=async()=>{
        const {username, header,imageId,mobile,verificationCode} = this.state;
        const phoneValid=validator.validatePhone(mobile);
        if (!mobile||mobile.length!==11||!phoneValid){
            Toast.sad("手机号为空或不合法", 2000, "center");
            return
        }
        // if ( !verificationCode|| verificationCode.length!==6){
        //     Toast.sad("请输入六位验证码", 2000, "center");
        //     return
        // }
        //  this.countDown();
        // Toast.showLoading("提交修改中")
        // let formData1=new FormData();
        // formData1.append("verificationCode",{
        //     //验证码
        //     code:verificationCode,
        // })
        //验证验证码
        // const res0=await request.get(VERIFY_AND_MODIFY_THE_QR_CODE_OF_THE_MOBILE_PHONE_URL,formData1,{
        //     headers:{
        //         "Content-Type":"application/x-www-form-urlencoded",
        //         "Authorization":`Bearer ${this.state.token}`
        //     }
        // })

        // if (res0==="200"){
        //     this.countDown();
        //
        // }else {
        //     Toast.hideLoading();
        //     Toast.message("验证码有误",2000,"center");
        //     return
        // }

        //"userMobile": mobile
        let obj = {};
        let url = SUBMIT_CHANGES_URL; //接口地址
        if (imageId===''||imageId===null){
            obj={"userMobile": mobile}
        }else {
            obj={"userMobile": mobile,'avatarUrl':imageId,}
        }
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


        if (data.code==="200"){
            Toast.hideLoading();
            Toast.message("修改成功",2000,"center");
            Actions.Nav();
        }else {
            Toast.hideLoading();
            Toast.message("修改失败",2000,"center");
        }
    }


    render() {
        console.log(this.state.touken)
        const {mobile,username,header,verificationCode,btnText,isCountDowning}=this.state
        return (
            <View style={{backgroundColor:"#fff",flex:1,padding:pxToDp(20),paddingTop:pxToDp(30)}}>
                <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold',marginTop:pxToDp(20)}}>请填写修改信息(电话号码为必填)</Text>
                <View style={{marginTop:pxToDp(60)}}>
                    <Input value={mobile}
                    placeholder="填写要修改的电话号码"
                           keyboardType={'phone-pad'}
                           onChangeText={(mobile)=>this.setState({mobile})}
                           maxLength={11}
                    />

                    {/*<Input value={mobile}*/}
                    {/*       placeholder="修改电话号码"*/}
                    {/*       onChangeText={(mobile)=>this.setState({mobile})}*/}
                    {/*/>*/}

                    <View style={{marginTop:pxToDp(40)}}>
                        <Button
                            onPress={this.chooseHeadImg}
                        style={{
                            height:pxToDp(40),
                            borderRadius:pxToDp(20),
                            alignSelf:'center'
                        }}
                        >设置头像</Button>
                    </View>

                    {/*<View style={{marginTop:pxToDp(50),flexDirection:'row',width:'50%'}}>*/}
                    {/*    <Input*/}
                    {/*        keyboardType={'phone-pad'}*/}
                    {/*        value={verificationCode}*/}
                    {/*           placeholder="填写验证码"*/}
                    {/*           onChangeText={(username)=>this.setState({verificationCode})}*/}
                    {/*    />*/}
                    {/*    <Button*/}
                    {/*        disabled={isCountDowning}*/}
                    {/*        onPress={this.verification}*/}
                    {/*        style={{*/}
                    {/*            height:pxToDp(40),*/}
                    {/*            alignSelf:'center'*/}
                    {/*        }}*/}
                    {/*    >{btnText}</Button>*/}
                    {/*</View>*/}

                </View>
                <Button
                    onPress={this.submitChanges}
                    style={{
                        marginTop:pxToDp(100),
                        height:pxToDp(50),
                        width:'25%',
                        borderRadius:pxToDp(20),
                        alignSelf:'center'
                    }}
                >提交</Button>
            </View>
        );

    }
}
