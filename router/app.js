import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,Link,browserHistory,IndexRoute} from "react-router";
import "./scss/common.scss";

import MyApp from "./components/MyApp";
import NewGoods from "./components/NewGoods";
import Kind from "./components/Kind";
import Details from "./components/Details";
import Login from "./components/Login";
import Res from "./components/Res";
import Cart1 from "./components/Cart1";
import User from "./components/User";
import Search from "./components/Search";

ReactDOM.render(<Router history={browserHistory}>
	<Route path="/" component ={MyApp}></Route>
	<Route path="NewGoods" component ={NewGoods} />
	<Route path="Kind" component ={Kind} />
	<Route path="Details/:goodsID" component ={Details} />
	<Route path="Login" component ={Login} />
	<Route path="Res" component ={Res} />
	<Route path="Cart1" component ={Cart1} />
	<Route path="User" component ={User} />
	<Route path="Search" component ={Search} />
</Router>, document.getElementById("app"));