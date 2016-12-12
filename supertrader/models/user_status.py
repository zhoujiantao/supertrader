class UserStatus(object):
    def __init(self):
        self.user_id= 0
        #是否是当前状态
        self.current = 0
        #状态类型 0试用 1 付费教育 2 付费普通
        self.type = 0
        #使用的系统版本，0 basic 1 pro 2 utmate
        self.systemType=0
        #修改时间
        self.changeTime = 0
        #到期时间
        self.expireTime = 0
