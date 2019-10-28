var channelId = 0
try {
  channelId = window.baseInfo.channelId
} catch (e) {
  channelId = 1
}
module.exports = {
  channelId
}
