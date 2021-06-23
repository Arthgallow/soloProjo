'use strict';
module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    userid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Goal.associate = function(models) {

    Goal.hasMany(models.Comment, {foreignKey: 'goalId'});
    Goal.hasMany(models.Media,   {foreignKey: 'goalId'});
    Goal.belongsTo(models.User,  {foreignKey: 'userId'});
    Goal.belongsTo(models.Group, {foreignKey: 'goalId'});

  };
  return Goal;
};
