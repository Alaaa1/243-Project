var cart = [];


function generateID() {
    return Math.random().toString(16).slice(2);
}


// Function to get difference between two dates in days
// reference: https://stackoverflow.com/questions/7763327/how-to-calculate-date-difference-in-javascript#:~:text=101-,var%20DateDiff%20%3D%20%7B,-inDays%3A%20function(d1
var DateDiff = {

    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return Math.floor((t2 - t1) / (24 * 3600 * 1000));
    }
}

//function to validtae hotel reservation form 
//and add the reservation to the cart
function checkHotel(e) {
    e.preventDefault();


    var selectCity = document.getElementById("selectCity").value;
    var selectHotel = document.getElementById("selectHotel").value;
    var checkInDate = new Date(document.getElementById("checkInDate").value);
    var checkOutDate = new Date(document.getElementById("checkOutDate").value);
    var guests = document.getElementById("guests").value;

    //form validation from w3Schools: https://www.w3schools.com/js/js_validation.asp
    if (selectCity == "" || selectHotel == "" || checkInDate == "" || checkOutDate == "" || guests == "") {
        alert("All fields must be filled!");
        return false;
    }

    var cost = 0;

    var hotels = {
        shangrila: {
            name: "Shangri-La",
            pricePerNight: 125
        },
        fourseasons: {
            name: "Four Seasons",
            pricePerNight: 130
        },
        chatrium: {
            name: "Chatrium",
            pricePerNight: 110
        },
        hilton: {
            name: "Hilton",
            pricePerNight: 95
        }
    }
    var cities = {
        paris: {
            name: "Paris",
            priceMultiplier: 1.3
        },
        newYork: {
            name: "New York",
            priceMultiplier: 1.7
        },
        london: {
            name: "London",
            priceMultiplier: 1.5
        },
        tokyo: {
            name: "Tokyo",
            priceMultiplier: 1.2
        }
    }
    var selectCity = document.getElementById("selectCity").value;
    var city = cities[selectCity].name;

    var selectHotel = document.getElementById("selectHotel").value;
    var hotel = hotels[selectHotel].name;
    if (guests == "5p") {
        guests = 5;
    }
    var reservationPeriod = DateDiff.inDays(checkInDate, checkOutDate);

    cost = cities[selectCity].priceMultiplier * hotels[selectHotel].pricePerNight * guests * reservationPeriod;

    cart.push({ id: generateID(), service: "Hotel Reservation", cost: cost, hotel: hotels[selectHotel].name, city: cities[selectCity].name, from: checkInDate, to: checkOutDate });
    console.log(cart)
    alert("Your have successfully added the service to your cart!");
    localStorage.setItem("cart", JSON.stringify(cart));
}


//function to validtae car rental form 
//and add the rental to the cart
function checkCar(e) {
    e.preventDefault();

    var selectCar = document.getElementById("selectCar").value;
    var pickupDate = new Date(document.getElementById("pickupDate").value);
    var returnDate = new Date(document.getElementById("returnDate").value);
    var selectAdditions = document.getElementById("selectAdditions").value;

    //form validation from w3Schools: https://www.w3schools.com/js/js_validation.asp
    if (selectCar == "" || pickupDate == "" || returnDate == "" || selectAdditions == "") {
        alert("All fields must be filled!");
        console.log(selectCar, pickupDate, returnDate, selectAdditions)
        return false;
    }

    var cars = {
        honda: {
            name: "Honda",
            pricePerDay: 50
        },
        mercedes: {
            name: "Mercedes-Benz",
            pricePerDay: 95
        },
        bmw: {
            name: "BMW",
            pricePerDay: 75
        },
        toyota: {
            name: "Toyota",
            pricePerDay: 45
        }
    }

    var additions = {
        gps: {
            name: "GPS Navigator",
            price: 35
        },
        childSeat: {
            name: "Child Seat",
            price: 20
        },
        insurance: {
            name: "Insurance",
            price: 50
        }
    }

    var car = cars[selectCar];
    var addition = additions[selectAdditions]
    var cost = 0;
    var rentPeriod = DateDiff.inDays(pickupDate, returnDate);

    cost = rentPeriod * car.pricePerDay + addition.price;

    cart.push({ id: generateID(), service: "Car Rental", cost: cost, car: car.name, from: pickupDate, to: returnDate });
    console.log(cart)
    alert("Your have successfully added the service to your cart!");
    localStorage.setItem("cart", JSON.stringify(cart));
}


//function to validtae login form 
//and authoriset the user
function checkLogin(e) {
    e.preventDefault();

    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;


    //form validation from w3Schools: https://www.w3schools.com/js/js_validation.asp
    if (userName == "" || password == "") {
        alert("All fields must be filled!");
        return false;
    } else if (userName == "Ali" && password == 123456) {
        window.open("index.html");
    } else {
        alert("Wrong info")
    }

}

function clearCart() {
    cart = []
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
    console.log(cart)

}

function removeItem(element) {
    console.log(element);
    cart = JSON.parse(localStorage.getItem("cart"))
    cart = cart.filter(item => item.id != element.id)
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
    console.log(cart)
}

function checkPayment(e) {
    e.preventDefault();
    var name = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("adr").value;
    var cardName = document.getElementById("cname").value;
    var cardNumber = document.getElementById("ccnum").value;
    var expDate = document.getElementById("expDate").value;
    var cvv = document.getElementById("cvv").value;

    //form validation from w3Schools: https://www.w3schools.com/js/js_validation.asp
    if (name == "" || email == "" || address == "" || cardName == "" || cardNumber == "" || expDate == "" || cvv == "") {
        alert("All fields must be filled!");
        return false;
    }
    if (isNaN(cvv) || isNaN(cardNumber)) {
        alert("CVV and card numbers must be a number");
        return false;
    }
    window.location.href = "success.html";
}