from cursor import Cursor
from character import Character
class Document:
    def __init__(self):
        self.characters = []
        self.cursor = Cursor(self)
        self.filename = '';

    def insert(self, character):
        if not hasattr(character, 'character'):
            character = Character(character)
        self.characters.insert(self.cursor.position, character)
        self.cursor.forward()

    def delete(self):
        del self.characters[self.cursor.position]

    def save(self):
        f = open(self.filename, 'w')
        f.write(''.join(self.characters))
        f.close()

    @property
    def string(self):
        return ''.join((str(c) for c in self.characters))
