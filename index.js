require('dotenv').config()
const DiscordJS = require('discord.js')
const DiscordClient = new DiscordJS.Client()
const { temporaryMessage, getNickname, deleteMessage } = require('./src/chat')
const GamesRepository = require('./src/repositories/GamesRepository')
const ParticipantRepository = require('./src/repositories/ParticipantRepository')
const Game = require('./src/Game')
const { getRandomElement, sleep } = require('./src/utils')

const {
  BOT_TOKEN,
} = process.env

const gamesRepository = new GamesRepository()
const participantsRepository = new ParticipantRepository()
const game = new Game(participantsRepository, gamesRepository)

const { pidorOfTheDayPhrases } = require('./src/phrases')
const roleName = 'Pidor of the day'

DiscordClient.on('message', msg => {
  if (msg.content.match(/^!пидордня/) || msg.content.match(/^!пидорня/)) {
    participantsRepository.isParticipantExists(msg.author.id, msg.guild.id)
      .then(isExists => {
        if (isExists) {
          temporaryMessage(msg.channel, 'You\'re already participating in this game, silly', 7000)
        } else {
          participantsRepository.addParticipant(msg.author.id, msg.guild.id, getNickname(msg))
          temporaryMessage(msg.channel, 'Alright, you\'re in, ' + getNickname(msg), 5000)
        }
      })

    deleteMessage(msg, 2000)
    return
  }

  if (msg.content.match(/^!ктопидор/)) {
    game.canStartGame(msg.guild.id).then(() => {
      game.run(msg.guild.id).then(async winMsg => {
        await game.tease(msg.channel)
        msg.channel.startTyping()
        await sleep(3500 + Math.random() * 1500)
        msg.channel.send(winMsg)
        msg.channel.stopTyping()

        const role = msg.guild.roles.cache.find(r => r.name === roleName)
        if (role) {
          role.delete('Creating new role').catch(console.error)
        }

        msg.guild.roles.create({
          data: {
            name: roleName,
            color: '#e74c3d',
            hoist: true,
          },
          reason: 'New role for Pidor of the day',
        }).then(role => {
          msg.guild.members.cache.get(msg.author.id).roles.add(role).catch(console.error)
        }).catch(console.error)
      }, reject => {
        temporaryMessage(msg.channel, reject, 8000)
      })
    }, reject => {
      msg.channel.send(getRandomElement(pidorOfTheDayPhrases) + reject)
    })

    deleteMessage(msg, 1000)
  }

  if (msg.content.match(/^!топпидоров/)) {
    game.getStats(msg.guild.id).then(message => {
      temporaryMessage(msg.channel, message, 15000)
    })
    deleteMessage(msg, 1000)
    return
  }

  if (msg.content.match(/^!исключить/)) {
    let chunks = msg.message.split(' ')
    chunks.splice(0, 1)
    let discordId = chunks.join('')
    deleteMessage(msg, 3000)
    participantsRepository.removeParticipant(discordId, msg.guild.id)
    return
  }
})

DiscordClient.login(BOT_TOKEN).then(_ => console.log('The bot has started!'))
