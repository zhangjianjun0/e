import React from "react";
import "./../scss/register.scss";
import MyAjax from "./../md/MyAjax";
import Toast from "./../md/Toast";
import IsMobile from "./../md/IsMobile";
import {browserHistory} from "react-router";
class Res extends React.Component {
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
	resHandler(){
		var username = "" + $("#username").val();
		var password = "" + $("#password").val();
		IsMobile.validatemobile(username);
		var sign = IsMobile.validatemobile(username);
		this.componentWillUpdate(sign,username,password);
	}
	render() {

		return(
			<div id="Res">
				<header id="registerHeader">
				<div className="registerback" onClick={this.backHandler.bind(this)}><i className="iconfont">&#xe60a;</i></div>

					<div className="registertitle">注册</div>
				</header>
				
				<div id="registerContent">
					<div className="wel">欢迎加入优选</div>
					<form  action="">
						<input type="text" name="username" id="username" placeholder="手机号/邮箱" />
						<input type="password" name="password" id="password" placeholder="密码" />
						<input type="button" name="btn" id="registerbtn" value="注&nbsp;&nbsp;册" onClick={this.resHandler.bind(this)}/>
					</form>
				</div>
			</div>
		)
	}
	componentDidMount() {

	}
	componentWillUpdate(sign,username,password) {
		if(sign){
			console.log(username, password);
					$("#registerbtn").attr("disabled", "disabled");
					$("#registerbtn").val("正在注册...");
					$("#toast").show();
					$("#toast").html("正在注册...");
					$("#toast").animate({
						opacity: 1,
						top: '6%'
					}, 600, 'linear')

					var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID=" + username + "&password=" + password;

					MyAjax.fetch(url, function(data) {
						console.log("registerData", data);
						//2
						$("#registerbtn").removeAttr("disabled");
						$("#registerbtn").val("注册");
						//3
						switch(data) {
							case 0:
								Toast.makeText("该用户名已存在");
								break;
							case 1:
								//注册成功，将用户名传入Login模块，可以增加用户体验

								Toast.makeText("注册成功");
								$("#toast").show();
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
									$("#toast").hide();
									browserHistory.push("/Login")
								}, 3000)

								break;
							case 2:
								Toast.makeText("注册失败，请重新注册");
								break;
						}
						$("#username").val("");
						$("#password").val("");
					}, function(err) {
						//2
						$("#registerbtn").removeAttr("disabled");
						$("#registerbtn").val("注册");
						console.log(err);
					})
		}
		
	}
	componentDidUpdate() {
		
	}
	componentWillReceiveProps(nextProps) {

	}
}
export default Res;