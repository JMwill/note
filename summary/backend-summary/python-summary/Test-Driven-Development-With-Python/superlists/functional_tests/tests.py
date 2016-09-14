from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time


class NewVisitorTest(LiveServerTestCase):
    """Web Application visitor"""
    def setUp(self):
        self.browser = webdriver.Firefox()
        # self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def check_for_row_in_list_table(self, row_text):
        table = self.browser.find_element_by_id('id_list_table')
        rows = table.find_elements_by_tag_name('tr')
        self.assertIn(row_text, [row.text for row in rows])

    def test_can_start_a_list_and_retrieve_it_later(self):
        # 访问应用首页
        self.browser.get(self.live_server_url)

        # 首页标题以及头部都具有“To-Do”这个词
        self.assertIn('To-Do', self.browser.title)
        header_text = self.browser.find_element_by_tag_name('h1').text
        self.assertIn('To-Do', header_text)

        # 应用邀请用户输入一个待办事项
        inputbox = self.browser.find_element_by_id('id_new_item')
        self.assertEqual(
            inputbox.get_attribute('placeholder'),
            'Enter a to-do item'
        )

        # 用户在文本框中输入“Buy peacock feathers”（购买孔雀羽毛）
        # 用户的爱好是使用假蝇做饵钓鱼
        inputbox.send_keys('Buy peacock feathers')

        # 用户按下回车键后，被带到一个新URL
        # 这个页面的待办事项表格中显示“1: Buy peacock feathers”
        inputbox.send_keys(Keys.ENTER)
        edith_list_url = self.browser.current_url
        self.assertRegex(edith_list_url, '/lists/.+')
        self.check_for_row_in_list_table('1: Buy peacock feathers')

        # 页面中又显示了一个文本框，可以输入其他的待办事项
        # 用户输入了“Use peacock feathers to make fly”（使用孔雀羽毛做假蝇）
        inputbox = self.browser.find_element_by_id('id_new_item')
        inputbox.send_keys('Use peacock feathers to make fly')
        inputbox.send_keys(Keys.ENTER)

        # 页面再次更新，用户清单上显示两个待办事项
        self.check_for_row_in_list_table('1: Buy peacock feathers')
        self.check_for_row_in_list_table('2: Use peacock feathers to make fly')

        ## 我们使用一个新浏览器回话
        ## 确保最开始的用户的信息不会从cookie中泄露出来
        self.browser.quit()
        self.browser = webdriver.Firefox()

        # 现在，另一个用户（Tom）访问首页
        # 页面在中看不到前一个用户的清单
        self.browser.get(self.live_server_url)
        page_text = self.browser.find_element_by_tag_name('body').text
        self.assertNotIn('Buy peacock feathers', page_text)
        self.assertNotIn('make a fly', page_text)

        # Tom输入一个新待办事项，新建一个清单
        inputbox = self.browser.find_element_by_id('id_new_item')
        inputbox.send_keys('Buy milk')
        inputbox.send_keys(Keys.ENTER)

        # Tom获得了他的唯一URL
        tom_list_url = self.browser.current_url
        self.assertRegex(tom_list_url, '/lists/.+')
        self.assertNotEqual(tom_list_url, edith_list_url)

        # 这个页面还是没有最开始的用户的清单
        page_text = self.browser.find_element_by_tag_name('body').text
        self.assertNotIn('Buy peacock feathers', page_text)
        self.assertIn('Buy milk', page_text)

        # 用户结束查看网站，退出了网站
