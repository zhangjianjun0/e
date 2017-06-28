import React from "react";
import ReactDOM from "react-dom";
import "./../scss/kind.scss";
import MyAjax from "./../md/MyAjax";
import KindContent from "./KindContent";
class Kind extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			KindList: "",
			KindId : ""
		}
	}
	componentWillMount() {
		var kindArr = [];
		var kindIdArr = [];
		var url = "http://datainfo.duapp.com/shopdata/getclass.php";
		var that = this;
		MyAjax.fetch(url, function(data) {
			for(var item of data) {
				kindArr.push(item.className);
				kindIdArr.push(item.classID);
			}
			that.setState({
				KindList : kindArr,
				KindId : kindIdArr
			})
		})

	}
	backHandler() {
		window.history.go(-1);
	}
	clickHandler(e){
		var evt = e||window.event;
		var that = evt.target;
		$(that).css({background:"#fff",color:"#56b065"}).siblings().css({background:"#f7f7f7",color:"#5F5F5F"});
		var classID = $(that).attr("classID");
		ReactDOM.unmountComponentAtNode(document.getElementById("showKind"))
		ReactDOM.render(<KindContent classID={classID}/>,document.getElementById("showKind"));
	}
	render() {
		var KindList = this.state.KindList;
		var arr = [];
		var KindId = this.state.KindId;
		for(var i in KindList) {
			arr.push(<div key={i} classID = {KindId[i]} onClick={this.clickHandler.bind(this)}>{KindList[i]}</div>);
		}
		return(
			<div id="Kind">
				<header id="header">
						<p onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></p>
						<p>分类</p>				
				</header>
			<div id="content">
				<div id = "kindList">
				{arr}
				</div>
				<div id = "showKind">
					
				</div>
			</div>
			</div>
		)
	}
	componentDidMount() {
		ReactDOM.render(<KindContent classID="1"/>,document.getElementById("showKind"));
	}
	componentDidUpdate() {
		ReactDOM.render(<KindContent classID="1"/>,document.getElementById("showKind"));
	}
}

export default Kind;