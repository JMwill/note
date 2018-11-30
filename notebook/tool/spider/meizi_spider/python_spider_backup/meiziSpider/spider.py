import json
import requests
from lxml import html


def save(result):
    with open('./result.json', 'w+') as fd:
        fd.write(json.dumps(result))

def process(content):
    base_path = {
        'page_num': '//span[@class="current-comment-page"]/text()',
        'nextPage': '//a[@class="previous-comment-page"]/@href'
    }
    img_info_path = {
        'original_url': '//a[@class="view_img_link"]/@href',
        'img_up': '//span[contains(@id, "cos_support")]/text()',
        'img_down': '//span[contains(@id, "cos_unsupport")]/text()'
    }
    imgs_path = '//*[@class="commentlist"]//div[@class="text"]'

    tree = html.fromstring(content)
    result = {}
    for key, path in base_path.items():
        result[key] = tree.xpath(path)[0]

    imgs_info = []
    for imgHtml in tree.xpath(imgs_path):
        img_info = {}
        for key, path in img_info_path.items():
            img_info[key] = html.fromstring(
                html.tostring(imgHtml)
            ).xpath(path)[0]
        imgs_info.append(img_info)

    result['imgs_info'] = imgs_info

    return result

def crawl(url, opt):
    req = requests.get(url, **opt['requestOpt'])
    if req.status_code == requests.codes.ok:
        content = req.text
        result = process(content)
        save(result)

