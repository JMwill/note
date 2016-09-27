Q1: 如何破解WingIDE

激活时输入ID：CN123-12345-12345-12345，然后将显示界面的request code复制替换到破解脚本的request code处，运行脚本后将得到的值输入到框中，选择continue。

破解脚本：

```
import sha
import string
BASE2 = '01'
BASE10 = '0123456789'
BASE16 = '0123456789ABCDEF'
BASE30 = '123456789ABCDEFGHJKLMNPQRTVWXY'
BASE36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
BASE62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz'
BASEMAX = string.printable
def BaseConvert(number, fromdigits, todigits, ignore_negative = True):
    """ converts a "number" between two bases of arbitrary digits
     
    The input number is assumed to be a string of digits from the
    fromdigits string (which is in order of smallest to largest
    digit). The return value is a string of elements from todigits
    (ordered in the same way). The input and output bases are
    determined from the lengths of the digit strings. Negative 
    signs are passed through.
     
    decimal to binary
    >>> baseconvert(555,BASE10,BASE2)
    '1000101011'
     
    binary to decimal
    >>> baseconvert('1000101011',BASE2,BASE10)
    '555'
     
    integer interpreted as binary and converted to decimal (!)
    >>> baseconvert(1000101011,BASE2,BASE10)
    '555'
     
    base10 to base4
    >>> baseconvert(99,BASE10,"0123")
    '1203'
     
    base4 to base5 (with alphabetic digits)
    >>> baseconvert(1203,"0123","abcde")
    'dee'
     
    base5, alpha digits back to base 10
    >>> baseconvert('dee',"abcde",BASE10)
    '99'
     
    decimal to a base that uses A-Z0-9a-z for its digits
    >>> baseconvert(257938572394L,BASE10,BASE62)
    'E78Lxik'
     
    ..convert back
    >>> baseconvert('E78Lxik',BASE62,BASE10)
    '257938572394'
     
    binary to a base with words for digits (the function cannot convert this back)
    >>> baseconvert('1101',BASE2,('Zero','One'))
    'OneOneZeroOne'
     
    """
    if not ignore_negative and str(number)[0] == '-':
        number = str(number)[1:]
        neg = 1
    else:
        neg = 0
    x = long(0)
    for digit in str(number):
        x = x * len(fromdigits) + fromdigits.index(digit)
 
    res = ''
    while x > 0:
        digit = x % len(todigits)
        res = todigits[digit] + res
        x /= len(todigits)
 
    if neg:
        res = '-' + res
    return res
 
def SHAToBase30(digest):
    """Convert from a hexdigest form SHA hash into a more compact and
    ergonomic BASE30 representation.  This results in a 17 'digit' 
    number."""
    tdigest = ''.join([ c for i, c in enumerate(digest) if i / 2 * 2 == i ])
    result = BaseConvert(tdigest, BASE16, BASE30)
    while len(result) < 17:
        result = '1' + result
 
    return result
def AddHyphens(code):
    """Insert hyphens into given license id or activation request to
    make it easier to read"""
    return code[:5] + '-' + code[5:10] + '-' + code[10:15] + '-' + code[15:]
 
LicenseID='CN123-12345-12345-12345'
#Copy the Request Code from the dialog
RequestCode='RL539-Y89TE-A7531-PQCKA'
hasher = sha.new()
hasher.update(RequestCode)
hasher.update(LicenseID)
digest = hasher.hexdigest().upper()
lichash = RequestCode[:3] + SHAToBase30(digest)
lichash=AddHyphens(lichash)
 
#Calculate the Activation Code
data=[7,123,23,87]
tmp=0
realcode=''
for i in data:
    for j in lichash:
        tmp=(tmp*i+ord(j))&0xFFFFF
    realcode+=format(tmp,'=05X')
    tmp=0
 
act30=BaseConvert(realcode,BASE16,BASE30)
while len(act30) < 17:
    act30 = '1' + act30
act30='AXX'+act30
act30=AddHyphens(act30)
print "The Activation Code is: "+act30
```

***

Q2: python模块引入问题

python只会引入一次模块，因此想要在模块更新后引入新的模块，可以重启函数或者使用`importlib`模块来引入`importlib.reload(modulename)`

***

Q3: 如何动态修改PYTHONPATH

```
import sys
sys.path.append('/lib/path/you/want')
```

Q4: python引用本地模块

```
from . import something # 从当前组件引入something
from .. import something # 从父级组件引入something
from ..module import something # 从父级的module组件引入something
```
