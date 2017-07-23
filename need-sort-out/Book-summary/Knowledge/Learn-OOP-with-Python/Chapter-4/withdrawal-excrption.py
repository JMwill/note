#!/usr/bin/env python
# -*- coding: utf-8 -*-

# 普通的异常定义
class InvalidWithdrawal (Exception):
    pass

InvalidWithdrawal('You don\'t have $50 in you account');

# 定制初始函数
class InvalidWithdrawal (Exception):
    def __init__(self, balance, amount):
        super().__init__('account, doesn\'t have ${}'.format(amount))
        self.amount = amount
        self.balance = balance

    def overage(self):
        return self.amount = self.balance

raise InvalidWithdrawal(25, 50)
