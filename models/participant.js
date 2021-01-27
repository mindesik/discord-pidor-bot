'use strict'
const { INTEGER } = require('sequelize')
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Participant.init({
    guildId: DataTypes.STRING,
    userId: DataTypes.STRING,
    userName: DataTypes.STRING,
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Participant',
  })
  return Participant
}
