---

---

[YAML Front Matter](http://jekyllrb.com/docs/frontmatter/)



---

```
# This is an H1

## This is an H2

###### This is an H6
```

# This is an H1

## This is an H2

###### This is an H6



---

```
> This is a blockquote with two paragraphs. This is first paragraph.
>
> This is second pragraph.Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.



> This is another blockquote with one paragraph. There is three empty line to seperate two blockquote.
```

> This is a blockquote with two paragraphs. This is first paragraph.
>
> This is second pragraph.Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.



> This is another blockquote with one paragraph. There is three empty line to separate two blockquote.



---

```
* Red
+ Green
- Blue
1. Red
2. Green
3. Blue
```

*   Red

+ Green
- Blue
1. Red
2. Green
3. Blue



---

```
- [ ] a task list item
- [ ] list syntax required
- [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed
```

- [ ] a task list item
- [x] list syntax required
- [x] normal **formatting**, @mentions, #1234 refs
- [x] incomplete
- [ ] completed



---

```
​```
function test() {
  console.log("notice the blank line before this function?");
}
​```

​```javascript
console.log('Hello world')
​```
```



```
function test() {
  console.log("notice the blank line before this function?");
}
```

```javascript
console.log('Hello world')
```



---

```
$$
x+y=z
$$
```

$$
x+y=z
$$

[More mathematical expressions](http://support.typora.io/Math/)



---

```
| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |
```

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ | :-------------: | ------------: |
| col 3 is      | some wordy text |         $1600 |
| col 2 is      |    centered     |           $12 |
| zebra stripes |    are neat     |            $1 |



---

```
You can create footnotes like this[^1].

[^1]: This text appears when you hover over the footnote.
```

You can create footnotes like this[^1].

[^1]: This text appears when you hover over the footnote.



------

```
This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

[This link](#This is an H1) directs you to the headline `This is an H1`.
```

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

[This link](#This is an H1) directs you to the headline `This is an H1`.



---

```
![](http://typora.io/img/drag-img.gif)
```

![drag and drop image](http://typora.io/img/drag-img.gif)



---

```
*single asterisks*
_single underscores_
```

*single asterisks*
_single underscores_

```
**double asterisks**
__double underscores__
```

**double asterisks**
__double underscores__

```
Use the `printf()` function.
```

Use the `printf()` function.

```
~~Mistaken text.~~
```

~~Mistaken text.~~

```
<u>Underline</u>
```

<u>Underline</u>

```
:smile:
```

:smile:

```
H~2~O
X~long\ text~
X^2^
```

H~2~O
X~long\ text~
X^2^

```
==highlight==
```

==highlight==

```
<span style="color:red">this text is red</span>
```

<span style="color:red">this text is red</span>



---

```html
<iframe height='265' src='http://codepen.io/jeangontijo/embed/OxVywj/?height=265&theme-id=0&default-tab=css,result&embed-version=2'></iframe>
```

<iframe height='265' src='http://codepen.io/jeangontijo/embed/OxVywj/?height=265&theme-id=0&default-tab=css,result&embed-version=2'></iframe>



---

```Markdown
<video src="xxx.mp4" />
```

<video src="xxx.mp4" />



---

```html
<kbd>Ctrl</kbd>+<kbd>C</kbd>
```

<kbd>Ctrl</kbd>+<kbd>C</kbd>



<p style="position: absolute; right:0px">Aligning with CSS</p>







1. Here is the *text* of the **footnote**. [↩](https://support.typora.io/Markdown-Reference/#fnref:footnote)