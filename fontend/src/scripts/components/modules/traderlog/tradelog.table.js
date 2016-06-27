var React = require('react');
var $ = require('jquery');



var TraderlogTable  = React.createClass({
	statics:{
		formatDate:function(dateString){
		 //  var date = new Date(Date.parse(dateString));
			//console.log(date);
			return dateString.replace('T',' ');
			//return date.toLocaleDateString()+" "+date.getHours()+":"+date.getMinutes();
		}
	},
	getInitialState:function(){
		return {
			currentPage:1,
			count:0,
			pageSize:10,
			pageCount:0,
			data:[]
		};
	} ,

	loadTable:function(){
		var me  =this;
		$.get('http://localhost:5000/tradelog',function(json){
			for(var i=0,length=json.length;i<length;i++)
			{
				json[i].number = i+1;
				json[i].openTime =TraderlogTable.formatDate(json[i].openTime);
			}
			var pageCount = 0;
			var pageSize = me.state.pageSize;
			 if(length%pageSize==0)
			 {
				 pageCount = length/pageSize;
			 }
			else{
				 pageCount =Math.ceil(length/pageSize);
			 }

			me.setState({
				  pageCount:pageCount,
				  count:length,
				  data:json
			  });
		});
	},
	componentDidMount:function(){
		this.loadTable();
	},
	componentDidUpdate:function(){
		var className="page-"+this.state.currentPage;
		$('tr.currentPage').removeClass('currentPage');
		$('tr.'+className).addClass('currentPage');
	} ,
	handlerPage:function(e){
	   var dom = e.currentTarget;
		var page =parseInt(dom.dataset['page']);
		this.setState({
			currentPage:page
		});

	},
	shouldComponentUpdate:function( nextProps,  nextState){
		 /**
		  if(this.isMounted &&nextState.currentPage==this.state.currentPage)
		 {
			 return false;
		 }
		else{

		 }
		  ***/
		return true;
	},


		render:function() {
		var me =this;
		var TRS =null,pages=[];
		if(this.state.data.length!=0)
		{
			var  i =1,pageIndex=1;
			if(pageIndex==me.state.currentPage)
			{
				pages.push((
					<span><a className="pageIndex-current" onClick={me.handlerPage}  data-page={pageIndex}>{pageIndex}</a></span>
				));
			}
			else{
				pages.push((
					<span><a  onClick={me.handlerPage} data-page={pageIndex}>{pageIndex}</a></span>
				));
			}

			TRS = this.state.data.map(function(item){

				if(i>me.state.pageSize*pageIndex)
				{
					pageIndex++;
					if(pageIndex==me.state.currentPage)
					{
						pages.push((
							<span><a  onClick={me.handlerPage} className="pageIndex-current"  data-page={pageIndex}>{pageIndex}</a></span>
						));
					}
					else{
						pages.push((
							<span><a  onClick={me.handlerPage}  data-page={pageIndex}>{pageIndex}</a></span>
						));
					}



				}
				var className='tr-red page-'+pageIndex;
				if(parseInt(item.profitPips)>0)
				{
					className='tr-green page-'+pageIndex;
				}
				if(pageIndex==me.state.currentPage)
				{
					className+=' currentPage';
				}
				i++;

				return (
					<tr  className={className}>
						<td><input type="checkbox" /></td>
						<td>{item.number}</td>
						<td>{item.symbolName}</td>
						<td>{item.openTime}</td>
						<td>{item.timeRange}</td>
						<td>{item.openTypeName}</td>
						<td>{item.closeTypeName}</td>


						<td>{item.stoplossPips}</td>
						<td>{item.takeProfitPips}</td>
						<td>{item.profitPips}</td>
						<td>{item.openPercentage}</td>
						<td>{item.closePercentage}</td>


					</tr>

				);
			});

		}
		if(TRS==null)
		return (<div>暂无数据</div>);


		return (
			 <div>
			 <table className="table table-bordered">
				  <thead>
				    <tr>
					    <th></th>
					    <th>序号</th>
					    <th>货币对</th>
					    <th>开仓时间</th>
					    <th>持仓时间（h）</th>
					    <th>开仓条件</th>

					    <th>出场条件</th>

					    <th>止损</th>
					    <th>盈利</th>
					    <th>实际盈利</th>
					    <th>开仓风险比</th>
					    <th>实际风险比</th>

				    </tr>
				  </thead>
				  <tbody>
				  {TRS}
				  </tbody>
			 </table>

			 <div className="page">
				 {pages}
			 </div>
			 </div>


		);
	}



});
module.exports =TraderlogTable;