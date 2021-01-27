function temporaryMessage(channel, text, lifespan) {
  const response = channel.send(text)
  response.then((m) => { m.delete(lifespan) })
}

function getNickname(msg) {
  if (msg.member === 'undefined' || msg.member === null) {
    return msg.author.username
  }

  return msg.member.displayName
}

function deleteMessage(msg, time) {
  msg.delete(time).then(() => {}, () => {})
}

module.exports = {
  temporaryMessage,
  getNickname,
  deleteMessage,
}
