#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import shutil
import json
from datetime import datetime

with open('./_config.json', 'r') as f:
    _config = json.load(f)


def get_sys_size(path='/'):
    try:
        return shutil.disk_usage(path)
    except AttributeError:
        statvfs = os.statvfs(path)
        total_size = statvfs.f_frsize * statvfs.f_blocks
        free_size = statvfs.f_frsize * statvfs.f_bfree
        avail_size = statvfs.f_frsize * statvfs.f_bavail
        return (total_size, free_size, avail_size,)


def get_human_readable_size(sizes):
    div_num = pow(1024, 3)
    return (sizes[0] / div_num, sizes[1] / div_num, sizes[2] / div_num)


def archive_folder(archive_folder_path):
    time_str = '-'.join(str(datetime.now()).split(' ')).split('.')[0]
    output_path = os.path.abspath('../resource/image_archive-{}'.format(time_str))
    shutil.make_archive(output_path, 'zip', archive_folder_path)


def remind(sizes):
    from smtplib import SMTP_SSL
    from email.mime.text import MIMEText
    from email.header import Header

    smtp = SMTP_SSL(_config['mail_info']['hostname'])

    smtp.set_debuglevel(1)
    smtp.ehlo(_config['mail_info']['hostname'])
    smtp.login(_config['mail_info']['username'], _config['mail_info']['password'])

    msg = MIMEText(_config['mail_info']['mail_text'].format(sizes[2]), 'plain', _config['mail_info']['mail_encoding'])
    msg['Subject'] = Header(_config['mail_info']['mail_subject'], _config['mail_info']['mail_encoding'])
    msg['From'] = _config['mail_info']['from']
    msg['To'] = _config['mail_info']['to']

    smtp.sendmail(_config['mail_info']['from'], _config['mail_info']['to'], msg.as_string())
    smtp.quit()


def main():
    sizes = get_human_readable_size(get_sys_size())
    if sizes[2] < _config['min_size']:
        remind(sizes)
        archive_folder('/home/ubuntu/image_store')
    else:
        time_str = '-'.join(str(datetime.now()).split(' ')).split('.')[0]
        try:
            with open(_config['log_path'], 'r+') as f:
                lines = f.readlines()
                f.seek(0)
                if len(lines) > 10:
                    lines = lines[len(lines) - 10:]
                lines.append('{}: Rest size: {}\n'.format(time_str, sizes[2]))
                f.writelines(lines)
                f.truncate()
        except FileNotFoundError as e:
            with open(_config['log_path'], 'w') as f:
                f.write('{}: Rest size: {}\n'.format(time_str, sizes[2]))

if __name__ == '__main__':
    main()
