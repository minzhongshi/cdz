import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import ActivityTop from "./ActivityTop";
import Activities from "./Activities";

export default class MyActivity extends Component {

    render() {
        return (
            <View>
                <ActivityTop/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Activities/>

                </ScrollView>

            </View>
        );
    }
}
