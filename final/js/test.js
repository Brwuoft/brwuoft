var lastDiff = null;
var lastCard = null;
var testCardIdx = null;
var difficulty = null;

function pickCard() {
    // record the number of easy, medium, hard cards
    var nCards = [0, 0, 0];
    for (var i = 0; i < familiarity.length; i++) {
        if (familiarity[i] == 1) {
            nCards[0]++;
        } else if (familiarity[i] == 2) {
            nCards[1]++;
        } else {
            nCards[2]++;
        }
    }

    var frontText = "";
    var backText = "";

    while (frontText == "") {
        if ($.inArray(null, familiarity) != -1) {
            console.log("Choosing unrated card");
            testCardIdx = $.inArray(null, familiarity);
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "medium-card"
            );
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "hard-card"
            );
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "easy-card"
            );
            frontText = $(".scene")
                .eq(testCardIdx)
                .find("div.card>div.card-front>div#card-front-text")
                .text();
            backText = $(".scene")
                .eq(testCardIdx)
                .find("div.card>div.card-back>div#card-back-text")
                .text();
            lastDiff = null;
            lastCard = testCardIdx;
        } else {
            difficulty = Math.random();
            console.log("Difficulty is", difficulty);
            if (difficulty <= 0.2) {
                // pick a card with easy difficulty
                testCardIdx = Math.floor(Math.random() * nCards[0]);
                console.log(nCards, testCardIdx);
                frontText = $(".easy-card")
                    .eq(testCardIdx)
                    .siblings("div.card-front")
                    .children("div#card-front-text")
                    .text();
                backText = $(".easy-card")
                    .eq(testCardIdx)
                    .children("div#card-back-text")
                    .text();
                $(".test-scene>div.test-card>div.card-back").removeClass(
                    "medium-card"
                );
                $(".test-scene>div.test-card>div.card-back").removeClass(
                    "hard-card"
                );
                $(".test-scene>div.test-card>div.card-back").addClass(
                    "easy-card"
                );
                lastDiff = difficulty;
                lastCard = testCardIdx;
            } else if (difficulty <= 0.5) {
                // pick a card with medium difficulty
                testCardIdx = Math.floor(Math.random() * nCards[1]);
                frontText = $(".medium-card")
                    .eq(testCardIdx)
                    .siblings("div.card-front")
                    .children("div#card-front-text")
                    .text();
                backText = $(".medium-card")
                    .eq(testCardIdx)
                    .children("div#card-back-text")
                    .text();
                $(".test-scene>div.test-card>div.card-back").removeClass(
                    "easy-card"
                );
                $(".test-scene>div.test-card>div.card-back").removeClass(
                    "hard-card"
                );
                $(".test-scene>div.test-card>div.card-back").addClass(
                    "medium-card"
                );
                lastDiff = difficulty;
                lastCard = testCardIdx;
            } else {
                // pick a card with hard difficulty
                testCardIdx = Math.floor(Math.random() * nCards[2]);
                frontText = $(".hard-card")
                    .eq(testCardIdx)
                    .siblings("div.card-front")
                    .children("div#card-front-text")
                    .text();
                backText = $(".hard-card")
                    .eq(testCardIdx)
                    .children("div#card-back-text")
                    .text();
                $(".test-scene>div.test-card>div.card-back").removeClass(
                    "easy-card"
                );
                $(".test-scene>div.test-card>div.card-back").removeClass(
                    "medium-card"
                );
                $(".test-scene>div.test-card>div.card-back").addClass(
                    "hard-card"
                );
                lastDiff = difficulty;
                lastCard = testCardIdx;
            }
        }
    }

    $("#test-front-text").fadeOut("fast", function() {
        $(this)
            .html(frontText)
            .fadeIn("fast");
    });

    $("#test-back-text").html(backText);
    console.log("front: ", frontText);
    console.log("back:", backText);
}
