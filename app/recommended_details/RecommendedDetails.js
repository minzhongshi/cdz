import React, {Component} from "react";
import {Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import DetailsNavigation from "./DetailsNavigation";
import ImageViewer from 'react-native-image-zoom-viewer';
import {Actions} from "react-native-router-flux";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class RecommendedDetails extends Component{
    constructor(props) {
        super(props);
        let powerStationInfo;
        this.state={
            //控制放大组件是否显示
            showAlbum:false,
            //放大显示索引
            curreentIndex:0,
            //图片数组
            imgUrls:[{url:`http://47.111.72.160:7001/picture/queryPictures/getImg/${this.props.bannerImg}.jpg`}],
            id:this.props.id,
            data:[],
        }
    }

    handleShowAlbum=()=>{
        const showAlbum=true;
        this.setState({showAlbum:showAlbum})
    }

    render() {
        const {stationName,openStartTime,openEndTime,id,bannerImg,acOnlineNum,dcOnlineNum,acNum,dcNum,address,city,county,}=this.props
        const {imgUrls,showAlbum}=this.state;
        return (
            <ScrollView style={{height:windowHeight}}>
                <View style={{flex:1, alignItems: 'center',width:'100%'}}>
                    <View>
                        <TouchableHighlight
                            onPress={this.handleShowAlbum}
                        >
                            <Image  source={{uri:`http://47.111.72.160:7001/picture/queryPictures/getImg/${bannerImg}.jpg`}} style={{width:windowWidth,height:200}} />
                        </TouchableHighlight>
                        <Modal visible={showAlbum} transparent={true}>
                            <ImageViewer
                                onClick={()=>this.setState({showAlbum:false})}
                                imageUrls={imgUrls}/>
                        </Modal>

                    </View>
                    <View style={styles.cade}>
                        <Text style={styles.text_1}>{stationName}</Text>
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Text style={{color:'#A1A1A1',marginLeft:5}}>暂无评分</Text>
                            <Text style={{color:'#A1A1A1',marginLeft:6}}>{city}</Text>
                            <Text style={{color:'#A1A1A1',marginLeft:6}}>{county}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:3}}>
                            <Text style={{color:'#A1A1A1',marginLeft:5}}>开放时间 {openStartTime}</Text>
                            <Text style={{color:'#A1A1A1',marginLeft:4}}>|</Text>
                            <Text style={{color:'#A1A1A1',marginLeft:4}}> {openEndTime}</Text>
                            <TouchableHighlight underlayColor="#fff" onPress={()=>Actions.Map()}>
                                <View style={{ borderRadius:10,backgroundColor:'#BFDAFF',width:100,height:30,justifyContent: 'center', alignItems: 'center',marginLeft:20}}>
                                    <Text style={{color:'#3C3F41'}}>到这去></Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{flexDirection:'row',marginTop:10,marginLeft:5,justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',width:'75%'}}>
                                <Icon name={'location'} size={18} color={'#3C3F41'}/>
                                <Text numberOfLines={1} style={{color:'#3C3F41',marginLeft:5}}>{address}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginRight:10}}>
                                {/*<Text style={{color:'#4794FF'}}>18.9km</Text>*/}
                                <Icon name={'direction'} size={18} color={'#4794FF'}/>
                            </View>
                        </View>
                    </View>

                    <View style={{width:'100%',flexDirection:'row',marginTop:130,justifyContent:'space-evenly'}}>
                        <View  style={{ elevation:10,justifyContent: 'center', alignItems: 'center',flexDirection:'row',backgroundColor:'#D26565',width:windowWidth*0.4,height:35,borderRadius:20,}}>
                            <View style={{height:30,width:30,borderRadius:15,backgroundColor:'#FFFFFF',justifyContent: 'center', alignItems: 'center',}}>
                                <Text style={{color:'#D26565'}}>直</Text>
                            </View>
                            <Text style={{color:'#FFFFFF'}}>空闲{dcNum} | 共{dcOnlineNum}</Text>
                        </View>
                        <View  style={{ elevation:10,justifyContent: 'center', alignItems: 'center',flexDirection:'row',backgroundColor:'#FAB987',width:windowWidth*0.4,height:35,borderRadius:20,}}>
                            <View style={{justifyContent: 'center', alignItems: 'center',height:30,width:30,borderRadius:15,backgroundColor:'#FFFFFF'}}>
                                <Text style={{color:'#FAB987'}}>交</Text>
                            </View>
                            <Text style={{color:'#FFFFFF'}}>空闲{acNum} | 共{acOnlineNum}</Text>
                        </View>
                    </View>
                    <DetailsNavigation id={id}/>
                    {/*<Charge/>*/}
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
cade:{
    width:'90%',
    height:135,
    backgroundColor:'#FFFFFF',
    elevation:10,
    borderRadius:10,
    position: 'absolute',
    marginTop:170,
},
    text_1:{
    color:'#2B2B2B',
        marginTop:5,
        marginLeft:5,
        fontSize:22,
    }
})
