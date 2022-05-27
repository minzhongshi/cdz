import React, {Component} from "react";
import {FlatList, Image, SafeAreaView, Text, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import {FEEDBACK_URL} from "../utils/pathMap";
import Toast from "../utils/Toast";
import Button from "../button/Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import {Actions} from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";


export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            display:false,
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

        this.getData()
    }
//FEEDBACK_URL



//请求数据
    getData=()=> {
        fetch(FEEDBACK_URL,{
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
                                data:responseData.data.records,
                                display:true,
                            })
                    }
                }else {
                    Toast.message("获取反馈内容失败",2000,"center");
                }

            })
            .catch(error => {
                console.error(error);
                Toast.message("获取反馈内容失败",2000,"center");
            })
            .done()

    }
    render() {

        const {data,display}=this.state
        return (
            <View style={{width:'100%',alignItems:'center',}}>
                <View  style={{position:'absolute',top:pxToDp(5),right:pxToDp(20)}}>
                    <Icon onPress={()=>Actions.Submit()} name={'headphones-alt'} size={25} color={"#2F7CEE"}/>
                </View>
                {display?<View>{this.renderList()}</View>
                    :<Button/>
                }
            </View>
        );
    }


    getListOfChargingStations= ()=>{
        this.getData(this.state.id)
    }

    //列表
    renderList=()=> {
        return (
            <SafeAreaView style={{ flexDirection:'column',marginTop:pxToDp(40)}}>
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
                <View style={{
                    shadowOffset: { // 设置阴影偏移量
                        width: 0,
                        height: 4
                    },
                    shadowRadius: 4, // 设置阴影模糊半径
                    shadowOpacity: 0.13, // 设置阴影的不透明度
                    borderRadius: 10, // 设置圆角
                    shadowColor: 'rgba(96,96,96,1)', // 设置阴影色
                    height:pxToDp(180),
                    width:"99.9%",
                    justifyContent:'space-between',
                    // alignItems:'center',
                    alignContent:'center',
                    flexDirection:'row',
                    borderWidth:pxToDp(2),
                    borderColor:'#D6DCEC',
                    backgroundColor:'#D6DCEC'

                }}
                >
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Image style={{width:pxToDp(80),height:pxToDp(80),
                            borderRadius:pxToDp(20),backgroundColor:'#D7E1F7'}}
                               source={{uri:`http://47.111.72.160:7001/picture/queryPictures/getImg/${item.picAddress}.jpg`}}
                        />
                        <View>
                            <View>
                                <Text style={{color:'#3C3F41',fontSize:pxToDp(18)}}>反馈时间：{item.createTime}</Text>
                                <Text style={{color:'#3C3F41',fontSize:pxToDp(18)}}>反馈内容：{item.feedbackContent}</Text>
                            </View>

                            {item.replyStatus===0?
                                <View style={{marginTop:pxToDp(10)}}>
                                    <Text style={{color:'#3C3F41',fontSize:pxToDp(18)}}>回复状态：</Text>
                                    <Text style={{color:'#3C3F41',fontSize:pxToDp(18)}}>未回复</Text>
                                </View>
                                :<View style={{marginTop:pxToDp(10)}}>
                                    <Text style={{color:'#3C3F41',fontSize:pxToDp(18)}}>回复内容：</Text>
                                    <Text style={{color:'#3C3F41',fontSize:pxToDp(18)}}>{item.replyContent}</Text>
                                </View>
                            }
                        </View>


                    </View>
                </View>


        )
    }
}
