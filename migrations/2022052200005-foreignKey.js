"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addIndex("tables", ["userid"], {
            name: "tables_e1",
        });
        await queryInterface.addIndex("rankings", ["tableid"], {
            name: "rankings_e1",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeIndex("tables_e1");
        await queryInterface.removeIndex("rankings_e1");
    },
};
