import re
import urllib.request
saveFilePath = './proxy-list.txt'
open(saveFilePath, 'w').close()


def cleanResult(result):
    return [r for r in result if r]

def saveProxy(results):
    with open(saveFilePath, 'a') as file:
        proxyLines = []
        for lines in results:
            for line in lines:
                link = 'http://{0}:{1}\n'
                file.write(link.format(*line))
                # file.writeline(link)
        #     proxyLines.append('\n'.join(newl for newl in list(map(lambda l: '"' + ':'.join(str(i) for i in l) + '"', lines))))
        # file.write('[' + ','.join(proxyLine for proxyLine in proxyLines) + ']')

pageUrls = [
    'http://proxy.com.ru/list_1.html',
    'http://proxy.com.ru/list_2.html',
    'http://proxy.com.ru/list_3.html'
]

allPageProxys = []
for url in pageUrls:
    with urllib.request.urlopen(url) as f:
        pageContent = f.read().decode('latin-1')
        allPageProxys.append(cleanResult(re.findall(r'<td>([\d|\.]+)<\/td><td>(\d+)<\/td>', pageContent)))

saveProxy(allPageProxys)
