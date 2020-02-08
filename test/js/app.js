function getSplash() {

    $(".hide_all").hide();

    var getSplash = $.ajax({
        url: "services/splash.php",
        type: "POST",
        dataType: "json"
    });


    getSplash.done(function (data) {

        var content = "";
        $.each(data, function (i, item) {
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var image_id = item.cover_id;
            var image_name = item.cover_name;

            var movie_image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div class="large-4 cell gray-4 more-top movie" data-id="` + movie_id + `">
                <div class="card" style="width: 100%;">
                    <img src="` + movie_image + `" alt="` + movie_name + `" class="gray-1 height-2">
                    <div class="card-section gray-4">
                        <h4>` + movie_name + `</h4>
                    </div>
                </div>
            </div>`;

        });

        $(".splash_content").html(content);

        //window.scrollTo(0, 0);
        $(window).scrollTop(0);
        $(".splash_container").fadeIn();

        /*
        $(".hide_all").fadeOut(400,
            function () {
                //
                $(".splash_container").fadeIn();
            }
        );
        */



    });

    getSplash.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSplash)" +
            textStatus);
    });



}

function getSearch(search_text) {



    var getSearch = $.ajax({
        url: "services/search.php",
        type: "POST",
        data: {
            search_text: search_text
        },
        dataType: "json"
    });


    getSearch.done(function (data) {
        //alert("dingo: " + data);
        var content = "";

        $.each(data, function (i, item) {

            var type = item.type;

            if (type == "1") {
                var id = item.movie_id;
                var name = item.movie_name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "movie";
            } else {
                var id = item.people_id;
                var name = item.name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "people";
            }

            var image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div data-id="` + id + `" class="search_container ` + className + ` clearFloat">
                            <div class="left">
                                <img src="` + image + `" alt="` + name + `">
                            </div>
                            <div class="right">` + name + `</div>
                        </div>`;

        });

        $(".search_results").html(content).show();


    });

    getSearch.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSearch)" +
            textStatus);
    });



}


function getMovie(movie_id) {

    $(".hide_all").fadeOut();

    var getMovie = $.ajax({
        url: "services/movie.php",
        type: "POST",
        data: {
            movie_id: movie_id
        },
        dataType: "json"
    });


    getMovie.done(function (data) {
        $(".movie_name").html(data.movie_name);
        $(".length").html(data.run_length);
        $(".release_date").html(data.movie_date_me);
        $(".description").html(data.description);

        var main_movie_image = "./uploads/" + data.cover_image_id +
            "/" + data.cover_image_name;

        $(".main_movie_image").attr("src", main_movie_image).attr("alt", data.movie_name);

        var content = "";
        $.each(data.related_movies, function (i, item) {
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var image_id = item.id;
            var image_name = item.name;

            var movie_image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div class="large-2 cell gray-4 more-top movie" data-id="` + movie_id + `">
                <div class="card" style="width: 100%;">
                    <img src="` + movie_image + `" alt="` + movie_name + `" class="gray-1 height-2">
                    <div class="card-section gray-4">
                        <h4>` + movie_name + `</h4>
                    </div>
                </div>
            </div>`;

        });

        $(".related_movies").html(content);

        content = "";
        $.each(data.cast, function (i, item) {
            var people_id = item.people_id;
            var people_name = item.name;
            var image_id = item.image_id;
            var image_name = item.image_name;
            var character = item.character_name;

            var people_image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div class="large-2 cell gray-4 more-top people" data-id="` + people_id + `">
                <div class="card" style="width: 100%;">
                    <img src="` + people_image + `" alt="` + people_name + `" class="gray-1 height-2">
                    <div class="card-section gray-4">
                        <h4>` + people_name + `</h4>
                        <p>` + character + `</p>
                    </div>
                </div>
            </div>`;

        });

        $(".cast").html(content);

        //window.scrollTo(0, 0);
        $(window).scrollTop(0);
        $(".movie_container").fadeIn();

        /*
        $(".hide_all").fadeOut(400,
            function () {
               
                //
                
            }
        );
        */

        /*
        $(".movie_container").fadeIn(
            function () {
                window.scrollTo(0, 0);
            }
        );
        */


    });

    getMovie.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getMovie)" +
            textStatus);
    });



}



$(document).foundation();

$(document).ready(function () {

    getSplash();
    //getMovie("18");

    $("#search").keyup(
        function () {
            var search_text = $(this).val();
            getSearch(search_text);
        }
    );


    $(document).on("click", "body .movie", function () {
        var movie_id = $(this).attr("data-id");
        getMovie(movie_id);
    });

    $(document).on("click", "body .people", function () {
        var people_id = $(this).attr("data-id");
        getPeople(people_id);
    });

    $(document).on("click", "body .splash", function () {
        getSplash();
    });


    $(".trending").slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
    });



});
