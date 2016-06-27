var React = require('react');

var TradeSymbol = require('./tradelog.symbol');
var TradelogTradetype = require('./tradelog.tradetype');

var TradelogSignalPosition = require('./tradelog.signalposition');


var DateTimeField = require('react-datetime');
var moment = require('moment');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var TraderlogOpen  = React.createClass({
	mixins:[LinkedStateMixin],
	getInitialState: function() {
		return {
			symbol:{
				symbolId: '',
				symbolName:''
			},

			openTime: '',
			openPrice:'',
			stoploss:'',
			takeProfit:'',
			openType:{
				openType:'',
				openTypeName:''
			}

		};
	},
	autoLoadState:function(){
		var me  = this;

		me.setState(
			{
				symbol:{
					symbolId: me.tradeSymbol.state.selectedSymbol.symbolId,
					symbolName:me.tradeSymbol.state.selectedSymbol.symbolName
				}  ,
				openType:{
					openType:me.tradeType.state.openType.openType,
					openTypeName:me.tradeType.state.openType.openTypeName
				} ,
				openPosition:{
					openPositionId:me.position.state.position.id,
					openPositionName:me.position.state.position.name
				}
			}
		);

	},
	OpenTimeChange:function(){

		var date = arguments[0];
		date.format();

		this.setState({
			oepnTime: date.format("YYYY-MM-DD HH:mm:ss")
		});
		//<DateTimeField  onChange={this.OpenTimeChange} locale="zh-cn" dateFormat="YYYY-MM-D" timeFormat="HH:mm:ss" />


	},

	render:function() {

		return (

					<form className="form-horizontal">
						<div className="form-group">
							<label className="col-sm-1 control-label" >货币对</label>
							<div className="col-sm-3">
								<TradeSymbol ref={(ref) => this.tradeSymbol = ref}/>
							</div>
							<label className="col-sm-1 control-label" >开仓时间</label>
							<div className="col-sm-3">
								<input type="datetime-local" valueLink={this.linkState('openTime')} className="form-control"  />
							</div>
							<label className="col-sm-1 control-label" ></label>
							<div className="col-sm-3">

							</div>
						</div>
						<div className="form-group">

							<label className="col-sm-1 control-label" >入场信号</label>
							<div className="col-sm-3">
								<TradelogTradetype ref={(ref) => this.tradeType = ref} />

							</div>
							<label className="col-sm-1 control-label" >信号位置</label>
							<div className="col-sm-3">
								<TradelogSignalPosition ref={(ref) => this.position = ref} />

							</div>
							<label className="col-sm-1 control-label" ></label>
							<div className="col-sm-3">

							</div>

						</div>
						<div className="form-group">
							<label className="col-sm-1 control-label" >开仓点位</label>
							<div className="col-sm-3">
								<input type="number" step="0.0001" valueLink={this.linkState('openPrice')} className="form-control"  />
							</div>
							<label className="col-sm-1 control-label" >止损点位</label>
							<div className="col-sm-3">
								<input type="text"  type="number" step="0.0001" valueLink={this.linkState('stoploss')} className="form-control" />
							</div>
							<label className="col-sm-1 control-label" >盈利点位</label>
							<div className="col-sm-3">
								<input type="text" type="number" step="0.0001" valueLink={this.linkState('takeProfit')} className="form-control"  />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-1 control-label" >止损pips</label>
							<div className="col-sm-3">
								<input type="number" disabled="disabled" step="0.0001" valueLink={this.linkState('stoplossPips')} className="form-control"  />
							</div>
							<label className="col-sm-1 control-label" >盈利pips</label>
							<div className="col-sm-3">
								<input type="text"  disabled="disabled" type="number" step="0.0001" valueLink={this.linkState('takeProfitPips')} className="form-control" />
							</div>
							<label className="col-sm-1 control-label" >风险比</label>
							<div className="col-sm-3">
								<input type="text" disabled="disabled" type="number" step="0.0001" valueLink={this.linkState('openPercentage')} className="form-control"  />
							</div>
						</div>
					</form>



		);
	}



});
module.exports =TraderlogOpen;