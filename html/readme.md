<h1 style="position: absolute; right:0px">HTML</h1>


# Accessibility

## Semantic HTML tags

+ clearly describes its meaning to both the browser and the developer on its own	
+ provide information about the contents of those tags that goes beyond just how they look on a page
+ make it clear to the browser what the meaning of a page and its content is. That clarity is also communicated with search engines, ensuring that the right pages are delivered for the right queries
+ convey meaning rather than presentation

Examples of **non-semantic** elements: `<div>` and `<span>` - Tells nothing about its content.
Examples of **semantic** elements: `<form>`, `<table>`, and `<article>` - Clearly defines its content.
Examples of semantic tags to use instead of `div`:

| tag       | purpose                                                    |
| --------- | ---------------------------------------------------------- |
| `section` | defines a part of a website with related content.          |
| `article` | defines an individual piece of content                     |
| `header`  | defines a header (in a document, a section, or an article) |
| `footer`  | ...idem...                                                 |
| `nav`     | defines a container of navigation links                    |



## Schema markup

Gives context to the Search Engines, helping them to get data more effectively, including the data to be displayed other than the title. It consists of an attribute in the html, the `itemprop`, that 

Search engines can get info by 3 formats: [Microdata](https://schema.org/docs/gs.html), RDFa and JSON+LD. The first 2 are HTML format.

### Microdata

Your web pages have an underlying meaning that people understand when they read the web pages. But search engines have a limited understanding of what is being discussed on those pages. By adding additional tags to the HTML of your web pages—tags that say, "Hey search engine, this information describes this specific movie, or place, or person, or video"—you can help search engines and other applications better understand your content and display it in a useful, relevant way. Microdata is a set of tags, introduced with HTML5, that allows you to do this. 

```html
<div itemscope itemtype="http://schema.org/Product">
  <span itemprop="name">Ferrari</span>
  <div itemprop="description">In good shape</div>
  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <span itemprop="priceCurrency" content="USD">$</span><span itemprop="price" content="100">100</span>
  </div>
</div>
```

+ `itemscope` indicates to the search engine that the given `div` is an item. 
+ `itemtype` indicates what kind of item that is. The available url can be found in schema.org
+ `itemprop` is what indicates to the search engine what that tag is about

Not all web pages are about products and offers — in addition to the Product and Offer types, schema.org describes a  variety of other item types, each of which has its own set of properties  that can be used to describe the item.

The broadest item type is [Thing](https://schema.org/Thing), which has four properties: `name`, `description`, `url`, and `image`. More specific types share properties with broader types. For example, a [Place](https://schema.org/Place) is a more specific type of Thing, and a [LocalBusiness](https://schema.org/LocalBusiness)  is a more specific type of `Place`. More specific items inherit the  properties of their parent. Actually, a `LocalBusiness` is a more  specific type of `Place` and a more specific type of `Organization`, so it inherits properties from both parent types.

Here's a set of commonly used item types:

- Creative works: [CreativeWork](https://schema.org/CreativeWork), [Book](https://schema.org/Book), [Movie](https://schema.org/Movie), [MusicRecording](https://schema.org/MusicRecording), [Recipe](https://schema.org/Recipe), [TVSeries](https://schema.org/TVSeries) ...
- Embedded non-text objects: [AudioObject](https://schema.org/AudioObject), [ImageObject](https://schema.org/ImageObject), [VideoObject](https://schema.org/VideoObject)
- [Event](https://schema.org/Event)
- [Organization](https://schema.org/Organization)
- [Person](https://schema.org/Person)
- [Place](https://schema.org/Place), [LocalBusiness](https://schema.org/LocalBusiness), [Restaurant](https://schema.org/Restaurant) ...
- [Product](https://schema.org/Product), [Offer](https://schema.org/Offer), [AggregateOffer](https://schema.org/AggregateOffer)
- [Review](https://schema.org/Review), [AggregateRating](https://schema.org/AggregateRating)

You can also see a [full list of all item types](https://schema.org/docs/full.html), listed on a single page.  

### RDFa

```html
<div vocab="http://schema.org/" typeof="Product">
  <span property="name">Ferrari</span>
  <div property="description">In good shape</div>
  <div property="offers" typeof="Offer">
    <span property="priceCurrency" content="USD">$</span><span property="price" content="100">100</span>
  </div>
</div>
```

- `itemprop` is replaced with `property`.
- `itemscope` is dropped.
- `itemtype` is replaced with `typeof`.

### JSON+LD

```json
{
  "@context": 	"http://schema.org",
  "@type": 			"Product",
  "name": 			"Ferrari",
  "description": "in good shape",
  
  "offers": {
    "@context": 		"http://schema.org",
    "@type": 				"Offer",
    "priceCurrency": "USD",
    "price": 				"100"
  }
}
```



+ With schema:

![schemamicrodata_with](C:\Users\tiago\Documents\html\schemamicrodata_with.png)

+ Without schema:

![schemamicrodata_without](C:\Users\tiago\Documents\html\schemamicrodata_without.png)


Test if we are correctly using the SEO [here](https://seositecheckup.com/).
Test if the Schema was correctly applied in the website [here](https://search.google.com/structured-data/testing-tool).

## ARIA

**A**ccessible **R**ich **I**nternet **A**pplications is a set of [standardized rules](https://www.w3.org/TR/wai-aria-1.0/) that allows users with disabilities to navigate the website (blind, motor disabilities, etc.). This is possible by including some special attributes to the html elements that will be interpreted by some addons to the browser or something alike. Most of these attributes start with `aria-`.

The most common attribute actually doesn't start with `aria`, but rather `role`. A good example is labeling an unordered list with whether a [menubar](https://www.w3.org/TR/wai-aria/roles#menubar) or a [menu](https://www.w3.org/TR/wai-aria/roles#menu), which will inform the interpreting app if the menu bar is horizontal or vertical , respectively. This list will then have its items with the attribute `role="menuitem"`.

The most common roles are the "Landmark roles":

- role=”banner”
- role=”navigation” (e.g., a menu)
- role=”main” (the main content of the page)
- role=”complementary” (e.g., a sidebar)
- role=”contentinfo” (meta data about the page, e.g., a copyright statement)
- role=”search”
- role=”form”
- role=”application” (a web application with its own keyboard interface)

# Usability (UX)

- **Intuitive design**: a nearly effortless understanding of the architecture and navigation of the site
- **Ease of learning**: how fast a user who has never seen the user interface before can accomplish basic tasks
- **Efficiency of use**: How fast an experienced user can accomplish tasks
- **Memorability**: after visiting the site, if a user can remember enough to use it effectively in future visits
- **Error frequency and severity**: how often users make errors while using the system, how serious the errors are, and how users recover from the errors
- **Subjective satisfaction**: If the user likes using the system



+ `alt` tag in images

+ `title` tag in links (displays a tooltip)

+ ```html
  <form>
    <label for="someId">...</label>
    <input type=".." name=".." id="someId" />
  </form>
  ```

  

# Form

It is possible to submit a form using `<input>` instead of a regular button:

```html
<form action="https://www.myPage.com">
	First name: <input type="text" name="firstname">
	Last name: <input type="text" name="lastname">
	<input type="submit" value="Submit">
</form> 
```

All the showed attributes are required.

What this will do is go to the link `https://www.mypage.com/?firstname=xxx&lastname=yyy`, where `xxx` and `yyy` are the values introduced by the user in the first and second `input`s, respectively.