import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Carousel from "./Carousel";
import Slider from "./Slider";
import SiteSelection from "./SiteSelection"
import {Actions} from "react-native-router-flux";
import {pxToDp} from "../utils/stylesKits";

export default class MyHomeScreen extends Component {
    render() {
        return (
            <View>
                <View style={{backgroundColor:'#4C8BF4',height:pxToDp(40)}}/>
                    <Carousel/>
                <Slider/>
                <SiteSelection/>
                {/*<ActionButton buttonColor="rgba(29,162,97,1)" size={65}  style={{position:'absolute',right:0,left:0,top:0,bottom:0}}>*/}
                {/*    <ActionButton.Item buttonColor='#4C8BF4' title="扫码充电" size={80} onPress={()=>this.GoScanPage()}>*/}
                {/*        <Icon name={'plug'} style={styles.actionButtonIcon}/>*/}
                {/*    </ActionButton.Item>*/}
                {/*</ActionButton>*/}
                {/*http://localhost:7001*/}
                {/*/person/center/getDrivingLicenseList 你是不是没用这个接口 这个接口是获取图片的？并不是，这个就是上传行驶证的记录，万一用户审核不通过还能知道原因没用这个接口是因为图上传不了啊 然后那个接口直接没到他是有一个审核状态的 但是你妹上传行驶证照片，他是不会到那个审核状态的*/}
            </View>
        );
    }

    GoScanPage=()=>{
        Actions.ScanPage()
    }
}


const styles=StyleSheet.create({
    actionButtonIcon: {
        fontSize: 35,
        // height: 30,
        color: 'white',
    },
    tabs:{
        height:40,
        borderBottomColor:"#dbd8d8",
        borderBottomWidth:2,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    },
    default:{
        height:40,
        lineHeight:40,
        color:'#000',
        fontSize:14,
    },
    active:{
        height:40,
        lineHeight:40,
        color:'blue',
        borderBottomColor:"#000",
        borderBottomWidth:1,
        fontSize:16,
        fontWeight:'bold'
    }

})
