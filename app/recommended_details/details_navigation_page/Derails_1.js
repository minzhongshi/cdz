import React, {Component} from "react";
import {Dimensions, ScrollView, Text, View} from "react-native";

const windowWidth = Dimensions.get('window').width;


export default class Derails_1 extends Component {
    constructor(props) {
        super(props);
        let powerStationInfo;
        this.state={

        }
    }

    render() {
        return (
            <ScrollView style={{height:230,flexDirection:'column',}}>
                <View>
                    <View>
                        <Text style={{color:'#2B2B2B',marginTop:20,fontSize:20,marginLeft:10}}>站点信息</Text>
                        <View style={{paddingLeft:20,width:windowWidth*0.95}}>
                            <View style={{flexDirection:'row',height:40,alignItems: 'center',justifyContent:'space-between'}}>
                                <Text style={{color:'#595959',fontSize:18}}>开放时间</Text>
                                <Text style={{color:'#000000'}}>周一到周日 00：00-24：00</Text>
                            </View>
                            <View style={{flexDirection:'row',height:40,alignItems: 'center',justifyContent:'space-between'}}>
                                <Text style={{color:'#595959',fontSize:18}}>支付方式</Text>
                                <Text style={{color:'#000000'}}>APP余额支付</Text>
                            </View>
                            <View style={{flexDirection:'row',height:40,alignItems: 'center',justifyContent:'space-between'}}>
                                <Text style={{color:'#595959',fontSize:18}}>发票服务</Text>
                                <Text style={{color:'#000000'}}>请在本APP订单中申请开票</Text>
                            </View>
                            <View style={{flexDirection:'row',height:40,alignItems: 'center',justifyContent:'space-between'}}>
                                <Text style={{color:'#595959',fontSize:18}}>客服电话</Text>
                                <Text style={{color:'#000000'}}> 123456789</Text>
                            </View>

                        </View>
                    </View>

                </View>
            </ScrollView>

        );

    }
}
