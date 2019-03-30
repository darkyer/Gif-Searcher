
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
        var star;

        for (var i = 0; i < data.data.length; i++) {
            rateText = $("<p>");
            rateText.addClass("text-center");
            rateText.text("Rating: " + data.data[i].rating);

            imageToCreate = $("<img>");
            imageToCreate.addClass("gifImage img-fluid rounded mx-auto d-block");
            imageToCreate.attr({
                "src": data.data[i].images.fixed_height_still.url,
                "data-still": data.data[i].images.fixed_height_still.url,
                "data-animate": data.data[i].images.fixed_height.url,
                "data-state": "still"
            });

            star = $("<img>");
            star.addClass("star");
            star.attr({
                "src": "assets/images/unstar.png",
                "data-unstar": "assets/images/unstar.png",
                "data-star": "assets/images/star.png",
                "data-id": data.meta.response_id,
                "data-number": i,
                "data-state": GetStarStatus(data.meta.response_id + "&" + i)
            });

            if(star.attr("data-state") == 1){
                console.log("Swapping: "+data.meta.response_id + "&" + i);
                star.attr("src",star.attr("data-star"));
            }


            newDiv = $("<div>");
            newDiv.addClass("p-1 m-1 gifContainer rounded");
            newDiv.append(rateText);
            newDiv.append(imageToCreate);
            newDiv.append(star);

            var mainDiv = $("<div>");
            mainDiv.addClass("col-sm-12 col-md-12 col-lg-4");

            mainDiv.append(newDiv);

            $("#images-content").append(mainDiv);
        }

    }

    $(document).on("click", "button", function () {
        var value = $(this).val();
        // console.log(value);
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?q=" + value + "&api_key=" + key + "&limit=12",
            method: "GET"
        }).then(function (data) {
            // console.log(data);
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

    function GetStarStatus(string) {
        var status = getCookie(string);
        if (status == "") {
            return 0;
        }
        // console.log(status);
        return status;
    }

    $(document).on("click", ".gifImage", function () {

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

    $(document).on("click", ".star", function () {

        var elementToSave = $(this).attr("data-id") + "&" + $(this).attr("data-number");


        if ($(this).attr("data-state") == 0) {
            console.log("Saving: "+elementToSave+" 1");
            setCookie(elementToSave, 1, 10);
            $(this).attr("data-state", 1);
            $(this).attr("src", $(this).attr("data-star"));
        }else{
            console.log("Saving: "+elementToSave+" 0");
            setCookie(elementToSave, 0, 10);
            $(this).attr("data-state", 0);
            $(this).attr("src", $(this).attr("data-unstar"));
        }

    });


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }


    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                console.log("Getting: "+c.substring(name.length, c.length));
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});