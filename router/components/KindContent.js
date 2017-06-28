import React from "react";
import "./../scss/kind.scss";
import MyAjax from "./../md/MyAjax";
class Kind extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		KindList : []
		}
	}
	componentWillMount() {
		var url = "http://datainfo.duapp.com/shopdata/getGoods.php"
		MyAjax.ajax({
			type: "POST",
			url:url,
			data: {classID:this.props.classID},
		}, function(data) {
			data = data.replace("callback(","");
			data = data.slice(0,-1);
			data = JSON.parse(data);
			console.log("kind123123",data)
			
		})
	}
	backHandler(){
		window.history.go(-1);
	}
	render() {

		return(
			<div id="KindRight">
				{this.props.classID}
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
export default Kind;