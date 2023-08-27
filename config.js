const ItemFiltersPreset = require('./app/config/ItemFiltersPreset.js')
const ConfigCheck = require('./app/config/ConfigCheck.js')
const feedList = require('./config-list.js')

let CONFIG = {
  publicURL: `https://democwise2016.github.io/action-RSS-UT/`,
  publicURLShorten: `https://ppt.cc/f6Ddzx`,
  thumbnailBorderColor: 'CC3333',

  maxDownloadItemPerFeed: 5,
  maxDownloadFeed: 50,
  newArrialMax: 5,
  maxDownloadItems: 100,
  maxExcutionMinutes: 25,

  feedList
}

module.exports = ConfigCheck(CONFIG)