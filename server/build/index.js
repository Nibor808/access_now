"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var db_1 = require("./db");
var Search_1 = require("./model/Search");
var SearchController_1 = require("./SearchController");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cookie_session_1.default({ keys: ['secrets'] }));
db_1.startDB().then(function () {
    console.log('Connected to Database.');
    Search_1.Search.sync().then(function () { return console.log('Table Search created'); });
});
app.get('/', function () {
    console.log('TEST');
});
app.post('/savesearch', SearchController_1.saveSearch);
app.listen(3001, function () {
    console.log('Listening on 3001');
});
