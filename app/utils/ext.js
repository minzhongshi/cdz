function directToPage(navigation,pageName,params){
    return function (){
        navigation.navigate(pageName,params);
    }
}
export {
    directToPage
}