////////////////////////////////////////////////////////////////////////
//////////////////// DEMO VISUALIZATIONS //////////////////////////////
///////////////////////////////////////////////////////////////////////

let data1 = [
  {

    "src": "https://www.youtube.com/embed/39udgGPyYMg",
    "scalingParameter": 7424591,
    "v_id": "7",
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "scalingParameter": 3495856,
    "v_id": "8",
    "type": "youtube"
  }
]

let data2 = [{
        "src": "https://player.vimeo.com/video/12788201",
        "scalingParameter": 26112988,
        "v_id": 3,
        "type": "vimeo"
    },
    {
        "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
        "scalingParameter": 1507944,
        "v_id": 4,
        "type": "video"
    },
    {
        "src": "https://www.youtube.com/embed/1xv_FeBGzfk",
        "scalingParameter": 3495856,
        "v_id": 9,
        "type": "youtube"
    }
  ]

  const newsClips = [
      {
          "src": "https://www.youtube.com/embed/Du-7te--BlA",
          "scalingParameter": Math.random(),
          "v_id": 101,
          "type": "youtube"
      },
      {
          "src": "https://www.youtube.com/embed/m2AUAo73tiw",
          "scalingParameter": Math.random(),
          "v_id": 102,
          "type": "youtube"
      },
      {
          "src": "https://www.youtube.com/embed/D2qCux7z1pI",
          "scalingParameter": Math.random(),
          "v_id": 103,
          "type": "youtube"
      },
      {
          "src": "https://www.youtube.com/embed/RbuRTDp85X0",
          "scalingParameter": Math.random(),
          "v_id": 104,
          "type": "youtube"
      },
      {
          "src": "https://www.youtube.com/embed/Eqz0eiIf1Uw",
          "scalingParameter": Math.random(),
          "v_id": 105,
          "type": "youtube"
      },
      {
          "src": "https://www.youtube.com/embed/O2f2znLlB_w",
          "scalingParameter": Math.random(),
          "v_id": 106,
          "type": "youtube"
      },
  ]

const youtubeTrailers = [
  {
    "src": 'https://www.youtube.com/embed/F-eMt3SrfFU',
    "scalingParameter": 21097531,
    "v_id": 1,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/XI4Na5JW1ns",
    "scalingParameter": 177639,
    "v_id": 2,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/nsrOCzUwcjE",
    "scalingParameter": 1073553,
    "v_id": 3,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/GjwfqXTebIY",
    "scalingParameter": 13652523,
    "v_id": 4,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/JDcAlo8i2y8",
    "scalingParameter": 4289574,
    "v_id": 5,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/6Vtf0MszgP8",
    "scalingParameter": 7972246,
    "v_id": 6,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/39udgGPyYMg",
    "scalingParameter": 7424591,
    "v_id": 7,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "scalingParameter": 3495856,
    "v_id": 8,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/1xv_FeBGzfk",
    "scalingParameter": 6522727,
    "v_id": 9,
    "type": "youtube"
  },
  {
    "src": "https://www.youtube.com/embed/euz-KBBfAAo",
    "scalingParameter": 19562920,
    "v_id": 10,
    "type": "youtube"
  }
]

const vimeoBestOf2016 = [
    {
        "src": "https://player.vimeo.com/video/185717440",
        "scalingParameter": 4,
        "v_id": 14,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/166807261",
        "scalingParameter": 5,
        "v_id": 15,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/169599296",
        "scalingParameter": 6,
        "v_id": 16,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/183252171",
        "scalingParameter": 7,
        "v_id": 17,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/175629655",
        "scalingParameter": 8,
        "v_id": 18,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/172431736",
        "scalingParameter": 9,
        "v_id": 19,
        "type": "vimeo"
    },
    {
        "src": "https://player.vimeo.com/video/193391700",
        "scalingParameter": 10,
        "v_id": 20,
        "type": "vimeo"
    }
  ]

