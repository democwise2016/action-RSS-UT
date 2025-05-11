const ItemFiltersPreset = require('./app/config/ItemFiltersPreset.js')
const CONFIG = require('../config-json.js')

let feedList = [

  {
    title: '動畫小坑谷',
    feedID: 'valleylife351',
    homepageURL: 'https://www.youtube.com/channel/UCbCb-ZUoKwQ8vcRbrH2nE0Q',
    itemFilters: [
      ItemFiltersPreset.between1minTo10Min,
    ] // 霸道總裁攀岩開會、網紅天天搞小團體...《絕世網紅》劇情超浮誇？《 志祺今天不讀稿 》EP010｜志祺七七
  },
  {
    title: '番茄没有酱聊AI繪圖',
    feedID: 'lsm0315',
    homepageURL: 'https://www.youtube.com/channel/UCoYbSADuNZvm99BLxqtImYQ',
    itemFilters: [
      ItemFiltersPreset.between3minTo30Min,
    ] // 霸道總裁攀岩開會、網紅天天搞小團體...《絕世網紅》劇情超浮誇？《 志祺今天不讀稿 》EP010｜志祺七七
  },
  {
    title: '敖厂长',
    feedID: 'hawkaoaoful',
    homepageURL: 'https://www.youtube.com/channel/UCCkMW93Am1pLfk2nZFKAmbQ',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: 'Gamker攻壳官方频道',
    feedID: 'Gamker-YT',
    homepageURL: 'https://www.youtube.com/channel/UCLgGLSFMZQB8c0WGcwE49Gw',
    itemFilters: [
      ItemFiltersPreset.between6minTo60Min,
      (item) => { return ((item.title.indexOf('【就知道玩遊戲') > -1)) }
    ]
  },
  {
    title: '公視P#新聞實驗室',
    feedID: 'Ppsharp_newslab',
    homepageURL: 'https://www.youtube.com/channel/UCMDcOT4z7GS1SRGG2g7z43g',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: 'Leonard',
    feedID: 'leonard2834',
    homepageURL: 'https://www.youtube.com/channel/UC1mx_wcSHtfpLk5N_zY0TRg',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '想做教育家的Klaus',
    feedID: 'klaus6510',
    homepageURL: 'https://www.youtube.com/channel/UCZ4NwvuGYgFyjnRRJekdnHw',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '簡報藝術烘焙坊 SlideArt',
    feedID: 'SlideArtToasters',
    homepageURL: 'https://www.youtube.com/channel/UCoAmv3Imi3Tl1dnseAMSqug',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: 'TESTV 值不值得買',
    feedID: 'testvcn-review',
    homepageURL: 'https://www.youtube.com/channel/UCoAmv3Imi3Tl1dnseAMSqug',
    itemFilters: [
      ItemFiltersPreset.between3minTo30Min,
      (item) => { return ((item.title.indexOf('【值不值得買第') >-1)) }
    ],
  },
  {
    title: '山小日子',
    feedID: 'Samsdailyproduction',
    homepageURL: 'https://www.youtube.com/channel/UCcFEKnC141Fg-YSltWOmDaA',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '六指淵 Huber',
    feedID: 'huber0203',
    homepageURL: 'https://www.youtube.com/channel/UC7ia-A8gma8qcdC6GDcjwsQ',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '朱宥勳使出人生攻擊!',
    feedID: 'Chuck158207',
    homepageURL: 'https://www.youtube.com/channel/UCIFqfMtBfNsYGBz3uNd9UAw',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '香教仁 聊3C',
    feedID: 'golo4tw',
    homepageURL: 'https://www.youtube.com/channel/UCkhvYNhfaV3y0FFpvTjdRqg',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '杰克艾米立 AI大小事',
    feedID: 'JackEllie-AInews',
    homepageURL: 'https://www.youtube.com/channel/UCine3_lVU-rFDRRI8xeImHA',
    // thumbnailBorderColor: true,
    itemFilters: [
      ItemFiltersPreset.between1minTo30Min,
      // (item) => { return ((item.title.indexOf('AI大小事') >-1)) }
    ],
  },
  {
    title: '低分少年聊電玩',
    feedID: 'lowscoreboy',
    homepageURL: 'https://www.youtube.com/channel/UC1BjrXqfmHmBkM2FjBTdg-w',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '月翔的戰國淺度旅行',
    feedID: 'SamuraiTraveller',
    homepageURL: 'https://www.youtube.com/channel/UCcoTcL4-1cBmqqPNdt8xb0Q',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  { // <outline type="rss" text="游戲指南針++$0414-1925$" title="游戲指南針++$0414-1925$" xmlUrl="http://pulipuli.myqnapcloud.com/304/fc/$0414-1925$/https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCVjXB6QUf_aZ_FninmssCOg" htmlUrl="https://www.youtube.com/channel/UCVjXB6QUf_aZ_FninmssCOg"/>
    title: '游戲指南針',
    feedID: 'YouXiZhiNanZhen',
    homepageURL: 'https://www.youtube.com/channel/UCVjXB6QUf_aZ_FninmssCOg',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  { // <outline type="rss" text="游戲指南針++$0414-1925$" title="游戲指南針++$0414-1925$" xmlUrl="http://pulipuli.myqnapcloud.com/304/fc/$0414-1925$/https%3A%2F%2Fwww.youtube.com%2Fchannel%2FUCVjXB6QUf_aZ_FninmssCOg" htmlUrl="https://www.youtube.com/channel/UCVjXB6QUf_aZ_FninmssCOg"/>
    title: '懷爸瘋科技',
    feedID: 'jono_craztech',
    homepageURL: 'https://www.youtube.com/channel/UCP87m51BCpfat9lxD533Mqw',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  
  { 
    title: '小宁子 3C',
    feedID: 'xnzxnz',
    homepageURL: 'https://www.youtube.com/channel/UCvUJ6BwgUGWBHuUd0cv546g',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  
  {
    title: 'JoeMultimedia 教 AI繪圖',
    feedID: 'JoeMultimedia',
    homepageURL: 'https://www.youtube.com/channel/UCMv267nynawErUJaQjsqiiQ',
    itemFilters: [
      ItemFiltersPreset.between3minTo30Min,
      (item) => { return ((item.title.indexOf('AI tutorial') >-1)) }
    ]
  },
  {
    title: 'Million赵本人 玩遊戲硬體',
    feedID: 'millionzhao5973',
    homepageURL: 'https://www.youtube.com/channel/UC1Y82Fzr76q5a2d7J-tnQnw',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: 'AI探索与发现 教 軟體',
    feedID: 'AIDiscovery2045',
    homepageURL: 'https://www.youtube.com/channel/UC0k8npj7VdHzN2L_-JSaPyA',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
  {
    title: '翼王 玩 3C',
    feedID: 'WingStudio666',
    homepageURL: 'https://www.youtube.com/channel/UCxcuxsAjdnQaiRwYb5CVISw',
    itemFilters: ItemFiltersPreset.between3minTo30Min,
  },
]

// 

// --------------------------------------

if (CONFIG.debug) {
  feedList = [
    {
      title: '志祺七七 X 圖文不符',
      feedID: 'shasha77',
      homepageURL: 'https://www.youtube.com/channel/UCiWXd0nmBjlKROwzMyPV-Nw',
      itemFilters: [
        ItemFiltersPreset.between3minTo30Min,
        (item) => { return (item.title.endsWith('｜志祺七七')) }
      ], // 霸道總裁攀岩開會、網紅天天搞小團體...《絕世網紅》劇情超浮誇？《 志祺今天不讀稿 》EP010｜志祺七七
      maxItems: 3
    },
  ]
}


module.exports = feedList
