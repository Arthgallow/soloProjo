'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    userId: DataTypes.INTEGER,
    goalId: DataTypes.INTEGER,
    mediaUrl: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Media.associate = function(models) {
    // associations can be defined here
  };
  return Media;
};