import React, {Component} from "react";
import {Dimensions, Text, TouchableHighlight, View} from "react-native";
import {Actions} from "react-native-router-flux";

const windowWidth = Dimensions.get('window').width;



export default class Charge extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {

        return (
            <View style={{flexDirection:'row',justifyContent:'space-around',width:windowWidth,marginTop:10,marginBottom:20}}>
                <TouchableHighlight underlayColor="#fff" onPress={()=>{alert()}}>
                <View style={{borderRadius:20,height:40,width:windowWidth*0.35,justifyContent: 'center',alignItems: 'center',backgroundColor:'#32C08C'}}>
                    <Text style={{fontSize:16}}>预约快充</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="#fff" onPress={()=>{Actions.ScanPage()}}>
                    <View style={{borderRadius:20,height:40,width:windowWidth*0.35,justifyContent: 'center',alignItems: 'center',backgroundColor:'#67A6FF'}}>
                        <Text style={{fontSize:16}}>扫码充电</Text>
                    </View>
                </TouchableHighlight>

            </View>
        );

    }
}
