/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './app/mine/completeInformation/CompleteInformation';
import App from './app/Main'
//import App from './app/logIn/MobileNumberLogin';
import {name as appName} from './app.json';
import {GLOBAL} from "bizcharts";

GLOBAL.XMLHttpRequest=GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];

console.disableYellowBox = true // 关闭全部黄色警告

AppRegistry.registerComponent(appName, () => App);
