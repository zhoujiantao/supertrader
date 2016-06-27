var React = require('react');


var Header = React.createClass({
	render:function(){
		return (
			<nav className="navbar navbar-default">

				<ul className="nav nav-pills">
					<li  className="active"><a href="#/Dashbord">Dashbord</a></li>
					<li ><a href="#/Traderlog">TradeLog</a></li>

				</ul>

			</nav>
	)}

});
module.exports = Header;

