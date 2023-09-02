
const SentenceAppendPeriod = require('./SentenceAppendPeriod.js')
// const containsChineseCharacters = require('./containsChineseCharacters')
const CalculateParagraphInterval = require('./CalculateParagraphInterval.js')

const NextParagraphEnd = [
  '完畢',
  '看看',
  // '方式'
]
// let paragraphInterval = 0.02

function testIsNextParagraphEnd(text) {

  if (text.endsWith('。')) {
    text = text.slice(0, -1).trim()
  }
  if (text.endsWith('.')) {
    text = text.slice(0, -1).trim()
  }
  for (let i = 0; i < NextParagraphEnd.length; i++) {
    if (text.endsWith(NextParagraphEnd[i])) {
      console.log(text, NextParagraphEnd[i])
      return true
    }
  }
  return false
}

function CaptionFormat(srt, timeMarkList = []) {
  // let srtObject = JSON.parse(srt)
  let srtObject = []
  // console.log(srt)
  try {
    srtObject = eval(srt)
  }
  catch (e) {
    console.log(e)
    return false
  }
  // console.log(srtObject)

  if (timeMarkList.length > 0) {
    timeMarkList.sort()
  }

  let paragraphInterval = CalculateParagraphInterval(srtObject)
  let maxSentencesInParagraph = Math.ceil(srtObject.length / 7)
  // console.log({paragraphInterval})

  let paragraphs = []
  let sentences = []
  let lastEnd = false
  // let hasChineseCharacters = false

  if (timeMarkList.length > 0 && timeMarkList[0].time === 0) {
    paragraphs.push([`<strong># ${timeMarkList[0].title}</strong>`])
    timeMarkList.shift()
  }

  let tmp = []
  for (let i = 0; i < srtObject.length; i++) {
    let {text, start, duration, end} = srtObject[i]
    text.split('\n').forEach(t => {
      tmp.push({
        text: t,
        start,
        duration,
        end
      })
    })
  }
  srtObject = tmp

  for (let i = 0; i < srtObject.length; i++) {
    let {text, start, duration, end} = srtObject[i]
    text = text.trim()
    text = SentenceAppendPeriod(text)

    // if (containsChineseCharacters(text)) {
    //   hasChineseCharacters = true
    // }
    // console.log(timeMarkList.length, start, timeMarkList[0])
    if (timeMarkList.length > 0 && start > timeMarkList[0].time) {
      if (sentences.length > 0) {
        paragraphs.push(sentences)
      }

      paragraphs.push([`<strong># ${timeMarkList[0].title}</strong>`])
        
      sentences = [text]

      if (end) {
        lastEnd = end
      }
      else {
        lastEnd = start + duration
      }
      
      timeMarkList.shift()
      continue
    }

    if (lastEnd === false) {
      sentences.push(text)
      continue
    }
    
    if (testIsNextParagraphEnd(text)) {
      sentences.push(text)
      paragraphs.push(sentences)

      sentences = []

      if (end) {
        lastEnd = end
      }
      else {
        lastEnd = start + duration
      }
        
      continue
    }

    if ((start - lastEnd) > paragraphInterval) {
      // console.log('換句', start, lastEnd)
      if (sentences.length > 0) {
        paragraphs.push(sentences)
      }
      sentences = [text]

      if (end) {
        lastEnd = end
      }
      else {
        lastEnd = start + duration
      }
        
      continue
    }

    sentences.push(text)
    
    if (end) {
      lastEnd = end
    }
    else {
      lastEnd = start + duration
    }
  }

  if (sentences.length > 0) {
    paragraphs.push(sentences)
  }

  // console.log(paragraphs)

  // --------------------
  // 分割
  let output = []
  paragraphs.map (sentences => {
    if (sentences.length < maxSentencesInParagraph) {
      output.push(sentences)
      return
    }

    let split = 2
    while (sentences.length / split > maxSentencesInParagraph) {
      split++
    }

    let splitedSentences = splitArray(sentences, split)
    output = output.concat(splitedSentences)
  })

  // --------------------
  // 合併
  // console.log('Count paragraphs', output.length)
  return output.map (sentences => {
    return '<p style="max-width: calc(100vw - 1rem);  word-wrap: break-word; overflow-wrap: break-word; ">' + SentenceAppendPeriod(sentences.join('').trim()) + '</p>'
    // return sentences.join('').trim()
  // }).join('\n')
}).join('')
}

function splitArray(array, split = 3) {
  const length = array.length;
  const third = Math.floor(length / split);

  let output = []
  while (array.length > 0) {
    output.push(array.splice(0, third));
  }

  return output
}

module.exports = CaptionFormat