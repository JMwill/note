man = []
other = []
try:
    data = open('sketch.txt')
    for each_line in data:
        try:
            (role, line_spoken) = each_line.split(':', 1)
            line_spoken.strip()
            if role == 'Man':
                man.append(line_spoken)
            elif role == 'Other Man':
                other.append(line_spoken)
        except ValueError:
            pass
    data.close()
except IOError:
    print('The datafile is missing')

try:
    man_file = open('man_data.txt', 'w')
    other_file = open('other_data.txt', 'w')

    print(man, file=man_file)
    print(other, file=other_file)

except IOError as err:
    print('File Error.' + str(err))

finally:
    if 'man_file' in locals():
        man_file.close()
    if 'other_file' in locals():
        other_file.close()


# 用with重写

try:
    with open('man_data.txt', 'w') as man_file:
        print(man, file=man_file)
    with open('other_data.txt', 'w') as other_file:
        print(other, file=other_file)
except IOError as err:
    print('File err: ' + str(err))

# 或者
try:
    with open('man_data.txt', 'w') as man_file, open('other_data.txt', 'w') as other_file:
        print(man, file=man_file)
        print(other, file=other_file)
except IOError as err:
    print('File err: ' + str(err))


# 以对应格式保存数据
import pickle
man = []
other = []
try:
    with open('sketch.txt') as data:
        for each_line in data:
            try:
                (role, line_spoken) = each_line.split(':', 1)
                line_spoken.strip()
                if role == 'Man':
                    man.append(line_spoken)
                elif role == 'Other Man':
                    other.append(line_spoken)
            except ValueError:
                pass
except IOError:
    print('The datafile is missing')

try:
    with open('man_data.txt', 'wb') as man_file, open('other_data.txt', 'wb') as other_file: # 使用pickle时需要以rb或者wb的方式打开文件
        pickle.dump(man, man_file)
        pickle.dump(other, other_file)
except IOError as err:
    print('File error: ' + str(err))
except pickle.PickleError as err:
    print('Pickle error: ' + str(err))