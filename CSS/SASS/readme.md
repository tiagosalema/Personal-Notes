It's not  possible import a `sass`/`scss` file into the html file. It's necessary to compile it to `css` first and in the html file import that `css`:

1. `npm i node-sass`

2. In `package.json` :

   ```json
   "scripts": {
     "compile": "node-sass ./main.scss ./style.css -w"
   }
   ```
   
   It's also possible to compile using a software. An example is called [Koala](http://koala-app.com/). To use it, open the software and select the `sass` file. Koala will automatically add a compiled `CSS` file with the same name in the same folder and update is every time the `SASS` file is edited.

# Partials

A good way to organize `sass` files is by partials:

+ base

  + `_animations.scss`
  + `_base.scss ` 
  + `_typography.scss`
  + `_utilities.scss`

+ abstract (folder with partials that won't output any css)

  + `_variables.scss`
  + `_mixins.scss`
  + `_functions.scss`

+ components (reusable building blocks)

+ layout

  ...

# Using sass variables in calc()

It's necessary to involve the variable in `#{}`:

`width: calc(100%-#{$gutter-horizontal});`



# Float

When all the elements of a `div` are float, the height of of the `div` collapses (becomes 0). To fix this, we need to clear the floats after it:

```css
@mixin clearfloats {
  &::after { /* & will be replaced by the class where the mixin will be `@include`d */
    content: "";
    display: table;
    clear: both; /* clears both left and right floats */
  } 
}
```

