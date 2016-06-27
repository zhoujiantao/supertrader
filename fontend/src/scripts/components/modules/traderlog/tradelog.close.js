var React = require('react');

var TradelogClosetype = require('./tradelog.closetype');
var TradelogSignalPosition = require('./tradelog.signalposition');

var DateTimeField = require('react-datetime');
var moment = require('moment');
var LinkedStateMixin = require('react-addons-linked-state-mixin');



var TraderlogClose  = React.createClass({
	mixins:[LinkedStateMixin],
	getInitialState: function() {
		return {
			closeTime: '',
			closePrice:'',
			closeType:{
				closeType:'',
				closeTypeName:''
			}

		};
	},
	autoLoadState:function(){
		var me  = this;

		me.setState(
			{

				closeType:{
					closeType:me.closeType.state.closeType.closeType,
					closeTypeName:me.closeType.state.closeType.closeTypeName
				},
				closePosition:{
					closePositionId:me.position.state.position.id,
					closePositionName:me.position.state.position.name
				}

			}
		);

	},
	closeTimeChange:function(){

		var date = arguments[0];
		date.format();

		this.setState({
			closeTime: date.format("YYYY-MM-DD HH:mm:ss")
		});
		//<DateTimeField onChange={this.closeTimeChange} locale="zh-cn"   dateFormat="YYYY-MM-D" timeFormat="HH:mm:ss" />

	},

	render:function() {
		return (

			<form className="form-horizontal">
				<div className="form-group">
					<label className="col-sm-1 control-label" >出场时间</label>
					<div className="col-sm-3">
						<input type="datetime-local" valueLink={this.linkState('closeTime')} className="form-control"  />

					</div>
					<label className="col-sm-1 control-label" >出场条件</label>
					<div className="col-sm-3">
						<TradelogClosetype ref={(ref)=>{this.closeType=ref}} />
					</div>
					<label className="col-sm-1 control-label" >信号位置</label>
					<div className="col-sm-3">
						<TradelogSignalPosition ref={(ref) => this.position = ref} />

					</div>

				</div>
				<div className="form-group">
					<label className="col-sm-1 control-label" >出场点位</label>
					<div className="col-sm-3">
						<input type="text" valueLink={this.linkState('closePrice')} className="form-control" />
					</div>

					<label className="col-sm-1 control-label" >持仓时间</label>
					<div className="col-sm-3">
						<input type="text" disabled="disabled" valueLink={this.linkState('timeRange')} className="form-control" />
					</div>
					<label className="col-sm-1 control-label" ></label>
					<div className="col-sm-3">

					</div>

				</div>
				<div>
					<label className="col-sm-1 control-label" >实际盈利</label>
					<div className="col-sm-3">
						<input type="text" disabled="disabled" valueLink={this.linkState('profitPips')} className="form-control" />
					</div>
					<label className="col-sm-1 control-label" >风险比</label>
					<div className="col-sm-3">
						<input type="text" disabled="disabled" valueLink={this.linkState('closePercentage')} className="form-control" />
					</div>
					<label className="col-sm-1 control-label" ></label>
					<div className="col-sm-3">

					</div>
				</div>

			</form>



		);
	}



});
module.exports =TraderlogClose;