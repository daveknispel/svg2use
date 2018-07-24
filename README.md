# [daveknispel.github.io/svg2use/]()

Convert SVGs for the Web Easily!  Use this website to convert the SVG icon set code from preferred vector program ready for use on intended website or digital platform. It prepares the svg icons in symbol wrappers ready to refernce with the use method. Read more about the benefits of this method on [CSS Tricks](https://css-tricks.com/svg-symbol-good-choice-icons/)

## Instructions

### 1. Prepare icons set in Vector Program, I use Adobe Illustrator as I find it has the best results 
* Create or import a series of icons the same size into document
* Put each icon on its own layer and rename each layer to identify the icon - this name will be used for the accessibilty title later
* Align all icons on top of each other
* Make artboard slightly bigger than the icons
* If you would like a single fill color hover effect, convert all paths to outlines and make fill color #000000

### 2. Export Icon set
* Press file > Save As
* Change format to SVG compressed
* Press Save
* Press SVG Code...
* This will generate SVG code ready for use on [website](https://daveknispel.github.io/svg2use/)

### 3. Open [website](https://daveknispel.github.io/svg2use/)
* Add code to first black section labeled 'Paste raw SVG code here'
* Select Accessibilty option, see below to understand where these accessibilty solutions came from
* Press 'Convert SVG Code'
* This will convert code ready to add to intended website

### 4. Add code to intended website
* 'SVG as <symbols>' code belongs in the **header** of the website
* 'HTML svg <use>' code has each of the icons html. Add this icon to where you would like the icon to appear in the **body**
* 'CSS' code belongs in website **style sheet**, you should be able to adjust this code for your own use.


## Accessible SVG resources

This website has used the accessibilty techniques from Jonathan Neal @jonathantneal with the title technqiue as seen [here](https://github.com/jonathantneal/svg4everybody#readability-and-accessibility) and also with Léonie Watson aria label technqure as seen [here](https://developer.paciellogroup.com/blog/2013/12/using-aria-enhance-svg-accessibility/). Thanks for much to these guys for pathing the way!

## Other SVG <use> methods teachings that lead me here & are worth a read

* [Inline SVG with the ‘use’ element - Shane Osbourne](https://wearejh.com/inline-svg-use-element/)
* [How to work with SVG icons  - Florens Verschelde](https://fvsch.com/svg-icons/)
* [Styling SVG <use> Content with CSS -  Sara Soueidan](https://tympanus.net/codrops/2015/07/16/styling-svg-use-content-css/)
* [Inline SVG Icons -  Kartik Prabhu](https://kartikprabhu.com/articles/inline-svg-icons)
* [Using SVGs  -  Chris Coyier](https://css-tricks.com/using-svg/)
* [https://css-tricks.com/scale-svg/  -  Amelia Bellamy-Royds](https://css-tricks.com/scale-svg/)
* [Inline SVG hover states with CSS (<use> tag)  - Nick Noordijk](https://medium.com/@nicknoordijk/inline-svg-hover-states-with-css-use-tag-4a336ed75062)
* [SVG `use` with External Source  -  Chris Coyier](https://css-tricks.com/svg-use-external-source/)
* [SVG `use` with External Reference Take 2  -  Chris Coyier](https://css-tricks.com/svg-use-with-external-reference-take-2/)
* [Tips for Creating Accessible SVG - Léonie Watson](https://www.sitepoint.com/tips-accessible-svg/)

## Browser Support

Find out more about <use> browser support [here at MDN web docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use)
For greater browser support take a look at [https://github.com/jonathantneal/svg4everybody](https://github.com/jonathantneal/svg4everybody)

## Authors

* **Dave Knispel** - *Initial work* - [SVG2use](https://daveknispel.github.io/svg2use/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details




