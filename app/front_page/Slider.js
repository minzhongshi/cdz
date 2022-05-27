import React, {Component} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Actions} from "react-native-router-flux";

const { width: screenWidth } = Dimensions.get('window');

const items = [
    {
        title: '充值',
        image: { uri: "img" },
        page:'CZ'
    },
    {
        title: '促销站点',
        image: { uri: 'img_1' },
        page:'CX'
    },
    {
        title: '钱包卡卷',
        image: { uri: 'img_2' },
        page:'KJ'
    },
    {
        title: '消息中心',
        image: { uri: 'img_3' },
        page:'XX'
    },
    {
        title: '发票管理',
        image: { uri: 'img_4' },
        page:'Bill'
    },
    {
        title: '收藏',
        image: { uri: 'img_5' },
        page:'SC'
    },
    {
        title: '订单',
        image: { uri: 'img_6' },
        page:'DD'
    },
    {
        title: '车辆认证',
        image: { uri: 'img_7' },
        page:'RZ'
    },
];

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isViewable: 0,
            isShow: false,
        };
        this.contentViewMap = [
            { View: null, value: 0 },
            { View: null, value: 1 },
        ];
    }

    onPressCell=(page)=>{
        Actions.page();
    }

    renderSliderList = ({ item }) => (
        <View style={styles.windowWidth}>
            {item.View}
        </View>
    )

    renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => this.onPressCell(item.page)}
        >
            <Image
                style={styles.icon}
                source={item.image}
            />
            <Text style={styles.itemsTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    renderOne = () => (
        <FlatList
            numColumns={4}
            data={items.slice(0, 8)}
            renderItem={this.renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    )

    renderTwo = () => (
        <FlatList
            numColumns={1}
            data={items.slice(8)}
            renderItem={this.renderItem}
            keyExtractor={(_, index) => index.toString()}
        />
    )

    onViewableItemsChanged = (change) => {
        // change包含来这个FlatList中的所有内容，当滑动滑块时总是将上一个滑块的内容最后打印
        if (change.viewableItems.length === 2) { // 判断是否是第一次加载的内容，如果是就将isShow设置为true
            this.setState({
                isShow: true,
            });
        }
        const data = change.changed[0];
        this.setState({
            isViewable: data.index,
        });
    }


    render() {
        const { isViewable, isShow } = this.state;
        // 这里不直接用Flatlist是因为在在这里用的话，不能显示字体,所以将每个分页中的内容存起来
        this.contentViewMap[0].View = this.renderOne();
        this.contentViewMap[1].View = this.renderTwo();
        const leftStyle = (isViewable === 1 || !isShow) ? styles.leftSlider : styles.rightSlider;
        const rightStyle = (isViewable === 0 && isShow) ? styles.leftSlider : styles.rightSlider;
        return (
            <View style={{backgroundColor:'#FFFFFF'}}>
                <View>
                    <FlatList
                        data={this.contentViewMap}
                        horizontal={true} // 左右滑动
                        pagingEnabled={true} // 按页滑动
                        showsHorizontalScrollIndicator={false} // 去除水平方向的滚动条
                        showsVerticalScrollIndicator={false} // 去除垂直方向的滚动条
                        renderItem={this.renderSliderList}
                        onViewableItemsChanged={this.onViewableItemsChanged} // 滑动页面触发
                        keyExtractor={(_, index) => index.toString()}
                    />
                    <View style={styles.sliderBox}>
                        <View style={leftStyle}></View>
                        <View style={rightStyle}></View>
                    </View>
                </View>

            </View>
        );
    }


}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    windowWidth: {
        width: screenWidth,
    },
    item: {
        width: width / 4,
        height: width / 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,

    },
    icon: {
        width: 40,
        height: 40,
    },
    leftSlider: {
        width: 20,
        height: 4,
        backgroundColor: '#BCC3CA',
        borderRadius: 2,
    },
    rightSlider: {
        width: 8,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E8E8E8',
    },
    sliderBox: {
        flexDirection: 'row',
        width: screenWidth,
        justifyContent: 'center',
    },
    itemsValue: {
        fontSize: 10,
        color: '#ccc',
        marginTop: 2,
    },
    itemsTitle: {
        lineHeight: 17,
        fontSize: 14,
        color: '#25313C',
        marginTop: 5,
    },
});

