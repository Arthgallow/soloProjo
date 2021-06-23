'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER,
    mediaId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});

  Comment.newComment = async function ({userId, goalId,mediaId, comment}) {
    const newComment = Comment.create({
      userId,
      goalId,
      mediaId,
      comment,
    })
    return newComment
  }

  Comment.getComment = async function(id){
    const comment = Comment.findByPk(id)
    return comment
  }





  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {foreignKey:"userId"})
    Comment.belongsTo(models.Goal, {foreignKey:"goalId"})
    Comment.belongsTo(models.Media, {foreignKey:"mediaId"})
    // associations can be defined here
  };
  return Comment;
};
