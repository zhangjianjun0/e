import Toast from "./Toast.js";
var IsMobile = {
	validatemobile(mobile) {
		if(mobile.length == 0) {
			Toast.makeText("请输入手机号码/邮箱");
			return false;

		}
		var myreg = /@/g;
		if(!myreg.test(mobile)) {
			if(mobile.length != 11) {
				Toast.makeText("请输入有效的手机号码/邮箱");
				return false;
			} else {
				var myreg1 = /^1[34578]\d{9}$/;
				console.log(myreg1.test(mobile));
				if(!myreg1.test(mobile)) {
					console.log(333);
					Toast.makeText("请输入有效的手机号码/邮箱");
					return false;
				}
			}
		} else {
			var myreg2 = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

			if(!myreg2.test(mobile)) {
				Toast.makeText("请输入有效的手机号码/邮箱");
				return false;
			}
		}
		console.log(1111)
		return true;
	}
}

export default IsMobile;