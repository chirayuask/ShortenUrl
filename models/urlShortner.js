"use strict";
const { Model } = require("sequelize");
const utils = require("../utils/generateUniqueId");
module.exports = (sequelize, DataTypes) => {
    class urlShortners extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataType lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    urlShortners.init(
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
            fullURL: DataTypes.STRING,
            identifier: {
                type: DataTypes.STRING(15),
                allowNull: false,
                defaultValue: () => {
                    const randomId = utils.generatePentaId();
                    return randomId;
                }
            },
            clicks: DataTypes.INTEGER,
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            modelName: "urlShortners",
        }
    );
    return urlShortners;
};
