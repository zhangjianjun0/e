import React from "react";
import "./../scss/details.scss";
import MyAjax from "./../md/MyAjax";
class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			DetailImg: [],
			Img: [],
			data: {}
		}
	}
	componentWillMount() {
		console.log(React);
		var url = "http://datainfo.duapp.com/shopdata/getGoods.php";
		var imgArr = [];
		var imgArr1 = [];
		var that = this;
		MyAjax.ajax({
			type: "POST",
			url: url,
			data: {
				goodsID: this.props.params.goodsID
			},
		}, function(data) {
			data = data.replace("callback(", "");
			data = data.slice(0, -1);
			data = JSON.parse(data);
			for(var item of JSON.parse(data[0].goodsBenUrl)) {
				imgArr.push(item);
			}
			for(var item of JSON.parse(data[0].imgsUrl)) {
				imgArr1.push(item);
			}
			that.setState({
				DetailImg: imgArr,
				data: data[0],
				Img: imgArr1
			})
		})
	}
	backHandler() {
		window.history.go(-1);
	}

	CartHandler(){
		var isLogin = localStorage.getItem("isLogin");
		if(isLogin!=1){
			alert("未登录”");
		}else{
			var  userID = JSON.parse(localStorage.getItem("user")).id;
			var goodsID = this.props.params.goodsID;
			var url = " http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number="+1;
			MyAjax.fetch(url, function(data) {
			console.log("123",data);
			if(data == 1){
				alert("加入购物车成功")
			}
			})
	
		}
	}
	render() {
		var arr = [];
		var arr1 = [];
		var imgUrl = this.state.DetailImg;
		var img = this.state.Img;
		var data = this.state.data;
		var discount = data.discount;
		if(discount==0){
			discount=10;
		}
		for(var i in imgUrl) {
			arr.push(<div className="swiper-slide" key={i}><img src={imgUrl[i]} /></div>)
		}
		for(var i in img) {
			arr1.push(<img key={i} src={img[i]} />)
		}
		return(
			<div id="Details">
				<header id="header">
						<p onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></p>
						<p>商品详情</p>				
				</header>
				<div id="content">
					<div className="swiper-container Dbanner">
						    	<div className="swiper-wrapper">
				 					{arr}
						        </div>
						 <div className="swiper-pagination DbannerPage"></div>
				    </div>				    
				<div className="detail_price">
					<div>{data.goodsName}</div>
					<div>
						<p>￥<span>{Math.floor(data.price*discount*0.1)}</span></p>
						<p className="discount">{data.discount}折</p>
					</div>
					<div>价格￥{data.price}</div>
					<div>
						<p>快递0.00</p>
						<p>月销{data.buynumber}笔</p>
						<p>上海</p>
					</div>
				</div>
				<div className="detail_para">
					<h1>商品详情</h1>
					<div className="para">{data.detail}</div>
				</div>
				<div className="detail_img">
					<h1>商品图片</h1>
					{arr1}
				</div>
				</div>
				<footer id="footer">
					<div><i className="iconfont">&#xe61b;</i></div>
					<div onClick = {this.CartHandler.bind(this)}>加入购物车</div>
					<div>立刻购买</div>
				</footer>
			</div>
			
		)
	}
	componentDidMount() {
		var swiper = new Swiper('.Dbanner', {
			pagination: '.DbannerPage',
			paginationClickable: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});
	}
	componentDidUpdate() {
		var swiper = new Swiper('.Dbanner', {
			pagination: '.DbannerPage',
			paginationClickable: true,
			centeredSlides: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: false
		});
	}
	componentWillReceiveProps(nextProps) {

	}
}
export default Details;