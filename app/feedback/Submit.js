import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {IMAGE_URL, SUBMIT_URL} from "../utils/pathMap";
import ImagePicker from "react-native-image-crop-picker";
import {Overlay} from "teaset";
import {pxToDp} from "../utils/stylesKits";
import Button from "../logIn/button/Button";
import Toast from "../utils/Toast";
import {Input} from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";


export default class Submit extends Component {

    constructor(props) {
        super(props);
    }

    state={
        imageId:"",
        feedbackContent:"",
        pictureAddress:[],
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
//开始函数在render之前 用于修改state值

    getData=()=>{
        const {feedbackContent,pictureAddress}=this.state;
        console.log(feedbackContent);

        if (feedbackContent!==""){
            fetch(SUBMIT_URL,{
                method:'POST',
                headers: {
                    "Authorization":`Bearer ${this.state.touken}`
                },
                body:JSON.stringify({
                    "id":"",
                    "userId":"",
                    "feedbackContent": feedbackContent,
                    "pictureAddress": pictureAddress,
                })
            })
                .then(response => response.json())
                .then(responseData=>{
                    if (responseData.code==="200"){
                        console.log(responseData)
                        // if(responseData.data!==null){
                        //     console.log(responseData.data.records)
                        //     this.setState({
                        //         data:responseData.data.records,
                        //         display:true,
                        //     })
                        // }
                    }

                })
                .catch(error => {
                    console.error(error);
                    Toast.message("提交反馈失败",2000,"center");
                })
                .done()
        }else {
            Toast.message("反馈内容不能为空",2000,"center");
        }

    }

    //上传图片
    chooseHeadImg=async () => {
        const {touken} = this.state;
        const image=await ImagePicker.openPicker({
            width:300,
            height:400,
            cropping:true,
            includeBase64:true,
        });

        this.setState({imageId: `data:image/png;base64,${image.data}`})
        console.log(image);

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
        Toast.showLoading("上传中");

        //头像请求上传
        const {imageId}=this.state;
        fetch(IMAGE_URL,{
            method:'POST',
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${touken}`
            },
            body:JSON.stringify({
                "base64": [{imageId}]
            })
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    Toast.hideLoading();
                    Toast.message("上传成功",2000,"center");
                    this.setState({ pictureAddress:responseData.data})
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
    render() {

        const {feedbackContent}=this.state
        return (
            <View style={{backgroundColor:"#fff",flex:1,padding:pxToDp(20),paddingTop:pxToDp(30)}}>
                <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold',marginTop:pxToDp(20)}}>请填写要反馈的问题</Text>
                <View style={{marginTop:pxToDp(60)}}>
                    <Input value={feedbackContent}
                           placeholder="填写要反馈的问题"
                           onChangeText={( feedbackContent)=>this.setState({feedbackContent})}
                    />

                    <View style={{marginTop:pxToDp(40)}}>
                        <Button
                            onPress={this.chooseHeadImg}
                            style={{
                                height:pxToDp(40),
                                borderRadius:pxToDp(20),
                                alignSelf:'center'
                            }}
                        >上传图片</Button>
                    </View>
                </View>
                <Button
                    onPress={this.getData}
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
const styles = StyleSheet.create({
    button:{
        height:70,
        alignItems:'center',
        justifyContent:'center'
    }
})
