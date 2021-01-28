const {
  getRandomElement,
  sleep,
} = require('./utils')
const moment = require('moment')
const { teasePhrases, resultPhrases } = require('./phrases')

class Game {
  constructor(participantRepository, gamesRepository) {
    this.participantRepository = participantRepository
    this.gamesRepository = gamesRepository
  }

  async canStartGame(guildId) {
    return new Promise((resolve, reject) => {
      this.gamesRepository.getLastGame(guildId).then(game => {
        if (game === null) {
          return resolve(true)
        }

        if (moment().isSame(moment(game.createdAt), 'day')) {
          return reject(game.Participant.userName)
        }

        return resolve(true)
      })
    })
  }

  async tease(channel) {
    for (let i = 0; i <= 2; i++) {
      channel.startTyping()
      await sleep(1500 + Math.random() * 5500)
      channel.send(getRandomElement(teasePhrases[i]))
      channel.stopTyping()
    }
  }

  async run(guildId) {
    return new Promise((resolve, reject) => {
      this.participantRepository.getRandomParticipant(guildId).then(participant => {
        if (participant === null) {
          reject('Вы не можете запустить игру без участников')
          return
        }

        this.gamesRepository.saveGameInformation(guildId, participant.id)
        this.participantRepository.scoreParticipant(participant.id)
        resolve(participant.userId)
      })
    })
  }

  getStats(guildId) {
    return new Promise(resolve => {
      this.participantRepository.getStats(guildId).then(({ total, topAllTime }) => {
        let string = 'Топ-10 **пидоров** за все время:\n\n'

        for (let i in topAllTime) {
          string += `**${parseInt(i) + 1}**. ${topAllTime[i].userName} — ${topAllTime[i].score}\n`
        }

        string += `\n*Всего участников — ${total}*`

        resolve(string)
      })
    })
  }
}

module.exports = Game
