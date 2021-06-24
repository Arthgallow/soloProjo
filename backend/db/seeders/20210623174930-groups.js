'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        groupName: "Run Faster",
        description: " A group for anyone who wants to be quicker on their feet.",
        userId: 1,
        goalId: 1,

      },
      {
        groupName: "Doin it right" ,
        description: "A group for perfectionists",
        userId: 4,
        goalId: 1,

      },
      {
        groupName: "Pianists",
        description: "Are you a peenist? We too",
        userId: 4,
        goalId: 1,

      },
      {
        groupName: "Gravity Defiers",
        description:"What goes up...",
        userId: 1,
        goalId: 1,

      },
      {
        groupName: "DUDE LOOKS LIKE A LADY" ,
        description:"80's hair rock",
        userId: 1,
        goalId: 1,

      },
      {
        groupName: "What",
        description:"Stuff",
        userId: 2,
        goalId: 1,

      }


    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
