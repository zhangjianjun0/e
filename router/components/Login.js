import React from "react";
import ReactDOM from "react-dom";
import MyApp from "./MyApp";
import "./../scss/login.scss";
import MyAjax from "./../md/MyAjax";
import Toast from "./../md/Toast";
import {Router,Route,Link,browserHistory,IndexRoute,Redirect} from "react-router";
import IsMobile from "./../md/IsMobile";
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentWillMount() {
		var isLogin = localStorage.getItem("isLogin");
		if(isLogin == 1){
			alert("已登录”");
			browserHistory.push("/User");
		}
		
	}
	backHandler(){
		window.history.go(-1);
	}
	loginHandler(){
		var username = "" + $("#username").val();
		var password = "" + $("#password").val();
		IsMobile.validatemobile(username);
		var sign = IsMobile.validatemobile(username);
		this.componentWillUpdate(sign,username,password);
	}
	render() {

		return(
			<div id="Login">
				<header id="loginHeader">
				<div className="loginback" onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></div>

					<div className="logintitle">登录</div>
				</header>
				<div id="loginContent">
					<div className="wel">欢迎来到优选</div>
					<form  action="">
						<input type="text" name="username" id="username" placeholder="手机号/邮箱" />
						<input type="password" name="password" id="password" placeholder="密码" />
						<input type="button" name="btn" id="loginbtn" value="登&nbsp;&nbsp;录" onClick={this.loginHandler.bind(this)}/>
					</form>
					<div className="go"><p className="register"><Link to = "/Res">注册优选</Link></p><p>忘记密码</p></div>
				</div>
			</div>
		)
	}
	componentDidMount() {

	}
	componentWillUpdate(sign,username,password) {
		console.log("111111111111111")
		if(sign){
			var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID=" + username + "&password=" + password;
					$("#loginbtn").attr("disabled", "disabled");
					$("#loginbtn").val("正在登录...");
					$("#toast").show();
					$("#toast").html("正在登录...");
					$("#toast").animate({
						opacity: 1,
						top: '6%'
					}, 600, 'linear')

					MyAjax.fetch(url, function(data) {
						console.log("denglu",data);
						$("#loginbtn").removeAttr("disabled");
						$("#loginbtn").val("登录");

						if(data == 0) {
							Toast.makeText("用户名不存在");
						} else if(data == 2) {
							Toast.makeText("密码错误");
						} else {
							localStorage.setItem("user", JSON.stringify({
								"username": username,
								"id": data.code
							}));
							localStorage.setItem("isLogin",1);
							Toast.makeText("登录成功");
							setTimeout(function() {
								$("#toast").show();
								$("#toast").html("正在跳转...");
								$("#toast").animate({
									opacity: 1,
									top: '6%'
								}, 1000, 'linear')
							}, 1700)
							setTimeout(function() {
								$("#toast").css("top","0%");
								location.href = "/"
							}, 3000)
						}
						$("#password").val("");
					}, function(err) {
						console.log(err);
						$("#loginbtn").removeAttr("disabled");
						$("#loginbtn").val("登录");
					})
		}
	}
	componentDidUpdate() {
		
	}
	componentWillReceiveProps(nextProps) {

	}
}
export default Login;