import React, {Component} from "react";
import {Text, View} from "react-native";
import {pxToDp} from "../../utils/stylesKits";
import {Slider} from "react-native-elements"
import Button from "../../logIn/button/Button";


export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state={
            endDistance:10000,
        }
    }
    //传输数据
    handleSubmitFilter=()=>{
        this.props.onSubmitFilter(this.state)
    }

    render() {

        return (
            <View style={{position:"absolute",width:"100%",height:"40%",
            left:0,
                bottom:0,
                backgroundColor:"#fff"
            }}
            >
                {/*标题*/}
                <View style={{justifyContent:"space-between",height:pxToDp(50),alignItems:"center"}}>
                    <Text style={{color:"#999",fontSize:pxToDp(27),fontWeight:"bold"}}>选择范围</Text>
                </View>

                <View style={{marginTop:'5%',marginLeft:pxToDp(15)}}>
                    <Text  style={{color:'#777',fontSize:pxToDp(18)}}>距离:{(this.state.endDistance)/1000} KM</Text>
                    <Slider
                        style={{marginTop:pxToDp(20)}}
                    value={this.state.endDistance}
                    thumbTintColor={'#4A8AF4'}
                    minimumValue={0}
                    maximumValue={20000}
                    step={500}
                    onValueChange={(endDistance)=>this.setState({endDistance})}
                    />
                </View >
                <View style={{marginTop:'25%',alignItems:"center"}}>
                    <Button
                        // onPress={this.props.onClose}
                        onPress={this.handleSubmitFilter}
                        style={{width:'80%',height:pxToDp(40),}}>
                        确认
                    </Button>
                </View>

            </View>
        );

    }
}
