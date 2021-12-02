'use strict';
module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('model', {
        name: DataTypes.STRING,
        json: DataTypes.JSON,
        customTopic: DataTypes.JSON,
        text: DataTypes.TEXT,
        topics: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        terms: DataTypes.INTEGER
    }, {});
    model.associate = function(models) {
        // associations can be defined here
    };
    return model;
};