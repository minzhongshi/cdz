import React, {Component} from "react";
import {FlatList, SafeAreaView, Text, View} from "react-native";
import Swipeout from 'react-native-swipeout';
import {pxToDp} from "../utils/stylesKits";
import {COUPON_URL} from "../utils/pathMap";
import Button from "../button/Button";
import {Actions} from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";


const renderItem=({item})=>{

    var BtnsRight = [
        { text: '使用', backgroundColor: '#4B8BF4' ,type: 'receive', onPress: ()=>console.log('领取')},
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
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#434343',fontSize:pxToDp(20)}}>{item.couponName}</Text>
                            <Text style={{color:'#307DEE',fontSize:pxToDp(18),marginLeft:pxToDp(30)}}>共{item.numberOfReceived}张</Text>
                        </View>

                        <Text style={{color:'#595959'}}>有效期至{item.couponExpirationTime}</Text>
                    </View>
                </View>
            </Swipeout>
        )


}


//const all=DATA

export default class MyDiscountCoupon extends Component{
    constructor(props) {
        super(props);
    }

    state={
        data:[],
        display:false,
        total:0,
        touken:''

    }

    // async componentDidMount() {
    //     try {
    //         const value = await AsyncStorage.getItem('token')
    //         if (value !== null) {
    //             this.setState({'touken': value})
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    //
    // }

    //返回调用
    // componentWillUnmount() {
    //     Actions.pop({refresh:({'coupon':this.state.total})})
    //
    // }

    //获取数据
    getData=async ()=>{
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
                            display:true,
                            data:responseData.data.records,
                            total:responseData.data.total,

                        })

                    }
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()
    }
    async componentWillMount() {
        try {
            const value = await AsyncStorage.getItem('token')
            if (value !== null) {
                this.setState({'touken': value})
                console.log(this.state.touken)
                console.log(("---------------------"))
                console.log(value)
            }
        } catch (e) {
            console.log(e);
        }
        await this.getData()
    }

    render() {
       // const flatref=useRef()
        //const [list, setList] = useState(all);

        const onEndReachedHandler=(index)=> {
            console.log(index)
        }

        const {data, display,total}=this.state;
        //Actions.pop({refresh:({'coupon':total})})
        console.log(this.state.data)
console.log(data);

        return(
            <SafeAreaView style={{ flexDirection:'column', height:650}}>
                {display?<FlatList
                    getItemLayout={(data, index) =>
                        // 90 是被渲染 item 的高度 ITEM_HEIGHT。
                        ({length: 210, offset: 210 * index, index})
                    }

                    data={data}//渲染数据

                    renderItem={renderItem}
                    keyExtractor={item => item.id}//成员key
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


}
