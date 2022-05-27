import React, {Component} from "react";
import {FlatList, SafeAreaView, Text, View} from "react-native";
import Swipeout from 'react-native-swipeout';
import {pxToDp} from "../utils/stylesKits";
import {DEFRAY_URL, GET_COUPON_URL, YET_GET_COUPON_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";
import Button from "../button/Button";
import AsyncStorage from "@react-native-community/async-storage";


//const all=DATA


export default class CouponCollection extends Component{
    constructor(props) {
        super(props);
    }

    state={
        data:[],
        display:false,
        touken:''
    }

    async componentWillMount() {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                this.setState({'touken': value})
            }
        } catch (e) {
            console.log(e);
        }
        await this.getData()
    }

    //领取优惠卷
    coupon=async(id)=>{
        let url = GET_COUPON_URL; //接口地址
        let obj = { "couponId":id};
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
        if(data.code==='200'){
            Toast.message("领取成功",2000,"center");
        }else {
            Toast.message("领取失败",2000,"center");
        }

        // fetch(GET_COUPON_URL,{
        //     method:'POST',
        //     headers: {
        //         "Authorization":`Bearer ${this.state.touken}`
        //     },
        //     body:JSON.stringify({
        //         "couponId":id
        //     }),
        // })
        //     .then(response => response.json())
        //     .then(responseData=>{
        //         if (responseData.code==="200"){
        //             Toast.message("领取成功",2000,"center");
        //         }else {
        //             Toast.message("领取失败",2000,"center");
        //         }
        //
        //     })
        //     .catch(error => {
        //         Toast.message("领取失败",2000,"center");
        //         console.error(error);
        //     })
        //     .done()
    }

    //开始函数在render之前 用于修改state值

    //请求数据
    getData=async ()=>{
        fetch(YET_GET_COUPON_URL+'?current=1&size=6',{
            method:'GET',
            headers: {
                "Authorization":`Bearer ${this.state.touken}`
            },
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    console.log(responseData)
                    if(responseData.data!==null){
                        console.log(responseData.data.records)
                        this.setState({
                            data:responseData.data.records,
                            display:true,

                        })
                        console.log(this.state.data)
                    }
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()


    }
    render() {

        //const flatref = useRef()
        //const [list, setList] = useState(all);

        const onEndReachedHandler = (index) => {
            console.log(index)
        }
const {data, display}=this.state;

        return (
            <SafeAreaView style={{flexDirection: 'column', height: 650}}>
                {display?<FlatList
                    getItemLayout={(data, index) =>
                        // 90 是被渲染 item 的高度 ITEM_HEIGHT。
                        ({length: 210, offset: 210 * index, index})
                    }

                    data={data}//渲染数据


                    keyExtractor={item => item.id}//成员key
                    renderItem={ (item)=>this.renderItem(item)}
                    initialNumToRender={4}
                    windowSize={7}
                    horizontal={false}
                    scrollEnabled={true}
                    // onRefresh={() => {
                    //     //下拉刷新
                    //     flatref.current.scrollToIndex({
                    //         animation: true,
                    //         index: 0
                    //     })
                    // }}
                    refreshing={false}

                    onEndReachedThreshold={0.05}//上拉触底
                    onEndReached={onEndReachedHandler}//上拉处理回调
                >

                </FlatList>:<Button/>}

                </SafeAreaView>

        )
    }
     renderItem=({item})=>{

        var BtnsRight = [
            { text: '领取', backgroundColor: '#4D8CF4' ,type: 'receive', onPress: () =>this.coupon(item.id)},
        ];


        return(
            <Swipeout
                style={{marginTop:10,width:"90%",borderRadius:pxToDp(15),alignSelf: 'center',}}
                right={BtnsRight}
                rowID={item.id}
                autoClose={true}
                backgroundColor='#8C8C8C'
            >
                <View style={{backgroundColor:'#FFFFFF',height:pxToDp(100),flexDirection:'row'}}>
                    <View style={{alignSelf: 'center',marginLeft:pxToDp(10)}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#EB4646',fontSize:pxToDp(18)}}>￥</Text>
                            <Text style={{color:'#EB4646',fontSize:pxToDp(32)}}>{item.discountedPrice}</Text>
                        </View>
                        <View><Text style={{color:'#595959',fontSize:pxToDp(16)}}>满{item.useThresholdAmount}可用</Text></View>
                    </View>
                    <View style={{justifyContent:'space-around',marginLeft:pxToDp(20)}}>
                        <Text style={{color:'#434343',fontSize:pxToDp(20)}}>{item.couponName}</Text>
                        <Text style={{color:'#595959'}}>有效期至{item.couponExpirationTime}</Text>
                    </View>
                </View>
            </Swipeout>
        )


    }
}
