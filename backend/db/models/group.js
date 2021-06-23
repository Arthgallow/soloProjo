'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.UserGroups, {foreignKey:'groupId'});
    Group.hasMany(models.Goal, {foreignKey:"goalId"})
  };
  return Group;
};
