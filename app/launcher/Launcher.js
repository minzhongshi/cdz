import React, {Component} from "react";
import {ActivityIndicator, Dimensions, Image, StatusBar, StyleSheet, View} from "react-native";

const {width,height}=Dimensions.get("window")
export default class App extends  Component{

    constructor(props) {
        super(props);
        this.state = {// 初始设为显示加载动画
            animating: true,
        };
    }
    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar hidden={true}/>
                <Image source={{uri:"launcher"}} style={{width,height}}/>
                <ActivityIndicator
                    style={[styles.centering]}
                    size="large"
                    animating={this.state.animating}
                    color={"#19A15F"}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        position:'absolute',
        alignItems: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        position:'absolute'

    }
});
