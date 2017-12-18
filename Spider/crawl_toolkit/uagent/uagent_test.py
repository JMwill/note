import unittest
import requests
import uagent
import shelve
import os


db_name = uagent.CONSTANTS['DB_NAME']

def delDB():
    global db_name
    db_path = os.path.join('./', db_name)
    if os.path.exists(db_path):
        os.remove(db_name)

class TestSaveAllAgent(unittest.TestCase):
    def test_requests_agent(self):
        agent_page_request = uagent.requests_agent(1)
        request_type = type(agent_page_request.__next__())
        self.assertEqual(request_type, requests.models.Response)

    def test_save_agent(self):
        test_agent_type = 'test_agent'
        test_agent_value = 'test_agent_value'
        uagent.save_agent(test_agent_type, test_agent_value)
        global db_name
        storage_name = uagent.CONSTANTS['SHELVE_STORAGE_NAME']
        with shelve.open(db_name) as db:
            self.assertEqual(db[storage_name][test_agent_type][0], test_agent_value)
        delDB()

    def test_process_agent_page(self):
        agent_type = 'Chrome 51'
        agent_value = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.63 Safari/537.36'
        test_str = '''
        <html><body><tr> <td class="useragent"><a href="/useragents/parse/276071-chrome-windows-blink">{0}</a></td> <td title="Chrome 51.0.2704.63">{1}</td> <td>Windows</td> <td>Blink</td> <td>Very common</td> </tr></body></html>
        '''.format(agent_value, agent_type)
        uagent.process_agent_page(test_str)
        global db_name
        storage_name = uagent.CONSTANTS['SHELVE_STORAGE_NAME']
        with shelve.open(db_name) as db:
            self.assertEqual(db.get(storage_name).get(agent_type), [agent_value])
        delDB()


if __name__ == '__main__':
    delDB()
    unittest.main()
