import React from "react";
import "./../scss/search.scss";
import MyAjax from "./../md/MyAjax";
class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data:""
		}
	}
	componentWillMount() {

	}
	backHandler(){
		window.history.go(-1);
	}
	searchHandler(){
		$(".inp").hide();
		$(".p").show();
	}
	textHandler(){
		$(".inp").show();
		$(".p").hide();
		var that = this;
		var str = $(".search").val();
		var selectText = encodeURI(str);
		var url =  "http://datainfo.duapp.com/shopdata/selectGoodes.php?selectText="+selectText;
		MyAjax.fetchJsonp(url, function(data) {
			console.log("data",data);
			if(data==0){
				data = {"0":{"goodsName":"商品不存在"}}
			}
			that.setState({
				data:data
			})
		})	
	}
	render() {
		var arr = [];
		var arr1 = [];
        var list = this.state.data;
        console.log("list",list)
        for(var i in list){
         	arr.push(<p key={i}><i className="iconfont">&#xe623;</i>{list[i].goodsName}</p>)
         	arr1.push(<div key={i}><img src = {list[i].goodsListImg} /><p>{list[i].goodsName}</p><p>￥{list[i].price}</p></div>);
         }
		return(
			<div id="Search">
				<header id="header">
					<p onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></p>
					<p><i className="iconfont">&#xe623;</i><input className = "search" onInput={this.textHandler.bind(this)} type="text" placeholder = "搜索商品"/></p>
					<p onClick={this.searchHandler.bind(this)}>搜索</p>
				</header>
				<div id="content">
					<div className = "inp">{arr}</div>
					<div className = "p">{arr1}</div>
				</div>
			</div>
		)
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		
	}
	componentWillReceiveProps(nextProps) {

	}
}
export default Search;