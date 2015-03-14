/*jslint browser: true*/
/*global $, console */

(function () {
    "use strict";
    var clearLink,
        filterLink,
        listLink,
        mapLink,
        categorizedHotels,
        hotelsNotInBellevueOrSeattle,
        hotels = [
            {
                name:   "Hotel Bellevue",
                id:     41884,
                city:   "Bellevue",
                state:  "WA",
                rating: 45.0
            },
            {
                name:   "Fairmont Olympic Hotel",
                id:     20230,
                city:   "Seattle",
                state:  "WA",
                rating: 50.0
            },
            {
                name:   "The Maxwell Hotel - Pineapple Hospitality",
                id:     3445681,
                city:   "Seattle",
                state:  "WA",
                rating: 30.0
            },
            {
                name:   "Mediterranean Inn",
                id:     897598,
                city:   "Seattle",
                state:  "WA",
                rating: 25.0
            },
            {
                name:   "The Westin Seattle",
                id:     16673,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Hotel FIVE - A Piece of Pineapple Hospitality",
                id:     11969,
                city:   "Seattle",
                state:  "WA",
                rating: 25.0
            },
            {
                name:   "Pan Pacific Seattle",
                id:     1509734,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Warwick Seattle Hotel",
                id:     6839,
                city:   "Seattle",
                state:  "WA",
                rating: 35.0
            },
            {
                name:   "Motif Seattle",
                id:     50947,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Grand Hyatt Seattle",
                id:     546475,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Executive Hotel Pacific",
                id:     23764,
                city:   "Seattle",
                state:  "WA",
                rating: 30.0
            },
            {
                name:   "Four Seasons Hotel Seattle",
                id:     2163007,
                city:   "Seattle",
                state:  "WA",
                rating: 50.0
            },
            {
                name:   "Hyatt At Olive 8",
                id:     2309333,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "The Belltown Inn",
                id:     2330513,
                city:   "Seattle",
                state:  "WA",
                rating: 20.0
            },
            {
                name:   "MarQueen Hotel",
                id:     201051,
                city:   "Seattle",
                state:  "WA",
                rating: 35.0
            },
            {
                name:   "The Paramount Hotel",
                id:     58703,
                city:   "Seattle",
                state:  "WA",
                rating: 35.0
            },
            {
                name:   "Inn at the Market",
                id:     36514,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Sheraton Seattle Hotel",
                id:     25290,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Salish Lodge & Spa",
                id:     4779,
                city:   "Snoqualmie",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Best Western Loyal Inn",
                id:     16934,
                city:   "Seattle",
                state:  "WA",
                rating: 20.0
            },
            {
                name:   "Willows Lodge",
                id:     536525,
                city:   "Woodinville",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "W Seattle",
                id:     284304,
                city:   "Seattle",
                state:  "WA",
                rating: 40.0
            },
            {
                name:   "Inn At Queen Anne",
                id:     5483,
                city:   "Seattle",
                state:  "WA",
                rating: 20.0
            },
            {
                name:   "Courtyard by Marriott Seattle Downtown Lake Union",
                id:     202730,
                city:   "Seattle",
                state:  "WA",
                rating: 30.0
            },
            {
                name:   "Best Western Plus Executive Inn",
                id:     17066,
                city:   "Seattle",
                state:  "WA",
                rating: 30.0
            },
            {
                name:   "Cedarbrook Lodge",
                id:     2299843,
                city:   "SeaTac",
                state:  "WA",
                rating: 35.0
            },
            {
                name:   "DoubleTree by Hilton Seattle Airport",
                id:     1833,
                city:   "SeaTac",
                state:  "WA",
                rating: 35.0
            },
            {
                name:   "La Quinta Inn and Suites Seattle Downtown",
                id:     16349,
                city:   "Seattle",
                state:  "WA",
                rating: 25.0
            },
            {
                name:   "University Inn Seattle - Pineapple Hospitality",
                id:     27593,
                city:   "Seattle",
                state:  "WA",
                rating: 25.0
            },
            {
                name:   "Best Western Airport Executel",
                id:     22893,
                city:   "SeaTac",
                state:  "WA",
                rating: 25.0
            }];



    function addHotelsToList($list, hotels, fullInfo) {
        var i,
            hotel;

        $list.children().remove();
        for (i = 0; i < hotels.length; i += 1) {
            hotel = hotels[i];
            if (fullInfo) {
                $list.append('<li>' + hotel.name + " " + hotel.city + " " + hotel.state + " " + hotel.rating + '</li>');
            } else {
                $list.append('<li>' + hotel.name + '</li>');
            }
        }
    }

    function showLowQualityHotels(hotels) {
        var $categoryList = $("#low ul");
        addHotelsToList($categoryList, hotels);
    }

    function showMediumQualityHotels(hotels) {
        var $categoryList = $("#medium ul");
        addHotelsToList($categoryList, hotels);
    }

    function showHighQualityHotels(hotels) {
        var $categoryList = $("#high ul");
        addHotelsToList($categoryList, hotels);
    }

    function isLowQuality(hotel) {
        return hotel.category === "Low Quality";
    }

    function isInFilterCity(hotel) {
        var city = $("#listCities option:selected").text();
        return hotel.city === city;
    }

    function isMediumQuality(hotel) {
        return hotel.category === "Medium Quality";
    }

    function isHighQuality(hotel) {
        return hotel.category === "High Quality";
    }

    function mapHotelRatingToCategory(hotel) {
        if (hotel.rating <= 20) {
            hotel.category = "Low Quality";
        } else if ((hotel.rating > 20) && (hotel.rating <= 35)) {
            hotel.category = "Medium Quality";
        } else if ((hotel.rating > 35) && (hotel.rating <= 50)) {
            hotel.category = "High Quality";
        } else {
            hotel.category = "Unknown Quality";
        }
        return hotel;
    }

    function isNotInBellevueOrSeattle(hotel) {
        if (hotel.city === "Bellevue" || hotel.city === "Seattle") {
            return false;
        } else {
            return true;
        }
    }

    function addCitiesToFilterSelection(hotels) {
        var hits = [],
            cities = [],
            i;

        for (i = 0; i < hotels.length; i += 1) {
            if (!(hits[hotels[i].city])) {
                hits[hotels[i].city] = true;
                cities.push(hotels[i].city);
            }
        }

        $.each(cities, function (index, value) {
            $('#listCities').append($('<option/>', {
                value: value,
                text : value
            }));
        });
    }

    function listHotels() {
        var $list = $("#listedHotels ul");

        $("#categorizedHotels").css("display", "none");
        $("#listedHotels").css("display", "block");
        addHotelsToList($list, hotels, true);
    }

    function clearHotels() {
        $("#categorizedHotels").css("display", "none");
        $("#listedHotels").css("display", "none");
    }

    function filterHotels() {
        var city,
            filteredHotels,
            $list = $("#listedHotels ul");


        $("#categorizedHotels").css("display", "none");
        $("#listedHotels").css("display", "block");
        filteredHotels = hotels.filter(isInFilterCity);
        addHotelsToList($list, filteredHotels, true);
    }
    function showHotelsByCategory() {
        var lowHotels,
            mediumHotels,
            highHotels,
            categorizedHotels = hotels.map(mapHotelRatingToCategory);
        lowHotels = hotels.filter(isLowQuality);
        mediumHotels = hotels.filter(isMediumQuality);
        highHotels = hotels.filter(isHighQuality);
        $("#categorizedHotels").css("display", "block");
        $("#listedHotels").css("display", "none");

        showLowQualityHotels(lowHotels);
        showMediumQualityHotels(mediumHotels);
        showHighQualityHotels(highHotels);
    }
    mapLink = document.getElementById("mapHotels");
    mapLink.addEventListener("click", showHotelsByCategory);

    listLink = document.getElementById("listHotels");
    listLink.addEventListener("click", listHotels);

    filterLink = document.getElementById("filterHotels");
    filterLink.addEventListener("click", filterHotels);

    clearLink = document.getElementById("clearHotels");
    clearLink.addEventListener("click", clearHotels);

    addCitiesToFilterSelection(hotels);

}());


