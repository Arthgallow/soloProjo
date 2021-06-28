'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    mediaName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER,
    mediaUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Media.associate = function(models) {
    Media.hasMany(models.Comment, {foreignKey:"mediaId"})
    Media.belongsTo(models.User,{foreignKey:"userId"})
    Media.belongsTo(models.Goal,{foreignKey:"goalId"})
    Media.belongsTo(models.Group, {foreignKey: "mediaId"})
  };
  return Media;
};
