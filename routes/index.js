"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contact_1 = __importDefault(require("../client/scripts/user"));

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', EmailAddress: '' });
});
router.get('/home', function (req, res, next) {
    res.render('index', { title: 'Home', page: 'home', EmailAddress: '' });
});
router.get('/blog', function (req, res, next) {
    res.render('index', { title: 'Blog', page: 'blog', EmailAddress: '' });
});
router.get('/careers', function (req, res, next) {
    res.render('index', { title: 'Career', page: 'careers', EmailAddress: '' });
});
/*
router.get('/contact-list', function (req, res, next) {
    contact_1.default.find().then(function (contacts) {
        console.log(contacts);
    }).catch(function (err) {
        console.error("Encounters an error reading from the database" + err);
        res.end();
    });
    res.render('index', { title: 'Contact List', page: 'contact-list', EmailAddress: '' });
});*/
router.get('/event-planning', function (req, res, next) {
    res.render('index', { title: 'Events', page: 'event-planning', EmailAddress: '' });
});
router.get('/login', function (req, res, next) {
    res.render('index', { title: 'Login', page: 'login', EmailAddress: '' });
});
router.get('/contact', function (req, res, next) {
    res.render('index', { title: ' Contact Us', page: 'contact', EmailAddress: '' });
});
router.get('/gallery', function (req, res, next) {
    res.render('index', { title: 'Gallery', page: 'gallery', EmailAddress: '' });
});
router.get('/portfolio', function (req, res, next) {
    res.render('index', { title: 'Portfolio', page: 'portfolio', EmailAddress: '' });
});
router.get('/privacy', function (req, res, next) {
    res.render('index', { title: 'Privacy Policy', page: 'privacy', EmailAddress: '' });
});
router.get('/services', function (req, res, next) {
    res.render('index', { title: 'Our Services', page: 'services', EmailAddress: '' });
});
router.get('/statistics', function (req, res, next) {
    res.render('index', { title: 'Statistics', page: 'statistics', EmailAddress: '' });
});
router.get('/team', function (req, res, next) {
    res.render('index', { title: 'Meet Our Team', page: 'team', EmailAddress: '' });
});router.get('/terms', function (req, res, next) {
    res.render('index', { title: 'Policy Terms', page: 'terms', EmailAddress: '' });
});
exports.default = router;