"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
exports.Search = db_1.sequelize.define('Search', {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    term: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    selectedItem: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    timeSinceFirstLoad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
