from ..module_2_module_2 import say as module_say
# from
def say():
    module_say.say()
    print(__name__)


if __name__ == '__main__':
    say()