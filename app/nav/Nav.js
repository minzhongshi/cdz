import React, {Component} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import MyHomeScreen from "../front_page/Home"
import MyMine from "../mine/Mine";
import Map from '../map/map'
import ScanPage from "../scan_code/ScanPage";


function BottomTab(){
    const  Tab =createBottomTabNavigator();
    return(

        <Tab.Navigator
            screenOptions={({route})=>({

                headerShown: false,
                tabBarIcon:({focused,color,size})=>{
                    let iconName;
                    switch (route.name){
                        case '首页':
                            iconName='th-large'
                            break;
                        case '地图':
                            iconName='moon-o'
                            break;
                        case '我的':
                            iconName='meh-o'
                            break;

                    }
                    return(
                        <Icon
                           name={iconName}
                           size={size}
                           color={color}

                        />
                    );
                }
            })}

            tabBarOptions={{
              activeTintColor:'#23b8ff',
                inactiveTintColor:'#999'
            }}
            >
            <Tab.Screen
            name="首页"
            component={MyHomeScreen}
            />
            <Tab.Screen
                name="地图"
                component={Map}
            />
            <Tab.Screen
                name="我的"
                component={MyMine}
            />
        </Tab.Navigator>


            );
}

export default class Nav extends Component {
    render() {

       // const strUserInfo= AsyncStorage.getItem("userinfo");
       // const userinfo=strUserInfo ? JSON.parse(strUserInfo):{};
        const Stack = createStackNavigator();
        return(

            <NavigationContainer >
                <Stack.Navigator screenOptions={{headerShown:false}}>
                    <Stack.Screen
                        name="Tab"
                        component={BottomTab}
                    />
                    <Stack.Screen
                        name="Scan"
                        component={ScanPage}
                        options={{
                            headerTransparent:true,
                            gesturesEnabled:true,
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        )
    }


}



