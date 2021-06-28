'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    mediaId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey:"userId"})
    Comment.belongsTo(models.Group, {foreignKey:"groupId"})
    Comment.belongsTo(models.Media, {foreignKey:"mediaId"})
    Comment.belongsTo(models.Goal, {foreignKey: "goalId"})
    // associations can be defined here
  };
  return Comment;
};
