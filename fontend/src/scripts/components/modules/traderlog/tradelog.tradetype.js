var React = require('react');

var $ = require('jquery');
var TradelogTradetype =React.createClass({
	getInitialState:function(){
		return {
			type: [

		],
			openType:{
				openType:'',
				openTypeName:''
			}
		};
	} ,
	componentDidMount:function(){
		this.loadSymbol();
		//setInterval(this.loadSymbol, 2000);
	},

	loadSymbol: function() {
		var me = this;
		$.get('http://localhost:5000/tradesignal',function(json){

			me.setState({
				type:json,
				openType:{
					openType:json[0].id,
					openTypeName:json[0].name
				}
			});

		});
	},
	handleChange:function(e){

		var select = e.target;
		var index = select.selectedIndex;
		var selectValue = select.options[index].value;
		var selectText = select.options[index].text;
		this.setState({
			openType:{
				openType:selectValue,
				openTypeName:selectText
			}
		});

		//console.log(selectText);
		//this.select.focus();
	},

	render:function(){
		var me = this;
		//console.log(this.props.data);
		var Options = this.state.type.map(function(item){
			/**
			if(item.id==me.props.openType.openType){
				return (
					<option  selected="selected" value={item.id}>{item.name}_{item.category}</option>
				);
			}
			 ***/
			return (
				<option data-key={item.id} value={item.id}>{item.name}_{item.category}</option>
			);
		});

		return (
			<select onChange={this.handleChange}  className="form-control">
				{Options}
			</select>

		);

	}
});



module.exports =TradelogTradetype;