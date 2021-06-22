'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    goalsId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
  };
  return Group;
};