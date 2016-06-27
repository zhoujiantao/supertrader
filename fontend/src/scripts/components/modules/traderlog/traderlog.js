var React = require('react');

var TraderForm = require('./tradeform');

var TraderlogTable = require('./tradelog.table');


var Traderlog  = React.createClass({
	reflashData:function(){
		 this.table.loadTable();
	},
	render:function() {
		return (

			   <div className="panel panel-default">
				   <div className="panel-heading">交易日志</div>
				   <div className="panel-body">
				     <TraderForm/>
					   <div className="row">
					    <button  onClick={this.reflashData} className="btn btn-default btn-success btn-reflash">刷新</button>
					   </div>
					   <TraderlogTable ref={(ref)=>{ this.table=ref}}/>
				   </div>
				   </div>



		);
	}



});
module.exports =Traderlog;