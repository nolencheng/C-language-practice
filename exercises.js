const EXERCISE_BANK = {
  categories: [
    { id: 'output',    name: '基礎輸出',   icon: '📢', color: '#4CAF50', desc: 'printf 與格式化輸出' },
    { id: 'variables', name: '變數與計算', icon: '🔢', color: '#2196F3', desc: '宣告變數、型別、四則運算' },
    { id: 'condition', name: '條件判斷',   icon: '🔀', color: '#9C27B0', desc: 'if / else / switch' },
    { id: 'loops',     name: '迴圈練習',   icon: '🔁', color: '#FF9800', desc: 'for / while / do-while' },
    { id: 'functions', name: '函式',       icon: '🔧', color: '#F44336', desc: '定義、呼叫、遞迴' },
    { id: 'arrays',    name: '陣列',       icon: '📦', color: '#00BCD4', desc: '一維陣列操作' },
  ],

  problems: {
    output: [
      {
        id: 'out1',
        title: '第一個 C 程式',
        difficulty: 'easy',
        description:
          '在螢幕上印出：\n\nHello, World!\n\n這是所有程式語言的第一個練習。',
        expectedOutput: 'Hello, World!',
        check: (out) => out.trim() === 'Hello, World!',
        template:
`#include <stdio.h>

int main() {
    // 在這裡印出 Hello, World!

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '在 C 語言中，使用 printf() 函式來輸出文字到螢幕。文字內容需要放在雙引號 " " 中間。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '函式呼叫的格式如下，試著填入正確的文字：',
            code: 'printf("______");',
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '將以下程式碼複製到編輯器，觀察輸出後試著自己理解每一行的意義。',
            code:
`#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`,
          },
        ],
      },
      {
        id: 'out2',
        title: '換行輸出',
        difficulty: 'easy',
        description:
          '印出以下三行文字（每行分開）：\n\n第一行\n第二行\n第三行',
        expectedOutput: '第一行\n第二行\n第三行',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines[0] === '第一行' && lines[1] === '第二行' && lines[2] === '第三行';
        },
        template:
`#include <stdio.h>

int main() {
    // 用三個 printf 分別印出三行

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '在 printf 字串中，\\n 是換行符號（escape character）。每次遇到 \\n，游標就會跳到下一行。例如 printf("ABC\\n") 會在 ABC 後面換行。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '每行用一個 printf，在文字後面加上 \\n：',
            code:
`printf("第一行\\n");
printf("______\\n");
printf("______\\n");`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    printf("第一行\\n");
    printf("第二行\\n");
    printf("第三行\\n");
    return 0;
}`,
          },
        ],
      },
      {
        id: 'out3',
        title: '格式化輸出整數',
        difficulty: 'easy',
        description:
          '宣告一個整數變數 age，值為 20，然後印出：\n\n我今年 20 歲\n\n（數字要用變數輸出，不能直接寫字串 "20"）',
        expectedOutput: '我今年 20 歲',
        check: (out) => out.trim() === '我今年 20 歲',
        template:
`#include <stdio.h>

int main() {
    int age = 20;
    // 用 printf 搭配格式符印出

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: 'printf 可以在字串中用「格式符」插入變數值。整數使用 %d 作為格式符，例如：printf("數字是 %d", 42)  會輸出「數字是 42」。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '格式符 %d 會被替換成後面的變數值：',
            code: 'printf("我今年 %d 歲", age);',
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int age = 20;
    printf("我今年 %d 歲", age);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'out4',
        title: '同時輸出多個變數',
        difficulty: 'medium',
        description:
          '宣告兩個變數：\n  int a = 5\n  int b = 3\n\n印出：\n5 + 3 = 8\n\n（三個數字都要用變數或運算式，不能直接寫死）',
        expectedOutput: '5 + 3 = 8',
        check: (out) => out.trim() === '5 + 3 = 8',
        template:
`#include <stdio.h>

int main() {
    int a = 5;
    int b = 3;
    // 印出 "5 + 3 = 8"，數字用變數

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: 'printf 可以在一個字串中放多個 %d，並在後面依序列出對應變數。例如：printf("%d 和 %d", x, y)。計算式 a + b 可以直接寫在 printf 的變數位置。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '一個 printf 放三個格式符：',
            code: 'printf("%d + %d = %d", a, b, a + b);',
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int a = 5;
    int b = 3;
    printf("%d + %d = %d", a, b, a + b);
    return 0;
}`,
          },
        ],
      },
    ],

    variables: [
      {
        id: 'var1',
        title: '計算兩數相加',
        difficulty: 'easy',
        description:
          '宣告兩個整數變數：\n  int x = 12\n  int y = 8\n\n計算它們的總和，儲存在 sum 變數中，然後印出：\n總和為 20',
        expectedOutput: '總和為 20',
        check: (out) => out.trim() === '總和為 20',
        template:
`#include <stdio.h>

int main() {
    int x = 12;
    int y = 8;
    // 宣告 sum 並計算總和

    // 印出結果

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '在 C 語言中，用 = 號指派值給變數：int sum = x + y; 這行宣告 sum 並將 x + y 的結果存入。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`int sum = x + y;
printf("總和為 %d", sum);`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int x = 12;
    int y = 8;
    int sum = x + y;
    printf("總和為 %d", sum);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'var2',
        title: '浮點數計算',
        difficulty: 'easy',
        description:
          '計算圓的面積。已知：\n  半徑 r = 5.0\n  圓周率 PI = 3.14159\n\n公式：面積 = PI × r × r\n\n印出（保留兩位小數）：\n面積為 78.54',
        expectedOutput: '面積為 78.54',
        check: (out) => out.trim() === '面積為 78.54',
        template:
`#include <stdio.h>

int main() {
    float r = 5.0;
    float PI = 3.14159;
    // 計算面積並印出

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '浮點數（小數）使用 float 型別，格式符是 %f。要限制小數位數，用 %.2f 表示「保留 2 位小數」。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`float area = PI * r * r;
printf("面積為 %.2f", area);`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    float r = 5.0;
    float PI = 3.14159;
    float area = PI * r * r;
    printf("面積為 %.2f", area);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'var3',
        title: '整數除法的陷阱',
        difficulty: 'medium',
        description:
          '兩個整數相除，結果會自動捨去小數。\n\n宣告：\n  int a = 7\n  int b = 2\n\n分別印出以下兩行：\n整數除法：3\n浮點除法：3.50\n\n（第一行是 int 相除，第二行要轉型後再除）',
        expectedOutput: '整數除法：3\n浮點除法：3.50',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines[0] === '整數除法：3' && lines[1] === '浮點除法：3.50';
        },
        template:
`#include <stdio.h>

int main() {
    int a = 7;
    int b = 2;
    // 整數除法

    // 浮點除法（提示：用 (float)a 轉型）

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '兩個 int 相除結果仍是 int（小數直接捨去）。若要得到小數結果，需要把其中一個「強制轉型」為 float：(float)a / b。這稱為 type casting（型別轉換）。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`printf("整數除法：%d\\n", a / b);
printf("浮點除法：%.2f\\n", (float)a / b);`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int a = 7;
    int b = 2;
    printf("整數除法：%d\\n", a / b);
    printf("浮點除法：%.2f\\n", (float)a / b);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'var4',
        title: '交換兩個變數的值',
        difficulty: 'medium',
        description:
          '給定：\n  int a = 10\n  int b = 20\n\n交換 a 和 b 的值後印出：\na = 20\nb = 10\n\n（不能直接 a=20、b=10，要透過第三個暫存變數）',
        expectedOutput: 'a = 20\nb = 10',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines[0] === 'a = 20' && lines[1] === 'b = 10';
        },
        template:
`#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    // 使用第三個變數 temp 來交換

    printf("a = %d\\n", a);
    printf("b = %d\\n", b);
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '交換兩個變數需要一個暫存變數（temp）來暫時儲存其中一個值，否則直接指派會覆蓋原來的值。步驟：1. temp = a（備份 a）2. a = b（a 改成 b 的值）3. b = temp（b 改成原來 a 的值）',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`int temp = a;
a = b;
b = temp;`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int temp = a;
    a = b;
    b = temp;
    printf("a = %d\\n", a);
    printf("b = %d\\n", b);
    return 0;
}`,
          },
        ],
      },
    ],

    condition: [
      {
        id: 'cond1',
        title: '判斷正數或負數',
        difficulty: 'easy',
        description:
          '給定 int n = -5\n\n判斷 n 是正數、負數，還是零，印出對應文字：\n  正數 → 印出「正數」\n  負數 → 印出「負數」\n  零  → 印出「零」\n\n目前 n = -5，所以預期輸出：\n負數',
        expectedOutput: '負數',
        check: (out) => out.trim() === '負數',
        template:
`#include <stdio.h>

int main() {
    int n = -5;
    // 判斷 n 的正負

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: 'if / else if / else 結構可以處理多個條件分支。格式：\nif (條件一) { ... }\nelse if (條件二) { ... }\nelse { ... }\n先判斷 n > 0，再判斷 n < 0，其餘情況就是 0。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`if (n > 0) {
    printf("正數");
} else if (n < 0) {
    printf("______");
} else {
    printf("零");
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int n = -5;
    if (n > 0) {
        printf("正數");
    } else if (n < 0) {
        printf("負數");
    } else {
        printf("零");
    }
    return 0;
}`,
          },
        ],
      },
      {
        id: 'cond2',
        title: '判斷奇數或偶數',
        difficulty: 'easy',
        description:
          '給定 int num = 7\n\n判斷 num 是奇數還是偶數，印出：\n  偶數 → 「7 是偶數」\n  奇數 → 「7 是奇數」\n\n預期輸出：\n7 是奇數',
        expectedOutput: '7 是奇數',
        check: (out) => out.trim() === '7 是奇數',
        template:
`#include <stdio.h>

int main() {
    int num = 7;
    // 判斷奇偶（提示：用 % 取餘數）

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '判斷奇偶數的關鍵：用取餘數運算子 %。\n  num % 2 == 0  →  偶數\n  num % 2 != 0  →  奇數\n（任何整數除以 2 餘 0 就是偶數）',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`if (num % 2 == 0) {
    printf("%d 是偶數", num);
} else {
    printf("%d 是奇數", num);
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int num = 7;
    if (num % 2 == 0) {
        printf("%d 是偶數", num);
    } else {
        printf("%d 是奇數", num);
    }
    return 0;
}`,
          },
        ],
      },
      {
        id: 'cond3',
        title: '找兩數中的最大值',
        difficulty: 'medium',
        description:
          '給定：\n  int a = 15\n  int b = 27\n\n找出較大的數並印出：\n最大值為 27',
        expectedOutput: '最大值為 27',
        check: (out) => out.trim() === '最大值為 27',
        template:
`#include <stdio.h>

int main() {
    int a = 15;
    int b = 27;
    int max;
    // 判斷哪個比較大，存入 max

    printf("最大值為 %d", max);
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '用 if / else 比較 a 和 b：\n  如果 a > b，max = a\n  否則，max = b\n\n或者也可以用三元運算子：max = (a > b) ? a : b;',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '兩種寫法都可以：',
            code:
`// 寫法一：if/else
if (a > b) {
    max = a;
} else {
    max = b;
}

// 寫法二：三元運算子（選一種即可）
max = (a > b) ? a : b;`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int a = 15;
    int b = 27;
    int max;
    if (a > b) {
        max = a;
    } else {
        max = b;
    }
    printf("最大值為 %d", max);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'cond4',
        title: '成績等第判斷',
        difficulty: 'medium',
        description:
          '給定 int score = 82\n\n根據分數判斷等第並印出：\n  90~100 → A\n  80~89  → B\n  70~79  → C\n  60~69  → D\n  0~59   → F\n\n預期輸出：\nB',
        expectedOutput: 'B',
        check: (out) => out.trim() === 'B',
        template:
`#include <stdio.h>

int main() {
    int score = 82;
    // 判斷等第

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '使用多個 else if 來處理多個分數區間。注意要從高分判斷到低分（或反過來），確保每個條件只有一個分支會被執行。\n\n也可以考慮用 score / 10 來簡化：如果結果是 9 或 10 就是 A，8 是 B，等等。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`if (score >= 90) {
    printf("A");
} else if (score >= 80) {
    printf("B");
} else if (score >= 70) {
    printf("______");
} else if (score >= 60) {
    printf("______");
} else {
    printf("F");
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int score = 82;
    if (score >= 90) {
        printf("A");
    } else if (score >= 80) {
        printf("B");
    } else if (score >= 70) {
        printf("C");
    } else if (score >= 60) {
        printf("D");
    } else {
        printf("F");
    }
    return 0;
}`,
          },
        ],
      },
    ],

    loops: [
      {
        id: 'loop1',
        title: '印出 1 到 5',
        difficulty: 'easy',
        description:
          '使用 for 迴圈，依序印出 1 到 5，每個數字一行：\n1\n2\n3\n4\n5',
        expectedOutput: '1\n2\n3\n4\n5',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines.length === 5 && lines.every((l, i) => l === String(i + 1));
        },
        template:
`#include <stdio.h>

int main() {
    // 用 for 迴圈印出 1 到 5

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: 'for 迴圈語法：\nfor (初始值; 條件; 每次遞增) { ... }\n\n例如：for (int i = 1; i <= 5; i++) 會讓 i 從 1 數到 5，每次加 1。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 1; i <= 5; i++) {
    printf("%d\\n", i);
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d\\n", i);
    }
    return 0;
}`,
          },
        ],
      },
      {
        id: 'loop2',
        title: '計算 1 到 10 的總和',
        difficulty: 'easy',
        description:
          '使用迴圈計算 1 + 2 + 3 + ... + 10 的總和，印出：\n總和 = 55',
        expectedOutput: '總和 = 55',
        check: (out) => out.trim() === '總和 = 55',
        template:
`#include <stdio.h>

int main() {
    int sum = 0;
    // 用迴圈累加 1 到 10

    printf("總和 = %d", sum);
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '「累加」的技巧：宣告一個 sum 變數初始為 0，每次迴圈執行 sum = sum + i（或簡寫為 sum += i）。迴圈結束後 sum 就是總和。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 1; i <= 10; i++) {
    sum += i;  // 等同於 sum = sum + i
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("總和 = %d", sum);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'loop3',
        title: '印出星號三角形',
        difficulty: 'medium',
        description:
          '用巢狀迴圈印出高度為 4 的星號三角形：\n*\n**\n***\n****',
        expectedOutput: '*\n**\n***\n****',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines.length === 4 && lines.every((l, i) => l === '*'.repeat(i + 1));
        },
        template:
`#include <stdio.h>

int main() {
    // 用巢狀 for 迴圈印出三角形
    // 外層迴圈控制行數（1到4）
    // 內層迴圈控制每行的星號數量

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '「巢狀迴圈」是迴圈裡面再放一個迴圈。\n外層迴圈 i 從 1 到 4（代表行數）。\n內層迴圈 j 從 1 到 i（第 i 行印 i 個星號）。\n每行印完後用 printf("\\n") 換行。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++) {
        printf("*");
    }
    printf("\\n");
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    for (int i = 1; i <= 4; i++) {
        for (int j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
          },
        ],
      },
      {
        id: 'loop4',
        title: 'while 迴圈：倒數計時',
        difficulty: 'medium',
        description:
          '使用 while 迴圈從 5 倒數到 1，然後印出「發射！」：\n5\n4\n3\n2\n1\n發射！',
        expectedOutput: '5\n4\n3\n2\n1\n發射！',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines.length === 6 &&
            lines[0] === '5' && lines[1] === '4' && lines[2] === '3' &&
            lines[3] === '2' && lines[4] === '1' && lines[5] === '發射！';
        },
        template:
`#include <stdio.h>

int main() {
    int count = 5;
    // 用 while 迴圈倒數

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: 'while 迴圈語法：while (條件) { ... }\n\n倒數時，從 count = 5 開始，條件是 count >= 1，每次印出 count 後將 count 減 1（count-- 或 count -= 1）。迴圈結束後再印出「發射！」。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`while (count >= 1) {
    printf("%d\\n", count);
    count--;
}
printf("發射！");`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int count = 5;
    while (count >= 1) {
        printf("%d\\n", count);
        count--;
    }
    printf("發射！");
    return 0;
}`,
          },
        ],
      },
    ],

    functions: [
      {
        id: 'fn1',
        title: '定義並呼叫函式',
        difficulty: 'easy',
        description:
          '定義一個名為 greet 的函式，不接受參數，不回傳值，呼叫後印出：\n你好，歡迎學習 C 語言！\n\n在 main 中呼叫此函式。',
        expectedOutput: '你好，歡迎學習 C 語言！',
        check: (out) => out.trim() === '你好，歡迎學習 C 語言！',
        template:
`#include <stdio.h>

// 在這裡定義 greet 函式


int main() {
    greet();  // 呼叫函式
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '函式定義的格式：\n回傳型別 函式名稱(參數) {\n    // 函式內容\n}\n\n不回傳值用 void，不接受參數括號留空或寫 void。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`void greet() {
    printf("你好，歡迎學習 C 語言！");
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

void greet() {
    printf("你好，歡迎學習 C 語言！");
}

int main() {
    greet();
    return 0;
}`,
          },
        ],
      },
      {
        id: 'fn2',
        title: '有回傳值的函式',
        difficulty: 'easy',
        description:
          '定義函式 int multiply(int a, int b)，回傳 a × b。\n\n在 main 中計算 6 × 7，印出：\n6 x 7 = 42',
        expectedOutput: '6 x 7 = 42',
        check: (out) => out.trim() === '6 x 7 = 42',
        template:
`#include <stdio.h>

// 定義 multiply 函式（接受兩個整數，回傳它們的乘積）


int main() {
    int result = multiply(6, 7);
    printf("6 x 7 = %d", result);
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '函式要有回傳值時，回傳型別不寫 void，改寫型別名稱（如 int）。函式內用 return 語句回傳值。\n例如：return a * b; 會把 a 乘以 b 的結果傳回給呼叫者。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`int multiply(int a, int b) {
    return a * b;
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int multiply(int a, int b) {
    return a * b;
}

int main() {
    int result = multiply(6, 7);
    printf("6 x 7 = %d", result);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'fn3',
        title: '函式參數：判斷最大值',
        difficulty: 'medium',
        description:
          '定義函式 int max(int a, int b)，回傳兩數中較大的一個。\n\n在 main 中呼叫 max(18, 45)，印出：\n最大值是 45',
        expectedOutput: '最大值是 45',
        check: (out) => out.trim() === '最大值是 45',
        template:
`#include <stdio.h>

// 定義 max 函式


int main() {
    printf("最大值是 %d", max(18, 45));
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '函式內部可以用 if / else 來決定回傳哪個值。也可以用三元運算子讓程式碼更簡潔：\nreturn (a > b) ? a : b;\n這行的意思是：如果 a > b 就回傳 a，否則回傳 b。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '兩種寫法：',
            code:
`// 寫法一
int max(int a, int b) {
    if (a > b) return a;
    else return b;
}

// 寫法二（三元運算子）
int max(int a, int b) {
    return (a > b) ? a : b;
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    printf("最大值是 %d", max(18, 45));
    return 0;
}`,
          },
        ],
      },
      {
        id: 'fn4',
        title: '遞迴：計算階乘',
        difficulty: 'hard',
        description:
          '用遞迴函式計算 5 的階乘（5! = 5×4×3×2×1 = 120）。\n\n定義函式 int factorial(int n)，印出：\n5! = 120',
        expectedOutput: '5! = 120',
        check: (out) => out.trim() === '5! = 120',
        template:
`#include <stdio.h>

// 定義遞迴函式 factorial
// 規則：n! = n × (n-1)!
// 基礎情況：0! = 1


int main() {
    printf("5! = %d", factorial(5));
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '遞迴函式會呼叫自己。計算階乘的邏輯：\n  factorial(5) = 5 × factorial(4)\n  factorial(4) = 4 × factorial(3)\n  ...\n  factorial(1) = 1 × factorial(0)\n  factorial(0) = 1  ← 這是「基礎情況」，必須先判斷，否則會無限遞迴。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`int factorial(int n) {
    if (n == 0) return 1;     // 基礎情況
    return n * factorial(n - 1);  // 遞迴呼叫
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("5! = %d", factorial(5));
    return 0;
}`,
          },
        ],
      },
    ],

    arrays: [
      {
        id: 'arr1',
        title: '初始化並印出陣列',
        difficulty: 'easy',
        description:
          '宣告並初始化一個有 5 個元素的整數陣列：{10, 20, 30, 40, 50}\n\n用迴圈印出每個元素，每個一行：\n10\n20\n30\n40\n50',
        expectedOutput: '10\n20\n30\n40\n50',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines.join(',') === '10,20,30,40,50';
        },
        template:
`#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    // 用迴圈印出每個元素

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '陣列的索引從 0 開始：arr[0], arr[1], ... arr[4]。\n用 for 迴圈從 i=0 到 i<5，每次印出 arr[i]。\n陣列大小也可用 sizeof(arr)/sizeof(arr[0]) 計算（= 元素總 bytes ÷ 每個元素 bytes）。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 0; i < 5; i++) {
    printf("%d\\n", arr[i]);
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", arr[i]);
    }
    return 0;
}`,
          },
        ],
      },
      {
        id: 'arr2',
        title: '計算陣列總和',
        difficulty: 'easy',
        description:
          '給定陣列 {3, 7, 2, 9, 1}，計算所有元素的總和並印出：\n總和 = 22',
        expectedOutput: '總和 = 22',
        check: (out) => out.trim() === '總和 = 22',
        template:
`#include <stdio.h>

int main() {
    int arr[] = {3, 7, 2, 9, 1};
    int sum = 0;
    // 用迴圈累加所有元素

    printf("總和 = %d", sum);
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '和「計算 1 到 10 總和」類似，只是這次每次迴圈加的是 arr[i] 而不是 i。\n先宣告 sum = 0，然後在迴圈中執行 sum += arr[i]。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 0; i < 5; i++) {
    sum += arr[i];
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int arr[] = {3, 7, 2, 9, 1};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += arr[i];
    }
    printf("總和 = %d", sum);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'arr3',
        title: '找陣列中的最大值',
        difficulty: 'medium',
        description:
          '給定陣列 {34, 17, 89, 52, 6}，找出最大值並印出：\n最大值 = 89',
        expectedOutput: '最大值 = 89',
        check: (out) => out.trim() === '最大值 = 89',
        template:
`#include <stdio.h>

int main() {
    int arr[] = {34, 17, 89, 52, 6};
    int max = arr[0];  // 先假設第一個元素是最大值
    // 從第二個元素開始逐一比較

    printf("最大值 = %d", max);
    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '「找最大值」的標準演算法：\n1. 先假設第一個元素是最大值（max = arr[0]）\n2. 從第二個元素（i=1）開始，逐一比較\n3. 如果 arr[i] > max，就更新 max = arr[i]\n4. 迴圈結束後 max 就是最大值',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 1; i < 5; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int arr[] = {34, 17, 89, 52, 6};
    int max = arr[0];
    for (int i = 1; i < 5; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    printf("最大值 = %d", max);
    return 0;
}`,
          },
        ],
      },
      {
        id: 'arr4',
        title: '反轉陣列輸出',
        difficulty: 'hard',
        description:
          '給定陣列 {1, 2, 3, 4, 5}，以反序印出每個元素（一行一個）：\n5\n4\n3\n2\n1',
        expectedOutput: '5\n4\n3\n2\n1',
        check: (out) => {
          const lines = out.trim().split('\n').map(l => l.trim());
          return lines.join(',') === '5,4,3,2,1';
        },
        template:
`#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    // 從最後一個元素開始，倒序印出

    return 0;
}`,
        hints: [
          {
            level: 1,
            title: '💡 概念提示',
            text: '反序印出不需要真的「反轉陣列」，只需要讓迴圈從最後一個索引開始倒數。陣列有 5 個元素，最後一個索引是 4，所以讓 i 從 4 開始，條件是 i >= 0，每次 i--（遞減）。',
          },
          {
            level: 2,
            title: '🔍 程式碼線索',
            text: '',
            code:
`for (int i = 4; i >= 0; i--) {
    printf("%d\\n", arr[i]);
}`,
          },
          {
            level: 3,
            title: '✅ 完整解答',
            text: '',
            code:
`#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    for (int i = 4; i >= 0; i--) {
        printf("%d\\n", arr[i]);
    }
    return 0;
}`,
          },
        ],
      },
    ],
  },
};
