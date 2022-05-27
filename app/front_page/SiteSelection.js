import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import RecommendedSite from "./steSelection/RecommendedSite";
import Icon from 'react-native-vector-icons/Feather';
import {Overlay} from "teaset"
import Filter from "./steSelection/Filter";


const SiteSelection=(props)=>{
     const {componentId}=props

        const [index,setTabsIndex]=useState(1);
    const [ endDistance,setEndDistance]=useState(10000);
     //返回渲染的组件
        const showTabsComponent=(componentId)=>{
            switch (index){
                case 1:return <RecommendedSite endDistance={endDistance} componentId={componentId}/>
                //case 2:return <NearbyStations componentId={componentId}/>

            }
        }
        //接收到了距离数据
    const handleSubmitFilter= (filter)=>{
        console.log(filter.endDistance);
        const demo = filter.endDistance;
        setEndDistance(demo)


    }
    //筛选 选择距离
        let overlayView = (
            <Overlay.View
                style={{alignItems: 'center', justifyContent: 'center'}}
                modal={false}
                animated={true}
                overlayOpacity={0.3}
            >
                {/*onClose={()=> this.goBack()}*/}
                <Filter  onSubmitFilter={ handleSubmitFilter} />
            </Overlay.View>
        );
        // Overlay.show(overlayView);

     return(
            <View>
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
                            >附近站点</Text>
                        </TouchableHighlight>
                    </View>
                {/*    <View>*/}
                {/*        <TouchableHighlight>*/}
                {/*            <Text*/}
                {/*                style={index===2? styles.active:styles.default}*/}
                {/*                onPress={*/}
                {/*                    ()=>{*/}
                {/*                        setTabsIndex(2);*/}
                {/*                    }*/}
                {/*                }*/}
                {/*            >附近站点</Text>*/}
                {/*        </TouchableHighlight>*/}
                {/*    </View>*/}

                    {/*筛选，选择距离*/}
                    <TouchableHighlight>
                        <View>
                            <Icon onPress={()=>{ Overlay.show(overlayView);}}  name='filter' size={25} color={'#4B8BF4'}/>
                        </View>
                    </TouchableHighlight>

                </View>
                <View>
                    {showTabsComponent(componentId)}
                </View>
            </View>


        )
    }
export default SiteSelection
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
