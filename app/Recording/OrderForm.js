import React, {Component} from "react";
import {AsyncStorage, FlatList, SafeAreaView, Text, View,} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import {ORDER_FORM_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";

export default class OrderForm extends Component {

    constructor(props) {
        super(props);
    }
    state={
        data:[],
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
        await this.getData();
    }

    getData=async()=>{
//ORDER_FORM_URL
        fetch(ORDER_FORM_URL,{
            method:'GET',
            headers: {
                "Content-Type":	"application/json",
                "Authorization":`Bearer ${this.state.touken}`
            }
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    console.log(responseData)
                    if(responseData.data!==null){
                        this.setState({
                            data:responseData.data,
                        })
                         console.log(this.state.data)
                    }
                }else {
                    Toast.message("获取订单记录失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()
    }
    getListOfChargingStations= ()=>{
        this.getData()
    }
    render() {

        return (
            <View>{this.renderList()}</View>
        );
    }

    //列表
    renderList=()=> {
        return (
            <SafeAreaView style={{ flexDirection:'column', height:pxToDp(500),}}>
                <FlatList
                    data={this.state.data}//渲染数据

                    renderItem={({item})=>this.renderItem(item)}
                    keyExtractor={item => item.id}//成员key
                    // initialNumToRender={4}
                    // windowSize={7}
                    horizontal={false}
                    scrollEnabled={true}
                    onRefresh={()=>{
                        //下拉刷新
                        // flatref.current.scrollToIndex({
                        //     animation:true,
                        //     index:0
                        // })
                        this.getListOfChargingStations()
                    }}
                    refreshing={false}

                    onEndReachedThreshold={0.05}//上拉触底
                    // ListFooterComponent={(
                    //     <View>
                    //         <MaterialIcons
                    //             style={{ textAlign:'center', marginVertical:20,}}
                    //             name="timer"
                    //             size={30}
                    //             color='#4794FF'
                    //         >
                    //         </MaterialIcons>
                    //     </View>
                    // )}
                >
                </FlatList>
            </SafeAreaView>
        )

    }
    renderItem=(item)=>{
        return(
            <View style={{alignItems:'center'}}>
                <View style={{
                    shadowOffset: { // 设置阴影偏移量
                        width: 0,
                        height: 4
                    },
                    shadowRadius: 4, // 设置阴影模糊半径
                    shadowOpacity: 0.13, // 设置阴影的不透明度
                    borderRadius: 10, // 设置圆角
                    shadowColor: 'rgba(96,96,96,1)', // 设置阴影色
                    height:pxToDp(130),
                    width:"80%",
                    // alignItems:'center',
                    alignContent:'center',
                    borderWidth:pxToDp(2),
                    borderColor:'#D6DCEC',
                    alignSelf:'center',
                    justifyContent:'center'

                }}
                >
                    <View style={{marginLeft:pxToDp(20)}}><Text style={{fontSize:pxToDp(18),color:'#2B2B2B'}}>开始时间：{item.createTime}</Text></View>
                    <View style={{marginLeft:pxToDp(20)}}><Text style={{fontSize:pxToDp(18),color:'#2B2B2B'}}>结束时间：{item.updateTime}</Text></View>
                    <View style={{marginLeft:pxToDp(20),flexDirection:'row'}}><Text style={{color:'#2B2B2B',fontSize:pxToDp(17)}}>需支付：{item.transferMoney}元</Text>
                        <Text style={{fontSize:pxToDp(17),color:'#2B2B2B',marginLeft:pxToDp(10)}}>支付状态:</Text>
                        {item.status===1?<Text style={{fontSize:pxToDp(18),color:'#2B2B2B'}}>已付款</Text>:
                            <Text style={{fontSize:pxToDp(18),color:'#E54133'}}>未付款</Text>
                        }
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{marginLeft:pxToDp(20),fontSize:pxToDp(18),color:'#2B2B2B'}}>操作：</Text>
                        {item.transferOp===1?
                        <Text style={{color:'#2B2B2B',fontSize:pxToDp(18)}}>充值</Text>:item.transferOp===2?
                                <Text style={{color:'#2B2B2B',fontSize:pxToDp(18)}}>体现</Text>:
                                <Text style={{color:'#2B2B2B',fontSize:pxToDp(18)}}>支付</Text>
                        }
                    </View>
                </View>
            </View>
        )
    }
}
