import React from "react";
import "./../scss/user.scss";
import {Router,Route,Link,browserHistory,IndexRoute,Redirect} from "react-router";
class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentWillMount() {
		
	}
	backHandler(){
		window.history.go(-1);
	}
	clickHandler(){
		localStorage.setItem("isLogin",0);
		alert("退出登录");
		browserHistory.push("/");
	}
	render() {
		var user = JSON.parse(localStorage.getItem("user"));
		var username = user.username;
		username = username.substring(0,3)+"****"+username.substring(7);
		return(
			<div id="User">
				<header id="header">
						<p onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></p>
						<p>个人中心</p>				
				</header>
				<div id="content">
					<div className="userInfo">
						<div><img src={"router/images/img.jpg"} /></div>
						<div>
							<p>{user.id}</p>
							<p>{username}</p>
						</div>
					</div>
					<div className = "exit" onClick = {this.clickHandler.bind(this)}>退出登录</div>
				</div>
			</div>
		)
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		
	}
	componentWillReceiveProps(nextProps) {
//		console.log("nextProps",nextProps);
//		console.log("Props",this.props);
//		
//	  this.setState({
//	  
//	  });
	}
}
export default User;