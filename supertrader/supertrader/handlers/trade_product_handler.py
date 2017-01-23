from models import trade_product
from data import supertrader_session



class TradeProductHandler:
    def __init__(self):
        self.session = supertrader_session.getSession()
    def addProduct(self,product):
        p = trade_product.TradeProduct()
        self.session.add(p)
    def updateProduct(self,product):
        data = self.session.query(trade_product.TradeProduct).filter_by(id == product.id).fisrt()
        data.name = product.name
        data.nick_name = product.nick_name
        data.desc = product.desc
        self.session.append(data)
    def deleteProduct(self,id):
        data = self.session.query(trade_product.TradeProduct).filter_by(id == id).fisrt()


    def getProductByUserId(self,user_id):
        products = self.session.query(trade_product.TradeProduct).filter_by(user_id==user_id)
        return  products
