#-*- coding: utf-8 -*-
import requests
import time
import random
import shelve
from bs4 import BeautifulSoup

CONSTANTS = {
    'AGENT_SOURCE_ADDRESS': 'https://developers.whatismybrowser.com/useragents/explore/software_type_specific/web-browser/',
    'MAX_SLEEP_TIME': 2,
    'SHELVE_STORAGE_NAME': 'agent_storage',
    'MAX_CRAWL_PAGE': 10,
    'DB_NAME': 'db',
}

def requests_agent(total_page=10, max_sleep_time=0):
    payload = {
        'order': '-times_seen',
    }

    for i in range(1, total_page + 1):
        print('crawling page {0}'.format(i))
        if max_sleep_time > 0:
            sleep_time = random.randint(1, max_sleep_time)
            print('sleep {0} seconds'.format(sleep_time))
            time.sleep(sleep_time)
        yield requests.get(CONSTANTS['AGENT_SOURCE_ADDRESS'] + str(i), params=payload)


def save_agent(agent_type, agent):
    with shelve.open(CONSTANTS['DB_NAME'], writeback=True) as db:
        storage_name = CONSTANTS['SHELVE_STORAGE_NAME']
        if (type(db.get(storage_name)) != dict):
            db[storage_name] = {}
        if type(db[storage_name].get(agent_type)) == list:
            db[storage_name][agent_type].append(agent)
            db[storage_name][agent_type] = list(set(db[storage_name][agent_type]))
        else:
            db[storage_name][agent_type] = [agent]


def process_agent_page(page):
    soup = BeautifulSoup(page, 'html.parser')
    agent_trs = soup('tr')

    for tr in agent_trs:
        try:
            agent_type = tr('td')[1].get_text()
            agent_str = tr('td')[0].get_text()
        except Exception as err:
            pass
        else:
            save_agent(agent_type, agent_str)



def main():
    save_agent('test', 'useragents')
    max_crawl_page = CONSTANTS['MAX_CRAWL_PAGE']
    sleep_time = CONSTANTS['MAX_SLEEP_TIME']
    agent_pages = requests_agent(max_crawl_page, sleep_time)
    for page in agent_pages:
        process_agent_page(page.text)

if __name__ == '__main__':
    print('launching user agent crawl process...')
    try:
        main()
    except Exception as err:
        print(err)
        print('process encount problem !!!')
    print('finish process !')
