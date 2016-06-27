var React = require('react');

var $ = require('jquery');
var TradeSymbol =React.createClass({
	getInitialState:function(){
		return {
			symbol: [],
			selectedSymbol:{
				symbolId:'',
				symbolName:''
			}
		};
	} ,
	componentDidMount:function(){
		this.loadSymbol();
		//setInterval(this.loadSymbol, 2000);
	},
	componentDidUpdate:function(){

	},

	loadSymbol: function() {
		var me = this;
		$.get('http://localhost:5000/symbol',function(json){

			me.setState({
				symbol:json,
				selectedSymbol:{
					symbolId:json[0].id,
					symbolName:json[0].name
				}

			});

		});
	},
	handleChange:function(){
		var select = this._select;
		var index = select.selectedIndex;
		var selectValue = select.options[index].value;
		var selectText = select.options[index].text;
		this.setState({
			selectedSymbol:{
				symbolId:selectValue,
				symbolName:selectText
			}
		});
		//console.log(selectText);
		//this.select.focus();
	},


	render:function(){
		var me = this;
		//console.log(this.props.data);
		var Options = this.state.symbol.map(function(item){
			 /**
			if(item.id==me.props.selectedSymbol.symbolId){
				return (
					<option selected="selected" value={item.id}>{item.name}</option>
				);
			}
			  ***/
			return (
				<option value={item.id}>{item.name}</option>
			);
		});

		return (
			<select ref={(c) => this._select = c}  onChange={this.handleChange} className="form-control">
				{Options}
			</select>
		);

	}
});



module.exports =TradeSymbol;