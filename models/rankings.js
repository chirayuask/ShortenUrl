"use strict";
const { Model } = require("sequelize");
const utils = require("../utils/generateUniqueId");
module.exports = (sequelize, DataTypes) => {
    class rankings extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataType lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    rankings.init(
        {
            id: {
                type: DataTypes.STRING(15),
                allowNull: false,
                defaultValue: () => {
                    const randomId = utils.genrateUUI();
                    return randomId;
                },
                primaryKey: true,
            },
            rankings: {
                type: DataTypes.INTEGER
            },
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            modelName: "rankings",
        }
    );
    return rankings;
};
