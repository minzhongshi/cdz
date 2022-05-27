import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View,} from "react-native";
import activitData from "../DataTest/activityData.json";
import Button from "../button/Button";

export default class Activities extends Component {

    onClick(){
        alert("活动内容")
    }
    constructor(props) {
        super(props)
        this.state = {
            data: activitData.data

        }

    }

    render() {
        return (

            <View style={styles.itemsBox}>
                {
                    this.state.data.map((v, k) => {

                            return (
                                <TouchableWithoutFeedback onPress={this.onClick}>
                                    <View style={styles.item} key={k}>
                                        <Image source={{uri: v.img?v.img:"huodong"}} style={{width: 100, height: 100, borderRadius: 20}}/>
                                        <View style={styles.info}>
                                            <View style={styles.title}>
                                                {
                                                    v.type === "官方活动" ?
                                                        <Text
                                                            style={[styles.type, {backgroundColor: "#4C8BF4"}]}>{v.type}</Text>
                                                        : <Text
                                                            style={[styles.type, {backgroundColor: "#1AA15F"}]}>{v.type}</Text>
                                                }
                                                <Text style={styles.name}>{v.name}</Text>
                                            </View>
                                            <View style={styles.Time}>
                                                <Text style={styles.time}>活动时间 {v.time}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                            )
                        }
                    )
                }
                <Button/>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    itemsBox: {
        marginTop: 5,
        alignItems: 'center',
    },
    item: {
        width: '90%',
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#F6F8FA",
        borderRadius: 20,
    },
    info: {
        marginLeft: 10,
        flex: 1,
    },
    title: {
        flexDirection: "row",
        marginTop: 15,

    },
    type: {
        color: '#E0EAF6',
        paddingLeft: 5,
        paddingRight: 5,
        height: 17,
        lineHeight: 17,
        borderRadius: 20,

    },
    name: {
        color: '#2B2B2B',
        fontWeight: 'bold',
        fontSize: 18,
    },
    Time: {
        marginTop: 15,
    },
    time: {
        color: '#ccc'
    },
})
