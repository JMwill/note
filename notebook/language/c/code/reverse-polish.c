#include <stdio.h>
#include <stdlib.h> // 为了使用 atof() 函数

#define MAXOP 100
#define NUMBER '0'

int getop(char []);
void push(double);
double pop(void);

// 逆波兰计算器
int main() {
    int type;
    double op2;
    char s[MAXOP];

    while ((type = getop(s)) != EOF) {
        switch (type) {
        case NUMBER:
            push(atof(s));
            break;
        case '+':
            push(pop() + pop());
            break;
        case '*':
            push(pop() * pop());
            break;
        case '-':
            op2 = pop(); // 因为计算中操作数顺序有要求
            push(pop() - op2);
            break;
        case '/':
            op2 = pop();
            if (op2 != 0.0)
                push(pop() / op2);
            else
                printf("Error: zero divisor\n");
            break;
        case '\n':
            printf("\t%.8g\n", pop());
            break;
        default:
            printf("Error, unknown command %s\n", s);
            break;
        }
    }
    return 0;
}

#define MAXVAL 100 // 值的最大深度

int sp = 0;
double val[MAXVAL];

// push 函数，将 f 推到数值栈中
void push(double f) {
    if (sp < MAXVAL)
        val[sp++] = f;
    else
    printf("Error, stack full, can't push %g\n", f); // %g 自动使用浮点数或者科学计数法显示结果
}

// pop 函数，弹出并返回栈顶的值
double pop(void) {
    if (sp > 0)
        return val[--sp];
    else {
        printf("Error: stack empty\n");
        return 0.0;
    }
}

#include <ctype.h>

int getch(void);
void ungetch(int);

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