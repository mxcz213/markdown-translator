# 编码前的详细设计文档

# markdown 整理全部规则

## 区块元素
### 段落、换行
段落前后要有至少两个以上的空白字符（换行，制表，空格）  

### 标题
标题有两种语法：
第一种：
h1
===
h2
----
=== ---数量不限
第二种：
#h1
##h2
###h3
####h4
#####h5
######h6
###########h6
### 区块引用
每一行都加
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

也可以只在第一行加
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.
嵌套引用
>
> > This is nested blockquote.
>
> Back to the first level.

区块中也可以使用其他语法
> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");

### 列表
无序列表使用星号、加号或是减号作为列表标记：
*   Red
*   Green
*   Blue

+   Red
+   Green
+   Blue

-   Red
-   Green
-   Blue

有序列表则使用数字接着一个英文句点
1.  Bird
2.  McHale
3.  Parish

显示成3 4 5
3. Bird
1. McHale
8. Parish  

列表项目标记

列表项目标记通常是放在最左边，但是其实也可以缩进，最多 3 个空格，项目标记后面则一定要接着至少一个空格或制表符。
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
### 代码区块

### 分割线
* * *
***
*****
- - -
---------------------------------------

## 区段元素

### 链接
Markdown 支持两种形式的链接语法： 行内式和参考式两种形式。
his is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.
会产生
<p>This is <a href="http://example.com/" title="Title">
an example</a> inline link.</p>

<p><a href="http://example.net/">This link</a> has no
title attribute.</p>
### 强调
Markdown 使用星号（*）和底线（_）作为标记强调字词的符号，被 * 或 _ 包围的字词会被转成用 <em> 标签包围，用两个 * 或 _ 包起来的话，则会被转成 <strong>
### 代码
`printf()`
``  1``
### 图片
![Alt text](/path/to/img.jpg)

![Alt text](/path/to/img.jpg "Optional title")

## 特殊字符转换
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号

## html标签不转换


