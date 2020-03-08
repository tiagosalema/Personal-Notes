1. `npm i jquery` / include the jquery cdn / download it from the website and include it `<script src="..."></script>`

   ```html
   <script>
     $(document).ready(function() {
   
     });
     // or
     $(function(){
       
     });
   </script>
   
   ```

2. All jQuery functions start with $ (dollar sign operator / bling), which select an element, then applying a method to it:

   1. `$("btn1").addClass("someClass anotherClass");` - selected `btn1` and used the `addClass` method
   2. `$(".btn2").click(() => $("btn2").hide());`

# DOM traversal

It's possible to select other elements related to the target element.

- `$("btn1").parent()` selects the parent of `btn1`
- `$("btn1").children()`
- `$("btn1").siblings()`
- `$("btn1:nth-child(n)")` selects the n<sup>th</sup> child of `btn1`
- `$("btn1:even(n)")`
- `$("btn1:odd(n)")`
- Inside an element: `$(this).find('.myClass')` finds all the elements with the class `myClass` inside that element
- `if($(btn1).is('.myClass')){}` - if `btn1` has the `myClass` class
- `if($(btn1).not('.myClass')){}` - if `btn1` doesn't have the `myClass` class

It is also possible to dynamically select an element to follow the DRY principle:

````
$("btn").on("click", function() {
  const id = $(this).attr("data-targetId"); // if there's a "data-targetId" in the html element
	$("#" + id).toggle();
})
````

**Note that it is not an arrow function! If it was, `this` would be directing to the window scope and not the button.**

# Methods

+ `.hide(100)` - hides after 100 milliseconds

+ `.toggle(100)`

+ `.slideToggle(100)`

+ `.fadeOut(100)`

+ `css("color", "blue")` or `css({color:"blue"})` - the second has to use camelCase for the properties

+ `.html("my new content")`

+ `.on()`

  ```
  $(#btn1).on('eventName', () => {
  	...
  })
  ```

  `eventName` can be:	
  + `click`
  + `mousehover`

  

# Classes

+ `addClass()`
+ `removeClass()`
+ `click()`
+ ``
+ `$("button").prop("disabled", true)` - disables the `button` elements (greys them out) by changing the disabled **prop**erty to `true`
+ `html("<em>hey</em>")` - adds everything inside `html` between the selected tags tags
+ `text("hey")` - same as `html`, but just adds text
+ `remove()` - removes the selected element
+ `appendTo("#right")` - moves the selected element into the `#right` id
+ `clone().appendTo("#right")` - copies the selected element to the `right` id

+ 