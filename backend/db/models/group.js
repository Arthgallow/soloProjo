'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupName: DataTypes.STRING,
    description: DataTypes.TEXT,

    userId: DataTypes.INTEGER,
    mediaId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.UserGroups, {foreignKey:'groupId'});
    Group.hasMany(models.Goal, {foreignKey:"goalId"})
    Group.hasOne(models.Media, {foreignKey: "mediaId"})
    Group.hasMany(models.Comment, {foreignKey: "groupId"})
  };
  return Group;
};
