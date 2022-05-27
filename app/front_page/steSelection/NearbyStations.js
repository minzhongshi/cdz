import {FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import React, {useRef, useState} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from "react-native-router-flux";

const DATA=[
    {
        zid:1,
        name:'重庆市沙坪坝区大学城东虎溪街道重庆科技学院充电站',
        score:'4.8分',
        time:'24小时',
        position:'地面',
        price:'1.2548',
        special:'22:00后1.8000元每度',
        remind:'限时两小时免费，超时按照停车场标准收费',
        k_idle_amount:'15',
        k_amount:'18',
        m_idle_amount:'1',
        m_amount:'9',
        reserve:'可预约',
        distance:'18.9km',
        collect:true,
    },
    {
        zid:2,
        name:'七公里充电站',
        score:'4.5分',
        time:'24小时',
        position:'地下B2',
        price:'1.2548',
        special:'21:00后1.8000元每度',
        remind:'限时两小时免费，超时按照停车场标准收费',
        k_idle_amount:'10',
        k_amount:'20',
        m_idle_amount:'5',
        m_amount:'10',
        reserve:'不可预约',
        distance:'5.9km',
        collect:false,
    },
    {
        zid:3,
        name:'大学城快充站',
        score:'4.9分',
        time:'24小时',
        position:'地面',
        price:'1.0800',
        special:'20:00后1.3500元每度',
        remind:'限时两小时免费，超时按照停车场标准收费',
        k_idle_amount:'2',
        k_amount:'44',
        m_idle_amount:'1',
        m_amount:'40',
        reserve:'可预约',
        distance:'1.96km',
        collect:true,
    },
    {
        zid:4,
        name:'重庆市长尾滩库房充电站',
        score:'4.4分',
        time:'24小时',
        position:'地面',
        price:'1.3000',
        special:'全天统一价格1.3000元/度',
        remind:'限时两小时免费，超时按照停车场标准收费',
        k_idle_amount:'0',
        k_amount:'0',
        m_idle_amount:'5',
        m_amount:'5',
        reserve:'可预约',
        distance:'30.09km',
        collect:false,
    },
]
const renderItem=({item})=>{

    return(
        <TouchableHighlight underlayColor="#fff" onPress={()=>{Actions.RD({id:item.zid})}}>
        <View style={styles.item}>
            <View style={{ flexDirection:'row',}}>
                <View style={styles.titleview_1}>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text_1}>{item.name}</Text>
                </View>

            <Icon name={item.collect? "star":"star-o"} size={25} color={item.collect? '#FFCE31':'#8C8C8C'} style={styles.icons}/>
        </View>
            <View style={{flexDirection:'row' }}>
                <View style={styles.titleview_2}>
                    <Text style={styles.text_2}>{item.score}</Text>
                </View>
                <View style={styles.titleview_3}>
                    <Text style={styles.text_3}>{item.time}</Text>
                    <Text style={styles.text_3}> | </Text>
                    <Text style={styles.text_3}>{item.position}</Text>
                </View>
            </View>

            <View style={{flexDirection:'row' }}>
                <View style={styles.titleview_4}>
                    <Text style={styles.text_4}>{item.price}</Text>
                    <Text style={styles.text_5}>元/度</Text>
                </View>
                <View style={styles.titleview_5}>
                    <Text style={styles.text_6}>{item.special}</Text>
                </View>
            </View>



            <View style={styles.titleview_6}>
                <Icon name="automobile" size={20} color='#4794FF' />
                <Text style={styles.text_7}>{item.remind}</Text>
            </View>

            <View style={styles.titleview_15}>
                <View style={styles.titleview_7}>
                    <View style={styles.titleview_8}><Text style={styles.text_8}>快</Text></View>
                    <View style={styles.titleview_9}>
                        <Text style={styles.text_9}>闲{item.k_idle_amount}</Text>
                        <Text style={{color:'#8C8C8C',fontSize:15, height:27, lineHeight:27,}}>/</Text>
                        <Text style={styles.text_10}>{item.k_amount}</Text>
                    </View>
                </View>

                <View style={styles.titleview_10}>
                    <View style={styles.titleview_11}><Text style={styles.text_11}>慢</Text></View>
                    <View style={styles.titleview_12}>
                        <Text style={styles.text_12}>闲{item.m_idle_amount}</Text>
                        <Text style={{color:'#8C8C8C',fontSize:15, height:27, lineHeight:27,}}>/</Text>
                        <Text style={styles.text_13}>{item.m_amount}</Text>
                    </View>
                </View>

                <View style={item.reserve==='可预约'?styles.titleview_13_1:styles.titleview_13_2}>
                    <Text style={item.reserve==='可预约'?styles.text_14_1:styles.text_14_2}>{item.reserve}</Text>
                </View>

                <View style={styles.titleview_14}>
                    <Icon name="location-arrow" size={20} color='#4794FF' style={{marginLeft:5}}/>
                    <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text_15}>{item.distance}</Text>
                </View>
            </View>
        </View>
        </TouchableHighlight>
    )
}

