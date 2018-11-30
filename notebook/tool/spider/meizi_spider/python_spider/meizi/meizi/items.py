# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class MeiziItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    page_num     = scrapy.Field()
    img_url      = scrapy.Field()
    img_md5      = scrapy.Field()
    up_vote      = scrapy.Field()
    down_vote    = scrapy.Field()

    image_urls   = scrapy.Field()
    images       = scrapy.Field()
