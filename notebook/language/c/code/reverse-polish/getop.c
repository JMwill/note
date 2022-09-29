#include <stdio.h>
#include <ctype.h>
#include "calc.h"

// getop 函数，获取下一个字符或者数字操作符
int getop(char s[]) {
    int i, c;
    while ((s[0] = c = getch()) == ' ' || c == '\t')
        ;
    s[1] = '\0';
    if (!isdigit(c) && c != '.')
        return c; // 不是一个数字
    i = 0;

    if (isdigit(c)) // 收集整数部分
        while(isdigit(s[++i] = c = getchar()))
            ;
    if (c == '.') // 收集小数部分
        while(isdigit(s[++i] = c = getchar()))
            ;
    s[i] = '\0';
    if (c != EOF)
        ungetch(c);
    return NUMBER;
}