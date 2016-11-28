from  flask import  Flask,request,make_response,jsonify



from handlers import metadataHandler



app = Flask('supertrader')





@app.route('/api/querySymbol',methods=['GET'])
def querySymbol():
    return  metadataHandler.getSymbolByUserId(0)

@app.route('/api/queryStrategy')
def queryStrategy():
    return jsonify(username='zjt',userid=11);















if __name__=='__main__':
    app.run()