/*
Author: Tolihat Gbadebo
Course Code: INFT2202
Filename: main.js
Date: January 18th, 2024
Description: This is the javascript code for the website called 'HARMONY HUB'
*/
"use strict";

// IIFE = Immediately Invoked Functional Expression
(function(){

// function to generate API request
    function fetchTranslator() {
        let message = document.getElementById("messageInput").value; // Get the message from an input field
        let apiKey = '85cdc558-8829-45af-a0de-873071e230da:fx'; // Your DeepL API key
        let url = 'https://api.deepl.com/v2/translate'; // DeepL API endpoint

        // Create a new instance of XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Configure it: POST-request for the URL
        xhr.open('POST', url, true);

        // Set request headers
        xhr.setRequestHeader('Authorization', 'DeepL-Auth-Key ' + apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Set up a function that is called when the request is completed
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Parse the JSON response
                let response = JSON.parse(xhr.responseText);

                // Extract the translated text from the response
                let translatedText = response.translations[0].text;

                // Set the translated text inside the div with id 'translator-container'
                document.getElementById("translator-container").html = translatedText;
            } else {
                // Handle errors (e.g., if the server returned an error response)
                console.error("Translation error:", xhr.statusText);
            }
        };

        // Set up a function that is called when there is an error with the request
        xhr.onerror = function() {
            // Handle network errors
            console.error("Translation request failed");
        };

        // Send the request with the payload
        xhr.send(JSON.stringify({
            text: [message],
            target_lang: 'FR' // Set the target language, e.g., 'FR' for French
        }));
    }


    document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('translateButton').addEventListener('click', fetchTranslator);
    });





// function to verify user in login page

function VerifyLoginPage() {

    let messageArea = $("#messageArea");
    messageArea.hide();

    $("#loginButton").on("click", function () {
        event.preventDefault();
        let success = false;
       // let newUser = new core.User();

        $.get("./data/users.json", function(data) {
            for(const user of data.users){
                console.log(user);
                if(emailAddress.value === user.EmailAddress && password.value === user.Password) {

                    success = true;
                    //newUser.fromJSON(user);
                    break;
                }
            }

            if (success) {
               // sessionStorage.setItem("user", newUser.serialize());
                messageArea.removeAttr("class").hide();
                location.href = "index.html";


            }else{
                $("#emailAddress").trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text("Error: Invalid Login Details").show();
            }


        });

    });

    $("#cancelButton").on("click", function (){
        document.form[0].reset();
        location.href = "login.html";
    });
}

// JavaScript for the slideshow
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

// Initial setup
showSlide(currentIndex);

// Automatic slideshow every 5 seconds (adjust as needed)
setInterval(nextSlide, 5000);

$(document).ready(function() {
    // Dynamically add 'Careers' link
    let careersLink = '<li class="nav-item"><a class="nav-link" href="careers.html">Careers</a></li>';
    $('.navbar-nav').append(careersLink);

    // Programmatically change 'Blog' to 'News'
    $('#blogLink').text('News');

    // Event handling for form submission
    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        if (ContactFormValidation()) {
            // Display the entered data in a modal
            $('#formDataDisplay').html(`Full Name: ${$('#fullName').val()}<br>Email: ${$('#emailAddress').val()}`);
            $('#formModal').modal('show');

            // Reset the form fields
            $('#contactForm')[0].reset();

            // After form submission, display thank you message with a countdown
            setTimeout(function() {
                $("#editButton").html(`<i class ="fas fa-plus-circle fa-sm"/>Add`);
                $('#messageRedirect').html('Thank you for your message/feedback. You will be redirected to the Home page.').addClass("alert alert-success");
                $('#countdownModal').modal('show');

                let counter = 5;
                let interval = setInterval(() => {
                    $('#countdownTimer').text(counter);
                    counter--;
                    if (counter < 0) {
                        clearInterval(interval);
                        location.href = 'index.html'; // Redirect to the Home page
                    }
                }, 1000);
            }, 1000);
        }
    });
});

// TEAMS page modal pop-up
document.addEventListener('DOMContentLoaded', function() {
    // Access the button to open the modal
    const openModalBtn = document.getElementById('openModalBtn');

    // Add a click event listener to the button
    openModalBtn.addEventListener('click', function() {
        // Open the modal using Bootstrap's modal method
        $('#memberModal1').modal('show');
    });
});

// Contact form validation
function ContactFormValidation() {
    let isValid = true;
    isValid = ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Ensure to Enter a Valid First Name and Last Name") && isValid;
    isValid = ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Ensure to Enter a Valid Email Address") && isValid;
    return isValid;
}

// Validate individual form fields
function ValidateField(input_field_id, regular_expression, error_message) {
    let inputField = $(input_field_id);
    let messageArea = $("#messageArea").hide();
    let inputFieldText = inputField.val();

    if (!regular_expression.test(inputFieldText)) {
        inputField.trigger("focus").trigger("select");
        messageArea.addClass("alert alert-danger").text(error_message).show();
        return false;
    } else {
        messageArea.removeAttr("class").hide();
        return true;
    }
}

    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            // If user is logged in, change login link to logout link
            $("#login-in").html(`<p id="logout" class="nav-underline"><i class="fas fa-sign-out-alt"></i> Logout</p>`);
        }

        // Add event listener to logout link
        $("#logout").on("click", function() {
            // Clear session storage and redirect to login page
            sessionStorage.clear();
            location.href = "login.html";
        });
    }

// AJAX functions for loading header and footer
    function LoadHeader(html_data) {
        $("header").html(html_data);

        // Check if the document title is "Login"
        if (document.title === "Login") {
            // Hide all links inside the navbar
            $(".navbar-nav .nav-link").hide();
            // Show only the login link
            $("#login-in").show();

        } else {
            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            CheckLogin();
        }
    }


function LoadFooter(html_data) {
    $("footer").html(html_data);
    $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
}

function AjaxRequest(method, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (typeof callback == "function") {
                callback(xhr.responseText);
            } else {
                console.error("ERROR: callback is not a function!");
            }
        }
    });
    xhr.send();
}

// Call AJAX functions for header and footer
AjaxRequest("GET", "header.html", LoadHeader);
AjaxRequest("GET", "footer.html", LoadFooter);


// calling verify login function
    VerifyLoginPage();

})();