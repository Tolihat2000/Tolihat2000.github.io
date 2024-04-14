"use strict";
var core;
(function (core) {
    class User {
        constructor(emailAddress = "", password = "") {
            this._emailAddress = emailAddress;
            this._password = password;
        }

        get emailAddress() {
            return this._emailAddress;
        }

        set emailAddress(value) {
            this._emailAddress = value;
        }

        toString() {
            return `EmailAddress: ${this._emailAddress}`
        }

        toJSON() {
            return {
                EmailAddress: this._emailAddress,
                Password: this._password
            }
        }

        fromJSON(data){
            this._emailAddress = data.EmailAddress;
            this._password = data.Password;
        }

        /**
         serialize for writing to localStorage
         **/
        serialize() {
            if (this._emailAddress!== "") {
                return `${this._emailAddress}`;
            }
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        }

        /**
         Deserialize means to read data from localStorage
         **/
        deserialize(data) {
            // Bruce Wayne, 555-5555, Bruce@Batman.com
            let propertyArray = data.split(",");
            this._emailAddress = propertyArray[0];
        }


    }
    // namespace definition
    core.User = User;
})(core || (core = {}) );