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
		var data = this.state.data;
		var that =this;
		var allP = 0;
		var goodsID = e.target.getAttribute("data-goodsID");
		var num = $(e.target).siblings("input").val();
		num = Number(num)-1;
		if(num<1){
			num=1;
		}
		$(e.target).siblings("input").val(num);
		for(var i in data){
			var discount = data[i].discount;
					if(discount==0){
						discount=10;
					}
			if(goodsID == data[i].goodsID){
				var num = Number(data[i].number)-1;
				if(num<1){
					num=1;
				}
				data[i].number = num;
			}
			console.log("allP1231312",data[i].price,discount,data[i].number)
			allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
			console.log("allP123",allP)
		}
		var hasG = [];	
		for(var i in $(".sel")){
				if($(".sel")[i].id == "has"){
					hasG.push(Math.floor($(".sel")[i].getAttribute("data-discount")*$(".sel")[i].getAttribute("data-price")/10*data[i].number))
				}
			}
		console.log("qeqweq",hasG);
		var allP1 = 0;
		for(var item of hasG){
				allP1 += Number(item);
		}
		console.log(allP1);
		this.setState({
			allP:allP1
		})
	}
	addHandler(e){
		var data = this.state.data;
		console.log(data);
		var  that =this;
		var allP = 0;
		var goodsID = e.target.getAttribute("data-goodsID");
		var num = $(e.target).siblings("input").val();
		num = Number(num)+1;
		$(e.target).siblings("input").val(num);
		for(var i in data){
			var discount = data[i].discount;
					if(discount==0){
						discount=10;
					}
			if(goodsID == data[i].goodsID){
				data[i].number = Number(data[i].number)+1;
			}
			allP += (Math.floor(data[i].price*discount/10))*(data[i].number);
		}
		var hasG = [];	
		for(var i in $(".sel")){
				if($(".sel")[i].id == "has"){
					hasG.push(Math.floor($(".sel")[i].getAttribute("data-discount")*$(".sel")[i].getAttribute("data-price")/10*data[i].number))
				}
			}
		console.log("qeqweq",hasG);
		var allP1 = 0;
		for(var item of hasG){
				allP1 += Number(item);
		}
		console.log(allP1);
		this.setState({
			allP:allP1
		})
		
	}
	delHandler(e){
		var that = this;
		var allP = 0;
		var data = this.state.data;
		var goodsID = e.target.getAttribute("data-goodsID");
		var num = 0;
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		var url = " http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+goodsID+"&number="+num;
		console.log("url",url);
		var dom = $(e.target).parents(".goods").siblings().find("input");
		console.log(dom.length)
		var num = [];
		for(var i=0;i<dom.length;i++){
			num.push(dom[i].defaultValue);
		}
		console.log(num);
	
		for(var i in data){
			if(goodsID == data[i].goodsID){
				data.splice(i,1);
			}
		}
		console.log(data);
	for(var i in data){
					var discount = data[i].discount;
					if(discount==0){
						discount=10;
					}
		 allP += (Math.floor(data[i].price*discount/10))*(data[i].number);			
	
	}
		
		this.setState({
			data:data,
			allP:allP
		})
		MyAjax.fetch(url, function(data) {
			console.log("delHandler",data);
			
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
		console.log("rander",this.state.data)
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
						<div><span className="minus" data-goodsID={data[i].goodsID} data-num={data[i].number} onClick={this.minusHandler.bind(this)}>-</span><input data-goodsID={data[i].goodsID} className = "goodsnumshow" onChange={this.testHandler.bind(this)} type="text" value={data[i].number}/><span className="add" data-goodsID={data[i].goodsID} data-num={data[i].number} onClick={this.addHandler.bind(this)}>+</span></div>
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
				<footer id = "footer"><div>合计:&nbsp;&nbsp;&nbsp;<span className = "allp">{"￥"+this.state.allP}</span></div><div>结算</div></footer>
			</div>
		)
	}
	componentDidMount() {
		this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
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
	routerWillLeave(nextLocation) {
		var  userID = JSON.parse(localStorage.getItem("user")).id;
		console.log($(".goodsnumshow"));
		var dom = $(".goodsnumshow")
		var id = [];
		var num = [];
		for(var i=0;i<dom.length;i++){
			id.push(dom[i].getAttribute("data-goodsID"));
			num.push(dom[i].defaultValue);
		}
		console.log(id,num);
		for(var i in id){
			var url = " http://datainfo.duapp.com/shopdata/updatecar.php?userID="+userID+"&goodsID="+id[i]+"&number="+num[i];
        MyAjax.fetch(url, function(data) {
			console.log("leave",data);
		})
		}
        
    }
}
export default Cart;