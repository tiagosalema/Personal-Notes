<h1 style="position: absolute; right:0px">CSS</h1>
# Selectors

| Example               | Selects...                                                   |
| --------------------- | ------------------------------------------------------------ |
| .intro                | all elements with class="intro"                              |
| #firstname            | the element with id="firstname"                              |
| *                     | all elements                                                 |
| p                     | all <p> elements                                             |
| div, p                | all <div> elements and all <p> elements                      |
| div p                 | all <p> elements inside <div> elements                       |
| div > p               | all <p> elements where the parent is a <div> element         |
| div + p               | all <p> elements that are placed immediately after <div> elements |
| p ~ ul                | every <ul> element that are preceded by a <p> element        |
| [target]              | all elements with a target attribute                         |
| [target=_blank]       | all elements with target="_blank"                            |
| [title~=flower]       | all elements with a title attribute containing the word "flower" |
| [lang\|=en]           | all elements with a lang attribute value starting with "en"  |
| a[href^="https"]      | every <a> element whose href attribute value begins with "https" |
| a[href$=".pdf"]       | every <a> element whose href attribute value ends with ".pdf" |
| a[href*="w3schools"]  | every <a> element whose href attribute value contains the substring "w3schools" |
| a:active              | the active link                                              |
| p::after              | Insert something after the content of each <p> element       |
| p::before             | Insert something before the content of each <p> element      |
| input:checked         | every checked <input> element                                |
| input:default         | the default <input> element                                  |
| input:disabled        | every disabled <input> element                               |
| p:empty               | every <p> element that has no children (including text nodes) |
| input:enabled         | every enabled <input> element                                |
| p:first-child         | every <p> element that is the first child of its parent      |
| p::first-letter       | the first letter of every <p> element                        |
| p::first-line         | the first line of every <p> element                          |
| p:first-of-type       | every <p> element that is the first <p> element of its parent |
| input:focus           | the input element which has focus                            |
| a:hover               | links on mouse over                                          |
| input:in-range        | input elements with a value within a specified range         |
| input:indeterminate   | input elements that are in an indeterminate state            |
| input:invalid         | all input elements with an invalid value                     |
| p:lang(it)            | every <p> element with a lang attribute equal to "it" (Italian) |
| p:last-child          | every <p> element that is the last child of its parent       |
| p:last-of-type        | every <p> element that is the last <p> element of its parent |
| a:link                | all unvisited links                                          |
| :not(p)               | every element that is not a <p> element                      |
| p:nth-child(2)        | every <p> element that is the second child of its parent     |
| p:nth-last-child(2)   | every <p> element that is the second child of its parent, counting from the last child |
| p:nth-last-of-type(2) | every <p> element that is the second <p> element of its parent, counting from the last child |
| p:nth-of-type(2)      | every <p> element that is the second <p> element of its parent |
| p:only-of-type        | every <p> element that is the only <p> element of its parent |
| p:only-child          | every <p> element that is the only child of its parent       |
| input:optional        | input elements with no "required" attribute                  |
| input:out-of-range    | input elements with a value outside a specified range        |
| input::placeholder    | input elements with placeholder text                         |
| input:read-only       | input elements with the "readonly" attribute specified       |
| input:read-write      | input elements with the "readonly" attribute NOT specified   |
| input:required        | input elements with the "required" attribute specified       |
| :root                 | the document's root element                                  |
| ::selection           | the portion of an element that is selected by a user         |
| #news:target          | the current active #news element (clicked on a URL containing that anchor name) |
| input:valid           | all input elements with a valid value                        |
| a:visited             | all visited links                                            |

# BEM

**B**lock **E**lement **M**odifier is a convention for naming classes, where there is a block (e.g. a card), its elements (title, image, description) and modifiers (the card can be white or black, the image can be circular or rectangular, etc.). In the examples given, a correct naming under the BEM convention would be:

