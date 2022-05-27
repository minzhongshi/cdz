import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {pxToDp} from "../utils/stylesKits";
import {Input} from "react-native-elements";
import Button from "../logIn/button/Button";

export default class UploadInformation extends Component {
    constructor(props) {
        super(props);

    }
    state={
        data:this.props.data,
    }

    render() {
        const {data}=this.state;
        console.log(data);
        return (
            <View style={styles.button}>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>地区：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.address}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>持有者：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.owner}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>车牌：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.licensePlateNumber}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>车辆类型：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.vehicleType}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>车辆型号：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.model}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>是否为运营车：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.useNature}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <View style={{marginTop:pxToDp(10),flexDirection:'row'}}>
                    <Text style={{color:'#323232',fontSize:pxToDp(20),marginTop:pxToDp(20)}}>注册时间：</Text>
                    <Input
                        inputStyle={{
                            color:'#2D7CEE'
                        }}
                        placeholder={data.registrationDate}
                        // maxLength={11}
                        // keyboardType={'phone-pad'}
                        // value={phoneNumber}
                        // errorMessage={phoneValid?"":'手机号码格式不正确'}
                        // onSubmitEditing={this.phoneNumberSubmitEditing}
                        // inputContainerStyle={{color:'#333'}}
                        // onChangeText={this.phoneNumberChangeText}
                        // leftIcon={{ type: 'font-awesome', name: 'phone',color:'#ccc',size:pxToDp(20) }}
                    />
                </View>
                <Button  style={{marginTop:pxToDp(10),height:pxToDp(50),width:'80%',alignSelf:'center'}}>提交审核</Button>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    button:{
        // height:70,
        // alignItems:'center',
        justifyContent:'center'
    }
})
