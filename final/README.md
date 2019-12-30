# Flashcards

A website to help you study with flashcards.

## Instructions

-   Add a new flashcard by filling in the textboxes
    -   the top textbox is for the front of the flashcard
    -   the bottom textarea is for the back of the flashcard
-   Click on a flashcard to toggle between its front and its back
-   On the back of each card, there are options to rate the flashcard as `easy`, `medium`, or `hard`
-   To delete a card, click on the `X` on the top right corner on the front of the card
-   A donut chart is presented on the left side of the page to help you keep track of the number of cards rated at each difficulty
-   Press `Test` to enter test mode:
    -   Cards that have not yet been rated are presented first
    -   Press `Next` to proceed to the next card
    -   Once all the cards have been rated, flashcards will be selected randomly
    -   The randomly selected card will be presented on its front side, and you can click on it to flip it
    -   If you want to change the difficulty rating of the card, you can do so on the back face
    -   Press `Close` to exit test mode

## Features

-   If the user attempts to add a flashcard without filling in either of the textboxes creates a red outline around the empty textbox, and no card will be created

-   If the text added exceeds the area of flashcard, a scrollbar will automatically appear so the text does not overflow

-   The text entered into the textboxes are directly copied to the flashcards, meaning that html tags such as `</br>` can be used as well

-   The three difficulty ratings are color-coded for easy reference

-   In test mode, the probability of each card appearing depends on its difficulty rating

-   In test mode, when `next` is clicked, the card is updated and automatically flipped to the front side

## Technical Aspects

-   The difficulty rating of each card is kept in an array called `familiarity`

-   The flipping effect for the cards are based on [this](https://3dtransforms.desandro.com/card-flip) website. Essentially, the cards have the structure:

    ```html
    <div class="scene">
        <div class="card">
            <div class="card-face card-front">
                <div id="card-front-text" class="text-center">
                    <!-- text at the front -->
                </div>
            </div>
            <div class="card-face card-back">
                <div id="card-back-text">
                    <!-- text at the back -->
                </div>
                <table>
                    <!-- difficulty rating buttons -->
                </table>
            </div>
        </div>
    </div>
    ```

    When `.card-front` or `.card-back-text` is clicked, the `.is-flipped` class is toggled on `.card`, which adds or removes `transform: rotateY(180deg);`. For example:

        ```javascript
        $("#fc-container").on(
            "click",
            "div.scene>div.card>div.card-front", // when this element is clicked
            function() {
                $(this)
                    .closest(".card")
                    .toggleClass("is-flipped");
            }
        );
        ```

    -   `transform-style: preserve-3d;` is used on `.card` so toggling `.is-flipped` applies the rotation to its children element

    -   `$().on` is used instead of `$().click` so that delegated event handler can be used, which allows the code to apply to flashcards that are added by the user after the page has loaded
    -   When the cards flip, the side facing away from the user is hidden by

        ```css
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        ```

    -   Flipping the cards change the x position of the shadow so the shadow always stay below and to the right of the cards

    -   Test mode is toggled on and off by adding or removing `d-none`

-   New cards are added with the `generateCard()` function by inserting the codes for a card using `$(code for card).insertBefore()`

-   When cards are deleted, the entire `.scene` is removed and `splice()` is used to remove the rating of the card from familiarity

-   Card selection in test mode:

    1. The number of cards rated at each difficulty is recorded in an array called `nCards`

        - `nCards[0]` = number of cards rated as easy
        - `nCards[1]` = number of cards rated as medium
        - `nCards[2]` = number of cards rated as hard

    2. `familiarity` is checked for any unrated card:

    ```javascript
    if ($.inArray(null, familiarity) != -1;) {
        // present the unrated cards first
    }
    ```

    3. A number called `difficulty` is generated randomly between 0 and 1 using `Math.random()`
    4. There are 3 possible outcomes:
        - If the number is less than or equal to `0.2`, then another number (called `testCardIdx`) is randomly generated again between `0` and `nCards[0]`, and the number is used to select a card rated as easy
        - If the number is greater than `0.2` but less than or equal to `0.5`, then another number (called `testCardIdx`) is randomly generated again between `0` and `nCards[1]`, and the number is used to select a card rated as medium
        - If the number is greater than `0.5`, then another number (called `testCardIdx`) is randomly generated again between `0` and `nCards[2]`, and the number is used to select a card rated as hard
    5. The content of the selected card is copied to text to be shown on the test screen; this is done with easy cards, for instance, using:
        ```javascript
        frontText = $(".easy-card")
            .eq(testCardIdx)
            .siblings("div.card-front")
            .children("div#card-front-text")
            .text();
        ```
    6. The uncompressed jQuery version is used to so that the `fadeOut` and `fadeIn` functions can be used on the text displayed
    7. The difficulty of the last selected card is saved as `lastDiff` and the card's index in its difficulty class (i.e. `testCardIdx`) is saved as `lastCard`

-   When a new rating is selected on the test screen, the overall index of the card is calculated from `testCardIdx` and `lastDiff` and saved as `cardIdx`. This is then used to modify `familiarity` and to update the donut chart.

*   The donut chart is made with [Chart.js](https://www.chartjs.org/), with the only change from default being increasing the chart height with `aspectRation: 1.3` so that the donut does not appear mcuh smaller than the legend
    -   Each time the rating of a card is updated, on either the test screen or the normal screen, the function `updateDonut()` is called so the donut chart reacts immediately
    -   `updateDonut()` counts the number of cards with each rating in `familiarity`
