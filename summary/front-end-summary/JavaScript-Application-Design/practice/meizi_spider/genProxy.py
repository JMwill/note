import re
import urllib
saveFilePath = './config/proxy.json'
open(saveFilePath, 'w').close()


def cleanResult(result):
    return [r for r in result if r]

def saveProxy(results):
    with open(saveFilePath, 'a') as file:
        proxyLines = []
        for lines in results:
            proxyLines.append(','.join(newl for newl in list(map(lambda l: '"' + ':'.join(str(i) for i in l) + '"', lines))))
        file.write('[' + ','.join(proxyLine for proxyLine in proxyLines) + ']')

pageUrls = [
    'http://proxy.com.ru/list_1.html',
    'http://proxy.com.ru/list_2.html',
    'http://proxy.com.ru/list_3.html'
]

allPageProxys = []
for url in pageUrls:
    pageContent = urllib.urlopen(url).read()
    allPageProxys.append(cleanResult(re.findall('<td>([\d|\.]+)<\/td><td>(\d+)<\/td>', pageContent)))

saveProxy(allPageProxys)
