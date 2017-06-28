import React from "react";
import ReactDOM from "react-dom";
import "./../scss/cart.scss";
import MyAjax from "./../md/MyAjax";
import {Router,Route,Link,browserHistory,IndexRoute} from "react-router";
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		data:"",
		allP:0
		}
	}
	componentWillMount() {
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		var url = " http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
		var that = this;
		MyAjax.fetchJsonp(url, function(data) {
			//console.log("Cart",data);
			if(data == 0){
				$(".cartno").show();
				$(".carthas").hide();
			}
			else{
				$(".cartno").hide();
				$(".carthas").show();
				console.log("goodsName",data[0].goodsName);
				console.log("goodsListImg",data[0].goodsListImg);
				console.log("number",data[0].number);
				console.log("price",data[0].price);
				console.log("discount",data[0].discount);
				var allP = 0;
				for(var i in data){
					var discount = data[i].discount;
					if(discount==0){
						discount=10;
					}
					allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
				}
				that.setState({
					data:data,
					allP:allP
				})
			}
		})
		

	}
	backHandler() {
		window.history.go(-1);
	}
	testHandler(){
		
	}
	minusHandler(e){
		var  that =this;
		var goodsID = e.target.getAttribute("data-goodsID");
		var num = e.target.getAttribute("data-num");
		num = Number(num)-1;
		if(num<1){
			num=1;
		}
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		var url = " http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number="+num;
		MyAjax.fetch(url, function(data) {
			if(data == 1){
				var  userID = JSON.parse(localStorage.getItem("user")).id;
				var url = " http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
				MyAjax.fetchJsonp(url, function(data) {
					if(data == 0){
						$(".cartno").show();
						$(".carthas").hide();
					}
					else{
						$(".cartno").hide();
						$(".carthas").show();
						var allP = 0;
						for(var i in data){
							var discount = data[i].discount;
							if(discount==0){
								discount=10;
							}
							allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
						}
						that.setState({
							data:data,
							allP:allP
						})
					}
				})
			}
		})
		
	}
	addHandler(e){
		var that = this;
		var goodsID = e.target.getAttribute("data-goodsID");
		var num = e.target.getAttribute("data-num");
		num = Number(num)+1;
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		var url = " http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number="+num;
		MyAjax.fetch(url, function(data) {
			if(data == 1){	
				var  userID = JSON.parse(localStorage.getItem("user")).id;
				var url = " http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
				MyAjax.fetchJsonp(url, function(data) {
					if(data == 0){
						$(".cartno").show();
						$(".carthas").hide();
					}
					else{
						$(".cartno").hide();
						$(".carthas").show();
						var allP = 0;
						for(var i in data){
							var discount = data[i].discount;
							if(discount==0){
								discount=10;
							}
							allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
						}
						that.setState({
							data:data,
							allP:allP
						})
					}
				})
			}
		})
		
	}
	delHandler(e){
		var that = this;
		var goodsID = e.target.getAttribute("data-goodsID");
		var num = 0;
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		var url = " http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number="+num;
		console.log("url",url)
		MyAjax.fetch(url, function(data) {
			console.log(data);
			if(data == 1){	
				var  userID = JSON.parse(localStorage.getItem("user")).id;
				var url = " http://datainfo.duapp.com/shopdata/getCar.php?userID="+userID;
				MyAjax.fetchJsonp(url, function(data){
					console.log("del",data)
					if(data == 0){
						$(".cartno").show();
						$(".carthas").hide();
					}
					else{
						$(".cartno").hide();
						$(".carthas").show();
						var allP = 0;
						for(var i in data){
							var discount = data[i].discount;
							if(discount==0){
								discount=10;
							}
							allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
						}
						that.setState({
							data:data,
							allP:allP
						})
					}
				})
				
			}
		})
	}
	selHandler(e){
		var selSign = e.target.id;
		var allP = 0;
		var hasG = [];
		var that =this;
			if(selSign == "has"){
				$(e.target).html("&#xe66c;");
				$(e.target).attr("id","nohas");
			}else{
				$(e.target).html("&#xe616;");
				$(e.target).attr("id","has");
			}
			for(var i in $(".sel")){
				if($(".sel")[i].id == "has"){
					hasG.push(Math.floor($(".sel")[i].getAttribute("data-discount")*$(".sel")[i].getAttribute("data-price")/10*$(".sel")[i].getAttribute("data-number")))
				}
			}
			for(var item of hasG){
				allP += Number(item);
			}
			that.setState({
				allP:allP
			})
			
	}
	render() {
		var arr = [];
		var  allP = 0;
		var data = this.state.data;
		for(var i in data){
					var discount = data[i].discount;
					if(discount==0){
						discount=10;
					}
			arr.push(<div key={i} className = "goods">
				<p className = "goodsL"><i className="iconfont sel" id="has" data-discount={discount} data-price={data[i].price} data-number={data[i].number} onClick={this.selHandler.bind(this)}>&#xe616;</i></p>
				<img src = {data[i].goodsListImg}/>
				<div className = "goodsR">
					<p>{data[i].goodsName}</p>
					<div className = "goodsB">
						<p>￥{Math.floor(data[i].price*discount/10)}</p>
						<div><span className="minus" data-goodsID={data[i].goodsID} data-num={data[i].number} onClick={this.minusHandler.bind(this)}>-</span><input onChange={this.testHandler.bind(this)} type="text" value={data[i].number}/><span className="add" data-goodsID={data[i].goodsID} data-num={data[i].number} onClick={this.addHandler.bind(this)}>+</span></div>
						<p className = "del" ><i className="iconfont" data-goodsID={data[i].goodsID} onClick={this.delHandler.bind(this)}>&#xe619;</i></p>
					</div>
				</div>
			</div>)
			 allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
		}
		return(
			<div id="Cart">
				<header id="header">
						<p onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></p>
						<p>购物车</p>
						<p className = "all">全不选</p>
				</header>
				<div id="content">
					<div className="cartno">
						<p><i className="iconfont">&#xe61b;</i></p>
						<p className="">购物车无商品</p>
						<Link to = "/"><div className="toHome">去首页逛逛</div></Link>
					</div>
					<div className="carthas">
					{arr}
					</div>
				</div>
				<footer id = "footer"><div>合计:&nbsp;&nbsp;&nbsp;<span className = "allp" id = {this.state.allP}>{"￥"+this.state.allP}</span></div><div>结算</div></footer>
			</div>
		)
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		var allSign = false;
		var selSign = true;
		var allp = 0;
		var data = this.state.data;
		for(var i in data){
					var discount = data[i].discount;
					if(discount==0){
						discount=10;
					}
			 allp += (Math.floor(data[i].price*discount/10))*(data[i].number);		
		}
		$(".all").click(function(){
			if(allSign){
				$(".all").html("全不选");
				$(".sel").html("&#xe616;");
				$(".sel").attr("id","has");
				allSign = false;
				$(".allp").html("￥"+allp);
			}else{
				$(".all").html("全选");
				$(".sel").html("&#xe66c;");
				allSign = true;
				$(".allp").html("￥0");
				$(".sel").attr("id","nohas");
			}
		});
	}
}
export default Cart;