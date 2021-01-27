const { Participant, Score, Sequelize } = require('../../models')
const { getRandomElement } = require('../utils')


class ParticipantsRepository {
  constructor(dbAdapter) {
    this.dbAdapter = dbAdapter
  }

  getRandomParticipant(guildId) {
    return Participant.findAll({
      where: {
        guildId,
      },
    }).then(participants => {
      if (participants.length === 0) {
        return null
      }

      return getRandomElement(participants)
    })
  }

  addParticipant(userId, guildId, userName) {
    return Participant.create({
      guildId,
      userId,
      userName,
    })
  }

  removeParticipant(userId, guildId) {
    return Participant.destroy({
      where: {
        guildId,
        userId,
      },
    })
  }

  isParticipantExists(userId, guildId) {
    return Participant.count({
      where: {
        userId,
        guildId,
      },
    }).then(count => {
      return count > 0
    })
  }

  scoreParticipant(id) {
    return Participant.findByPk(id).then(participant => {
      return participant.update({
        score: participant.score + 1,
      })
    }).then(participant => {
      return Score.create({
        userId: participant.id,
      })
    })
  }

  async getStats(guildId) {
    const total = await Participant.count({
      where: {
        guildId,
      },
    })

    const topAllTime = await Participant.findAll({
      where: {
        guildId,
        score: {
          [Sequelize.Op.gt]: 0,
        },
      },
      order: [['score', 'DESC']],
    })

    return { total, topAllTime }
  }
}

module.exports = ParticipantsRepository
