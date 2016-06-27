var React = require('react');

var $ = require('jquery');
var Account =React.createClass({
	getInitialState:function(){
		return {type: [

		],
			account:{
				accountId:'',
				accountName:''
			}
		};
	} ,
	componentDidMount:function(){
		this.loadSymbol();
		//setInterval(this.loadSymbol, 2000);
	},

	loadSymbol: function() {
		var me = this;
		$.get('http://localhost:5000/account',function(json){

			me.setState({
				type:json,
				account:{
					accountId:json[0].id,
					accountName:json[0].accountName
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
			account:{
				accountId:selectValue,
				accountName:selectText
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
					<option selected="selected" value={item.id}>{item.accountName}</option>
				);
			}

			return (
				<option value={item.id}>{item.accountName}</option>
			);
		});

		return (
			<select ref={(c) => this._select = c}  onChange={this.handleChange} className="form-control">
				{Options}
			</select>
		);

	}
});



module.exports =Account;