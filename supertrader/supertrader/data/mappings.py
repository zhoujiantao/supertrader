import  sys

from sqlalchemy import  Table,Column,Integer,String
from sqlalchemy.orm import mapper


sys.path.append("..")
from models import  trade_product


def create_mapping(metadata):
    trade_product_mapping = Table('trade_product', metadata,
                                  Column('id', Integer, primary_key=True),
                                  Column('name', String(50)),
                                  Column('nick_name', String(50)),
                                  Column('desc', String(100)),
                                  Column('user_id', Integer)
                                  )
    mapper(trade_product.TradeProduct, trade_product_mapping)
