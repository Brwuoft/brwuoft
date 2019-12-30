// array to record the familiarity of each card
// null = not yet rated, 1 = easy, 2 = medium, 3 = hard
var familiarity = [null];

// Generate flashcard from an object key & value
function generateCard(front, back) {
    if (front && back) {
        // display new flashcard
        var htmlCode = `                <div class="scene mx-3 my-3">
        <div class="card">
            <div class="card-face card-front p-0">
                <span class="remove-btn pr-1">&#10006;</span>
                <div id="card-front-text" class="text-center">
                    ${front}
                </div>
            </div>
            <div class="card-face card-back p-0">
                <div id="card-back-text">
                    ${back}
                </div>
                <table
                    class="table mb-0 text-center"
                    style="height: 15%;"
                >
                    <tbody>
                        <tr>
                            <td
                                id="easy-btn"
                                class="fam-opt py-0 align-middle"
                            >
                                Easy
                            </td>
                            <td
                                id="medium-btn"
                                class="fam-opt py-0 align-middle"
                            >
                                Medium
                            </td>
                            <td
                                id="hard-btn"
                                class="fam-opt py-0 align-middle"
                            >
                                Hard
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;
        $(htmlCode).insertBefore("#add-card");

        // add a fmiliarity of null to familiarity array
        familiarity.push(null);
        console.log(familiarity);

        // remove red outlines for the textboxes in case they are present
        $("#flashcard-front-form").removeClass("input-empty");
        $("#flashcard-back-form").removeClass("input-empty");
    } else if (!front && back) {
        $("#flashcard-front-form").addClass("input-empty");
        $("#flashcard-back-form").removeClass("input-empty");
    } else if (front && !back) {
        $("#flashcard-front-form").removeClass("input-empty");
        $("#flashcard-back-form").addClass("input-empty");
    } else if (!front && !back) {
        $("#flashcard-front-form").addClass("input-empty");
        $("#flashcard-back-form").addClass("input-empty");
    }
}

// record the number of null, easy, medium, hard cards
var donutData = [1, 0, 0, 0];

var data = {
    datasets: [
        {
            data: donutData,
            backgroundColor: [
                "rgb(211,211,211,1)",
                "rgb(255,165,0,1)",
                "rgb(50,205,50,1)",
                "rgb(30,144,255,1)"
            ],
            borderWidth: 0
        }
    ],
    labels: ["Not Rated", "Easy", "Medium", "Hard"]
};

var ctx = document.getElementById("donut");
var myDoughnutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: {
        aspectRatio: 1.3,
        responsive: true,
        legend: {
            labels: {
                fontColor: "white"
            }
        }
    }
});

function updateDonut() {
    donutData.fill(0);

    for (var i = 0; i < familiarity.length; i++) {
        if (familiarity[i] == null) {
            donutData[0]++;
        } else if (familiarity[i] == 1) {
            donutData[1]++;
        } else if (familiarity[i] == 2) {
            donutData[2]++;
        } else {
            donutData[3]++;
        }
    }

    myDoughnutChart.update();
}

$(document).ready(function() {
    // https://3dtransforms.desandro.com/card-flip
    $("#fc-container").on(
        "click",
        "div.scene>div.card>div.card-front",
        function() {
            $(this)
                .closest(".card")
                .toggleClass("is-flipped");
        }
    );

    $("#fc-container").on(
        "click",
        "div.scene>div.card>div.card-back>div#card-back-text",
        function() {
            $(this)
                .closest(".card")
                .toggleClass("is-flipped");
        }
    );

    $("#fade-wrapper").on(
        "click",
        "div.test-scene>div.test-card>div.card-front",
        function() {
            $(this)
                .closest(".test-card")
                .toggleClass("is-flipped");
        }
    );

    $("#fade-wrapper").on(
        "click",
        "div.test-scene>div.test-card>div.card-back>div#test-back-text",
        function() {
            $(this)
                .closest(".test-card")
                .toggleClass("is-flipped");
        }
    );

    // rating cards
    $("#fc-container").on(
        "click",
        "div.scene>div.card>div.card-back>table>tbody>tr>td#easy-btn",
        function() {
            var i = $(this)
                .closest(".scene")
                .index();
            familiarity[i] = 1;
            $(this)
                .closest("div.card-back")
                .removeClass("medium-card");
            $(this)
                .closest("div.card-back")
                .removeClass("hard-card");
            $(this)
                .closest("div.card-back")
                .addClass("easy-card");
            updateDonut();
        }
    );

    $("#fc-container").on(
        "click",
        "div.scene>div.card>div.card-back>table>tbody>tr>td#medium-btn",
        function() {
            var i = $(this)
                .closest(".scene")
                .index();
            familiarity[i] = 2;
            $(this)
                .closest("div.card-back")
                .removeClass("easy-card");
            $(this)
                .closest("div.card-back")
                .removeClass("hard-card");
            $(this)
                .closest("div.card-back")
                .addClass("medium-card");
            updateDonut();
        }
    );

    $("#fc-container").on(
        "click",
        "div.scene>div.card>div.card-back>table>tbody>tr>td#hard-btn",
        function() {
            var i = $(this)
                .closest(".scene")
                .index();
            familiarity[i] = 3;
            $(this)
                .closest("div.card-back")
                .removeClass("easy-card");
            $(this)
                .closest("div.card-back")
                .removeClass("medium-card");
            $(this)
                .closest("div.card-back")
                .addClass("hard-card");
            updateDonut();
        }
    );

    $("#fade-wrapper").on(
        "click",
        "div.test-scene>div.test-card>div.card-back>table>tbody>tr>td#easy-btn",
        function() {
            var cardIdx = null;
            var j = 0; // records number of easy cards the for loop below has gone through
            if (lastDiff == null) {
                familiarity[testCardIdx] = 1;
                cardIdx = testCardIdx;
            } else {
                for (var i = 0; i < familiarity.length; i++) {
                    console.log("lastDiff: ", lastDiff, "j: ", j, "i: ", i)
                    if (familiarity[i] == lastDiff) {
                        j++;
                    }
                    if (j == testCardIdx + 1) {
                        familiarity[i] = 1;
                        cardIdx = i;
                        break;
                    }
                }
            }
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .removeClass("medium-card");
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .removeClass("hard-card");
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .addClass("easy-card");
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "medium-card"
            );
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "hard-card"
            );
            $(".test-scene>div.test-card>div.card-back").addClass("easy-card");
            updateDonut();
            console.log("Familiarity:", familiarity);
        }
    );

    $("#fade-wrapper").on(
        "click",
        "div.test-scene>div.test-card>div.card-back>table>tbody>tr>td#medium-btn",
        function() {
            var cardIdx = null;
            var j = 0; // records number of medium cards the for loop below has gone through
            if (lastDiff == null) {
                familiarity[testCardIdx] = 2;
                cardIdx = testCardIdx;
            } else {
                for (var i = 0; i < familiarity.length; i++) {
                    console.log("lastDiff: ", lastDiff, "j: ", j, "i: ", i)
                    if (familiarity[i] == lastDiff) {
                        j++;
                    }
                    if (j == testCardIdx + 1) {
                        familiarity[i] = 2;
                        cardIdx = i;
                        break;
                    }
                }
            }
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .removeClass("easy-card");
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .removeClass("hard-card");
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .addClass("medium-card");
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "easy-card"
            );
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "hard-card"
            );
            $(".test-scene>div.test-card>div.card-back").addClass(
                "medium-card"
            );
            updateDonut();
            console.log("Familiarity:", familiarity);
        }
    );

    $("#fade-wrapper").on(
        "click",
        "div.test-scene>div.test-card>div.card-back>table>tbody>tr>td#hard-btn",
        function() {
            var cardIdx = null;
            var j = 0; // records number of hard cards the for loop below has gone through
            if (lastDiff == null) {
                familiarity[testCardIdx] = 3;
                cardIdx = testCardIdx;
            } else {
                for (var i = 0; i < familiarity.length; i++) {
                    console.log("lastDiff: ", lastDiff, "j: ", j, "i: ", i)
                    if (familiarity[i] == lastDiff) {
                        j++;
                    }
                    if (j == testCardIdx + 1) {
                        familiarity[i] = 3;
                        cardIdx = i;
                        break;
                    }
                }
            }
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .removeClass("easy-card");
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .removeClass("medium-card");
            $(".scene")
                .eq(cardIdx)
                .find("div.card>div.card-back")
                .addClass("hard-card");
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "easy-card"
            );
            $(".test-scene>div.test-card>div.card-back").removeClass(
                "medium-card"
            );
            $(".test-scene>div.test-card>div.card-back").addClass("hard-card");
            updateDonut();
            console.log("Familiarity:", familiarity);
        }
    );

    // remove a card
    $("#fc-container").on(
        "click",
        "div.scene>div.card>div.card-front>span.remove-btn",
        function() {
            // first remove its familiarity rating
            var i = $(this)
                .closest(".scene")
                .index();
            familiarity.splice(i, 1);
            // delete the card
            $(this)
                .closest(".scene")
                .remove();
            updateDonut();
        }
    );

    $("#add-btn").click(function() {
        newCardFront = $("#flashcard-front-form").val();
        newCardBack = $("#flashcard-back-form").val();

        generateCard(newCardFront, newCardBack);
        updateDonut();
    });

    // code for test
    $("#test-btn").on("click", function() {
        if (familiarity.length != 0) {
            console.log("Showing Test Screen");
            $("#fade-wrapper").removeClass("d-none");
            pickCard();
        }
    });

    $("#test-close-btn").on("click", function() {
        $("#fade-wrapper>div.test-scene>div.test-card").removeClass(
            "is-flipped"
        );
        $("#fade-wrapper").addClass("d-none");
    });

    $("#test-next-btn").on("click", function() {
        pickCard();
        $("#fade-wrapper>div.test-scene>div.test-card").removeClass(
            "is-flipped"
        );
    });
});
