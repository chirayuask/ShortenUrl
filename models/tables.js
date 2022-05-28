"use strict";
const { Model } = require("sequelize");
const utils = require("../utils/generateUniqueId");
module.exports = (sequelize, DataTypes) => {
    class tables extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataType lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    tables.init(
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
            topicsName: {
                type: DataTypes.STRING
            },
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            modelName: "tables",
        }
    );
    return tables;
};
