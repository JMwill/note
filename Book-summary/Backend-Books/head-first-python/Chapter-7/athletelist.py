class AthleteList(list):
    def __init__(self, name, dob=None, times=[]):
        list.__init__([])
        self.name = name
        self.dob = dob
        self.extend(times)
    
    def top3(self):
        return sorted(set([sanitize(time) for time in self]))[:3]