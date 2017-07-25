file_store = {
    'james_data': 'hfpy_ch5_data/james.txt',
    'julie_data': 'hfpy_ch5_data/julie.txt',
    'mikey_data': 'hfpy_ch5_data/mikey.txt',
    'sarah_data': 'hfpy_ch5_data/sarah.txt'
}

def make_time_list(file_path):
    try:
        with open(file_path) as file:
            return file.readline().strip().split(',')
    except IOError as err:
        print('Open ' + file_path + ' with error: ' + str(err))

def sanitize(data):
    return data.replace(':', '.').replace('-', '.')

data_store = {
    k: sorted([sanitize(time) for time in make_time_list(v)]) for (k, v) in file_store.items() # 复制排序, 用列表的[].sort()可以进行原地排序
}

unique_store = {}
for (k, v) in data_store.items():
    unique_store[k] = list(set(v))[:3] # 集合将数据进行过滤

for v in unique_store.values():
    print(v)