"""This is nester.py module, provide a print_lol function.
This function use to print list and may be this list will
include or not another list."""
def print_lol(the_list):
    """This function take one parameter, it could be any
    Python list object or nest list. Every item in this
    list will be print to the screen line-by-line recursively"""
    for each_item in the_list:
        if isinstance(each_item, list):
            print_lol(each_item)
        else:
            print(each_item)
