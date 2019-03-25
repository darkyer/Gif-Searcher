
var key = "lAGLM918Q8MJr3xUyZuFdZhMm2f844I7";

var buttonsArray = ["alligator", "ant", "bear", "bee", "bird", "camel", "cat", "cheetah", "chicken", "chimpanzee", "cow", "crocodile",
    "deer", "dog", "dolphin", "duck", "eagle", "elephant", "fish", "fly", "fox", "frog", "giraffe", "goat", "goldfish", "hamster", "hippopotamus",
    "horse", "kangaroo", "kitten", "lion", "lobster", "monkey", "octopus", "owl", "panda", "pig", "puppy", "rabbit", "rat", "scorpion", "seal", "shark",
    "sheep", "snail", "snake", "spider", "squirrel", "tiger", "turtle", "wolf", "zebra"];

$(document).ready(function () {
    GenerateButtons(buttonsArray);


    function GenerateButtons(array) {

        $("#buttons-content").empty();
        var buttonToCreate;

        for (var i = 0; i < array.length; i++) {
            buttonToCreate = $("<button>");
            buttonToCreate.text(array[i]);
            buttonToCreate.addClass("btn btn-primary m-1");
            buttonToCreate.attr("type", "button");
            buttonToCreate.attr("value", array[i]);
            $("#buttons-content").append(buttonToCreate);
        }
    }

    function GenerateImages(data) {

        $("#images-content").empty();

        var imageToCreate;
        var rateText;
        var newDiv;

        for (var i = 0; i < data.data.length; i++) {
            rateText = $("<p>");
            rateText.text("Rating: "+data.data[i].rating);

            imageToCreate = $("<img>");
            imageToCreate.addClass("gifImage");
            imageToCreate.attr({
                "src": data.data[i].images.original_still.url,
                "data-still": data.data[i].images.original_still.url,
                "data-animate": data.data[i].images.original.url,
                "data-state": "still"
            });

            newDiv = $("<div>");
            newDiv.addClass("m-3");
            newDiv.append(rateText);
            newDiv.append(imageToCreate);

            $("#images-content").append(newDiv);

            // $("#images-content").append(rateText);
            // $("#images-content").append(imageToCreate);
        }

    }


    $(document).on("click", "button", function () {
        var value = $(this).val();
        console.log(value);
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + key + "&limit=10",
            method: "GET"
        }).then(function (data) {
            console.log(data);
            GenerateImages(data);
        });
    });

    $("#find-gif").on("click", function (event) {
        event.preventDefault();

        var gif = $("#gif-input").val().trim();

        if (!buttonsArray.includes()) {
            buttonsArray.push(gif);
            GenerateButtons(buttonsArray);
        }
    });

    $(document).on("click",".gifImage", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {

            var newSrc = $(this).attr("data-animate");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "animate");

        } else {
            var newSrc = $(this).attr("data-still");
            $(this).attr("src", newSrc);
            $(this).attr("data-state", "still");
        }
    });
});