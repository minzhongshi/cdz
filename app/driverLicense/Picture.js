import React, {Component} from "react";
import {Alert, Image, StyleSheet, View} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Button from "../logIn/button/Button";
import {GET_COUPON_URL, UPLOAD_DRIVER_S_LICENSE_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";
import {pxToDp} from "../utils/stylesKits";
import AsyncStorage from "@react-native-community/async-storage";
import {Actions} from "react-native-router-flux";

export default class Picture extends Component {

    state={
        imgs:[],
        face:"",
        base:[],
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


     addPhoto = () => {
        launchImageLibrary({
            mediaType: "photo", // 'photo' or 'video' or 'mixed'
            selectionLimit: 1,// 1为一张，0不限制数量
            maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
            maxHeight: 1000,
            quality: 1,
            includeBase64: true,
            storageOptions:{
                path:true,
            }
        }, res => {
            if(res.didCancel){
                return false;
            }else {
                this.setState({imgs:res.assets,
                base:`data:image/png;base64, ${res.assets.base64}`})
            }

        })
    }


    tackPhoto = () => {
        launchCamera({
            mediaType: "photo",
            maxWidth: 1000,// 设置选择照片的大小，设置小的话会相应的进行压缩
            maxHeight: 1000,
            quality: 1,
            cameraType: "back",
            saveToPhotos:true,
            storageOptions:{
                path:true,
            }
        }, res => {
            console.log(res)
            if(res.didCancel){
                return false;
            }else {
                this.setState({imgs:res.assets,
                    base:`data:image/png;base64, ${res.assets.base64}`})
            }
        })
    }

    render() {

        return (
            <View style={{alignItems:'center'}}>
                <Button style={{height: pxToDp(40),width:'80%'}}  onPress={() => this.addPhoto()}>图库选择</Button>
                {/*<Button title="启动图库选择视频" onPress={() => addVideo()}/>*/}
                <Button style={{height: pxToDp(40) ,width:'80%',marginTop:pxToDp(30)}}  onPress={() => this.tackPhoto()}>拍照</Button>
                {
                    this.state.imgs.map((item, index) => {
                        if ( this.state.imgs!=null)
                            console.log(`data:image/jpeg;base64,${item.base64}`)
                        console.log("--------------------------")

                            return (
                                <View key={index} style={{width:'100%',height:500,marginTop:40,justifyContent: 'center', alignItems: 'center',}}>
                                    <Image style={{width: '100%', height: pxToDp(500)}} source={{uri: item.uri}}/>
                                    <View style={{marginTop:40}}>
                                        <Button style={{height: pxToDp(40),width:pxToDp(70)}}  onPress={()=>this.uploadImage(`data:image/jpeg;base64,${item.base64}`)}>上传</Button>
                                    </View>
                                </View>
                            )
                    })
                }
            </View>
        );
    }

    // 上传图片api调用
      uploadImage=async(params)=> {
          let url = UPLOAD_DRIVER_S_LICENSE_URL; //接口地址
          const body = JSON.stringify({"base64": params,"side": "face"});
          let options = {
              //请求头
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization":`Bearer ${this.state.touken}`
              },
              body: body
          };
          let data = await fetch(url, options); //获取后台数据
          data = await data.json(); //解析获取的数据
          console.log(data)
          if(data.code==='200'){
              Toast.message("上传成功",2000,"center");
              Actions.UploadInformation({'data':data.data});
          }else {
              Toast.message("上传失败",2000,"center");
          }

         //  fetch(UPLOAD_DRIVER_S_LICENSE_URL,{
         //     method:'POST',
         //     headers: {
         //         "Authorization":`Bearer ${this.state.touken}`
         //     },
         //     body:body
         // })
         //     .then(response => response.json())
         //     .then(responseData=>{
         //         if (responseData.code==="200"){
         //             Toast.message("上传成功",2000,"center");
         //         }else {
         //             Toast.message("上传失败",2000,"center");
         //         }
         //
         //     })
         //     .catch(error => {
         //         Toast.message("上传失败",2000,"center");
         //         console.error(error);
         //     })
         //     .done()
    }
}
const styles = StyleSheet.create({
    button:{
        height:70,
        alignItems:'center',
        justifyContent:'center'
    }
})
