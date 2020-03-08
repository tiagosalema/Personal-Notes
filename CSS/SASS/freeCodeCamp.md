## Variables

```html
<style type='text/sass'>
  $main-fonts: Arial, sans-serif;
  $headings-color: green;

  h1 {
    font-family: $main-fonts;
    color: $headings-color;
  }
</style>
```



## Nesting

```css
nav {...}
nav ul {}
nav ul li {}
```

to...

```css
nav {
	...
  ul {
    ...
    li {
      ...
    }
  }
}
```



## Mixins

```css
@mixin box-shadow($x, $y, $blur, $c){
  -webkit-box-shadow: $x, $y, $blur, $c;
  -moz-box-shadow: $x, $y, $blur, $c;
  -ms-box-shadow: $x, $y, $blur, $c;
  box-shadow: $x, $y, $blur, $c;
}
```

`($x, $y, $blur, $c)` are optional

Anytime we want to use this mixin:

```css
div {  @include box-shadow(0px, 0px, 4px, #fff);	}
```



## if clause

```css
@mixin text-effect($val) {
  @if $val == danger {  color: red;  }
  @else if $val == success {  color: green;  }
  @else {  color: black;  }
}
```



## for loop

```css
@for $i from 1 through 12 {
  .col-#{$i} { width: 100%/12 * $i; }
}
```

instead of `through` it can be `to`, the difference being that the former includes and the latter excludes the last value.
The `#{$i}` part is the syntax to combine a variable (`i`) with text to make a string. Result:

```css
.col-1 {  width: 8.33333%;  }
.col-2 {  width: 16.66667%;  }
...
.col-12 {  width: 100%;  }
```



## each

```css
<style type='text/sass'>
  $colors: (color1: blue, color2: black, color3: red);

  @each $key, $color in $colors {
    .#{$color}-bg {background-color: $color;}
  }
    
  
  div {
    height: 200px;
    width: 200px;
  }
</style>

<div class="blue-bg"></div>
<div class="black-bg"></div>
<div class="red-bg"></div>
```



## while

...

## Partials

Partials in Sass are separate files that hold segments of CSS code. These are imported and used in other Sass files. This is a great way to group similar code into a module to keep it organized. Names for partials start with the underscore (_) character, which tells Sass it is a small segment of CSS and not to convert it into a CSS file. Also, Sass files end with the `.scss` file extension. 

```css
/* In the main.scss file */
@import 'mixins'
```



## Extend

When we have properties of one element that we want to extend to another (and this other has some more)

```css
.panel{
  background-color: red;
  height: 70px;
  border: 2px solid green;
}

.big-panel{
  @extend .panel;
  width: 150px;
  font-size: 2em;
}
```

