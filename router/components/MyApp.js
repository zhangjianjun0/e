import React from "react";
import First from "./First";
import Second from "./Second";
import MyAjax from "./../md/MyAjax";
import {Router,Route,Link,browserHistory,IndexRoute} from "react-router";
class MyApp extends React.Component {
	constructor(props) {
	super(props);
	this.state = {
		num:""
	}
}
	searchHandler(){
		browserHistory.push("/Search");
	}
	cartHandler(){var isLogin = localStorage.getItem("isLogin");
		if(isLogin == 0){
			alert("请先登录");
			browserHistory.push("/Login");
		}else{
			browserHistory.push("/Cart1");
		}}
	loginHandler(){var isLogin = localStorage.getItem("isLogin");
		if(isLogin == 0){
			alert("请先登录");
			browserHistory.push("/Login");
		}else{
			browserHistory.push("/User");
		}}
	render() {
		return(
			<div id="myapp">
				<header id="header">
					<p><i onClick={this.searchHandler.bind(this)} className="iconfont">&#xe623;</i></p>
					<p>优选</p>
					<div>
						<p><i onClick={this.cartHandler.bind(this)} className="iconfont">&#xe61b;</i><span className = "goodsnum">{this.state.num}</span></p>
						<p><i onClick={this.loginHandler.bind(this)} className="iconfont">&#xe620;</i></p>
					</div>
					
				</header>
				<div id="content">
					<div className="title">
						<p className="tab0 pageActive">推荐</p><p className="tab1">模块1</p><p className="tab2">模块2</p><p className="tab3">模块3</p>
					</div>
					 <div className="swiper-container page">
				        <div className="swiper-wrapper">
				            <div className="swiper-slide showpage"><First/></div>
				            <div className="swiper-slide showpage"><Second sec="1"/></div>
				            <div className="swiper-slide showpage">Slide 3</div>
				            <div className="swiper-slide showpage">Slide 4</div>
				        </div>
				    </div>
				</div>
			</div>
		)
	}
	componentWillMount(){
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		var url = " http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
		var that = this;
		MyAjax.fetchJsonp(url, function(data) {
			if(data == 0){
			that.setState({
				num:0
			})
			}
			else{
			that.setState({
				num:data.length
			})
			}
		})
	}
	componentDidMount() {
		var isLogin = localStorage.getItem("isLogin");
		if(isLogin == 1){
			$(".goodsnum").show();
		}else{
			$(".goodsnum").hide();
		}
		var mySwiper = new Swiper('.page', {
			onSlideChangeEnd: function(swiper) {
				var index = swiper.activeIndex;
				$(".tab" + index).addClass("pageActive").siblings().removeClass("pageActive");
			}
		});
		$('.tab0').click(function() {
			mySwiper.slideTo(0, 1000, false); 
			$(this).addClass("pageActive").siblings().removeClass("pageActive");
		})
		$('.tab1').click(function() {
			mySwiper.slideTo(1, 1000, false); 
			$(this).addClass("pageActive").siblings().removeClass("pageActive");
		});
		$('.tab2').click(function() {
			mySwiper.slideTo(2, 1000, false); 
			$(this).addClass("pageActive").siblings().removeClass("pageActive");
		})
		$('.tab3').click(function() {
			mySwiper.slideTo(3, 1000, false); 
			$(this).addClass("pageActive").siblings().removeClass("pageActive");
		})
	
	}
}
export default MyApp;