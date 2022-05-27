import {API} from "../utils/API";
import HTTP from "../utils/Http";

export default class IndexModel extends  HTTP{
    getCourseDatas(){
        return new Promise((resolve,reject)=>{
            this. fetchGet({
                url:API.getCourseDatas,
                success(data){
                    resolve(data);
                },
                error(error){
                    reject(error);
                }
            })
        })
    }
}
