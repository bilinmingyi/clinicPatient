let channelId = 0
let clinicId = 0
try {
  channelId = window.baseInfo.channelId
} catch (e) {
  channelId = 0
}

try {
  clinicId = window.baseInfo.clinicId
} catch (e) {
  clinicId = 5
}
module.exports = {
  channelId,
  clinicId
}
