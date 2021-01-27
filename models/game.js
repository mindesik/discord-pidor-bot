'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Participant, {
        foreignKey: 'winnerId',
      })
    }
  }
  Game.init({
    guildId: DataTypes.STRING,
    winnerId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Game',
  })
  return Game
}
