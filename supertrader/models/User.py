from sqlalchemy  import Column, Integer,String



class User(object):
    def __init__(self):
        self.email = ''
        self.showName = ''
        self.pwd = '',
        self.registerTime = ''

