const containsChineseCharacters = require('./containsChineseCharacters')

const cheerio = require('cheerio')

function endsWithList(str, suffixList) {
  for (let i = 0; i < suffixList.length; i++) {
    if (str.endsWith(suffixList[i])) {
      return true;
    }
  }
  return false
}

function SentenceAppendPeriod(sentence) {
  const $ = cheerio.load(`<div>` + sentence + `</div>`)
  if ($('body').text().trim() === '') {
    return sentence
  }

  if (endsWithList(sentence, ['.', ';', '?', '!', '"', "'", '，', '、', '&', '@', '。', '！', '？']) === false) {
    if (containsChineseCharacters(sentence)) {
      sentence += '。'
    }  
    else {
      sentence += '.'
    }
  }

  if (containsChineseCharacters(sentence) === false) {
    sentence += ' '
  }
  
  return sentence
}


module.exports = SentenceAppendPeriod
