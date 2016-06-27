/**
 * Created by T440P on 2015/11/25.
 */


var  React = require('react');

var Header = require('./common/common.header');

var Dashbord = require('./modules/dashbord/dashbord');
var Traderlog = require('./modules/traderlog/traderlog');







var Main = React.createClass({
	getInitialState:function() {
		return {
			route: window.location.hash.substr(1)
		}
	},
	componentDidMount:function() {
		window.addEventListener('hashchange', () => {
			this.setState({
				route: window.location.hash.substr(1)
			});

		})
	},
	render:function(){

		var  Child=null;

		switch (this.state.route) {

			case '/': Child = Dashbord; break;
			case '': Child = Dashbord; break;
			case '/Traderlog': Child = Traderlog; break;


			default:      Child = Dashbord;
		}


		return (

			<div className="container">
				<Header />
				    <div className="row">
					    <div className="container">
						    <Child />
						    </div>

					</div>
				</div>
		);
	}


});
module.exports = Main;
