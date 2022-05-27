'use strict';
import React, {Component} from "react";
import {StyleSheet} from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/FontAwesome";


class MyScanCode extends Component {
    render() {
        const {navigation}=this.props;
        return (
            <ActionButton buttonColor="rgba(29,162,97,1)" size={65}  style={{position:'absolute',right:0,left:0,top:0,bottom:0}}>
                <ActionButton.Item buttonColor='#4C8BF4' title="扫码充电" size={80} onPress={()=>navigation.navigate('Scan')}>
                    <Icon name={'plug'} style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        );
    }
}
const styles=StyleSheet.create({
    actionButtonIcon: {
        fontSize: 35,
        // height: 30,
        color: 'white',
    },

})

export default MyScanCode

// export default StackNavigator({
//     MyScanCode: {
//         screen: MyScanCode,
//     },
//     ScanPage: {
//         // path: 'people/:name',
//         screen: ScanPage,
//     },
// },{
//     headerMode:'none'
// });
