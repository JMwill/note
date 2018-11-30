class Point:
    'Represents a point in two-dimensional geometric coordinates'

    def __init__(self, x=0, y=0):
        '''Initialize the position of a new point. The x and y
           coordinates can be...'''
        self.move(x, y)

    def move(self, x, y):
        'Move the point to a new location in two-dimensional space.'
        self.x = x
        self.y = y