import React from "react";
import "./../scss/newGoods.scss";
import MyAjax from "./../md/MyAjax";
class NewGoods extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			goodsImg: [],
			goodsName:[]
		}
	}
	backHandler(){
		window.history.go(-1);
	}
	componentWillMount() {
		var url = "http://datainfo.duapp.com/shopdata/getGoods.php";
		var goodsTArr = [];
		var goodsIArr = [];
		var that = this;
		MyAjax.fetchJsonp(url, function(data) {
			for(var i in data) {
				var goodsTit = data[i].goodsName;
				goodsTArr.push(goodsTit);
				var goodsImg = data[i].goodsListImg;
				goodsIArr.push(goodsImg);
			}
			that.setState({
				goodsName: goodsTArr,
				goodsImg: goodsIArr
			})

		})
		
	}
	render() {
		var arr = [];
		var goodsN = this.state.goodsName;
		var goodsI = this.state.goodsImg;
		for(var i in goodsI) {
			
			arr.push(<li key={i}>
			<img src={goodsI[i]} />
			<p>{goodsN[i]}</p>
			</li>)
		}
		return(
			<div id="NewGoods">
				<header id="header">
						<p onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></p>
						<p>新品</p>				
				</header>
				<div id="content">
					<h4>— NEW ARRIVAL —</h4>
					<h1>新品推荐</h1>
					<ul>
					{arr}
					</ul>
				</div>
			</div>
		)
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		
	}
}
export default NewGoods;