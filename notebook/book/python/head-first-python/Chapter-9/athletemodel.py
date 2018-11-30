import pickle
from athletelist import AthleteList
 
def get_coach_data(filepath):
    try:
        with open(filepath) as f:
            data = f.readline().strip().split(',')
            return AthleteList(data.pop(0), data.pop(0), data)
    except IOError as err:
        print('File error: ' + str(err))
        return None

def put_to_store(files_list):
    all_athletes = {}
    for filepath in files_list:
        athlete = get_coach_data(filepath)
        all_athletes[athlete.name] = athlete
    try:
        with open('athletes.pickle', 'wb') as athf:
            pickle.dump(all_athletes, athf)
    except IOError as err:
        print('File error (put_to_store): ' + str(err))
    return all_athletes

def get_from_store():
    all_athletes = {}
    try:
        with open('athletes.pickle', 'rb') as athf:
            all_athletes = pickle.load(athf)
    except IOError as err:
        print('File error (get_from_store): ' + str(err))
    return all_athletes

