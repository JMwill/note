#!/usr/bin/env python
# -*- coding: utf-8 -*-

class Property:

    def __init__(self, square_feet='', beds='', baths='', **kwargs):
        super().__init__(**kwargs)
        self.square_feet = square_feet
        self.num_bedrooms = beds
        self.num_baths = baths

    def display(self):
        print('PROPERTY DETAILS')
        print('=' * 20)
        print('square footage: {}'.format(self.square_feet))
        print('bedrooms: {}'.format(self.num_bedrooms))
        print('bathrooms: {}'.format(self.num_baths))
        print()

    @staticmethod
    def prompt_init():
        return dict(square_feet=input('Enter the square feet: '),
                    beds=input('Enter number of bedroom: '),
                    baths=input('Enter number of baths: '))

    # prompt_init = staticmethod(prompt_init)