import React, {Component} from "react";
import {Router, Scene, Stack} from 'react-native-router-flux'
import App from "./App";
import ScanPage from "./scan_code/ScanPage";
import CompleteInformation from "./mine/completeInformation/CompleteInformation";
import RecommendedDetails from "./recommended_details/RecommendedDetails";
import Nav from "./nav/Nav";
import MobileNumberLogin from "./logIn/MobileNumberLogin";
import CouponCollection from "./coupon/CouponCollection";
import MyDiscountCoupon from "./coupon/MyDiscountCoupon";
import Bill from "./wallet/Bill";
import ChargeRecord from "./Recording/ChargeRecord";
import OrderForm from "./Recording/OrderForm";
import Feedback from "./feedback/Feedback";
import Recharge from "./recharge/Recharge";
import Defray from "./recharge/Defray";
import SignOut from "./mine/SignOut";
import Submit from "./feedback/Submit";
import Picture from "./driverLicense/Picture";
import UploadInformation from "./driverLicense/UploadInformation";
import Charge from "./charge/Charge";
import Map from './map/map'


export default class Main extends Component{

    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        return (

                <Router>
                    <Stack key="root">
                        <Scene key="App"  component={App} hideNavBar={true}/>
                        <Scene key="ScanPage" component={ScanPage} hideNavBar={true}/>
                        <Scene key="Complete" component={CompleteInformation}  title={"修改信息"} back={true}/>
                        <Scene key="Nav"  component={Nav} hideNavBar={true}/>
                        <Scene key="login" component={MobileNumberLogin} hideNavBar={true}/>
                        <Scene key="couponCollection" component={CouponCollection} title={"优惠卷领取"}  back={true}v/>
                        <Scene key="myDiscountCoupon" component={MyDiscountCoupon} title={"我的优惠卷"}  back={true}/>

                        <Scene
                            key="RD"
                            component={RecommendedDetails}
                            title={"电站详情"}
                            back={true}
                        />
                        <Scene
                            key="Submit"
                            component={Submit}
                            title={"反馈"}
                            back={true}
                        />
                        <Scene
                            key="Map"
                            component={Map}
                            hideNavBar={true}
                        />
                        <Scene
                            key="ChargeRecord"
                            component={ChargeRecord}
                            title={"充电记录"}
                            back={true}
                        />

                        <Scene
                            key="OrderForm"
                            component={OrderForm}
                            title={"交易记录"}
                            back={true}
                        />

                        <Scene
                            key="Feedback"
                            component={Feedback}
                            title={"反馈中心"}
                            back={true}
                        />

                        <Scene
                            key="Recharge"
                            component={Recharge}
                            title={"充值"}
                            back={true}
                        />

                        <Scene
                            key="Defray"
                            component={Defray}
                            title={"支付"}
                            back={true}
                        />

                        <Scene
                            key="SignOut"
                            component={SignOut}
                            title={"设置"}
                            back={true}
                        />

                        {/*开发中 Bill*/}
                        <Scene
                            key="Bill"
                            component={Bill}
                            title={"待开发"}
                            back={true}
                        />
                        <Scene
                            key="Picture"
                            component={Picture}
                            title={"驾驶证图片上传"}
                            back={true}
                        />
                        <Scene
                            key="UploadInformation"
                            component={UploadInformation}
                            title={"认证驾驶证上传"}
                            back={true}
                        />

                        <Scene
                            key="Charge"
                            component={Charge}
                            title={"充电状态"}
                            back={true}
                        />


                        <Scene
                            key="UploadInformation"
                            component={UploadInformation}
                            title={"上传驾驶证资料"}
                            back={true}
                        />
                    </Stack>
                </Router>
        )
    }
}
