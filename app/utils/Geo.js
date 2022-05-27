import {PermissionsAndroid, Platform} from "react-native";
import {Geolocation, init} from "react-native-amap-geolocation";
import axios from "axios";


class Geo{

    //初始化定位
    async initGeo(){
        if (Platform.OS==='android'){
            await  PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION])
        }
        await init({
            android:"5b36d5fd035a253d98d53a2f3b349c19",
            ios:"5b36d5fd035a253d98d53a2f3b349c19",
        });
        return Promise.resolve();
    }
    async getCurrentPosition(){

        return new Promise((resolve,reject)=>{
            Geolocation.getCurrentPosition(({coords})=>{
                resolve(coords);
            },reject);

        })
    }
    async getCityByLocation(){
        const {longitude,latitude}=await this.getCurrentPosition();
        const res =await axios.get("https://restapi.amap.com/v3/geocode/regeo",{
            params:{location: `${longitude},${latitude}`,key:"510869d84433c8cb9e5ba148540d0459"}
        });
        return Promise.resolve(res.data);
    }
}
export default new Geo();
