const EXERCISE_BANK = {
  categories: [
    { id: 'basics',    name: '基礎語法',       icon: '📝', color: '#4CAF50', desc: '輸出、程式結構、格式符' },
    { id: 'datatypes', name: '資料型態與運算', icon: '🔢', color: '#2196F3', desc: '型別、運算子、表示式' },
    { id: 'condition', name: '條件判斷',       icon: '🔀', color: '#9C27B0', desc: 'if / else / switch' },
    { id: 'loops',     name: '迴圈',           icon: '🔁', color: '#FF9800', desc: 'while / for / 巢狀迴圈' },
    { id: 'functions', name: '函式',           icon: '🔧', color: '#F44336', desc: '定義、參數、遞迴' },
    { id: 'arrays',    name: '陣列',           icon: '📦', color: '#00BCD4', desc: '搜尋、排序、二維陣列' },
    { id: 'strings',   name: '字串',           icon: '💬', color: '#607D8B', desc: 'char 陣列與字串操作' },
    { id: 'structs',   name: '結構',           icon: '🏗️',  color: '#E91E63', desc: 'struct 自訂型別' },
    { id: 'pointers',  name: '指標',           icon: '👉', color: '#795548', desc: '位址、解參考、動態配置' },
  ],

  problems: {

    // ══════════════════════════════════════════════════════════════════════
    // 1. 基礎語法 (6 題)
    // ══════════════════════════════════════════════════════════════════════
    basics: [
      {
        id: 'b1', title: '第一個 C 程式', difficulty: 'easy',
        description: '在螢幕上輸出：\n\nHello, World!\n\n這是所有程式語言的起點。',
        expectedOutput: 'Hello, World!',
        check: o => o.trim() === 'Hello, World!',
        template: `#include <stdio.h>\n\nint main() {\n    // 在這裡輸出 Hello, World!\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '使用 printf() 函式輸出文字。文字要放在雙引號 " " 中。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("Hello, World!");' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}` },
        ],
      },
      {
        id: 'b2', title: '換行輸出', difficulty: 'easy',
        description: '輸出以下三行（每行分開）：\n\n第一行\n第二行\n第三行',
        expectedOutput: '第一行\n第二行\n第三行',
        check: o => { const l = o.trim().split('\n').map(s => s.trim()); return l[0]==='第一行'&&l[1]==='第二行'&&l[2]==='第三行'; },
        template: `#include <stdio.h>\n\nint main() {\n    // 用三個 printf 各輸出一行\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '\\n 是換行符號（escape character）。放在字串結尾會讓游標跳到下一行。例如 printf("ABC\\n") 輸出 ABC 後換行。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `printf("第一行\\n");\nprintf("第二行\\n");\nprintf("第三行\\n");` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    printf("第一行\\n");\n    printf("第二行\\n");\n    printf("第三行\\n");\n    return 0;\n}` },
        ],
      },
      {
        id: 'b3', title: '整數格式符 %d', difficulty: 'easy',
        description: '宣告 int year = 2024，然後輸出：\n\n現在是 2024 年\n\n數字必須用變數，不能直接寫 "2024"。',
        expectedOutput: '現在是 2024 年',
        check: o => o.trim() === '現在是 2024 年',
        template: `#include <stdio.h>\n\nint main() {\n    int year = 2024;\n    // 用 printf 搭配 %d 輸出\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '%d 是整數格式符。用法：printf("數字是 %d", 變數)，%d 會被替換成變數的值。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("現在是 %d 年", year);' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int year = 2024;\n    printf("現在是 %d 年", year);\n    return 0;\n}` },
        ],
      },
      {
        id: 'b4', title: '浮點數格式符 %f', difficulty: 'easy',
        description: '宣告 float pi = 3.14159，輸出（保留兩位小數）：\n\n圓周率約為 3.14',
        expectedOutput: '圓周率約為 3.14',
        check: o => o.trim() === '圓周率約為 3.14',
        template: `#include <stdio.h>\n\nint main() {\n    float pi = 3.14159;\n    // 用 %.2f 保留兩位小數\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '%f 是浮點數格式符。%.2f 表示保留 2 位小數，%.4f 保留 4 位，以此類推。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("圓周率約為 %.2f", pi);' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    float pi = 3.14159;\n    printf("圓周率約為 %.2f", pi);\n    return 0;\n}` },
        ],
      },
      {
        id: 'b5', title: '字元格式符 %c', difficulty: 'medium',
        description: '宣告 char ch = 65（ASCII 碼），用 %c 輸出對應字元，再用 %d 輸出數值：\n\n字元: A\nASCII: 65',
        expectedOutput: '字元: A\nASCII: 65',
        check: o => { const l = o.trim().split('\n').map(s=>s.trim()); return l[0]==='字元: A'&&l[1]==='ASCII: 65'; },
        template: `#include <stdio.h>\n\nint main() {\n    char ch = 65;  // ASCII 65 = 'A'\n    // 分別用 %c 和 %d 輸出\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'char 本質上是整數。%c 把數字當字元輸出，%d 把它當整數輸出。ASCII 碼 65 對應字元 A，66 對應 B，以此類推。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `printf("字元: %c\\n", ch);\nprintf("ASCII: %d\\n", ch);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    char ch = 65;\n    printf("字元: %c\\n", ch);\n    printf("ASCII: %d\\n", ch);\n    return 0;\n}` },
        ],
      },
      {
        id: 'b6', title: '多個格式符', difficulty: 'medium',
        description: '宣告 int a = 5, b = 3，計算相加結果，輸出：\n\n5 + 3 = 8\n\n三個數字都要用變數或運算式，不能直接寫死。',
        expectedOutput: '5 + 3 = 8',
        check: o => o.trim() === '5 + 3 = 8',
        template: `#include <stdio.h>\n\nint main() {\n    int a = 5;\n    int b = 3;\n    // 一個 printf 放三個 %d\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '一個 printf 可以有多個 %d，後面依序列出對應變數。例如：printf("%d 和 %d", x, y)。a + b 可以直接寫在 printf 的參數位置。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("%d + %d = %d", a, b, a + b);' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int a = 5;\n    int b = 3;\n    printf("%d + %d = %d", a, b, a + b);\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 2. 資料型態與運算 (6 題)
    // ══════════════════════════════════════════════════════════════════════
    datatypes: [
      {
        id: 'dt1', title: '四則運算', difficulty: 'easy',
        description: '宣告 int a = 10, b = 3，輸出四行：\n\n加: 13\n減: 7\n乘: 30\n除: 3',
        expectedOutput: '加: 13\n減: 7\n乘: 30\n除: 3',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='加: 13'&&l[1]==='減: 7'&&l[2]==='乘: 30'&&l[3]==='除: 3'; },
        template: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    // 輸出四行運算結果\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'C 的四則運算符號：+（加）、-（減）、*（乘）、/（除）。注意 int / int 結果也是 int（10/3=3，小數被捨去）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `printf("加: %d\\n", a + b);\nprintf("減: %d\\n", a - b);\nprintf("乘: %d\\n", a * b);\nprintf("除: %d\\n", a / b);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    printf("加: %d\\n", a + b);\n    printf("減: %d\\n", a - b);\n    printf("乘: %d\\n", a * b);\n    printf("除: %d\\n", a / b);\n    return 0;\n}` },
        ],
      },
      {
        id: 'dt2', title: '取餘數運算子 %', difficulty: 'easy',
        description: '宣告 int a = 17, b = 5，輸出：\n\n17 % 5 = 2',
        expectedOutput: '17 % 5 = 2',
        check: o => o.trim() === '17 % 5 = 2',
        template: `#include <stdio.h>\n\nint main() {\n    int a = 17, b = 5;\n    // 用 % 計算餘數並輸出\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '% 是取餘數（modulo）運算子。a % b 回傳 a 除以 b 後的餘數。17 / 5 = 3 餘 2，所以 17 % 5 = 2。常用於判斷奇偶：n % 2 == 0 表示偶數。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("17 %% 5 = %d", a % b);' },
          { level: 3, title: '✅ 完整解答', text: '注意：printf 裡要輸出 % 符號本身需要寫成 %%。', code: `#include <stdio.h>\n\nint main() {\n    int a = 17, b = 5;\n    printf("17 %% 5 = %d", a % b);\n    return 0;\n}` },
        ],
      },
      {
        id: 'dt3', title: '整數除法 vs 浮點數除法', difficulty: 'medium',
        description: '宣告 int a = 7, b = 2，分別輸出：\n\n整數除法: 3\n浮點除法: 3.50',
        expectedOutput: '整數除法: 3\n浮點除法: 3.50',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='整數除法: 3'&&l[1]==='浮點除法: 3.50'; },
        template: `#include <stdio.h>\n\nint main() {\n    int a = 7, b = 2;\n    // 第一行：整數除法\n    // 第二行：強制轉型後的浮點數除法\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '兩個 int 相除結果仍是 int（小數直接捨去）。要得到小數，需要「型別轉換」（type cast）：在變數前加 (float) 或 (double)，例如 (float)a / b。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `printf("整數除法: %d\\n", a / b);\nprintf("浮點除法: %.2f\\n", (float)a / b);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int a = 7, b = 2;\n    printf("整數除法: %d\\n", a / b);\n    printf("浮點除法: %.2f\\n", (float)a / b);\n    return 0;\n}` },
        ],
      },
      {
        id: 'dt4', title: '遞增與遞減運算子', difficulty: 'medium',
        description: '宣告 int x = 5，依序執行以下操作並輸出結果：\n\nx 的初始值: 5\nx++ 後: 6\n++x 後: 7\nx-- 後: 6',
        expectedOutput: 'x 的初始值: 5\nx++ 後: 6\n++x 後: 7\nx-- 後: 6',
        check: o => {
          const l=o.trim().split('\n').map(s=>s.trim());
          return l[0]==='x 的初始值: 5'&&l[1]==='x++ 後: 6'&&l[2]==='++x 後: 7'&&l[3]==='x-- 後: 6';
        },
        template: `#include <stdio.h>\n\nint main() {\n    int x = 5;\n    printf("x 的初始值: %d\\n", x);\n    // 執行 x++ 後輸出\n    // 執行 ++x 後輸出\n    // 執行 x-- 後輸出\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'x++ 和 ++x 都讓 x 加 1，差別在表達式的值：x++ 先用舊值再加，++x 先加再用新值。若單獨寫一行（不取傳回值），兩者效果相同。x-- 則是遞減 1。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `x++;\nprintf("x++ 後: %d\\n", x);\nx++;\nprintf("++x 後: %d\\n", x);\nx--;\nprintf("x-- 後: %d\\n", x);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int x = 5;\n    printf("x 的初始值: %d\\n", x);\n    x++;\n    printf("x++ 後: %d\\n", x);\n    x++;\n    printf("++x 後: %d\\n", x);\n    x--;\n    printf("x-- 後: %d\\n", x);\n    return 0;\n}` },
        ],
      },
      {
        id: 'dt5', title: '交換兩個變數', difficulty: 'medium',
        description: '宣告 int a = 10, b = 20，交換兩者的值（透過第三個暫存變數），輸出：\n\na = 20\nb = 10',
        expectedOutput: 'a = 20\nb = 10',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='a = 20'&&l[1]==='b = 10'; },
        template: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    // 使用 temp 暫存變數交換\n\n    printf("a = %d\\n", a);\n    printf("b = %d\\n", b);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '交換需要三步：① temp = a（備份 a）② a = b（a 變成 b）③ b = temp（b 變成原來的 a）。如果直接 a = b 再 b = a，a 的原始值會遺失。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int temp = a;\na = b;\nb = temp;` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    int temp = a;\n    a = b;\n    b = temp;\n    printf("a = %d\\n", a);\n    printf("b = %d\\n", b);\n    return 0;\n}` },
        ],
      },
      {
        id: 'dt6', title: '型別大小 sizeof', difficulty: 'hard',
        description: '使用 sizeof 運算子，輸出各型別所佔的位元組數：\n\nchar: 1 bytes\nint: 4 bytes\nfloat: 4 bytes\ndouble: 8 bytes',
        expectedOutput: 'char: 1 bytes\nint: 4 bytes\nfloat: 4 bytes\ndouble: 8 bytes',
        check: o => {
          const l=o.trim().split('\n').map(s=>s.trim());
          return l[0]==='char: 1 bytes'&&l[1]==='int: 4 bytes'&&l[2]==='float: 4 bytes'&&l[3]==='double: 8 bytes';
        },
        template: `#include <stdio.h>\n\nint main() {\n    // 用 sizeof() 取得各型別大小\n    // 格式：printf("char: %zu bytes\\n", sizeof(char));\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'sizeof(型別) 回傳該型別在目前系統佔用的位元組數。回傳型別是 size_t，對應格式符是 %zu（或用 %d 也通常可以）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `printf("char: %zu bytes\\n", sizeof(char));\nprintf("int: %zu bytes\\n", sizeof(int));\nprintf("float: %zu bytes\\n", sizeof(float));\nprintf("double: %zu bytes\\n", sizeof(double));` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    printf("char: %zu bytes\\n", sizeof(char));\n    printf("int: %zu bytes\\n", sizeof(int));\n    printf("float: %zu bytes\\n", sizeof(float));\n    printf("double: %zu bytes\\n", sizeof(double));\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 3. 條件判斷 (6 題)
    // ══════════════════════════════════════════════════════════════════════
    condition: [
      {
        id: 'c1', title: '判斷正負數', difficulty: 'easy',
        description: '宣告 int n = -5，判斷是正數、負數或零，輸出：\n\n負數',
        expectedOutput: '負數',
        check: o => o.trim() === '負數',
        template: `#include <stdio.h>\n\nint main() {\n    int n = -5;\n    // 用 if / else if / else 判斷\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'if / else if / else 結構：先判斷 n > 0（正數），再判斷 n < 0（負數），剩下就是零。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `if (n > 0) {\n    printf("正數");\n} else if (n < 0) {\n    printf("負數");\n} else {\n    printf("零");\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int n = -5;\n    if (n > 0) {\n        printf("正數");\n    } else if (n < 0) {\n        printf("負數");\n    } else {\n        printf("零");\n    }\n    return 0;\n}` },
        ],
      },
      {
        id: 'c2', title: '判斷奇偶數', difficulty: 'easy',
        description: '宣告 int num = 7，判斷並輸出：\n\n7 是奇數',
        expectedOutput: '7 是奇數',
        check: o => o.trim() === '7 是奇數',
        template: `#include <stdio.h>\n\nint main() {\n    int num = 7;\n    // 用 % 判斷奇偶\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '判斷奇偶：num % 2 == 0 是偶數，num % 2 != 0 是奇數（或寫 num % 2 == 1）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `if (num % 2 == 0) {\n    printf("%d 是偶數", num);\n} else {\n    printf("%d 是奇數", num);\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int num = 7;\n    if (num % 2 == 0)\n        printf("%d 是偶數", num);\n    else\n        printf("%d 是奇數", num);\n    return 0;\n}` },
        ],
      },
      {
        id: 'c3', title: '找兩數最大值', difficulty: 'easy',
        description: '宣告 int a = 15, b = 27，找出較大的數，輸出：\n\n最大值為 27',
        expectedOutput: '最大值為 27',
        check: o => o.trim() === '最大值為 27',
        template: `#include <stdio.h>\n\nint main() {\n    int a = 15, b = 27;\n    int max;\n    // 判斷 a 和 b 哪個大，存入 max\n\n    printf("最大值為 %d", max);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '比較兩數：若 a > b 則 max = a，否則 max = b。也可以用三元運算子：max = (a > b) ? a : b;' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `max = (a > b) ? a : b;` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int a = 15, b = 27;\n    int max = (a > b) ? a : b;\n    printf("最大值為 %d", max);\n    return 0;\n}` },
        ],
      },
      {
        id: 'c4', title: '成績等第判斷', difficulty: 'medium',
        description: '宣告 int score = 82，判斷等第輸出：\n  90~100 → A，80~89 → B\n  70~79 → C，60~69 → D，其餘 → F\n\n預期輸出：\nB',
        expectedOutput: 'B',
        check: o => o.trim() === 'B',
        template: `#include <stdio.h>\n\nint main() {\n    int score = 82;\n    // 用 else if 判斷各分數區間\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '從高分往低分判斷：先判斷 >= 90，再 >= 80，再 >= 70，再 >= 60，最後 else 就是 F。因為是連續的 else if，匹配到一個就不會繼續往下判斷。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `if (score >= 90)      printf("A");\nelse if (score >= 80) printf("B");\nelse if (score >= 70) printf("C");\nelse if (score >= 60) printf("D");\nelse                  printf("F");` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int score = 82;\n    if (score >= 90)      printf("A");\n    else if (score >= 80) printf("B");\n    else if (score >= 70) printf("C");\n    else if (score >= 60) printf("D");\n    else                  printf("F");\n    return 0;\n}` },
        ],
      },
      {
        id: 'c5', title: 'switch：月份天數', difficulty: 'medium',
        description: '宣告 int month = 3，用 switch 判斷該月天數，輸出：\n\n3 月有 31 天',
        expectedOutput: '3 月有 31 天',
        check: o => o.trim() === '3 月有 31 天',
        template: `#include <stdio.h>\n\nint main() {\n    int month = 3;\n    int days;\n    switch (month) {\n        // 31 天：1,3,5,7,8,10,12\n        // 30 天：4,6,9,11\n        // 28 天：2\n    }\n    printf("%d 月有 %d 天", month, days);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'switch 可以讓多個 case 共用同一段程式碼（fall-through）。31 天的月份可以這樣寫：case 1: case 3: case 5: ... days = 31; break;' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `case 1: case 3: case 5: case 7:\ncase 8: case 10: case 12:\n    days = 31; break;\ncase 4: case 6: case 9: case 11:\n    days = 30; break;\ncase 2:\n    days = 28; break;` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int month = 3, days;\n    switch (month) {\n        case 1: case 3: case 5: case 7:\n        case 8: case 10: case 12: days = 31; break;\n        case 4: case 6: case 9: case 11: days = 30; break;\n        case 2: days = 28; break;\n        default: days = 0;\n    }\n    printf("%d 月有 %d 天", month, days);\n    return 0;\n}` },
        ],
      },
      {
        id: 'c6', title: 'FizzBuzz', difficulty: 'hard',
        description: '宣告 int n = 15：\n  能被 15 整除 → 輸出 FizzBuzz\n  能被 3 整除  → 輸出 Fizz\n  能被 5 整除  → 輸出 Buzz\n  否則        → 輸出數字本身\n\n預期輸出（n=15）：\nFizzBuzz',
        expectedOutput: 'FizzBuzz',
        check: o => o.trim() === 'FizzBuzz',
        template: `#include <stdio.h>\n\nint main() {\n    int n = 15;\n    // 注意：先判斷能被 15 整除的情況\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '關鍵：必須先判斷 n % 15 == 0（能被 15 整除），才判斷 n % 3 或 n % 5。因為 15 同時能被 3 和 5 整除，若先判斷 n % 3 就會先輸出 Fizz 而漏掉 FizzBuzz。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `if (n % 15 == 0)     printf("FizzBuzz");\nelse if (n % 3 == 0) printf("Fizz");\nelse if (n % 5 == 0) printf("Buzz");\nelse                 printf("%d", n);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int n = 15;\n    if (n % 15 == 0)     printf("FizzBuzz");\n    else if (n % 3 == 0) printf("Fizz");\n    else if (n % 5 == 0) printf("Buzz");\n    else                 printf("%d", n);\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 4. 迴圈 (7 題)
    // ══════════════════════════════════════════════════════════════════════
    loops: [
      {
        id: 'l1', title: 'for 迴圈印出 1 到 5', difficulty: 'easy',
        description: '用 for 迴圈依序輸出 1 到 5，每個數字一行：\n\n1\n2\n3\n4\n5',
        expectedOutput: '1\n2\n3\n4\n5',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l.length===5&&l.every((v,i)=>v===String(i+1)); },
        template: `#include <stdio.h>\n\nint main() {\n    // for (初始值; 條件; 遞增) { ... }\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'for 迴圈語法：for (int i = 1; i <= 5; i++) { ... }。i 從 1 開始，條件 i <= 5 表示 i 不超過 5，i++ 每次加 1。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 1; i <= 5; i++) {\n    printf("%d\\n", i);\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d\\n", i);\n    }\n    return 0;\n}` },
        ],
      },
      {
        id: 'l2', title: '計算 1 到 100 的總和', difficulty: 'easy',
        description: '用迴圈計算 1+2+3+…+100 的總和，輸出：\n\n總和 = 5050',
        expectedOutput: '總和 = 5050',
        check: o => o.trim() === '總和 = 5050',
        template: `#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    // 用迴圈從 1 累加到 100\n\n    printf("總和 = %d", sum);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '累加技巧：sum += i 等同於 sum = sum + i。每次迴圈把 i 加到 sum，迴圈結束後 sum 就是總和。1+2+…+100 = 5050（等差數列）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 1; i <= 100; i++) {\n    sum += i;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 100; i++) sum += i;\n    printf("總和 = %d", sum);\n    return 0;\n}` },
        ],
      },
      {
        id: 'l3', title: 'while 迴圈：倒數計時', difficulty: 'easy',
        description: '用 while 迴圈從 5 倒數到 1，再輸出「發射！」：\n\n5\n4\n3\n2\n1\n發射！',
        expectedOutput: '5\n4\n3\n2\n1\n發射！',
        check: o => {
          const l=o.trim().split('\n').map(s=>s.trim());
          return l.length===6&&l[0]==='5'&&l[4]==='1'&&l[5]==='發射！';
        },
        template: `#include <stdio.h>\n\nint main() {\n    int count = 5;\n    // 用 while 迴圈倒數\n\n    printf("發射！");\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'while 迴圈：while (count >= 1) { ... }。每次迴圈印出 count，然後 count--（減 1），直到 count < 1 時結束。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `while (count >= 1) {\n    printf("%d\\n", count);\n    count--;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int count = 5;\n    while (count >= 1) {\n        printf("%d\\n", count);\n        count--;\n    }\n    printf("發射！");\n    return 0;\n}` },
        ],
      },
      {
        id: 'l4', title: 'do-while：至少執行一次', difficulty: 'medium',
        description: '宣告 int x = 10，用 do-while 迴圈：每次印出 x，再將 x 乘以 2，直到 x > 100 停止。\n\n預期輸出：\n10\n20\n40\n80',
        expectedOutput: '10\n20\n40\n80',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l.join(',') === '10,20,40,80'; },
        template: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    // do-while 語法：\n    // do { ... } while (條件);\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'do-while 保證至少執行一次迴圈本體（先執行再判斷條件）。語法：do { 程式碼 } while (條件); 注意 while 後面有分號。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `do {\n    printf("%d\\n", x);\n    x *= 2;\n} while (x <= 100);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    do {\n        printf("%d\\n", x);\n        x *= 2;\n    } while (x <= 100);\n    return 0;\n}` },
        ],
      },
      {
        id: 'l5', title: '印出星號直角三角形', difficulty: 'medium',
        description: '用巢狀 for 迴圈印出高度為 5 的星號三角形：\n\n*\n**\n***\n****\n*****',
        expectedOutput: '*\n**\n***\n****\n*****',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l.length===5&&l.every((v,i)=>v==='*'.repeat(i+1)); },
        template: `#include <stdio.h>\n\nint main() {\n    // 外層迴圈：行數 (1~5)\n    // 內層迴圈：每行的星號數\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '巢狀迴圈：外層 i 從 1 到 5，內層 j 從 1 到 i，每次印一個 *。內層結束後換行 printf("\\n")。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++)\n        printf("*");\n    printf("\\n");\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        for (int j = 1; j <= i; j++)\n            printf("*");\n        printf("\\n");\n    }\n    return 0;\n}` },
        ],
      },
      {
        id: 'l6', title: '九九乘法表（第 3 段）', difficulty: 'medium',
        description: '用迴圈輸出九九乘法表的第 3 段（3x1 到 3x9）：\n\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27',
        expectedOutput: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27',
        check: o => {
          const l=o.trim().split('\n').map(s=>s.trim());
          return l.length===9 && l.every((v,i)=>{const n=i+1; return v===`3 x ${n} = ${3*n}`;});
        },
        template: `#include <stdio.h>\n\nint main() {\n    int n = 3;\n    // 用迴圈讓乘數從 1 到 9\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '讓 i 從 1 到 9，每次輸出 n x i = n*i。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 1; i <= 9; i++) {\n    printf("%d x %d = %d\\n", n, i, n * i);\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int n = 3;\n    for (int i = 1; i <= 9; i++)\n        printf("%d x %d = %d\\n", n, i, n * i);\n    return 0;\n}` },
        ],
      },
      {
        id: 'l7', title: '找質數', difficulty: 'hard',
        description: '找出 2 到 30 之間的所有質數，以空格分隔輸出在同一行：\n\n2 3 5 7 11 13 17 19 23 29',
        expectedOutput: '2 3 5 7 11 13 17 19 23 29',
        check: o => o.trim() === '2 3 5 7 11 13 17 19 23 29',
        template: `#include <stdio.h>\n\nint main() {\n    for (int n = 2; n <= 30; n++) {\n        // 判斷 n 是否為質數\n        // 質數：只能被 1 和自身整除\n\n    }\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '判斷質數：用內層迴圈讓除數 i 從 2 到 n-1，若 n % i == 0 就不是質數（有因數）。可以用旗標變數 isPrime = 1，發現能整除就設為 0。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int isPrime = 1;\nfor (int i = 2; i < n; i++) {\n    if (n % i == 0) { isPrime = 0; break; }\n}\nif (isPrime) printf("%d ", n);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    for (int n = 2; n <= 30; n++) {\n        int isPrime = 1;\n        for (int i = 2; i < n; i++)\n            if (n % i == 0) { isPrime = 0; break; }\n        if (isPrime) printf("%d ", n);\n    }\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 5. 函式 (6 題)
    // ══════════════════════════════════════════════════════════════════════
    functions: [
      {
        id: 'f1', title: '定義並呼叫無回傳函式', difficulty: 'easy',
        description: '定義 void greet() 函式，呼叫後輸出：\n\n你好，歡迎學習 C 語言！',
        expectedOutput: '你好，歡迎學習 C 語言！',
        check: o => o.trim() === '你好，歡迎學習 C 語言！',
        template: `#include <stdio.h>\n\n// 在這裡定義 greet 函式\n\n\nint main() {\n    greet();\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'void 表示函式不回傳值。函式定義要放在 main() 之前（或先宣告原型）。格式：void 函式名稱(void) { ... }' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `void greet(void) {\n    printf("你好，歡迎學習 C 語言！");\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nvoid greet(void) {\n    printf("你好，歡迎學習 C 語言！");\n}\n\nint main() {\n    greet();\n    return 0;\n}` },
        ],
      },
      {
        id: 'f2', title: '有回傳值的函式', difficulty: 'easy',
        description: '定義 int multiply(int a, int b) 回傳兩數相乘，在 main 計算 6×7，輸出：\n\n6 x 7 = 42',
        expectedOutput: '6 x 7 = 42',
        check: o => o.trim() === '6 x 7 = 42',
        template: `#include <stdio.h>\n\n// 定義 multiply 函式\n\n\nint main() {\n    printf("6 x 7 = %d", multiply(6, 7));\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '回傳值的函式：在函式結尾用 return 語句回傳計算結果。例如 return a * b; 把乘積傳回給呼叫者。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int multiply(int a, int b) {\n    return a * b;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint multiply(int a, int b) {\n    return a * b;\n}\n\nint main() {\n    printf("6 x 7 = %d", multiply(6, 7));\n    return 0;\n}` },
        ],
      },
      {
        id: 'f3', title: '函式：絕對值', difficulty: 'medium',
        description: '定義 int abs_val(int n) 回傳 n 的絕對值（不使用 math.h），在 main 測試：\n\nabs(-8) = 8\nabs(5) = 5',
        expectedOutput: 'abs(-8) = 8\nabs(5) = 5',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='abs(-8) = 8'&&l[1]==='abs(5) = 5'; },
        template: `#include <stdio.h>\n\n// 定義 abs_val 函式\n// 若 n < 0 回傳 -n，否則回傳 n\n\n\nint main() {\n    printf("abs(-8) = %d\\n", abs_val(-8));\n    printf("abs(5) = %d\\n",  abs_val(5));\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '絕對值：若 n 是負數則回傳 -n（讓它變正數），否則直接回傳 n。可以用 if/else 或三元運算子。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int abs_val(int n) {\n    return (n < 0) ? -n : n;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint abs_val(int n) {\n    return (n < 0) ? -n : n;\n}\n\nint main() {\n    printf("abs(-8) = %d\\n", abs_val(-8));\n    printf("abs(5) = %d\\n",  abs_val(5));\n    return 0;\n}` },
        ],
      },
      {
        id: 'f4', title: '傳值（Pass by Value）', difficulty: 'medium',
        description: '觀察傳值行為：定義 void addTen(int x) 在函式內把 x 加 10，但 main 裡的 a 不受影響。輸出：\n\n函式內: 20\n函式外: 10',
        expectedOutput: '函式內: 20\n函式外: 10',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='函式內: 20'&&l[1]==='函式外: 10'; },
        template: `#include <stdio.h>\n\nvoid addTen(int x) {\n    x += 10;\n    printf("函式內: %d\\n", x);\n}\n\nint main() {\n    int a = 10;\n    addTen(a);\n    printf("函式外: %d\\n", a);  // a 沒有改變\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'C 語言預設「傳值」（pass by value）：函式收到的是參數的副本，修改副本不會影響原始變數。此題已有完整程式碼，直接執行觀察輸出。' },
          { level: 2, title: '🔍 程式碼線索', text: '程式碼已完整，直接執行即可觀察傳值行為。', code: `// 此題的程式碼已在 template 中\n// 直接按執行觀察結果` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nvoid addTen(int x) {\n    x += 10;\n    printf("函式內: %d\\n", x);\n}\n\nint main() {\n    int a = 10;\n    addTen(a);\n    printf("函式外: %d\\n", a);\n    return 0;\n}` },
        ],
      },
      {
        id: 'f5', title: '遞迴：階乘', difficulty: 'medium',
        description: '定義遞迴函式 int factorial(int n)，計算 n!，輸出：\n\n5! = 120',
        expectedOutput: '5! = 120',
        check: o => o.trim() === '5! = 120',
        template: `#include <stdio.h>\n\n// 遞迴函式：n! = n × (n-1)!\n// 基礎情況：0! = 1\nint factorial(int n) {\n\n}\n\nint main() {\n    printf("5! = %d", factorial(5));\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '遞迴需要「基礎情況」避免無限呼叫：if (n == 0) return 1; 遞迴關係：factorial(5) = 5 × factorial(4) = 5 × 4 × factorial(3) = … = 120' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("5! = %d", factorial(5));\n    return 0;\n}` },
        ],
      },
      {
        id: 'f6', title: '遞迴：費氏數列', difficulty: 'hard',
        description: '定義遞迴函式 int fib(int n)，計算第 n 個費氏數（fib(0)=0, fib(1)=1, fib(n)=fib(n-1)+fib(n-2)），輸出：\n\nfib(8) = 21',
        expectedOutput: 'fib(8) = 21',
        check: o => o.trim() === 'fib(8) = 21',
        template: `#include <stdio.h>\n\nint fib(int n) {\n    // 基礎情況：fib(0)=0, fib(1)=1\n    // 遞迴：fib(n) = fib(n-1) + fib(n-2)\n\n}\n\nint main() {\n    printf("fib(8) = %d", fib(8));\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '費氏數列：0, 1, 1, 2, 3, 5, 8, 13, 21…每個數是前兩個數的和。需要兩個基礎情況：n==0 回傳 0，n==1 回傳 1。其他情況遞迴呼叫。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int fib(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fib(n - 1) + fib(n - 2);\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint fib(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fib(n-1) + fib(n-2);\n}\n\nint main() {\n    printf("fib(8) = %d", fib(8));\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 6. 陣列 (7 題)
    // ══════════════════════════════════════════════════════════════════════
    arrays: [
      {
        id: 'a1', title: '宣告並印出陣列', difficulty: 'easy',
        description: '宣告 int arr[] = {10, 20, 30, 40, 50}，用迴圈每行輸出一個元素：\n\n10\n20\n30\n40\n50',
        expectedOutput: '10\n20\n30\n40\n50',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l.join(',') === '10,20,30,40,50'; },
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    // 用 for 迴圈輸出每個元素\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '陣列索引從 0 開始：arr[0]=10, arr[1]=20…arr[4]=50。用 for 迴圈從 i=0 到 i<5，每次輸出 arr[i]。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < 5; i++)\n    printf("%d\\n", arr[i]);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    for (int i = 0; i < 5; i++)\n        printf("%d\\n", arr[i]);\n    return 0;\n}` },
        ],
      },
      {
        id: 'a2', title: '計算陣列總和與平均', difficulty: 'easy',
        description: '宣告 int arr[] = {4, 8, 15, 16, 23}，計算總和與平均（保留兩位小數），輸出：\n\n總和 = 66\n平均 = 13.20',
        expectedOutput: '總和 = 66\n平均 = 13.20',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='總和 = 66'&&l[1]==='平均 = 13.20'; },
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {4, 8, 15, 16, 23};\n    int n = 5;\n    int sum = 0;\n    // 累加陣列所有元素\n\n    printf("總和 = %d\\n", sum);\n    printf("平均 = %.2f\\n", (float)sum / n);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '累加：用 for 迴圈，每次 sum += arr[i]。平均需要轉型：(float)sum / n 才能得到小數。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < n; i++)\n    sum += arr[i];` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {4, 8, 15, 16, 23};\n    int n = 5, sum = 0;\n    for (int i = 0; i < n; i++) sum += arr[i];\n    printf("總和 = %d\\n", sum);\n    printf("平均 = %.2f\\n", (float)sum / n);\n    return 0;\n}` },
        ],
      },
      {
        id: 'a3', title: '找最大值與最小值', difficulty: 'medium',
        description: '宣告 int arr[] = {34, 17, 89, 52, 6}，找出最大值和最小值，輸出：\n\n最大值 = 89\n最小值 = 6',
        expectedOutput: '最大值 = 89\n最小值 = 6',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='最大值 = 89'&&l[1]==='最小值 = 6'; },
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {34, 17, 89, 52, 6};\n    int max = arr[0], min = arr[0];\n    // 從索引 1 開始比較\n\n    printf("最大值 = %d\\n", max);\n    printf("最小值 = %d\\n", min);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '同時找最大最小：先假設 max = min = arr[0]，從 i=1 開始比較。若 arr[i] > max 更新 max，若 arr[i] < min 更新 min。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 1; i < 5; i++) {\n    if (arr[i] > max) max = arr[i];\n    if (arr[i] < min) min = arr[i];\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {34, 17, 89, 52, 6};\n    int max = arr[0], min = arr[0];\n    for (int i = 1; i < 5; i++) {\n        if (arr[i] > max) max = arr[i];\n        if (arr[i] < min) min = arr[i];\n    }\n    printf("最大值 = %d\\n", max);\n    printf("最小值 = %d\\n", min);\n    return 0;\n}` },
        ],
      },
      {
        id: 'a4', title: '線性搜尋', difficulty: 'medium',
        description: '在陣列 {5, 12, 30, 7, 45} 中搜尋數字 30，找到後輸出其索引：\n\n找到 30，索引為 2',
        expectedOutput: '找到 30，索引為 2',
        check: o => o.trim() === '找到 30，索引為 2',
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 12, 30, 7, 45};\n    int target = 30;\n    int found = -1;\n    // 用迴圈逐一比對\n\n    if (found >= 0)\n        printf("找到 %d，索引為 %d", target, found);\n    else\n        printf("找不到 %d", target);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '線性搜尋：用迴圈從頭掃到尾，若 arr[i] == target 就記錄 found = i 然後 break 跳出迴圈。found 初始為 -1 代表「尚未找到」。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < 5; i++) {\n    if (arr[i] == target) {\n        found = i;\n        break;\n    }\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {5, 12, 30, 7, 45};\n    int target = 30, found = -1;\n    for (int i = 0; i < 5; i++)\n        if (arr[i] == target) { found = i; break; }\n    if (found >= 0)\n        printf("找到 %d，索引為 %d", target, found);\n    else\n        printf("找不到 %d", target);\n    return 0;\n}` },
        ],
      },
      {
        id: 'a5', title: '泡沫排序（升序）', difficulty: 'medium',
        description: '用泡沫排序法將 {64, 34, 25, 12, 22} 由小到大排序，輸出：\n\n12 22 25 34 64',
        expectedOutput: '12 22 25 34 64',
        check: o => o.trim().split(/\s+/).join(' ') === '12 22 25 34 64',
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22};\n    int n = 5;\n    // 泡沫排序：兩層迴圈，相鄰元素比較並交換\n\n    for (int i = 0; i < n; i++)\n        printf("%d ", arr[i]);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '泡沫排序：外層迴圈跑 n-1 次（每次確保最大值沉到末尾），內層迴圈比較相鄰兩個元素，若前者大於後者就交換。交換需要一個暫存變數 temp。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < n-1; i++) {\n    for (int j = 0; j < n-1-i; j++) {\n        if (arr[j] > arr[j+1]) {\n            int temp = arr[j];\n            arr[j] = arr[j+1];\n            arr[j+1] = temp;\n        }\n    }\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22};\n    int n = 5;\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-1-i; j++)\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}` },
        ],
      },
      {
        id: 'a6', title: '二維陣列（矩陣）', difficulty: 'hard',
        description: '宣告並初始化 3×3 的二維陣列，輸出：\n\n1 2 3\n4 5 6\n7 8 9',
        expectedOutput: '1 2 3\n4 5 6\n7 8 9',
        check: o => {
          const l=o.trim().split('\n').map(s=>s.trim());
          return l[0]==='1 2 3'&&l[1]==='4 5 6'&&l[2]==='7 8 9';
        },
        template: `#include <stdio.h>\n\nint main() {\n    int mat[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    // 用巢狀迴圈輸出每一列\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '二維陣列用 mat[列][行] 存取。兩層迴圈：外層 i 控制列（0~2），內層 j 控制行（0~2）。每行內用空格分隔，每列輸出後換行。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++)\n        printf("%d ", mat[i][j]);\n    printf("\\n");\n}` },
          { level: 3, title: '✅ 完整解答', text: '注意每行末尾有空格，需要 trim 後比對。', code: `#include <stdio.h>\n\nint main() {\n    int mat[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++)\n            printf("%d%s", mat[i][j], j<2?" ":"");\n        printf("\\n");\n    }\n    return 0;\n}` },
        ],
      },
      {
        id: 'a7', title: '陣列反轉', difficulty: 'hard',
        description: '宣告 int arr[] = {1, 2, 3, 4, 5}，原地反轉（不新增陣列），輸出：\n\n5 4 3 2 1',
        expectedOutput: '5 4 3 2 1',
        check: o => o.trim().split(/\s+/).join(' ') === '5 4 3 2 1',
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    int n = 5;\n    // 用頭尾指針法反轉：\n    // left 從 0，right 從 n-1，互相交換，向中間靠攏\n\n    for (int i = 0; i < n; i++)\n        printf("%d ", arr[i]);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '頭尾交換法：left=0, right=n-1，每次交換 arr[left] 和 arr[right]，然後 left++, right--，直到 left >= right。這樣中間相遇後就完成反轉。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int left = 0, right = n - 1;\nwhile (left < right) {\n    int temp = arr[left];\n    arr[left] = arr[right];\n    arr[right] = temp;\n    left++; right--;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {1,2,3,4,5};\n    int n=5, left=0, right=n-1;\n    while (left < right) {\n        int t=arr[left]; arr[left]=arr[right]; arr[right]=t;\n        left++; right--;\n    }\n    for (int i=0; i<n; i++) printf("%d ", arr[i]);\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 7. 字串 (5 題)
    // ══════════════════════════════════════════════════════════════════════
    strings: [
      {
        id: 's1', title: '宣告與輸出字串', difficulty: 'easy',
        description: '宣告字串 char name[] = "Alice"，用 %s 輸出：\n\n你好，Alice！',
        expectedOutput: '你好，Alice！',
        check: o => o.trim() === '你好，Alice！',
        template: `#include <stdio.h>\n\nint main() {\n    char name[] = "Alice";\n    // 用 %s 格式符輸出字串\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'C 語言字串是 char 陣列，結尾有 \\0（null terminator）。%s 格式符用於輸出字串。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("你好，%s！", name);' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    char name[] = "Alice";\n    printf("你好，%s！", name);\n    return 0;\n}` },
        ],
      },
      {
        id: 's2', title: '計算字串長度 strlen', difficulty: 'easy',
        description: '宣告字串 char str[] = "Hello"，用 strlen() 計算長度並輸出：\n\nHello 有 5 個字元',
        expectedOutput: 'Hello 有 5 個字元',
        check: o => o.trim() === 'Hello 有 5 個字元',
        template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "Hello";\n    // 用 strlen() 取得長度\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'strlen(str) 回傳字串的字元數（不含末尾的 \\0）。需要 #include <string.h>。回傳型別是 size_t，用 %zu 或 %d 輸出。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("%s 有 %zu 個字元", str, strlen(str));' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "Hello";\n    printf("%s 有 %zu 個字元", str, strlen(str));\n    return 0;\n}` },
        ],
      },
      {
        id: 's3', title: '字串複製 strcpy', difficulty: 'medium',
        description: '宣告 char src[] = "World"，將其複製到 char dst[20]，輸出：\n\n複製結果: World',
        expectedOutput: '複製結果: World',
        check: o => o.trim() === '複製結果: World',
        template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char src[] = "World";\n    char dst[20];\n    // 用 strcpy 複製字串\n\n    printf("複製結果: %s", dst);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'strcpy(目的地, 來源) 把來源字串複製到目的地。目的地陣列要夠大。注意：不能用 = 直接指派字串（那只複製指標位址）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'strcpy(dst, src);' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char src[] = "World";\n    char dst[20];\n    strcpy(dst, src);\n    printf("複製結果: %s", dst);\n    return 0;\n}` },
        ],
      },
      {
        id: 's4', title: '字串比較 strcmp', difficulty: 'medium',
        description: '比較 "apple" 和 "banana"，用 strcmp 判斷兩字串的關係，輸出：\n\napple 小於 banana',
        expectedOutput: 'apple 小於 banana',
        check: o => o.trim() === 'apple 小於 banana',
        template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = "apple";\n    char s2[] = "banana";\n    int result = strcmp(s1, s2);\n    // result < 0：s1 < s2\n    // result == 0：相等\n    // result > 0：s1 > s2\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'strcmp(s1, s2) 按字典序比較：回傳負數表示 s1 較小，0 表示相等，正數表示 s1 較大。絕對不能用 == 比較字串！' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `if (result < 0)      printf("%s 小於 %s", s1, s2);\nelse if (result == 0) printf("%s 等於 %s", s1, s2);\nelse                  printf("%s 大於 %s", s1, s2);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = "apple", s2[] = "banana";\n    int r = strcmp(s1, s2);\n    if (r < 0)      printf("%s 小於 %s", s1, s2);\n    else if (r == 0) printf("%s 等於 %s", s1, s2);\n    else             printf("%s 大於 %s", s1, s2);\n    return 0;\n}` },
        ],
      },
      {
        id: 's5', title: '字串反轉', difficulty: 'hard',
        description: '宣告 char str[] = "Hello"，不使用 strrev，手動反轉並輸出：\n\nolleH',
        expectedOutput: 'olleH',
        check: o => o.trim() === 'olleH',
        template: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "Hello";\n    int len = strlen(str);\n    // 用頭尾交換法反轉字串（類似陣列反轉）\n\n    printf("%s", str);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '字串就是 char 陣列，反轉方式和陣列相同：left=0, right=len-1，互換 str[left] 和 str[right]，向中間靠攏。注意不要碰到末尾的 \\0。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int left = 0, right = len - 1;\nwhile (left < right) {\n    char temp = str[left];\n    str[left] = str[right];\n    str[right] = temp;\n    left++; right--;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "Hello";\n    int l=0, r=strlen(str)-1;\n    while (l < r) {\n        char t=str[l]; str[l]=str[r]; str[r]=t;\n        l++; r--;\n    }\n    printf("%s", str);\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 8. 結構 (4 題)
    // ══════════════════════════════════════════════════════════════════════
    structs: [
      {
        id: 'st1', title: '定義與使用結構', difficulty: 'easy',
        description: '定義 struct Student（包含 name[20], age, score），初始化一個學生並輸出：\n\n姓名: Alice\n年齡: 20\n成績: 95.50',
        expectedOutput: '姓名: Alice\n年齡: 20\n成績: 95.50',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='姓名: Alice'&&l[1]==='年齡: 20'&&l[2]==='成績: 95.50'; },
        template: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[20];\n    int age;\n    float score;\n};\n\nint main() {\n    struct Student s;\n    strcpy(s.name, "Alice");\n    s.age = 20;\n    s.score = 95.5;\n    // 輸出三行結構成員\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '用 . 運算子存取結構成員：s.name, s.age, s.score。字串成員需要用 strcpy 賦值（不能直接 = "Alice"）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `printf("姓名: %s\\n", s.name);\nprintf("年齡: %d\\n", s.age);\nprintf("成績: %.2f\\n", s.score);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[20];\n    int age;\n    float score;\n};\n\nint main() {\n    struct Student s;\n    strcpy(s.name, "Alice");\n    s.age = 20;\n    s.score = 95.5;\n    printf("姓名: %s\\n", s.name);\n    printf("年齡: %d\\n", s.age);\n    printf("成績: %.2f\\n", s.score);\n    return 0;\n}` },
        ],
      },
      {
        id: 'st2', title: 'typedef 結構', difficulty: 'medium',
        description: '用 typedef 定義 Point 結構（包含 x, y 兩個 int），宣告點 p = {3, 4}，輸出：\n\n點座標: (3, 4)',
        expectedOutput: '點座標: (3, 4)',
        check: o => o.trim() === '點座標: (3, 4)',
        template: `#include <stdio.h>\n\n// 用 typedef struct { ... } TypeName; 定義 Point\n\n\nint main() {\n    Point p = {3, 4};\n    printf("點座標: (%d, %d)", p.x, p.y);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'typedef struct { ... } TypeName; 讓你宣告時不用加 struct 關鍵字，直接寫 TypeName 變數名稱。例如 Point p 而不是 struct Point p。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `typedef struct {\n    int x;\n    int y;\n} Point;` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\ntypedef struct {\n    int x, y;\n} Point;\n\nint main() {\n    Point p = {3, 4};\n    printf("點座標: (%d, %d)", p.x, p.y);\n    return 0;\n}` },
        ],
      },
      {
        id: 'st3', title: '結構陣列', difficulty: 'medium',
        description: '定義 struct Product（name[20], price），建立含 3 個商品的陣列並輸出最貴的商品：\n\n最貴的商品: Laptop, 價格: 1200',
        expectedOutput: '最貴的商品: Laptop, 價格: 1200',
        check: o => o.trim() === '最貴的商品: Laptop, 價格: 1200',
        template: `#include <stdio.h>\n#include <string.h>\n\nstruct Product {\n    char name[20];\n    int price;\n};\n\nint main() {\n    struct Product products[3];\n    strcpy(products[0].name, "Mouse");  products[0].price = 30;\n    strcpy(products[1].name, "Laptop"); products[1].price = 1200;\n    strcpy(products[2].name, "USB");    products[2].price = 15;\n    // 找最貴的商品（最大 price）\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '結構陣列和一般陣列一樣，用 products[i].成員 存取各元素的成員。找最大值的方式和整數陣列相同：先假設 products[0] 是最貴，用迴圈逐一比較 price。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int maxIdx = 0;\nfor (int i = 1; i < 3; i++)\n    if (products[i].price > products[maxIdx].price)\n        maxIdx = i;\nprintf("最貴的商品: %s, 價格: %d",\n       products[maxIdx].name, products[maxIdx].price);` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <string.h>\n\nstruct Product { char name[20]; int price; };\n\nint main() {\n    struct Product p[3];\n    strcpy(p[0].name,"Mouse");  p[0].price=30;\n    strcpy(p[1].name,"Laptop"); p[1].price=1200;\n    strcpy(p[2].name,"USB");    p[2].price=15;\n    int m=0;\n    for(int i=1;i<3;i++) if(p[i].price>p[m].price) m=i;\n    printf("最貴的商品: %s, 價格: %d", p[m].name, p[m].price);\n    return 0;\n}` },
        ],
      },
      {
        id: 'st4', title: '函式傳遞結構', difficulty: 'hard',
        description: '定義 struct Rectangle（width, height），寫函式 int area(struct Rectangle r) 回傳面積。宣告 r = {6, 4}，輸出：\n\n面積 = 24',
        expectedOutput: '面積 = 24',
        check: o => o.trim() === '面積 = 24',
        template: `#include <stdio.h>\n\nstruct Rectangle {\n    int width;\n    int height;\n};\n\n// 定義 area 函式，接受 struct Rectangle 參數\n\n\nint main() {\n    struct Rectangle r = {6, 4};\n    printf("面積 = %d", area(r));\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '結構可以直接當函式參數（傳值，函式收到副本）。函式定義：int area(struct Rectangle r) { return r.width * r.height; }' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `int area(struct Rectangle r) {\n    return r.width * r.height;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nstruct Rectangle { int width, height; };\n\nint area(struct Rectangle r) {\n    return r.width * r.height;\n}\n\nint main() {\n    struct Rectangle r = {6, 4};\n    printf("面積 = %d", area(r));\n    return 0;\n}` },
        ],
      },
    ],

    // ══════════════════════════════════════════════════════════════════════
    // 9. 指標 (5 題)
    // ══════════════════════════════════════════════════════════════════════
    pointers: [
      {
        id: 'p1', title: '取址與解參考', difficulty: 'easy',
        description: '宣告 int x = 42，宣告指標 int *p = &x，透過指標輸出 x 的值：\n\n*p = 42',
        expectedOutput: '*p = 42',
        check: o => o.trim() === '*p = 42',
        template: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;  // p 指向 x 的位址\n    // 透過 *p 解參考，取得 x 的值\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '&x 取得 x 的記憶體位址，*p 解參考（dereference）取得該位址存放的值。int *p 宣告「指向 int 的指標」，*p 在使用時是「p 所指向的那個 int 的值」。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: 'printf("*p = %d", *p);' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n    printf("*p = %d", *p);\n    return 0;\n}` },
        ],
      },
      {
        id: 'p2', title: '透過指標修改變數', difficulty: 'easy',
        description: '宣告 int a = 10，透過指標將其改為 100，輸出：\n\n修改後 a = 100',
        expectedOutput: '修改後 a = 100',
        check: o => o.trim() === '修改後 a = 100',
        template: `#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *p = &a;\n    // 透過 *p 修改 a 的值為 100\n\n    printf("修改後 a = %d", a);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '*p = 100 等同於 a = 100（因為 p 指向 a 的位址，對 *p 賦值就是對 a 賦值）。這就是指標能讓函式修改外部變數的關鍵。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: '*p = 100;' },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *p = &a;\n    *p = 100;\n    printf("修改後 a = %d", a);\n    return 0;\n}` },
        ],
      },
      {
        id: 'p3', title: '指標與陣列', difficulty: 'medium',
        description: '宣告 int arr[] = {10, 20, 30}，用指標 int *p = arr 遍歷並輸出每個元素：\n\n10\n20\n30',
        expectedOutput: '10\n20\n30',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l.join(',') === '10,20,30'; },
        template: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int *p = arr;  // 陣列名稱本身就是指向第一個元素的指標\n    // 用 p++ 讓指標移動到下一個元素\n\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '陣列名稱是指向首元素的指標。p++ 讓指標移動到下一個 int（位址 +4 bytes）。*p 取目前指向的值，p++ 移動，重複三次即可輸出所有元素。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < 3; i++) {\n    printf("%d\\n", *p);\n    p++;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    for (int i = 0; i < 3; i++) {\n        printf("%d\\n", *p);\n        p++;\n    }\n    return 0;\n}` },
        ],
      },
      {
        id: 'p4', title: '函式透過指標修改值', difficulty: 'medium',
        description: '定義 void doubleVal(int *p) 函式，將 *p 的值乘以 2。在 main 宣告 int n = 5 並呼叫，輸出：\n\n呼叫前: 5\n呼叫後: 10',
        expectedOutput: '呼叫前: 5\n呼叫後: 10',
        check: o => { const l=o.trim().split('\n').map(s=>s.trim()); return l[0]==='呼叫前: 5'&&l[1]==='呼叫後: 10'; },
        template: `#include <stdio.h>\n\n// 定義 doubleVal，接受 int 指標，將值乘以 2\n\n\nint main() {\n    int n = 5;\n    printf("呼叫前: %d\\n", n);\n    doubleVal(&n);  // 傳 n 的位址\n    printf("呼叫後: %d\\n", n);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: '傳指標給函式（pass by pointer）讓函式能修改原始變數。函式內用 *p *= 2 或 *p = *p * 2 修改指標指向的值。呼叫時傳 &n（n 的位址）。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `void doubleVal(int *p) {\n    *p *= 2;\n}` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n\nvoid doubleVal(int *p) {\n    *p *= 2;\n}\n\nint main() {\n    int n = 5;\n    printf("呼叫前: %d\\n", n);\n    doubleVal(&n);\n    printf("呼叫後: %d\\n", n);\n    return 0;\n}` },
        ],
      },
      {
        id: 'p5', title: '動態記憶體配置 malloc/free', difficulty: 'hard',
        description: '用 malloc 動態配置一個 int 陣列（5 個元素），填入 1~5 並輸出，最後 free 釋放：\n\n1 2 3 4 5',
        expectedOutput: '1 2 3 4 5',
        check: o => o.trim().split(/\s+/).join(' ') === '1 2 3 4 5',
        template: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    // 用 malloc 配置 n 個 int 的空間\n    int *arr = malloc(n * sizeof(int));\n    if (arr == NULL) { printf("配置失敗"); return 1; }\n    // 填入 1~5\n\n    // 輸出\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    // 釋放記憶體\n    free(arr);\n    return 0;\n}`,
        hints: [
          { level: 1, title: '💡 概念提示', text: 'malloc(bytes) 從 heap 配置記憶體，失敗時回傳 NULL。用完後必須 free(arr) 釋放，否則造成記憶體洩漏。配置 n 個 int：malloc(n * sizeof(int))。' },
          { level: 2, title: '🔍 程式碼線索', text: '', code: `for (int i = 0; i < n; i++)\n    arr[i] = i + 1;` },
          { level: 3, title: '✅ 完整解答', text: '', code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int n = 5;\n    int *arr = malloc(n * sizeof(int));\n    if (!arr) { printf("配置失敗"); return 1; }\n    for (int i = 0; i < n; i++) arr[i] = i + 1;\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    free(arr);\n    return 0;\n}` },
        ],
      },
    ],

  },
};
