import {API} from "../utils/API";
import HTTP from "../utils/Http";

export default class ListModel extends  HTTP{
    getCourseFields(){
        return new Promise((resolve,reject)=>{
            this.fetchGet({
                url:API.getCourseFields,
                success(data){
                    resolve(data);
                },
                error(error){
                    reject(error);
                }
            })
        })
    }
    getCourses(field){
        return new Promise((resolve,reject)=>{
            this.fetchGet({
                url:API.getCourses+field,
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
