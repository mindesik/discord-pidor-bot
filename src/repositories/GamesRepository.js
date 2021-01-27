const { Game, Participant } = require('../../models')

class GamesRepository {
  getLastGame(guildId) {
    return Game.findOne({
      where: {
        guildId,
      },
      include: [{
        model: Participant,
      }],
      order: [['id', 'DESC']],
    })
  }

  saveGameInformation(guildId, winnerId) {
    return Game.create({
      guildId,
      winnerId,
    })
  }
}

module.exports = GamesRepository
