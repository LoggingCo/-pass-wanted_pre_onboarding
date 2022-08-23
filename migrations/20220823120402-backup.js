'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'hooby', { type: Sequelize.STRING(100) });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('users', 'hooby');
    },
};

/* 
npx sequelize db:migrate --env development
npx sequelize db:migrate:undo --env development
*/