```html
<div class="card card--white"> 		<!-- modifiers use "--" -->
    <img class="card__image"> 		<!-- elements use "__" -->
    <h2 class="card__title"></h2>
    <p class="card__body"></p>
</div>

<div class="card card--black">
    <img class="card__image">
    <h2 class="card__title"></h2>
    <p class="card__body"></p>
</div>
```



# Common properties

## Text

```css
@font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
body {
    font-family: 'radnika_next';
    text-align: center;
  }
```



## Layout

```css
box-sizing: border-box; /*Includes padding and border in the elements total width and height*/
```



## Flexbox

### 	Align-content

Again... It's not what you think it is...
Every time a container has several lines in it, it is possible to align those lines according to the following image:

![flexbox - align content](C:\Users\tiago\Documents\CSS\images\flexbox - align content.png)

To implement it:

```css
.flex-container {
  diplay: flex;
  flex-flow: row wrap;
  align-content: flex-start | center | flex-end | space-between | space-around | stretch;
}
```



# Variables

```css
:root{ --mainBlack: #000 } 
body { background: var(--mainBlack); }
```

# Pseudo elements

`::before` and `::after` are the only pseudo elements and are programmatically distinguished from the pseudo classes by being preceded by 2 colons instead o 1.

The special thing about them is that they will literally introduce whatever we want spatially right before/after the element without the need of introducing a new element for it. For example:

```html
<p>Hello</p>
```

```css
p::before {
  content: 'Oh!';
}
p::after {
  content: ', my friend!';
}
```

will print `Oh! Hello, my friend!` and, if we would inspect the element, we would see

```html
<p>
  ::before
  Hello
  ::after
</p>
```

The content property is the only one strictly required for a pseudo element to work. It accepts values other than strings:

+ `content: url(//unsplash.it/100/100)` will put a random 100/100 px image



# Attributes

It is possible to refer to an html element that has a specific attribute in it:

```html
<a href="#" data-tool-tip="something" />
```

```css
a[data-tool-tip] { ... }    /*  all a elements that have the data-tool-tip attribute */
```

# Media queries

Adjust the size, hide, etc. of elements depending on given parameters. Follow the following pattern:

```css
@media () {
  /* ... */
}
```

It is possible to start designing for mobiles first and then do medias for bigger sizes or the other way around:

```css
@media (min-width: 600px) {} 			// mobile  first
@media (max-width: 600px) {} 			// desktop first
```

Or according to the orientation of the telephone:

```css
@media (orientation: landscape | portrait) {}
```

Or according to the place where the web is gonna be displayed (if to be printed on a paper or on the screen)

```css
@media screen and (...) {}
@media print  and (...) {}
```



# Stacking context

The z-index will define what will be displayed when 2 sibling elements overlap each other. If, say, element A as a smaller z-index than element B and both occupy the same exact space, none of the element A's children will be visible regardless of their z-index (even if they are greater than the one of element B), since element A children are in a different stacking context (this stacking context is inserted in a smaller than element A's z-index).

# Progress bar

```jsx
import Router from 'next/router'
import NProgress from 'nprogress' // <link rel='stylesheet' href='nprogress.css' /> in meta
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
```

# Bootstrap

A lot of properties are overridden by bootstrap ( when bootstrap is a dependency). To counter that, mark the property being overridden with the `!important` mark.



# Repetitive stuff

## 	Text with gradient color

```css
#fancy_heading {
  background-image: linear-gradient(to right, color1, color2);  /* background behind the text */
  display: inline-block; /* background width = text's now (not all the width available) */
  -webkit-background-clip: text; /* background is just the intersection with the text now */
  color: transparent; /* make text invisible */
}
```



# Common problems

1. If an element is taller than the element containing it, and it is floated, it will overflow outside of its container. Solution:

   ```css
   .clearfix::after { /* Class added to the containing element */
     content: "";
     clear: both;
     display: table;
   }
   ```