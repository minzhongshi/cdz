import 'react-native-gesture-handler';
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Launcher from './launcher/Launcher'
import Nav from './nav/Nav'
import Geo from "./utils/Geo"


export default class App extends  Component<Props>{
    constructor(props) {
        super(props)
        this.state={
            isShowLauncher:true
        }
    }

    async componentDidMount() {
        //初始化定位
       const res0=await Geo.initGeo();
        setTimeout(()=>{
            this.setState({
                isShowLauncher:false
            })
        },1000)
    }
    render() {
        return (

                <View style={styles.container}>

                    {/*{ Toast.message("登录成功",2000,"center")}*/}
                    {
                        this.state.isShowLauncher?
                            <Launcher/>:
                            // <Provider RootStore={RootStore}>
                                <Nav/>
                            // </Provider>
                    }


                </View>

        );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
    },

})
