import re
import urllib.request
from random import randint
from time import sleep

saveFilePath = './proxy-list.txt'
open(saveFilePath, 'w').close()

items = []
allPageProxys = []
pageUrls = ['http://www.kuaidaili.com/free/inha/' + str(x) + '/' for x in range(1, 10)]

def cleanResult(result):
    return [r for r in result if r]

def saveProxy(results):
    with open(saveFilePath, 'a') as file:
        file.writelines(results)
        # proxyLines = []
        # for lines in results:
            # for line in lines:
                # link = 'http://{0}:{1}\n'
                # file.write(link.format(*line))
                # file.writeline(link)
        #     proxyLines.append('\n'.join(newl for newl in list(map(lambda l: '"' + ':'.join(str(i) for i in l) + '"', lines))))
        # file.write('[' + ','.join(proxyLine for proxyLine in proxyLines) + ']')

def crawl(url):
    with urllib.request.urlopen(url) as f:
        pageContent = f.read().decode('utf-8')
        items.extend(cleanResult(re.findall(r'<tr>[\w\W]+?<\/tr>', pageContent)))
        findProxy(items)

def findProxy(items):
    for i in items:
        ip = re.findall(r'<td data-title="IP">([\.|\d|\w]+)<\/td>', i)
        port = re.findall(r'<td data-title="PORT">([\.|\d|\w]+)<\/td>', i)
        protocol = re.findall(r'<td data-title="类型">([\.|\d|\w]+)<\/td>', i)
        if (ip and port and protocol and protocol[0] == 'HTTP'):
            allPageProxys.append('http://{0}:{1}\n'.format(ip[0], port[0]))

def main():
    for url in pageUrls:
        sleep(randint(5, 20))
        crawl(url)
    saveProxy(allPageProxys)

main()
