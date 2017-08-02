from cursor import Cursor
class Document:
    def __init__(self):
        self.characters = []
        self.cursor = Cursor(self)
        self.filename = '';

    def insert(self, character):
        self.characters.insert(self.cursor.position, character)
        self.cursor += 1

    def delete(self):
        del self.characters[self.cursor.position]

    def save(self):
        f = open(self.filename, 'w')
        f.write(''.join(self.characters))
        f.close()

    def forward(self):
        self.cursor += 1

    def back(self):
        self.cursor -= 1
