import React, {Component} from "react";
import {Alert, AsyncStorage, FlatList, SafeAreaView, Text, View} from "react-native";
import {pxToDp} from "../../utils/stylesKits";
import Button from "../../logIn/button/Button"
import {CHARGING_PILE_URL, PERSONAL_URL} from "../../utils/pathMap";
import Toast from "../../utils/Toast";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Actions} from "react-native-router-flux";


export default class Derails_2 extends Component {
    constructor(props) {
        super(props);
        let powerStationInfo;
        this.state={
            id:props.id,
            data:[],
            touken:'',
        }
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
        this.getData(this.state.id);
    }




    getData=(id)=>{
        fetch(PERSONAL_URL+CHARGING_PILE_URL,{
            method:'POST',
            headers: {
                "Content-Type":	"application/json",
                "Authorization":`Bearer ${this.state.touken}`
            },
            body:JSON.stringify({
                "chargingStationsId":id
            })
        })
            .then(response => response.json())
            .then(responseData=>{
                if (responseData.code==="200"){
                    if(responseData.data!==null){
                        this.setState({
                            data:responseData.data.records,
                        })
                       // console.log(this.state.data)
                    }
                }else {
                    Toast.message("获取终端失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
            })
            .done()

    }

    render() {
        const {data}=this.state
        console.log(data)

        return (
            // <ScrollView style={{height:230, flexDirection:'column',}}>
            <View>{this.renderList()}</View>
           // </ScrollView>
        );
    }

    getListOfChargingStations= ()=>{
        this.getData(this.state.id)
    }

    //列表
    renderList=()=> {
        return (
            <SafeAreaView style={{ flexDirection:'column', height:280,}}>
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
                    ListFooterComponent={(
                        <View>
                            <MaterialIcons
                                style={{ textAlign:'center', marginVertical:20,}}
                                name="timer"
                                size={30}
                                color='#4794FF'
                            >
                            </MaterialIcons>
                        </View>
                    )}
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
                        justifyContent:'space-between',
                        // alignItems:'center',
                        alignContent:'center',
                        flexDirection:'row',
                        borderTopWidth:pxToDp(2),
                        borderTopColor:'#D6DCEC',

                    }}
                    >
                        {item.acDc===1?
                            <View style={{ marginTop:pxToDp(20),borderRadius: 40, backgroundColor:'#70D3AF',height:'65%',width:pxToDp(80),alignContent:'center',alignItems:'center',justifyContent :'center'}}>
                                <View style={{alignContent:'center',alignItems:'center',justifyContent :'center',borderRadius: 35,backgroundColor:'#FFFFFF',height:'80%',width:pxToDp(65)}}>
                                    <Text style={{color:'#70D3AF',fontSize:pxToDp(40)}}>直</Text>
                                </View>
                            </View>
                            : <View style={{ marginTop:pxToDp(20),borderRadius: 40, backgroundColor:'#2D7CEE',height:'65%',width:pxToDp(80),alignContent:'center',alignItems:'center',justifyContent :'center'}}>
                                <View style={{alignContent:'center',alignItems:'center',justifyContent :'center',borderRadius: 35,backgroundColor:'#FFFFFF',height:'80%',width:pxToDp(65)}}>
                                    <Text style={{color:'#2D7CEE',fontSize:pxToDp(40)}}>交</Text>
                                </View>
                            </View>
                        }

                        <View>
                            {item.acDc===1?
                                <Text style={{color:'#2B2B2B',fontSize:pxToDp(20)}}>直流</Text>
                                :<Text style={{color:'#2B2B2B',fontSize:pxToDp(20)}}>交流</Text>
                            }

                            <Text style={{color:'#3C3F41'}}>序号：{item.parkingLotNo}</Text>
                            <Text style={{color:'#3C3F41'}}>功率：{item.rateOfWork}</Text>
                            <Text style={{color:'#3C3F41'}}>价格/度：{item.price}</Text>
                            <Text style={{color:'#3C3F41'}}>服务费/度：{item.serviceCharge}</Text>
                            <Text style={{color:'#3C3F41'}}>停车费：{item.parkingFee}</Text>
                        </View>
                        <View style={{width:'25%',height:pxToDp(40),marginTop:pxToDp(40)}}>
                            <Button onPress={()=>Actions.Charge({id:item.id})}>充电</Button>
                        </View>
                    </View>


            </View>
        )
    }
}

