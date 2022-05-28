"use strict";
const { Model } = require("sequelize");
const utils = require("../utils/generateUniqueId");
module.exports = (sequelize, DataTypes) => {
    class users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataType lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    users.init(
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
            email: DataTypes.STRING(100),
            first_name: DataTypes.STRING(40),
            last_name: DataTypes.STRING(40),
            hash: DataTypes.STRING,
            createdAt: { allowNull: false, type: DataTypes.DATE },
            updatedAt: { allowNull: false, type: DataTypes.DATE },
        },
        {
            sequelize,
            modelName: "users",
        }
    );
    return users;
};
