"use strict";

(function () {
    let protected_route = ["statistics"];
    if (protected_route.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem("user")) {
            location.href = "/login";
        }
    }

    let protected_route2 = ["event-planning"];
    if (protected_route2.indexOf(router.ActiveLink) > -1) {
        if (!sessionStorage.getItem("user")) {
            location.href = "/login";
        }
    }

})();