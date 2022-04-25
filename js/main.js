// for animation of bar and cross in mobile view
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
});


$(".card-header").click(function(){
  $(".card-header").removeClass("active");
  $(this).addClass("active");
});

$('#about_carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoPlaySpeed: 1000,
    autoplayHoverPause: true,
    dots: true,
    nav: false,
    // navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
    responsive: {
        0: {
            items: 1
        },
        960: {
            items: 1
        }
    }
});


function notify(message) {
    (() => {
        let n = document.createElement("div");
        let id = "show_notification";
        n.setAttribute("id", id);
        n.classList.add("notification");
        n.append(message);
        document.getElementById("notification-area").appendChild(n);
        setTimeout(() => {
            var notifications = document
                .getElementById("notification-area")
                .getElementsByClassName("notification");
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].getAttribute("id") == id) {
                    notifications[i].remove();
                    break;
                }
            }
        }, 5000);
    })();
}

var plan_id;

function enroll(id){
    $("#enrollment_modal").modal();
    plan_id = id;
}

function isPhoneNumber(mob) {
    var numbers = /^\(?([6789][0-9]{9})$/;
    if (mob.match(numbers)) {
        return true;
    } else {
        return false;
    }
}

function validEmail(mail) {
    var pattern = /@gmail\.com/i;
    if (pattern.test(mail)) {
        return true
    } else {
        return false;
    }
}

function connectNow(){
    var connect_name = document.getElementById('connect_name').value;
    var connect_email = document.getElementById('connect_email').value;
    var connect_mobile = document.getElementById('connect_mobile').value;
    var connect_message = document.getElementById('connect_message').value;
    if(connect_name != "" && connect_email != "" && connect_mobile != "" && connect_message != ""){
        if(isPhoneNumber(connect_mobile) == true){
            if(validEmail(connect_email) == true){
                var json = {
                  "name": connect_name,
                  "email": connect_email,
                  "id": 0,
                  "message": connect_message,
                  "phone": connect_mobile
                }
                var request = new XMLHttpRequest();
                request.open(urlSet.create_contact.method, urlSet.create_contact.url, true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(json));
                request.onload = function () {
                    var data = JSON.parse(this.response);
                    console.log(data);
                    if(data.message == "Message Sent"){
                        notify("Thanks! We have received your message.");
                    }
                    else{
                        alert("Sorry! The message could not be sent");
                    }
                }
            }
            else{
                notify("Please enter a valid Email Id");
            }
        }
        else{
            notify("Please enter a valid mobile number");
        }
    }
    else{
        notify("Please fill all the fields");
    }
}

function submitEnrollment() {
    var enrollment_name = document.getElementById('enrollment_name').value;
    var enrollment_email = document.getElementById('enrollment_email').value;
    var enrollment_mobile = document.getElementById('enrollment_mobile').value;
    var enrollment_address = document.getElementById('enrollment_address').value;
    var enrollment_cweight = document.getElementById('enrollment_cweight').value;
    var enrollment_gweight = document.getElementById('enrollment_gweight').value;
    var enrollment_height = document.getElementById('enrollment_height').value;
    var enrollment_age = document.getElementById('enrollment_age').value;
    if(enrollment_name != "" && enrollment_email != "" && enrollment_mobile != "" && enrollment_address != "" && enrollment_cweight != "" && enrollment_gweight != "" && enrollment_height != "" && enrollment_age != ""){
        if(isPhoneNumber(enrollment_mobile) == true){
            if(validEmail(enrollment_email) == true){
                var json = {
                  "name": enrollment_name,
                  "email": enrollment_email,
                  "id": 0,
                  "address": enrollment_address,
                  "phone": enrollment_mobile,
                  "height": parseInt(enrollment_height),
                  "goal_weight": parseInt(enrollment_gweight),
                  "current_weight": parseInt(enrollment_cweight),
                  "age": parseInt(enrollment_age),
                  "status": "",
                  "offer": "string",
                  "price": parseInt(plan_id),
                  "razorpay_payment_id": "",
                  "razorpay_order_id": "",
                  "razorpay_signature": ""
                }
                var request = new XMLHttpRequest();
                request.open(urlSet.create_order.method, urlSet.create_order.url, true);
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(json));
                request.onload = function () {
                    var data = JSON.parse(this.response);
                    console.log(data);
                    // if (data['receipt_id'] != "") {
                    //     var options = {
                    //         "key": "rzp_test_I4CcsfzCypIJie",
                    //         "amount": data['amount'],
                    //         "currency": "INR",
                    //         "name": "KARAN KHANNA FITNESS",
                    //         "description": "A simple gateway to a fitter you",
                    //         "image": "http://karankhannaofficial.com/img/about_logo.png",
                    //         "order_id": data['order_id'],
                    //         "handler": function (response) {
                    //             payNowResponse(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, data['receipt_id']);
                    //             console.log(response);
                    //         },
                    //         "prefill": {
                    //             "name": customer_name,
                    //             "email": customer_email,
                    //             "contact": customer_mobile
                    //         },
                    //         "notes": {
                    //             "address": "Give an address here",
                    //         },
                    //         "theme": {
                    //             "color": "#000000"
                    //         }
                    //     };
                    //     var rzp1 = new Razorpay(options);
                    //     rzp1.on('payment.failed', function (response) {
                    //         notify("Sorry! Payment failed due to banks issue");
                    //     });
                    //     rzp1.open();

                    // }
                }
            }
            else{
                notify("Please enter a valid Email Id");
            }
        }
        else{
            notify("Please enter a valid mobile number");
        }
    }
    else{
        notify("Please fill all the fields");
    }
}


function payNowResponse(razorpay_payment_id, razorpay_order_id, razorpay_signature, receipt_id) {
    var json = {
        "razorpay_order_id": razorpay_order_id,
        "razorpay_signature": razorpay_signature,
        "razorpay_payment_id": razorpay_payment_id,
        "transaction_id": receipt_id
    }
    var request = new XMLHttpRequest();
    request.open(urlSet.verify_payment.method, urlSet.verify_payment.url, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(json));
    request.onload = function () {
        var data = JSON.parse(this.response);
        console.log(data);
        // if (data['message'] == "Order Valid and Successful") {
        //     notify("Payment successful");
        //     emptyCart();
        // } else {
        //     notify("Payment unsuccessful");
        // }
    }
}