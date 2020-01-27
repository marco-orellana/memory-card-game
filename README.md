# memory-card-game
Memory card game made entirely with vanilla Javascirpt, no library or framework.
Bootstrap was used but only css.


I worked on _setting.js_ (wich is the UI) and i helped making the algorithm on shuffling the card and making sure that there isn't more than 2 of the same card on the field (algoritmh in _gamefield.js_). 
I also worked on keeping the highest score after each new game. If you close the tab or the browser, the highscore will disapear.
We had 1 week to make the project.



Thanks to the [IIFE (Immediately Invoked Function Expression)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), we designed the project to have a concept similar to React's _container components and presentational components_ concept.
Presentational components are concerned with the look, container components are concerned with making things work.
_Setting.js_ is the presentational component displaying the score, time and pairs found and _gamefield.js_ is the container component, having all the logic of the game and passing the data to _setting.js_.




# How to install
1. Download the repositery on your computer
2. Open _index.html_ and enjoy! 

Since we used BootstrapCDN, you must have internet connection when opening _index.html_ otherwise the css from Bootstrap won't load and the gamefield will not be placed correctly. 
