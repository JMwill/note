#!/usr/bin/env python
# -*- coding: utf-8 -*-

# 多态实现演示代码
class AudioFile:
    '''Audio class use to play any type audio'''

    def __init__(self, filename):
        if not filename.endswith(self.ext):
            raise Exception('Invalid file format')

        self.filename = filename

class MP3File (AudioFile):
    '''MP3 audio class, create mp3 type audio file'''

    ext = 'mp3'
    def play(self):
        print('playing {} as mp3'.format(self.filename))

class WavFile (AudioFile):
    '''WAV audio class, create wav type audio file'''

    ext = 'wav'
    def play(self):
        print('palying {} as wav'.format(self.filename))

class OggFile (AudioFile):
    '''OGG audio class, create ogg type audio file'''

    ext = 'ogg'
    def play(self):
        print('palying {} as wav'.format(self.filename))


'''test code'''
ogg = OggFile('myfile.ogg')
ogg.play()

mp3 = MP3File('myfile.mp3')
mp3.play()

not_an_map3 = MP3File('myfile.ogg')
not_an_map3.play()

# duck typing realization
class FlacFile:
    def __init__(self, filename):
        if not filename.endswith('.flac'):
            raise Exception('Invalid file format')
        self.filename = filename

    def paly(self):
        print('playing {} as flac'.format(self.filename))