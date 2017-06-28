import React from "react";
import "./../scss/first.scss";
import MyAjax from "./../md/MyAjax";
import {Router,Route,Link,browserHistory,IndexRoute} from "react-router";
import Details from "./Details";
class First extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bannerList: [],
			goodsTit: [],
			goodsImg: [],
			goodsName:[],
			goodsID:[]
		}
	}
	componentWillMount() {
		var url = "http://datainfo.duapp.com/shopdata/getBanner.php";
		var bannerArr = [];
		var goodsNArr = [];
		var goodsIDArr = [];
		var that = this;
		MyAjax.fetchJsonp(url, function(data) {
			console.log("banner",data);
			for(var item of data) {
				var url = JSON.parse(item[3])[0];
				var goodsN = item.goodsName;
				var goodsID = item.goodsID;
				bannerArr.push(url);
				goodsNArr.push(goodsN);
				goodsIDArr.push(goodsID);
			}
			that.setState({
				bannerList: bannerArr,
				goodsName:goodsNArr,
				goodsID:goodsIDArr
			})
		})
		var url1 = "http://datainfo.duapp.com/shopdata/getGoods.php";
		var goodsTArr = [];
		var goodsIArr = [];
		MyAjax.fetchJsonp(url1, function(data) {
			for(var i = 0; i < 3; i++) {
				var goodsTit = data[i].goodsName;
				goodsTArr.push(goodsTit);
				var goodsImg = data[i].goodsListImg;
				goodsIArr.push(goodsImg);
			}
			that.setState({
				goodsTit: goodsTArr,
				goodsImg: goodsIArr
			})
		})
	}
	render() {
		var arr = [];
		var list = this.state.bannerList;
		var goodsT = this.state.goodsTit;
		var goodsI = this.state.goodsImg;
		var goodsN = this.state.goodsName;
		var goodsID = this.state.goodsID;
		for(var i in list) {
			arr.push(<div className="swiper-slide" key={i}><Link to={"/Details/"+goodsID[i]}><img src={list[i]} /></Link></div>)
		}
		return(
			<div id="first">
			<div className="swiper-container banner">
		        <div className="swiper-wrapper">
 					{arr}
		        </div>
		        <div className="swiper-pagination bannerPage"></div>
		    </div>
		    <div className = "nav">
			    <p><Link to = "/NewGoods"><i className="iconfont">&#xe61d;</i><span>新品</span></Link></p>
			    <p><Link to = "/NewGoods"><i className="iconfont">&#xe636;</i><span>热销</span></Link></p>
			    <p><Link to = "/NewGoods"><i className="iconfont">&#xe62e;</i><span>限时购</span></Link></p>
			    <p><Link to = "/NewGoods"><i className="iconfont">&#xe62a;</i><span>趣物</span></Link></p>
			    <p><Link to = "/Kind"><i className="iconfont">&#xe61a;</i><span>分类</span></Link></p>
		    </div>
		    <p className="tit"><span>//</span>&nbsp;新品推荐&nbsp;<span>//</span></p>
		    <div className = "goods">
			    <div className = "goodsL">
			    	<p>{goodsT[0]}</p>
			    	<img src={goodsI[0]} />
	
			    </div>
			    <div className = "goodsR">
				    <div>
				    	<p>{goodsT[1]}</p>
				    	<img src={goodsI[1]} />
				    </div>
				    <div>
				    	<p>{goodsT[2]}</p>
				    	<img src={goodsI[2]} />
				    </div>
			    </div>
		    </div>
		   <p className="tit"><span>//</span>&nbsp;文章推荐&nbsp;<span>//</span></p>
		   <div className="card">
		   		<div>
		   			<img src={list[0]} />
		   		</div>
		   		<p>{goodsN[0]}</p>
		   </div>
		   <div className="card">
		   		<div>
		   			<img src={list[1]} />
		   		</div>
		   		<p>{goodsN[1]}</p>
		   </div>
		   <div className="card">
		   		<div>
		   			<img src={list[2]} />
		   		</div>
		   		<p>{goodsN[2]}</p>
		   </div>
		</div>
		)
	}
	componentDidMount() {
		var swiper = new Swiper('.banner', {
			pagination: '.bannerPage',
			paginationClickable: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});
	}
	componentDidUpdate() {
		var swiper = new Swiper('.banner', {
			pagination: '.bannerPage',
			paginationClickable: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});
	}
}
export default First;