'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define('UserGroups', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  UserGroups.associate = function(models) {
    UserGroups.belongsTo(models.User, {foreignKey: "userId"})
    UserGroups.belongsTo(models.Group, {foreignKey: "groupId"})
    // associations can be defined here
  };
  return UserGroups;
};
