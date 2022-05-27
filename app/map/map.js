import React, {Component} from "react";
import {Dimensions, Platform, View,StyleSheet,Text} from "react-native";
import {AMapSdk, MapType, MapView, Marker, Polygon, Polyline} from "react-native-amap3d";


// var Dimensions = require('Dimensions');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const points = [

    {
        latitude: 29.591614179573416,
        longitude: 106.32140547151944,
    },
    {
        latitude: 29.591334295863135,
        longitude: 106.32122844572446,
    },
    {
        latitude: 29.59052262872347,
        longitude: 106.32119089479825,
    },
    {
        latitude: 29.590531958259504,
        longitude: 106.32451146955869,
    },
    {
        latitude: 29.590172770172394,
        longitude: 106.32430762167355,
    },
    {
        latitude: 29.589762267935132,
        longitude: 106.3242432486572,
    },
    {
        latitude: 29.589738943894254,
        longitude: 106.32475823278806,
    },
];

AMapSdk.setApiKey(
    Platform.select({
        android: "1932a3ccce6d40ce7f5a613c263e28f7",
    })
);
export default class Map extends Component {
    constructor (props) {
        super(props);
    }




    render() {
        return (
            <View style={{height:windowHeight,width:windowWidth}}>
                <MapView
                    style={StyleSheet.absoluteFill}
                    mapType={MapType.Standard}
                    initialCameraPosition={{
                        target: {
                            latitude: 29.593518,
                            longitude: 106.322325,
                        },
                        zoom: 15,
                        tilt:45,
                    }}
                      // showsIndoorMap
                >
                    <Marker
                        draggable
                        icon={require("../../assets/1.png")}
                        position={{ latitude: 29.589738943894254, longitude: 106.32475823278806 }}
                    >
                        {/*<Text>123</Text>*/}
                    </Marker>
                    <Marker
                        draggable
                        title='我的位置'
                        position={{ latitude: 29.591614179573416, longitude: 106.32140547151944 }}
                    >
                        {/*<Text>123</Text>*/}
                    </Marker>
                    <Polyline
                        width={7}
                        color={'#317DEE'}
                        strokeColor="rgba(0, 0, 255, 0.5)"
                        fillColor="rgba(255, 0, 0, 0.5)"
                        points={points}
                    />

                </MapView>
            </View>

        );

    }
}
