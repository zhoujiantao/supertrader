var React = require('react');

var $ = require('jquery');

var TraderlogOpen = require('./tradelog.open');
var TraderlogClose = require('./tradelog.close');

var Account = require('./account');




var TraderForm  = React.createClass({
	getInitialState:function(){
		return {
			data:[],
			error:[]
		};
	},
	loadData:function(){

	},
	calculateTime:function(newData){
	  var begin = Date.parse(newData.openTime);
	  var end = Date.parse(newData.closeTime);
	   var timerange = end-begin;
		newData.timeRange =   parseInt(100*timerange/(3600*1000))/100;

	},
	calculateProfit:function(newData){
		//计算
		var  base=10000;
		if(newData.symbolName=='EURUSD'||newData.symbolName=='GBPUSD'||newData.symbolName=='AUDUSD')
		{
			base=10000;
		}
		else if(newData.symbolName=='USDJPY'){
			base = 100;
		}
		newData.stoplossPips =parseInt(100*Math.abs(newData.openPrice*base-newData.stoploss*base))/100;
		newData.takeProfitPips =parseInt(100*Math.abs(newData.takeProfit*base-newData.openPrice*base))/100;
		newData.openPercentage =parseInt(100* newData.takeProfitPips/ newData.stoplossPips)/100;

		if(newData.openTypeName.indexOf('buy')>-1)
		{
			newData.profitPips =Math.abs(parseInt(100*(newData.openPrice*base-newData.closePrice*base))/100);
		}
		else{
			newData.profitPips =parseInt(100*(newData.openPrice*base-newData.closePrice*base))/100;
		}

		newData.closePercentage =parseInt(100* newData.profitPips/ newData.stoplossPips)/100;


	},
	validation:function(newData){
		var errors = [];


		if(!newData.openTime)
		{
			errors.push('必须选择开仓时间');
		}
		if(!newData.openPrice)
		{
			errors.push('必须输入开仓点位');
		}
		if(!newData.stoploss)
		{
			errors.push('必须输入止损点位');
		}
		if(!newData.takeProfit)
		{
			errors.push('必须输入初始盈利点位');
		}
		if(!newData.closeTime)
		{
			errors.push('必须输入出场时间');
		}
		if(!newData.closePrice)
		{
			errors.push('必须输入出场点位');
		}
		this.setState({
			error: errors
		});

		return errors.length==0;

	},
	handlerSave:function(){
		var me = this;

		var open = me.tradeOpen;
		var close = me.tradeClose;
		open.autoLoadState();
		close.autoLoadState();
		setTimeout(function(){
			var openData = open.state;
			var closeData = close.state;


			//combine
			var newData  ={};
			for(var i in openData)
			{
				newData[i] = openData[i];
			}
			newData.symbolId =   openData.symbol.symbolId;
			newData.symbolName = openData.symbol.symbolName;
			newData.openType = openData.openType.openType;
			newData.openTypeName = openData.openType.openTypeName;
			newData.openPositionId = openData.openPosition.openPositionId;
			newData.openPositionName = openData.openPosition.openPositionName;

			for(var j in closeData)
			{
				newData[j] = closeData[j];
			}
			newData.closeType = closeData.closeType.closeType;
			newData.closeTypeName = closeData.closeType.closeTypeName;
			newData.closePositionId = closeData.closePosition.closePositionId;
			newData.closePositionName = closeData.closePosition.closePositionName;

			if(!me.validation(newData))
			{
				return;
			}
			me.calculateProfit(newData);
			me.calculateTime(newData);

			newData.accountId = me.accont.state.accountId;
			newData.accountName = me.account.state.accountName;

			$.post('http://localhost:5000/tradelog',newData,function(json){
				me.setState({
					error: ['保存成功']
				});

			}).error(function(response){

				var errors=[];
				var json =JSON.parse(response.responseText);
				if(json.errors)
				{
					for(var i in json.errors)
					{
						errors.push(json.errors[i]);
					}
				}
				me.setState({
					error: errors
				});
			}).fail(function(response){
				var errors=[];
				var json =JSON.parse(response.responseText);
				if(json.errors)
				{
					for(var i in json.errors)
					{
						errors.push(i+'  '+json.errors[i]);
					}
				}
				me.setState({
					error: errors
				});
			});

		},100);


	},

	render:function() {
		var errors='';
		if(this.state.error.length!=0)
		{
			errors = this.state.error.map(function(item){
				return (
					<li className="error-item">
						{item}
					</li>
				);
			});
		}
		return (


			<div>
				  <div className="message">
					  <ul>
					  {errors}
						  </ul>
				  </div>
				  <div className="row">
				    <button onClick={this.handlerSave} className="btn btn-default btn-success btn-save">保存</button>
				 </div>
				<div className="form-group">
					<div className="panel panel-default">
						<div className="panel-heading">账号</div>
						<div className="panel-body">
							<Account  ref={(ref) => this.account = ref}/>
						</div>
					</div>


					<div className="panel panel-default">
						<div className="panel-heading">开仓</div>
						<div className="panel-body">
							<TraderlogOpen  ref={(ref) => this.tradeOpen = ref}/>
						</div>
					</div>
					<div className="panel panel-default">
						<div className="panel-heading">出场</div>
						<div className="panel-body">
							<TraderlogClose   ref={(ref) => this.tradeClose = ref}/>
						</div>
					</div>

				</div>


			</div>


		);
	}



});
module.exports =TraderForm;