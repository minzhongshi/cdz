import React, {Component} from "react";
import {Dimensions, Image, StyleSheet, Text, TextInput, View,} from "react-native";
import stylesKits from "../utils/Utils"
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geo from "../utils/Geo";
import {pxToDp} from "../utils/stylesKits";

/* 轮播图*/
export default class Carousel extends Component {
    state={
        //城市
        city:"",
        //详细地址
        address:"",
    }

    async componentDidMount(){
        const res=await Geo.getCityByLocation();
     // console.log(res);
      const address=res.regeocode.formatted_address;
       const city=res.regeocode.addressComponent.province.replace("市","");
        this.setState({city,address})
    }
    //选择城市
    // showCityPiker=()=>{
    //     Picker.init({
    //         pickerData:CtyJson,
    //         selectedValue:["北京","北京"],
    //         wheelFlex:[1,1,0],
    //         pickerConfirmBtnText:"确定",
    //         pickerCancelBtnText:"取消",
    //         pickerTitleText:"选择城市",
    //         onPickerConfirm:data=> {
    //             this.setState(
    //                 {
    //                     city:data[1]
    //                 }
    //             )
    //         }
    //     });
    //     Picker.show();
    // }

    render() {
        const {city,address}=this.state;
        return (
            <View style={styles.container}>

                <View style={{flexDirection: 'row' ,backgroundColor:'#4B8BF4'}} >
                    {/*<ChoseCity/>*/}
                    <View style={{width:80,height:40,flexDirection: 'row',backgroundColor:'#4B8BF499',justifyContent: 'center',}}>
                            {/*<Input disabled={true} value={address} numberOfLines={1} ellipsizeMode={'tail'} style={{textAlign:'center'}}/>*/}
                        <Text numberOfLines={1} ellipsizeMode={'tail'}style={{textAlign:'center',  textAlignVertical: 'center',height:pxToDp(40),fontSize:pxToDp(18)}}>{address}</Text>
                    </View>
                <View style={{width:200,height:40,flexDirection: 'row',backgroundColor:'#D5E0F6', borderRadius: 20}}>
                    <Icon name='search'  size={25} color={'#A6A9AC'} style={{height:40,lineHeight: 40,borderRadius:20,marginLeft:10}}/>
                <TextInput
                    style={{height:40,borderRadius: 5}}
                    placeholder ="搜索充电站、目的地"// = android　EditText hint
                    placeholderTextColor="#C6C6C6"// = hint color
                    underlineColorAndroid='transparent'// 下划线透明
                    onChangeText={(Text) =>{
                        alert('搜索充电站')
                       // 当内容改变时执行该方法
                    }}

                />
                </View>
                    <View style={{width:80,height:40,flexDirection: 'row',backgroundColor:'#4B8BF499',justifyContent: 'center',}}>
                        <Icon name='headphones' size={30} color={'#D5E0F6'} style={{height:40,lineHeight: 40}}/>
                        <Icon name='bell-o' size={30} color={'#D5E0F6'} style={{height:40,lineHeight: 40,marginLeft:8}} />
                    </View>
                </View>
                <Swiper
                    style={styles.wrapper}
                    horizontal={true}
                    autoplay
                    autoplayTimeout={3}
                    // showsButtons={true}
                    showsPagination={true}
                    dot={<View style={{backgroundColor:'#ccc',width:8,height:8,borderRadius:
                            4,marginLeft:3,marginRight:3,marginTop:3,marginBottom:3,}}/>}
                    activeDot={<View style={{backgroundColor:'#4B8BF4',width:8,height:8,
                    borderRadius:4,marginLeft:3,marginRight:3,marginTop:3,
                    marginBottom:3}}/>}
                    paginationStyle={{
                        bottom: 5,left:null,right:10
                    }}
                >
                    <View style={styles.slide1}>
                        <Image source={{uri:"hello"}} style={styles.img}/>
                        <Text style={styles.title}>Hello重庆！</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Image source={{uri:"newyear"}} style={styles.img}/>
                        <Text style={styles.title}>新年快乐！</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Image source={{uri:"bishua"}} style={styles.img}/>
                        <Text style={styles.title}>2022！</Text>
                    </View>
                </Swiper>
            </View>
        );
    }
}
const { width } = Dimensions.get('window');

const styles=StyleSheet.create({
    container:{
        height:210,

    },
    slide:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'transparent'
    },
    slide1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#9DD6EB'
    },
    slide2:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fcc'
    },
    slide3:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#cff'
    },
    img:{
        width:stylesKits.size.width,
        height:200,
    },
    title:{
        width:stylesKits.size.width,
        height:30,
        lineHeight:30,
        backgroundColor:"rgba(0,0,0,0.5)",
        position:"absolute",
        bottom:0,
        color:"#fff",
        paddingLeft:10
    },
})
