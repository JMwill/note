#include <stdio.h>
#include "calc.h"
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