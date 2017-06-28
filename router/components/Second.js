import React from "react";
//import "./../scss/kind.scss";
import MyAjax from "./../md/MyAjax";
class Second extends React.Component {
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
	render() {

			if(this.props.sec){
				return <div>1</div>
			}else{
				return <div>2</div>
			}
		
	}
	componentDidMount() {
		
	}
	componentDidUpdate() {
		
	}
	componentWillReceiveProps(nextProps) {

	}
}
export default Second;