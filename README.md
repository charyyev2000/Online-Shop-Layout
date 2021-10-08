# Aloha-Homepage

## Table of Contents
1. Purpose
2. Functionality
3. Technologies used
4. CSS Organization

## Purpose
The purpose of this project is to recreate the demonstrated website and ensure that it is responsive over a variety of viewing form-factors. 

## Functionality
1. There is an image carousel that will feature the favourite products. It will wrap around at the end of the list and will center in on the focused element. 

2. The products featured in favourite products can be added to or taken out of the cart freely.

3. The total number of items in the cart will be featured in the cart icon in the top right. If there are no items in the cart, the dot will not be displayed.

4. The header navigation is sticky and will remain on screen at all times

5. Clicking on the navigation items will smoothscroll you to the desired section on the website

## Technologies Used
1. Flickity plugin for image slider: [flickity](https://flickity.metafizzy.co/)
2. Font Awesome for text icons: [font awesome](https://fontawesome.com/)
3. JQuery library: [JQuery](https://jquery.com/)
4. Font Squirrel for downloaded fonts: [Font Squirrel](https://www.fontsquirrel.com/)
5. Transfonter to convert font formats to ensure cross-browser support: [Transfonter](https://transfonter.org/)

## CSS Organization
Generally, CSS are organized in a modular top-to-bottom format. Global and site-wide styles are at the top and then each part of the website will follow from top to bottom.

Within each section of the website, a similar top-to-bottom approach is followed. Elements on roughly the same position will have more specific elements towards the bottom.

Within each CSS selector, the individual properties are organized as follows:

1. Display elements such as inline, block, flex, and their affected derivatives.
2. Positional elements such as absolute, top, left.
3. Dimensional elements such as width, margin, padding, height.
4. Visual elements such as color, background, and font.