# README

-   PT Serif and Source Pro Sans taken from Google Fonts
-   a favicon for the website was created using inkscape and convertico.com
-   Originally I wanted to create scrolling effects much like [this website](https://jordansowers.com/), but I ran into problems with making the webpage responsive, so I settled on the final result.
-   Each section was given the class `.min-vh-100` so the website content doesn't clutter the viewport
    -   each section also used the `d-flex` class from Bootstrap so that the content of each slide can be made to fill the viewport with `flex-grow-1`, and then be aligned with `align-item-center`
-   Code for horizontal lines before and after each section title was taken from: https://stackoverflow.com/questions/15557627/heading-with-horizontal-line-on-either-side (`content-pane.css`: `decorated` clas)
-   Used javascript to add fade in effects for images and contracting effect for section title; similar codes were used for the section titles to fade in and out on the navigation bar

## Navigation Bar

-   Logo inverts color on hover
-   side navigation bar was too large for small screens, so a Bootstrap collapsible Nav-bar that is fixed to the top is used on screen sizes smaller than medium
-   Navigation links corresponding to the visible section gets highlighted with a left border and a position change

## About

-   Typewriter effect was based on: https://css-tricks.com/snippets/css/typewriter-effect/ (`typewriter.css`)
-   Added Link that opens my CV

## Honors

-   image source: https://www.pexels.com/photo/opened-book-3278765/
-   award section is made using Bootstrap's borderless table class

## Skills

-   image source: https://www.pexels.com/photo/code-coding-computer-data-574073/

## Contact

-   image source: https://www.pexels.com/photo/black-steel-mailboxes-2574470/
-   the Bootstrap form does not currently as intended as I do not know PHP, but does open the default mail app when "Submit" is pressed

https://www.pexels.com/photo/close-up-of-microscope-256262/
https://www.pexels.com/photo/silhouette-of-person-holding-glass-mason-jar-1274260/
