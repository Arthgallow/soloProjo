'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Goal.associate = function(models) {
    // associations can be defined here
  };
  return Goal;
};