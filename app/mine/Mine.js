import React, {Component} from "react";
import {Image, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/FontAwesome';
import {pxToDp} from "../utils/stylesKits";
import Geo from "../utils/Geo"
import {Actions} from "react-native-router-flux";
import {ACCOUNT_INFORMATION_url, COUPON_URL, GET_USER_INFORMATION_URL, INQUIRY_AMOUNT_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";
import AsyncStorage from "@react-native-community/async-storage";


export default class MyMine extends Component {
    constructor(props) {
        super(props);
    }

    state={
        //定位
        city:"",
        //控制加载显示
        refreshing:false,
        balance:"0",
        invoicableAmount:"0",
        totalConsumption:"0",
        chargingCoin:"0",
        username:"未登录",
        avatarUrl:"",
        coupon:'0',
        defray:'0',
        orderNumber:"",
        hasDriverLicense:false,
        touken:'',

        signOut:false

    }

    componentWillReceiveProps(nextProps,nextContext) {
            this.setState({
                balance:nextProps.balance,
                invoicableAmount:nextProps.invoicableAmount,
                totalConsumption:nextProps.totalConsumption,
                chargingCoin:nextProps.chargingCoin,
                coupon:nextProps.coupon,
                defray:nextProps.defray

            })
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
        await this.getCityByLocation();
    }
    getCityByLocation=async ()=>{
        const res=await Geo.getCityByLocation();
        this.setState({city:res.regeocode.addressComponent.province})
        await this.getData();
    }

    //数据请求
    getData=async ()=>{
        fetch(GET_USER_INFORMATION_URL,{
            method:'POST',
            headers: {
                "Authorization":`Bearer ${this.state.touken}`
            },
            // body:JSON.stringify({
            //     longitude:longitude,
            //     dimensionality:dimensionality,

            //     endDistance:endDistance,
            //     starDistance:starDistance
            // })
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    this.setState({
                        username:responseData.data.username,
                        hasDriverLicense:responseData.data.username,
                        avatarUrl:responseData.data.avatarUrl,
                        signOut:true,
                    })

                    //用户账户
                    fetch(ACCOUNT_INFORMATION_url,{
                        method:'GET',
                        headers: {
                            "Authorization":`Bearer ${this.state.touken}`
                        }
                    })
                        .then(response => response.json())
                        .then(responseData=>{
                            if (responseData.code==="200"){
                                this.setState({
                                    balance:responseData.data.balance,
                                    invoicableAmount:responseData.data.invoicableAmount,
                                    totalConsumption:responseData.data.totalConsumption,
                                    chargingCoin:responseData.data.chargingCoin,
                                })
                            }else {
                                Toast.message("获取账户信息失败",2000,"center");
                            }

                        })
                        .catch(error => {
                            console.error(error);
                        })
                        .done()

                    //待支付
                    fetch(INQUIRY_AMOUNT_URL,{
                        method:'GET',
                        headers: {
                            "Authorization":`Bearer ${this.state.touken}`
                        }
                    })
                        .then(response => response.json())
                        .then(responseData=>{
                            console.log("----------------------------")
                            console.log(responseData);
                            console.log("----------------------------")
                            if (responseData.code==="200"){
                                if (responseData.data!==null){
                                    if (responseData.data.status===0){
                                        this.setState({
                                            defray:responseData.data.transferMoney,
                                            orderNumber:responseData.data.id,
                                        })
                                    }

                                }else {
                                    this.setState({
                                        defray:'0',
                                        orderNumber:'',
                                    })
                                }
                            }else {
                                Toast.message("获取待支付信息失败",2000,"center");
                            }

                        })
                        .catch(error => {
                            console.error(error);
                        })
                        .done()

                    //卡卷
                    fetch(COUPON_URL+`?current=1&size=10`,{
                        method:'GET',
                        headers: {
                            "Authorization":`Bearer ${this.state.touken}`
                        },
                    })
                        .then(response => response.json())
                        .then(responseData=>{
                            if (responseData.code==="200"){
                                if(responseData.data!==null){

                                    this.setState({
                                        coupon:responseData.data.total,

                                    })

                                }
                            }else {
                                Toast.message("获取待卡卷信息失败",2000,"center");
                            }

                        })
                        .catch(error => {
                            console.error(error);
                        })
                        .done()
                }else {
                    Toast.message("获取用户信息失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()
        return Promise.resolve();
    }

//下拉刷新
    onRefresh=async ()=>{
        this.setState({refreshing:true})
        //请求
        await this.getData();
        this.setState({refreshing:false})
    }

    render() {


        const {username,
            avatarUrl,city,hasDriverLicense,refreshing,balance,
            invoicableAmount,
            totalConsumption,
            chargingCoin,signOut,coupon,defray,orderNumber}=this.state;
        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh}/>}
                contentContainerStyle={{flex:1,backgroundColor:'#DDDFE1'}}>
                <View style={{height:pxToDp(200),backgroundColor:'#4B8BF4'}}>
                    <StatusBar backgroundColor={"transparent"} translucent />
                    <TouchableOpacity  >
                        <Icon onPress={()=>{Actions.SignOut({"signOut":signOut})}} style={{position:'absolute',top:pxToDp(40),right:pxToDp(20)}} name={'settings'} size={30} color={'#fff'}/>
                    </TouchableOpacity>
                    <TouchableOpacity  >
                        <Icon onPress={()=>{Actions.Complete()}} style={{position:'absolute',top:pxToDp(40),right:pxToDp(60)}} name={'file-text'} size={30} color={'#fff'}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection:"row",paddingTop:pxToDp(15),
                            paddingBottom:pxToDp(15),marginTop:pxToDp(60)
                        }}>
                        <View style={{paddingLeft:pxToDp(15),paddingRight:pxToDp(15)}}>
                            {avatarUrl!=null?
                                <Image style={{width:pxToDp(80),height:pxToDp(80),
                                    borderRadius:pxToDp(40)}}
                                       source={{uri:`http://47.111.72.160:7001/picture/queryPictures/getImg/${avatarUrl}.jpg`}}
                                />: <Image style={{width:pxToDp(80),height:pxToDp(80),
                                    borderRadius:pxToDp(40)}}
                                           source={{url:"huodong"}}
                                />
                            }

                        </View>
                        <View style={{flex:2,justifyContent:"space-around"}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:pxToDp(20)}}>{username}</Text>
                                {
                                    avatarUrl!=null?
                                        <View style={{
                                            marginLeft:pxToDp(10),borderWidth:pxToDp(2),borderColor:'#DDDDDD',
                                            borderRadius:pxToDp(5),width:pxToDp(60),
                                            alignItems:'center',
                                        }}>
                                            {hasDriverLicense? <Text style={{color:'#E13A2D'}}>已认证</Text>:<Text>未认证</Text>}
                                        </View>:
                                        <View/>
                                }

                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Icons name={'map-marker'} size={25} color={'#DEDDD8'}/>
                                <Text style={{marginLeft:pxToDp(10),fontSize:pxToDp(20)}}>{city}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{height:pxToDp(250),backgroundColor:'#fff',
                        width:'90%',alignSelf:'center',marginTop:pxToDp(15),borderRadius:pxToDp(20)
                    }}>
                        <Text style={{fontSize:pxToDp(18),color:'#434343',marginTop:pxToDp(10),marginLeft:pxToDp(10)}}>我的钱包</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',height:pxToDp(100)}}>
                            <TouchableOpacity onPress={()=>Actions.Recharge()} style={{alignItems:'center',justifyContent:'center'}}>
                                <Text  style={{color:'#434343',fontSize:pxToDp(22)}}>￥{balance}</Text>
                                <Text  style={{color:'#8C8C8C',fontSize:pxToDp(18),marginTop:pxToDp(5)}}>可用余额</Text>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={()=>Actions.Defray({"defray":defray,"orderNumber":orderNumber})} style={{alignItems:'center',justifyContent:'center'}}>
                                <Text  style={{color:'#434343',fontSize:pxToDp(22)}}>￥{defray}</Text>
                                <Text  style={{color:'#8C8C8C',marginTop:pxToDp(5),fontSize:pxToDp(18)}}>待支付</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>Actions.myDiscountCoupon()} style={{alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#434343',fontSize:pxToDp(22)}}>{coupon}</Text>
                                <Text  style={{color:'#8C8C8C',marginTop:pxToDp(5),fontSize:pxToDp(18)}}>卡卷</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around',height:pxToDp(100)}}>
                            <TouchableOpacity onPress={()=>Actions.OrderForm()} style={{alignItems:'center',justifyContent:'center'}}>
                                <Text  style={{color:'#434343',fontSize:pxToDp(22)}}>￥{totalConsumption}</Text>
                                <Text  style={{color:'#8C8C8C',fontSize:pxToDp(18),marginTop:pxToDp(5)}}>总消费</Text>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={()=>{Actions.Bill()}} style={{alignItems:'center',justifyContent:'center'}}>
                                <Text  style={{color:'#434343',fontSize:pxToDp(22)}}>￥{invoicableAmount}</Text>
                                <Text  style={{color:'#8C8C8C',marginTop:pxToDp(5),fontSize:pxToDp(18)}}>可开票金额</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{Actions.Bill()}} style={{alignItems:'center',justifyContent:'center'}}>
                                <Text  style={{color:'#434343',fontSize:pxToDp(22)}}>{chargingCoin}</Text>
                                <Text  style={{color:'#8C8C8C',marginTop:pxToDp(5),fontSize:pxToDp(18)}}>积分</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{height:pxToDp(200),backgroundColor:'#fff',
                        width:'90%',alignSelf:'center',marginTop:pxToDp(15),borderRadius:pxToDp(20)
                    }}>
                        <Text style={{fontSize:pxToDp(18),color:'#434343',marginTop:pxToDp(10),marginLeft:pxToDp(10)}}>车辆认证</Text>
                        {/*plus*/}
                        <TouchableOpacity onPress={()=>Actions.Picture()} style={{height:pxToDp(150),alignItems:'center',justifyContent:'center',}}>
                           <Icon name={'plus'} size={40} color={'#4794FF'}/>
                            <Text style={{color:'#8C8C8C',marginTop:pxToDp(5),fontSize:pxToDp(18)}}>车辆认证</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={{height:pxToDp(100),backgroundColor:'#fff',
                        width:'90%',alignSelf:'center',marginTop:pxToDp(15),borderRadius:pxToDp(20),flexDirection:'row',justifyContent:'space-around',paddingTop:pxToDp(20)
                    }}>
                        <TouchableOpacity onPress={()=>Actions.Charge()} style={{height:pxToDp(100),alignItems:'center'}}>
                            <Icon name={'layout'} size={40} color={'#4794FF'}/>
                            <Text style={{color:'#8C8C8C',fontSize:pxToDp(16)}}>我的订单</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.ChargeRecord()} style={{height:pxToDp(150),alignItems:'center'}}>
                            <Icon name={'plus'} size={40} color={'#4794FF'}/>
                            <Text style={{color:'#8C8C8C',fontSize:pxToDp(16)}}>充电记录</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>Actions.Feedback()} style={{height:pxToDp(150),alignItems:'center'}}>
                            <Icon name={'twitch'} size={40} color={'#4794FF'}/>
                            <Text style={{color:'#8C8C8C',fontSize:pxToDp(16)}}>反馈中心</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  style={{height:pxToDp(150),alignItems:'center'}}>
                            <Icon onPress={()=>Actions.couponCollection()} name={'dollar-sign'} size={40} color={'#4794FF'}/>
                            <Text onPress={()=>Actions.couponCollection()} style={{color:'#8C8C8C',fontSize:pxToDp(16)}}>优惠券</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );

    }
}
