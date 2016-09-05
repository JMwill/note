import json
from meiziSpider import spider

ENTRY_URL = 'http://www.jandan.net/ooxx'

DEFAULT_HEADERAS = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
}

options = {
   'requestOpt': {
        'timeout': 20,
        'headers': DEFAULT_HEADERAS
    },
    'proxy': True
}


spider.crawl(ENTRY_URL, options)

