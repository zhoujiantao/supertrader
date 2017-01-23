from sqlalchemy.orm import  sessionmaker
from sqlalchemy import create_engine,MetaData
import  mappings


Session = sessionmaker()


db_connection_str = 'mysql+mysqldb://root@localhost/supertrader?charset=utf8'

engine = create_engine(db_connection_str,echo=False)


metadata = MetaData(engine)



mappings.create_mapping(metadata)

metadata.create_all(engine)



Session.configure(bind=engine)



def getSession():
    return  Session()