let scatterData1 = [
  {
    "src": "https://player.vimeo.com/video/12788201",
    "v_id": 3,
    "type": "vimeo",
    'x': '18-Dec-09',
    'y': 34983948,
    "r": 46112988
  },
  {
    "src": "http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv",
    "v_id": 4,
    "type": "video",
    'x': '18-Dec-11',
    'y': 53849833,
    "r": 26112988
  },
  {
    "src": "https://www.youtube.com/embed/cPeqNTqZNN0",
    "v_id": 9,
    "type": "youtube",
    'x': '19-Dec-10',
    'y': 93948576,
    "r": 86112988
  }
]

let scatterData2 = [{
    x: '18-Dec-09',
    y: 34983948,
    r: 26112988,
    data: {
        "src": "https://player.vimeo.com/video/12788201",
        "v_id": 3,
        "type": "vimeo"
    }
}]

let scatterData3 =
    [
        {
            "productionBudgetRank": 1,
            "wordlwideGrossRank": 1,
            "v_id": 19,
            "type": "youtube",
            "movieName": "Avatar",
            "src": "https://www.youtube.com/embed/5PSNL1qE6VY",
            "x": "18-Dec-09",
            "y": 425000000,
            "r": 2783918982
        },
        {
            "productionBudgetRank": 2,
            "wordlwideGrossRank": 2,
            "v_id": 20,
            "type": "youtube",
            "movieName": "Star Wars: The Force Awakens Official Trailer ",
            "src": "https://www.youtube.com/embed/gAUxw4umkdY",
            "x": "18-Dec-15",
            "y": 306000000,
            "r": 2058662225
        },
        {
            "productionBudgetRank": 3,
            "wordlwideGrossRank": 5,
            "v_id": 21,
            "type": "youtube",
            "movieName": "Pirates of the Caribbean: At World's End",
            "src": "https://www.youtube.com/embed/HKSZtp_OGHY",
            "x": "24-May-07",
            "y": 300000000,
            "r": 963420425
        },
        {
            "productionBudgetRank": 4,
            "wordlwideGrossRank": 7,
            "v_id": 22,
            "type": "youtube",
            "movieName": "Spectre",
            "src": "https://www.youtube.com/embed/7GqClqvlObY",
            "x": "6-Nov-15",
            "y": 300000000,
            "r": 879620923
        },
        {
            "productionBudgetRank": 5,
            "wordlwideGrossRank": 4,
            "v_id": 23,
            "type": "youtube",
            "movieName": "The Dark Knight Rises",
            "src": "https://www.youtube.com/embed/GokKUqLcvD8",
            "x": "20-Jul-12",
            "y": 275000000,
            "r": 1084439099
        },
        {
            "productionBudgetRank": 7,
            "wordlwideGrossRank": 9,
            "v_id": 24,
            "type": "youtube",
            "movieName": "John Carter",
            "src": "https://www.youtube.com/embed/nlvYKl1fjBI",
            "x": "9-Mar-12",
            "y": 275000000,
            "r": 282778100
        },
        {
            "productionBudgetRank": 6,
            "wordlwideGrossRank": 10,
            "v_id": 25,
            "type": "youtube",
            "movieName": "The Lone Ranger",
            "src": "https://www.youtube.com/embed/JjFsNSoDZK8",
            "x": "2-Jul-13",
            "y": 275000000,
            "r": 260002115
        },
        {
            "productionBudgetRank": 8,
            "wordlwideGrossRank": 8,
            "v_id": 26,
            "type": "youtube",
            "movieName": "Tangled",
            "src": "https://www.youtube.com/embed/2f516ZLyC6U",
            "x": "24-Nov-10",
            "y": 260000000,
            "r": 586581936
        },
        {
            "productionBudgetRank": 9,
            "wordlwideGrossRank": 6,
            "v_id": 27,
            "type": "youtube",
            "movieName": "Spider-Man 3",
            "src": "https://www.youtube.com/embed/MTIP-Ih_GR0",
            "x": "4-May-07",
            "y": 258000000,
            "r": 890875303
        },
        {
            "productionBudgetRank": 10,
            "wordlwideGrossRank": 3,
            "v_id": 28,
            "type": "youtube",
            "movieName": "Avengers: Age of Ultron",
            "src": "https://www.youtube.com/embed/tmeOjFno6Do",
            "x": "5-Jan-15",
            "y": 250000000,
            "r": 1404705868
        }
    ]
