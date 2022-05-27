import ImagePicker from 'react-native-image-picker'
import {PureComponent} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class ImagePickers extends PureComponent{
    state ={
        avatarSource:null,
        videoSource:null
    }

    //拍照选择图片
    selectPhotoTapped(){
        const options={
            title:'选择图片',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'选择照片',
            videoQuality:'high',
            quality:0.8,
            allowsEditing:false,
            storageOptions:{
                skipBackup:true
            }
        };

        ImagePicker.launchCamera(options,response=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                alert(response.uri)
                this.setState({
                    avatarSource:source
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View>
                        {
                            this.state.avatarSource === null?
                                <Text style={styles.txt}>选择照片</Text>:
                                <Image source={this.state.avatarSource}/>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    txt: {
        justifyContent: "center",
        alignItems: 'center',
    },

});
