#include <stdio.h>
#define BUFSIZE 100
char buf[BUFSIZE]; // ungetch 的缓冲区
int bufp = 0; // 缓冲区中下一个空闲位置

int getch(void) { // 获取可能会有回退操作的字符
    return (bufp > 0) ? buf[--bufp] : getchar();
}

void ungetch(int c) { // 将字符推回到输入端
    if (bufp >= BUFSIZE)
        printf("Ungetch: too many characters\n");
    else
        buf[bufp++] = c;
}
