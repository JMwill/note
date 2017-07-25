def sanitize(time_string):
    if '-' in time_string:
        spliter = '-'
    elif ':' in time_string:
        spliter = ':'
    else:
        return time_string
    (mins, secs) = time_string.split(spliter)
    return mins + '.' + secs

def get_coach_data(filepath):
    try:
        with open(filepath) as f:
            data = f.readline()
            data = data.strip().split(',')
        return {
            'name': data.pop(0),
            'dob': data.pop(0),
            'times': sorted(set([sanitize(time) for time in data]))[:3]
        }
    except IOError as err:
        print('File error: ' + str(err))
        return None

sarah = get_coach_data('hfpy_ch6_data/sarah2.txt')
james = get_coach_data('hfpy_ch6_data/james2.txt')
julie = get_coach_data('hfpy_ch6_data/julie2.txt')
mikey = get_coach_data('hfpy_ch6_data/mikey2.txt')

print(sarah['name'] + "'s fastest times are: " + str(sarah['times']))
print(james['name'] + "'s fastest times are: " + str(james['times']))
print(julie['name'] + "'s fastest times are: " + str(julie['times']))
print(mikey['name'] + "'s fastest times are: " + str(mikey['times']))

print('\n==========================> line break <============================\n')

# 改进2

class Athlete():
    def __init__(self, name, dob=None, times=[]):
        self.name = name
        self.dob = dob
        self.times = times
    
    def top3(self):
        return sorted(set([sanitize(time) for time in self.times]))[:3]
    
    def add_time(self, data):
        self.times.append(data)

    def add_times(self, data_arr=[]):
        self.times.extend(data_arr)

def get_coach_data(filepath):
    try:
        with open(filepath) as f:
            data = f.readline().strip().split(',')
            return Athlete(data.pop(0), data.pop(0), data)
    except IOError as err:
        print('File error: ' + str(err))
        return None

james = get_coach_data('hfpy_ch6_data/james2.txt')
julie = get_coach_data('hfpy_ch6_data/julie2.txt')
mikey = get_coach_data('hfpy_ch6_data/mikey2.txt')
sarah = get_coach_data('hfpy_ch6_data/sarah2.txt')
print(james.name + "'s fastest times are: " + str(james.top3()))
print(julie.name + "'s fastest times are: " + str(julie.top3()))
print(mikey.name + "'s fastest times are: " + str(mikey.top3()))
print(sarah.name + "'s fastest times are: " + str(sarah.top3()))


# 改进3

print('\n==========================> line break <============================\n')

class Athlete(list):
    def __init__(self, name, dob=None, times=[]):
        list.__init__([])
        self.name = name
        self.dob = dob
        self.extend(times)
    
    def top3(self):
        return sorted(set([sanitize(time) for time in self]))[:3]

james = get_coach_data('hfpy_ch6_data/james2.txt')
julie = get_coach_data('hfpy_ch6_data/julie2.txt')
mikey = get_coach_data('hfpy_ch6_data/mikey2.txt')
sarah = get_coach_data('hfpy_ch6_data/sarah2.txt')
print(james.name + "'s fastest times are: " + str(james.top3()))
print(julie.name + "'s fastest times are: " + str(julie.top3()))
print(mikey.name + "'s fastest times are: " + str(mikey.top3()))
print(sarah.name + "'s fastest times are: " + str(sarah.top3()))
