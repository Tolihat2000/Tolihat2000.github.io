/*
Author: Tolihat Gbadebo
Course Code: INFT2202
Filename: app.js
Date: January 18th, 2024
Description: This is the javascript code for the website called 'HARMONY HUB'
*/
"use strict";


// IIFE = Immediately Invoked Functional Expression
(function(){


    function capitalizeFirstCharacter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader(){
        $.get("./views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active").attr("aria-current", "page");
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent(){
        let page_name = router.ActiveLink;
        let callback = ActiveCallback();
        $.get(`./views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }
    function LoadFooter(){
        $.get("./views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function Start(){
        console.log("App Started");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
    }
    window.addEventListener("load", Start);

    function LoadLink(link, data = ""){
        router.ActiveLink = link;
        AuthGuard();
        router.LoadLink = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = capitalizeFirstCharacter(router.ActiveLink);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $(`li>a:contains(${document.title})`).addClass("active");
        LoadContent();
    }

    function AuthGuard() {
        let protected_route = ["statistics"];
        if (protected_route.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }

        let protected_route2 = ["event-planning"];
        if (protected_route2.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }

    function AddLinkEvents(link){
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });
        linkQuery.on("mouseout", function () {
            $(this).css("font-weight", "normal");
        });
    }
    function AddNavigationEvents() {
        let navLinks = $("ul>li>a");
        navLinks.off("click");
        navLinks.off("mouseover");
        navLinks.on("click", function (){
            LoadLink($(this).attr("data"));
        });
        navLinks.on("mouseover", function (){
            $(this).css("cursor", "pointer");
        });
    }

    function ActiveCallback() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "blog": return DisplayBlogPage;
            case "services": return DisplayServicePage;
            case "careers": return DisplayCareerPage;
            case "contact": return DisplayContactPage;
            case "event-planning": return DisplayEventPlanningPage;
            case "gallery": return DisplayGalleryPage;
            case "portfolio": return DisplayPortfolioPage;
            case "privacy": return DisplayPrivacyPage;
            case "statistics": return DisplayStatisticsPage;
            case "team": return DisplayTeamPage;
            case "terms": return DisplayTermsPage;
            case "login": return VerifyLoginPage;
            case "404": return Display404Page;

            default:
                console.error("ERROR: callback does not exist " + router.ActiveLink);
                return new Function();
                break;
        }
    }
    function Display404Page(){
        console.log("Called Display404Page()");
    }
    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");
    }    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");
    }    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage()");
    }    function DisplayCareerPage(){
        console.log("Called DisplayCareerPage()");
    }    function DisplayContactPage(){
        console.log("Called DisplayContactPage()");
    }    function DisplayEventPlanningPage(){
        console.log("Called DisplayEventPlanningPage()");
    }    function DisplayGalleryPage(){
        console.log("Called DisplayGalleryPage()");
    }    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");
    }
    function DisplayStatisticsPage(){
        console.log("Called DisplayStatisticsPage()");
    }    function DisplayTeamPage(){
        console.log("Called DisplayTeamPage()");
        document.addEventListener('DOMContentLoaded', function(){
            // Access the button to open the modal
            const openModalBtn = document.getElementById('openModalBtn');

            // Add a click event listener to the button
            openModalBtn.addEventListener('click', function(){
                // Open the modal using Bootstrap's modal method
                $('#memberModal1').modal('show');
            });
        });
    }    function DisplayTermsPage(){
        console.log("Called DisplayTermsPage()");
    }    function DisplayPrivacyPage(){
        console.log("Called DisplayPrivacyPage()");
    }

// function to generate API request
    function fetchTranslator(){
        // Get the message from an input field
        var message = document.getElementById("messageInput").value;
        // DeepL API key
        var apiKey = '85cdc558-8829-45af-a0de-873071e230da:fx';
        var url = 'https://api.deepl.com/v2/translate'; // DeepL API endpoint

        // Create a new instance of XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // Configure it: POST-request for the URL
        xhr.open('POST', url, true);

        // Set request headers
        xhr.setRequestHeader('Authorization', 'DeepL-Auth-Key ' + apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Set up a function that is called when the request is compared
        xhr.onload = function(){
            if (xhr.status >= 200 && xhr.status < 300) {
                // Parse the JSON response
                var response = JSON.parse(xhr.responseText);

                // Extract the translated text from the response
                var translatedText = response.translations[0].text;

                // Set the translated text inside the div with id 'translator-container'
                document.getElementById("translator-container").innerText = translatedText;
            } else {
                // Handle errors (e.g., if the server returned an error response)
                console.error("Translation error:", xhr.statusText);
                // Optionally, inform the user about the error
                alert("Error during translation: " + xhr.statusText);
            }
        };

        // Set up a function that is called when there is an error with the request
        xhr.onerror = function(){
            // Handle network errors
            console.error("Translation request failed");
            // Optionally, inform the user about the network error
            alert("Translation request failed due to network issues.");
        };

        // Send the request with the payload
        xhr.send(JSON.stringify({
            text: [message],
            target_lang: 'FR' // Set the target language, e.g., 'FR' for French
        }));
    }

// Event listener to trigger translation when the page has loaded and the translation button is clicked
    document.addEventListener('DOMContentLoaded', (eve)=> {
        document.getElementById('translateButton').addEventListener('click', fetchTranslator);
    });


// function to verify user in login page

    function VerifyLoginPage() {
        var messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginForm").on("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting in the traditional way

            // Get the email address and password from the form inputs
            var emailAddress = $("#emailAddress").val();
            var password = $("#password").val();

            // Initialize a variable to track if the user was found
            var userFound = false;

            // Fetch the users data
            $.get("./data/users.json", function(data) {
                for (const user of data.users) {
                    // Compare the input values with each user's details
                    if (emailAddress === user.EmailAddress && password === user.Password) {
                        userFound = true; // Set userFound to true if a match is found
                        break; // Exit the loop since we found the user
                    }
                }

                if (userFound) {
                    //  set user session
                    sessionStorage.setItem("user", JSON.stringify({EmailAddress: emailAddress}));
                    messageArea.removeClass("alert alert-danger").hide(); // Ensure message area is cleared and hidden
                    location.href = "/home"; // Redirect to home page on successful login
                } else {
                    // Reset the form fields if login fails
                    $("#loginForm")[0].reset();
                    // Trigger focus on the email address field and display an error message
                    $("#emailAddress").trigger("focus");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Details").show();
                }
            });
        });

        $("#cancelButton").on("click", function() {
            // Reset the form directly
            $("#loginForm")[0].reset();

        });
    }

// JavaScript for the slideshow
    var currentIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i)=> {
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
        var careersLink = '<li class="nav-item"><a class="nav-link" data="careers">Careers</a></li>';
        $('.navbar-nav').append(careersLink);

        // Programmatically change 'Blog' to 'News'
        $('#blogLink').text('News');

        // Event handling for form submission
        $('#contactForm').submit(function(event){
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

                    var counter = 5;
                    var interval = setInterval(()=> {
                        $('#countdownTimer').text(counter);
                        counter--;
                        if (counter < 0) {
                            clearInterval(interval);
                            LoadLink("home"); // Redirect to the Home page
                        }
                    }, 1000);
                }, 1000);
            }
        });
    });


// Contact form validation
    function ContactFormValidation() {
        var isValid = true;
        isValid = ValidateField("#fullName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/, "Ensure to Enter a Valid First Name and Last Name") && isValid;
        isValid = ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Ensure to Enter a Valid Email Address") && isValid;
        return isValid;
    }

// Validate individual form fields
    function ValidateField(input_field_id, regular_expression, error_message) {
        var inputField = $(input_field_id);
        var messageArea = $("#messageArea").hide();
        var inputFieldText = inputField.val();

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
            $("#login").html(`<p id="logout" class="nav-underline" href="#"><i class="fas fa-sign-out-alt"></i> Logout</p>`);
        }


        // Add event listener to logout link
        $("#logout").on("click", function(){
            // Clear session storage and redirect to login page
            sessionStorage.clear();
            location.href = "/login";
        });
    }

    /*
    function AjaxRequest(method, url, callback) {
        var xhr = new XMLHttpRequest();
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
    Call AJAX functions for header and footer
    AjaxRequest("GET", "header.html", LoadHeader);
    AjaxRequest("GET", "footer.html", LoadFooter);
    */

})();