# -*- coding: utf-8 -*-
import re
import hashlib
import scrapy
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule

from meizi.items import MeiziItem


class MeiziImgSpider(CrawlSpider):
    name = 'meizi_img'
    allowed_domains = ['jandan.net']
    start_urls = ['http://jandan.net/ooxx']

    rules = (
        Rule(LinkExtractor(allow=r'Items/'), callback='parse', follow=False),
    )

    def _get_page_num(self, response):
        numStr = response.xpath('//span[@class="current-comment-page"]/text()').extract_first()
        return int(re.findall(
            r'\d+',
            numStr
        )[0]) if numStr else 0

    def _gen_md5(self, s):
        md5 = hashlib.md5()
        md5.update(s)
        return md5.hexdigest()

    def parse(self, response):
        totalPage = self._get_page_num(response)
        for page in range(1, 2):
            pageUrl = response.urljoin('ooxx/page-' + str(page))
            yield scrapy.Request(pageUrl, callback=self.parse_page)

    def parse_page(self, response):
        pageNum = self._get_page_num(response)
        imgInfos = response.xpath('//ol[@class="commentlist"]/li[contains(@id, "comment")]')

        for index, info in enumerate(imgInfos):
            imgUrl = info.css('a.view_img_link::attr(href), div.text img::attr(src)').extract()
            if len(imgUrl):
                imgUrl = '; '.join(imgUrl).encode('utf-8')
                item    = MeiziItem()
                item['page_num']    = pageNum
                item['img_url']     = imgUrl.decode('utf-8')
                item['img_md5']     = self._gen_md5(imgUrl)
                item['up_vote']     = info.css('span[id^=cos_support]::text').extract_first()
                item['up_vote']     = int(item['up_vote']) if item['up_vote'] else 0
                item['down_vote']   = info.css('span[id^=cos_unsupport]::text').extract_first()
                item['down_vote']   = int(item['down_vote']) if item['down_vote'] else 0
                yield item
