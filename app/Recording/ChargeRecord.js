import React, {Component} from "react";
import {AsyncStorage, FlatList, SafeAreaView, Text, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import {CHARGE_RECORD_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";

export default class ChargeRecord extends Component {
    constructor(props) {
        super(props);
    }

    state={

        data:[],
        touken:'',
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
        await this.getData();
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


    getData=async ()=>{
        console.log(this.state.data)
        fetch(CHARGE_RECORD_URL,{
            method:'GET',
            headers: {
                "Content-Type":	"application/json",
                "Authorization":`Bearer ${this.state.touken}`
            }
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    if(responseData.data!==null){
                        console.log(responseData.data)

                        this.setState({
                            data:responseData.data,

                        })
                        console.log(this.state.data)
                        // console.log(this.state.data)
                    }
                }else {
                    Toast.message("获取充电记录失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()
    }

    getListOfChargingStations= () => {
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
            <SafeAreaView style={{ flexDirection:'column', height:pxToDp(500)}}>
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
            <View style={{alignItems:'center', marginLeft:pxToDp(10)}}>
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
                    justifyContent:'space-between',
                    // alignItems:'center',
                    alignContent:'center',
                    flexDirection:'row',
                    borderWidth:pxToDp(2),
                    borderColor:'#FFF',
                    alignItems:'center',
                    alignSelf:'center',


                }}
                >
                    <View style={{alignItems:'center',
                        alignSelf:'center'}}>
                        <View>
                            <Text style={{fontSize:pxToDp(18),color:'#2B2B2B'}}>充电站：{item.address}</Text>
                        </View>
                       <View style={{flexDirection:'row',justifyContent:'center'}}>
                           <Text style={{color:'#2B2B2B',fontSize:pxToDp(16)}}>{item.chargeStartTime.slice(0,10)}-{item.chargeStartTime.slice(11,16)}</Text>
                           <Text style={{color:'#2B2B2B'}}>至</Text>
                           <Text style={{color:'#2B2B2B',fontSize:pxToDp(16)}}>{item.chargeEndTime.slice(0,10)}-{item.chargeEndTime.slice(11,16)}</Text>
                       </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'#2B2B2B',fontSize:pxToDp(16)}}>花费：{item.chargeTotalMoney}元</Text>
                            <Text style={{color:'#2B2B2B',fontSize:pxToDp(16),marginLeft:pxToDp(20)}}>共充电：{item.chargeNum}度</Text>
                        </View>

                    </View>
                </View>
            </View>
        )
    }


}
