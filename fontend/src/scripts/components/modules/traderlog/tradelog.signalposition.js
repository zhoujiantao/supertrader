var React = require('react');

var $ = require('jquery');
var TradelogSignalPosition =React.createClass({
	getInitialState:function(){
		return {type: [

		],
			position:{
				id:0,
				name:''
			}
		};
	} ,
	componentDidMount:function(){
		this.loadPosition();
		//setInterval(this.loadSymbol, 2000);
	},

	loadPosition: function() {
		var me = this;
		$.get('http://localhost:5000/signalposition',function(json){

			me.setState({
				type:json,
				position:{
					id:json[0].id,
					name:json[0].name
				}
			});
		});
	},
	componentDidUpdate:function(){

	},
	handleChange:function(){
		var select = this._select;
		var index = select.selectedIndex;
		var selectValue = select.options[index].value;
		var selectText = select.options[index].text;
		this.setState({
			position:{
				id:selectValue,
				name:selectText
			}
		});
		//console.log(selectText);
		//this.select.focus();
	},


	render:function(){
		var me = this;
		//console.log(this.props.data);

		var Options = this.state.type.map(function(item){

			if(item.id==me.props.selectValue){
				return (
					<option selected="selected" value={item.id}>{item.name}</option>
				);
			}

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



module.exports =TradelogSignalPosition;