from selenium import webdriver
import unittest


class NewVisitorTest(unittest.TestCase):
    """Web Application visitor"""
    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(3)

    def tearDown(self):
        self.browser.quit()

    def test_can_start_a_list_and_retrieve_it_later(self):
        # 访问应用首页
        self.browser.get('http://localhost:8000')

        # 首页标题以及头部都具有“To-Do”这个词
        self.assertIn('To-Do', self.browser.title)
        self.fail('Finish the test!')

        # 应用邀请用户输入一个待办事项

        # 用户在文本框中输入“Buy peacock feathers”（购买孔雀羽毛）
        # 用户的爱好是使用假蝇做饵钓鱼

        # 用户按下回车键后，页面更新了
        # 待办事项表格中显示“1: Buy peacock feathers”

        # 页面中又显示了一个文本框，可以输入其他的待办事项
        # 用户输入了“Use peacock feathers to make fly”（使用孔雀羽毛做假蝇）

        # 页面再次更新，用户清单上显示两个待办事项

        # 用户想知道网站是否会记住清单内容
        # 用户看到网站为他生成一个文字解说功能

        # 用户访问那个URL，发现待办事项列表还在

        # 用户结束查看网站，退出了网站

if __name__ == "__main__":
    unittest.main()