const NearbyStations = () => {
    const flatref=useRef()
    const [list, setList] = useState(DATA);

    const onEndReachedHandler=()=> {

    }

    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatref}
                data={list}//渲染数据
                renderItem={renderItem}
                keyExtractor={item => item.zid}//成员key
                initialNumToRender={4}
                windowSize={7}
                horizontal={false}
                scrollEnabled={true}
                onRefresh={()=>{
                    //下拉刷新
                    flatref.current.scrollToIndex({
                        animation:true,
                        index:0
                    })
                }}
                refreshing={false}

                onEndReachedThreshold={0.05}//上拉触底
                onEndReached={onEndReachedHandler}//上拉处理回调
                ListFooterComponent={(
                    <View>
                        <MaterialIcons
                            style={styles.loads}
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
export default NearbyStations
const styles=StyleSheet.create({
    container:{
        //flex:1,
        flexDirection:'column',
        height:320
    },
    item:{
        backgroundColor:'#FFFFFF',
        marginTop:10,
        marginLeft:14,
        marginRight:14,
        borderRadius: 10,
        maxHeight:210
    },
    icons:{

      marginLeft:40,
        marginTop:10
    },
    titleview_1:{

        marginTop:8,
        marginLeft:10,
        width:250,
    },
    text_1:{
        color:'#141414',
        fontSize:18,
    },
    titleview_2:{
        marginLeft:10,

    },
    text_2:{
        color:'#434343',
        fontSize:12,
    },
    titleview_3:{
        flexDirection:'row',
        marginLeft:10,

    },
    text_3:{
        color:'#8C8C8C',
        fontSize:12,
    },
    titleview_4:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:16,

    },
    text_4:{
        color:'#D64040',
        fontSize:24,
    },
    text_5:{
        color:'#FF9A4D',
        fontSize:14,
        height:40,
        lineHeight:40
    },
    titleview_5:{
        marginLeft:10,
        marginTop:16,
    },
    text_6:{
        color:'#595959',
        fontSize:14,
        height:35,
        lineHeight:35
    },
    titleview_6:{
        flexDirection:'row',
        marginLeft:10,
        marginTop:16,
        marginBottom:10,
    },
    text_7:{
        color:'#595959',
        fontSize:14,

    },
    titleview_15:{
        borderTopColor:'#F0F0F0',
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginBottom:10,
    },
    titleview_7:{
        borderColor:'#D64040',
        borderWidth:2,
        flexDirection:'row',
        borderRadius:10,
        marginTop:10,

    },
    titleview_8:{
        backgroundColor:'#D64040',
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        paddingLeft:4,
        paddingRight:4,

    },
    text_8:{
        height:27,
        lineHeight:27,
        color:'#FFFFFF',
        fontSize:14,

    },
    titleview_9:{
        flexDirection:'row',

    },
    text_9:{
        color:'#D64040',
        fontSize:14,
        height:27,
        lineHeight:27,
        marginLeft:5,
    },
    text_10:{
        color:'#8C8C8C',
        fontSize:14,
        height:27,
        lineHeight:27,
        marginRight:5,
    },
    titleview_10:{
        borderColor:'#FF9A4D',
        borderWidth:2,
        flexDirection:'row',
        borderRadius:10,
        marginTop:10,
        height:33,

    },
    titleview_11:{
        backgroundColor:'#FF9A4D',
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
        paddingLeft:4,
        paddingRight:4,

    },
    text_11:{
        height:27,
        lineHeight:27,
        color:'#FFFFFF',
        fontSize:14,
    },
    titleview_12:{
        flexDirection:'row',

    },
    text_12:{
        color:'#FF9A4D',
        fontSize:14,
        height:27,
        lineHeight:27,
        marginLeft:5,
    },
    text_13:{
        color:'#8C8C8C',
        fontSize:14,
        height:27,
        lineHeight:27,
        marginRight:5,
    },
    titleview_13_1:{
        borderColor:'#4794FF',
        borderWidth:2,
        flexDirection:'row',
        borderRadius:10,
        marginTop:10,
        height:33,

    },
    titleview_13_2:{
        borderColor:'#8C8C8C',
        borderWidth:2,
        flexDirection:'row',
        borderRadius:10,
        marginTop:10,
        height:33,

    },
    text_14_1:{
        color:'#4794FF',
        fontSize:14,
        height:27,
        lineHeight:27,
        marginLeft:5,
        marginRight:5,
    },
    text_14_2:{
        color:'#8C8C8C',
        fontSize:14,
        height:27,
        lineHeight:27,
        marginLeft:5,
        marginRight:5,
    },
    titleview_14:{
        width:67,
        borderColor:'#4794FF',
        borderWidth:2,
        flexDirection:'row',
        borderRadius:15,
        marginTop:15,
        height:25,
    },
    text_15:{
        color:'#4794FF',
        fontSize:12,
        height:22,
        lineHeight:22,
        marginRight:7,
    },
    loads:{
        textAlign:'center',
        marginVertical:20,

    }
})
