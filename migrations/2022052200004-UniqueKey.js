"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addIndex("tables", ["topicsName"], {
            type: "unique",
            name: "tables_u1",
        });
        await queryInterface.addIndex("users", ["email"], {
            type: "unique",
            name: "users_u1",
        });
        await queryInterface.addIndex("urlShortners", ["fullURL"], {
            type: "unique",
            name: "urlShortners_u1",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex("tables_u1");
        await queryInterface.removeIndex("users_u1");
        await queryInterface.removeIndex("urlShortners_u1");
    },
};
