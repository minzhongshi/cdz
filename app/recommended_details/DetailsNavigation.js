import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Derails_1 from "./details_navigation_page/Derails_1";
import Derails_2 from "./details_navigation_page/Derails_2";
import Derails_3 from "./details_navigation_page/Derails_3";

const DetailsNavigation=(props)=>{
    let {id}=props
    const {componentId}=props
    const [index,setTabsIndex]=useState(1);
    //返回渲染的组件
    const showTabsComponent=(componentId)=>{
        switch (index){
            case 1:return <Derails_1 componentId={componentId}/>
            case 2:return <Derails_2 id={id} componentId={componentId}/>
            case 3:return <Derails_3 componentId={componentId}/>

        }
    }
    return(
        <View style={{width:'100%',backgroundColor:'#FAFAFA',marginTop:5}}>
            <View style={styles.tabs}>
                <View>
                    <TouchableHighlight>
                        <Text
                            style={index===1? styles.active:styles.default}
                            onPress={
                                ()=>{
                                    setTabsIndex(1)
                                }
                            }
                        >电站详情</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight>
                        <Text
                            style={index===2? styles.active:styles.default}
                            onPress={
                                ()=>{
                                    setTabsIndex(2);
                                }
                            }
                        >终端列表</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight>
                        <Text
                            style={index===3? styles.active:styles.default}
                            onPress={
                                ()=>{
                                    setTabsIndex(3);
                                }
                            }
                        >用户评论</Text>
                    </TouchableHighlight>
                </View>
            </View>
            <View>
                {showTabsComponent(componentId)}
            </View>
        </View>


    )
}
export default DetailsNavigation
const styles=StyleSheet.create({
    tabs:{
        height:40,
        borderBottomColor:"#FAFAFA",
        backgroundColor:'#FFFFFF',
        borderBottomWidth:2,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    default:{
        height:40,
        lineHeight:40,
        color:'#828282',
        fontSize:14,
    },
    active:{
        height:40,
        lineHeight:40,
        color:'#414141',
        borderBottomColor:"#414141",
        borderBottomWidth:2,
        fontSize:16,
        fontWeight:'bold'
    },

})
