// 本體謎題與逐題來源；中文操作摘要不是官方譯名。
export const puzzleCheckedAt="2026-11-03";
export const puzzleGroups={
  "calibration": {
    "title": "序章 · 12 個教學謎題",
    "intro": "先拿完綠區 3 塊，拼門進黃區；再拿黃區 4 塊、紅區 5 塊。各區拼門排法列在該區最後。"
  },
  "all-puzzles": {
    "title": "12 區黃金謎題",
    "intro": "完成各區正規與 Lost 謎題、推進主線開放黃金門後，再依地區逐一回訪。"
  },
  "region-e1": {
    "title": "E1 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。抵達先處理 Doge 私訊；想拿時間獎盃，先留一題不解。"
  },
  "region-e2": {
    "title": "E2 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-e3": {
    "title": "E3 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-n1": {
    "title": "N1 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-n2": {
    "title": "N2 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-n3": {
    "title": "N3 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-s1": {
    "title": "S1 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-s2": {
    "title": "S2 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-s3": {
    "title": "S3 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-w1": {
    "title": "W1 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "region-w2": {
    "title": "W2 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。Lost Lab 先不要進去，等「W2 Lost Lab 前」完成備份。"
  },
  "region-w3": {
    "title": "W3 · 解題順序",
    "intro": "依路牌完成正規 1 → 8，再補 Lost 1 → 2，最後搭橋、啟動塔。黃金謎題留 P7。"
  },
  "first-megastructure": {
    "title": "第一次進巨構 · 三色光束"
  },
  "north-exit": {
    "title": "第二次進巨構 · 北側"
  },
  "prometheus-rescue": {
    "title": "第三次進巨構 · 釋放 Prometheus"
  },
  "ending": {
    "title": "最終巨構 · 建議依序完成",
    "intro": "Utopia 與 Dystopia 的牆上裝置互通顏色，一端接收、另一端輸出。先照下方順序走，避免同時改動兩邊。"
  },
  "miranda": {
    "title": "救回 Miranda"
  },
  "museum": {
    "title": "博物館 · 練習與可選謎題"
  },
  "text-adventures": {
    "title": "三部文字冒險"
  }
};
export const puzzles=[
  {
    "id": "BOOT-1",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 1,
    "title": "Cubic Steps",
    "label": "綠區 · 1",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Cubic Steps",
        "url": "https://taloswiki.org/wiki/Cubic_Steps",
        "revision": "4768"
      }
    ],
    "actions": [
      "將一個方塊放上壓板，讓門保持開啟。",
      "把另一方塊疊到場內另一個方塊上；利用一層、兩層的高度跳上平台，拿取綠色拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-2",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 2,
    "title": "Fencing",
    "label": "綠區 · 2",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Fencing",
        "url": "https://taloswiki.org/wiki/Fencing",
        "revision": "4769"
      }
    ],
    "actions": [
      "把方塊放在低柵欄旁，站上去，隔著柵欄拿出另一個方塊。",
      "用三個方塊排出一層、兩層的階梯，越過高柵欄拿拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-3",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 3,
    "title": "Within Reach",
    "label": "綠區 · 3",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Within Reach",
        "url": "https://taloswiki.org/wiki/Within_Reach",
        "revision": "4770"
      }
    ],
    "actions": [
      "用方塊壓住入口壓板。",
      "踩另一方塊跳上高台，轉身把腳下方塊拿上來。",
      "把它放到下一段高牆旁，當墊腳石跳到拼塊處。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-arranger-Green",
    "region": "BOOT",
    "kind": "arranger",
    "number": 1,
    "label": "拼門",
    "stepId": "calibration",
    "title": "綠區拼塊門",
    "actions": [
      "拿齊這一區的拼塊，再照下圖放入；同一字母代表同一塊，先旋轉成圖上的方向。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 三色拼門原始畫面",
        "url": "https://taloswiki.org/wiki/Booting_Process"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "ABB",
      "ACB",
      "ACB",
      "ACC"
    ],
    "after": "BOOT-3"
  },
  {
    "id": "BOOT-4",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 4,
    "title": "Static Pressure",
    "label": "黃區 · 4",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Static Pressure",
        "url": "https://taloswiki.org/wiki/Static_Pressure",
        "revision": "4771"
      }
    ],
    "actions": [
      "拆下扇葉壓住門前壓板，把兩個方塊搬出來。",
      "裝回扇葉，把一個方塊放在風扇上。",
      "抱著另一方塊跳上去，從高處把它放到上層壓板，然後跳向拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-5",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 5,
    "title": "Windy Day",
    "label": "黃區 · 5",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Windy Day",
        "url": "https://taloswiki.org/wiki/Windy_Day",
        "revision": "4772"
      }
    ],
    "actions": [
      "用可拆扇葉壓住壓板，搭另一座風扇上高台取方塊。",
      "帶方塊回地面，換下壓板上的扇葉。",
      "抱扇葉回高台，裝到上層風扇，再搭風取得拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-6",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 6,
    "title": "Single-slit Experiment",
    "label": "黃區 · 6",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Single-slit Experiment",
        "url": "https://taloswiki.org/wiki/Single-slit_Experiment",
        "revision": "4773"
      }
    ],
    "actions": [
      "搭風扇上平台，開啟牆上開關，把方塊送出。",
      "回地面移動方塊，擋住紅色光束；風扇停止後拿取後方拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-7",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 7,
    "title": "Versatile Contraption",
    "label": "黃區 · 7",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Versatile Contraption",
        "url": "https://taloswiki.org/wiki/Versatile_Contraption",
        "revision": "4774"
      }
    ],
    "actions": [
      "第一台干擾器放在壓板上，同時透過窗戶干擾門。",
      "取第二台干擾器，接手干擾前方同一道門。",
      "取第三台干擾器，停用風扇，走進去拿拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-arranger-Yellow",
    "region": "BOOT",
    "kind": "arranger",
    "number": 1,
    "label": "拼門",
    "stepId": "calibration",
    "title": "黃區拼塊門",
    "actions": [
      "拿齊這一區的拼塊，再照下圖放入；同一字母代表同一塊，先旋轉成圖上的方向。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 三色拼門原始畫面",
        "url": "https://taloswiki.org/wiki/Booting_Process"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "AABB",
      "CAAB",
      "CDDB",
      "CCDD"
    ],
    "after": "BOOT-7"
  },
  {
    "id": "BOOT-8",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 8,
    "title": "Fundamental Connections",
    "label": "紅區 · 8",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Fundamental Connections",
        "url": "https://taloswiki.org/wiki/Fundamental_Connections",
        "revision": "4775"
      }
    ],
    "actions": [
      "先把第二根連接器從房間取出。",
      "調整第一根的位置，保持原有供電，讓走廊另一頭也看得見它。",
      "第二根連接第一根與藍色接收器，打開通往拼塊的門。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-9",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 9,
    "title": "Prismatic Diffraction",
    "label": "紅區 · 9",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Prismatic Diffraction",
        "url": "https://taloswiki.org/wiki/Prismatic_Diffraction",
        "revision": "4776"
      }
    ],
    "actions": [
      "用「保留連線」拿起原本有供電的連接器。",
      "加選雕像上的固定連接器，放回能看見全部目標的位置，沿已開啟的門走到拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-10",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 10,
    "title": "Destructive Interference",
    "label": "紅區 · 10",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Destructive Interference",
        "url": "https://taloswiki.org/wiki/Destructive_Interference",
        "revision": "4777"
      }
    ],
    "actions": [
      "第一根連接器接藍光源與關住第三根連接器的藍色接收器。",
      "第二根接紅光源與紅色接收器，拿出第三根。",
      "改第一根去開拼塊前的藍色門；第三根接第二根的紅光，再接紅色接收器，維持通路。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-11",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 11,
    "title": "Two Colors, Two Doors",
    "label": "紅區 · 11",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Two Colors, Two Doors",
        "url": "https://taloswiki.org/wiki/Two_Colors,_Two_Doors",
        "revision": "4778"
      }
    ],
    "actions": [
      "把方塊移到同時看得見藍光源、藍色接收器的位置。",
      "用方塊墊高連接器，接通藍光源與藍色接收器，避免光線相交，再取拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-12",
    "region": "BOOT",
    "kind": "tutorial",
    "number": 12,
    "title": "Ascension Awaits",
    "label": "紅區 · 12",
    "stepId": "calibration",
    "sources": [
      {
        "title": "Talos Wiki · Ascension Awaits",
        "url": "https://taloswiki.org/wiki/Ascension_Awaits",
        "revision": "4779"
      }
    ],
    "actions": [
      "方塊放在風扇上，連接器選紅光源與紅色接收器，再放到方塊頂。",
      "開啟開關，讓設備升空供電；走過打開的門，拿最後拼塊。"
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "BOOT-arranger-Red",
    "region": "BOOT",
    "kind": "arranger",
    "number": 1,
    "label": "拼門",
    "stepId": "calibration",
    "title": "紅區拼塊門",
    "actions": [
      "拿齊這一區的拼塊，再照下圖放入；同一字母代表同一塊，先旋轉成圖上的方向。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 三色拼門原始畫面",
        "url": "https://taloswiki.org/wiki/Booting_Process"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "ABBBC",
      "ADBCC",
      "ADEEC",
      "ADDEE"
    ],
    "after": "BOOT-12"
  },
  {
    "id": "E1-main-1",
    "region": "E1",
    "kind": "main",
    "number": 1,
    "title": "RGB Shifting",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · RGB Shifting",
        "url": "https://taloswiki.org/wiki/RGB_Shifting",
        "revision": "3602"
      }
    ],
    "actions": [
      "轉換器接藍＋綠，輸出紅光到紅接收器，搬出第一個方塊。",
      "改接紅＋綠，輸出藍光，搬出第二個方塊。",
      "改接紅＋藍，輸出綠光開最後一道門；兩個方塊各壓一塊壓板。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 1"
  },
  {
    "id": "E1-main-2",
    "region": "E1",
    "kind": "main",
    "number": 2,
    "title": "Reconnection",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Reconnection",
        "url": "https://taloswiki.org/wiki/Reconnection",
        "revision": "4449"
      }
    ],
    "actions": [
      "轉換器 A 接藍＋綠與紅接收器，取出 B。",
      "A 改接紅＋藍，產生綠光。",
      "B 接 A 的綠光與藍光源，輸出紅光到終點接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 2"
  },
  {
    "id": "E1-main-3",
    "region": "E1",
    "kind": "main",
    "number": 3,
    "title": "Castling",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Castling",
        "url": "https://taloswiki.org/wiki/Castling",
        "revision": "4222"
      }
    ],
    "actions": [
      "A 接紅＋綠與藍接收器，放在壓板上，搬出 B。",
      "保持 A 的紅＋綠連線，移到門前。",
      "B 接綠光源與 A 的藍光，輸出紅光到紅接收器；B 壓住壓板。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 3"
  },
  {
    "id": "E1-main-4",
    "region": "E1",
    "kind": "main",
    "number": 4,
    "title": "Alternative Option",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Alternative Option",
        "url": "https://taloswiki.org/wiki/Alternative_Option",
        "revision": "4403"
      }
    ],
    "actions": [
      "打開風扇開關，抱轉換器升空，選紅光源、藍光源與綠接收器。",
      "落地後關風扇，把方塊放在風扇上。",
      "保留連線拿起轉換器，放到方塊頂；重新開風扇，升空後就能接通。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 4"
  },
  {
    "id": "E1-main-5",
    "region": "E1",
    "kind": "main",
    "number": 5,
    "title": "Through the Door",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Through the Door",
        "url": "https://taloswiki.org/wiki/Through_the_Door",
        "revision": "4276"
      }
    ],
    "actions": [
      "連接器壓住壓板；用干擾器開遠處門，拿出轉換器。",
      "干擾左門，用轉換器換下壓板上的連接器。",
      "連接器接藍光源與藍接收器，盡量放遠。",
      "干擾器改開壓板旁的門；轉換器接藍色連接器＋紅光源，輸出綠光開終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 5"
  },
  {
    "id": "E1-main-6",
    "region": "E1",
    "kind": "main",
    "number": 6,
    "title": "Alternatives",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Alternatives",
        "url": "https://taloswiki.org/wiki/Alternatives",
        "revision": "4241"
      }
    ],
    "actions": [
      "A 接紅＋藍，產生綠光。",
      "B 接藍光源＋A，輸出紅光開第一道門，放在接收器那側。",
      "C 接 A＋B，輸出藍光開第二道門，放在左側。",
      "D 接 A＋C，輸出紅光到第二道門的紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 6"
  },
  {
    "id": "E1-main-7",
    "region": "E1",
    "kind": "main",
    "number": 7,
    "title": "Self-Sufficiency",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Self-Sufficiency",
        "url": "https://taloswiki.org/wiki/Self-Sufficiency",
        "revision": "4325"
      }
    ],
    "actions": [
      "拆扇葉壓住旁邊壓板；連接器壓另一板。",
      "轉換器先選藍光源與兩個紅接收器，放樓梯頂。",
      "連接器接綠光源、綠接收器與轉換器，也放樓梯頂。",
      "扇葉先移到藍光源旁壓板，再裝回風扇；沿開啟通路完成。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 7"
  },
  {
    "id": "E1-main-8",
    "region": "E1",
    "kind": "main",
    "number": 8,
    "title": "Entanglement",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Entanglement",
        "url": "https://taloswiki.org/wiki/Entanglement",
        "revision": "4493"
      }
    ],
    "actions": [
      "連接器壓風扇旁壓板，取出轉換器。",
      "連接器選紅光源，改壓第二板；轉換器接它與藍光源，輸出綠光開方塊房。",
      "搬出方塊，連接器放回第一板；方塊放風扇上。",
      "轉換器選紅、藍光源與風扇綠接收器，放方塊頂。連接器接紅光源與轉換器，壓第二板。",
      "自己踩第一板讓設備升空，再用連接器把空中的綠光接到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 正規 8"
  },
  {
    "id": "E1-lost-1",
    "region": "E1",
    "kind": "lost",
    "number": 1,
    "title": "Elevation",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Elevation",
        "url": "https://taloswiki.org/wiki/Elevation",
        "revision": "4439"
      }
    ],
    "actions": [
      "連接器隔著紫屏連藍光源與藍接收器；轉換器壓板。",
      "把連接器墊到方塊上。轉換器接紅＋綠，輸出藍光開左門，位置靠左避開交叉光束。",
      "取下連接器，方塊改壓板；連接器把轉換器的藍光接到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · Lost 1"
  },
  {
    "id": "E1-lost-2",
    "region": "E1",
    "kind": "lost",
    "number": 2,
    "title": "Interconnectivity",
    "stepId": "region-e1",
    "sources": [
      {
        "title": "Talos Wiki · Interconnectivity",
        "url": "https://taloswiki.org/wiki/Interconnectivity",
        "revision": "4334"
      }
    ],
    "actions": [
      "轉換器壓第一板，繞路把連接器移上第二板。",
      "轉換器選藍光源、綠接收器，換壓第二板；連接器送紅光給它，拿出另兩根連接器。",
      "一根接藍光源與中間門藍接收器並壓板；另一根接藍光源，放遠處。",
      "第三根把遠處藍光接終點，放壓板右側；轉換器接紅光源、遠處藍光與綠接收器，再壓板。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · Lost 2"
  },
  {
    "id": "E1-bridge",
    "region": "E1",
    "kind": "bridge",
    "number": 1,
    "label": "E1 · 橋與塔",
    "stepId": "region-e1",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：1 → 2 → 3（轉）。",
      "第 2 段：2（轉）→ 3（轉）→ 1（轉）。",
      "第 3 段：2（轉）→ 1（轉）。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/03_East_1_Grassland/grassland_3.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E1-star-prometheus",
    "region": "E1",
    "kind": "star",
    "number": 1,
    "label": "E1 · 星星",
    "stepId": "region-e1",
    "title": "Prometheus 星星",
    "actions": [
      "先搭好第一段橋，再碰沼澤東南角的藍色光團。",
      "依序追到南岸小隧道、金環前、第一段橋後、Prometheus 雕像，最後到像底拿星星。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · E1 雕像",
        "url": "https://taloswiki.org/wiki/Grasslands_Ring#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E1-star-pandora",
    "region": "E1",
    "kind": "star",
    "number": 1,
    "label": "E1 · 星星",
    "stepId": "region-e1",
    "title": "Pandora 星星",
    "actions": [
      "完成正規 8 Entanglement 後，用連接器把空中轉換器的綠光接到 Pandora 盒子上的綠接收器。回雕像底拿星星。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · E1 雕像",
        "url": "https://taloswiki.org/wiki/Grasslands_Ring#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E1-gold-1",
    "region": "E1",
    "kind": "gold",
    "number": 1,
    "title": "Jump Start",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/20_Golden_Gates/Golden_Gates_East/golden_gates_east_1.htm"
      }
    ],
    "actions": [
      "連接器壓入口板，搬出方塊換壓；連接器接內房紅光開第一個轉換器房，取 L，讓 L 壓入口板。",
      "方塊放風扇。連接器選紅光源、另一轉換器房紅接收器與風扇紅接收器，放方塊頂，升空後取 K。",
      "K 選紅、藍光源與 L。拆扇葉降下設備，連接器取下暫放；裝回扇葉，方塊頂改放保留連線的 K。",
      "L 保留 K 連線，加選藍光源與風扇紅接收器，留入口板。",
      "用連接器短暫接紅光源與風扇接收器，啟動後由 K、L 維持供電。",
      "取連接器，把空中 K 的綠光接終點綠接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "E1 · 黃金 1"
  },
  {
    "id": "E2-main-1",
    "region": "E2",
    "kind": "main",
    "number": 1,
    "title": "Quantum Tunneling",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Quantum Tunneling",
        "url": "https://taloswiki.org/wiki/Quantum_Tunneling",
        "revision": "4316"
      }
    ],
    "actions": [
      "鑽孔器 A 開對面房牆，把 B 從孔遞出去。",
      "繞路取 B，反向鑽開 A 所在的牆，把 A 遞出。",
      "一台鑽中間紫屏旁牆，設備靠近孔；另一台先遞過去。",
      "繞過紫屏，用另一台反向維持同一孔，再拿回第一台；兩台各壓一塊終點壓板。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 1"
  },
  {
    "id": "E2-main-2",
    "region": "E2",
    "kind": "main",
    "number": 2,
    "title": "Mutual Aid",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Mutual Aid",
        "url": "https://taloswiki.org/wiki/Mutual_Aid",
        "revision": "4431"
      }
    ],
    "actions": [
      "鑽開紅光路徑，讓光接通；干擾器從內側開門，把鑽孔器搬入。",
      "干擾器改開第二門，放在銅牆附近。",
      "帶鑽孔器繞到牆另一側開孔，隔孔拿干擾器，改開第三門。",
      "鑽孔器壓住最後壓板。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 2"
  },
  {
    "id": "E2-main-3",
    "region": "E2",
    "kind": "main",
    "number": 3,
    "title": "Backup",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Backup",
        "url": "https://taloswiki.org/wiki/Backup",
        "revision": "4380"
      }
    ],
    "actions": [
      "鑽藍側牆，取連接器接藍光與藍接收器，搬出轉換器。",
      "改鑽紅側，A 接紅光源與紅接收器。B 隔著已開門接紅光源與 A，替它持續供電。",
      "重新鑽藍側；轉換器接孔後藍光源＋紅色連接器，輸出綠光到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 3"
  },
  {
    "id": "E2-main-4",
    "region": "E2",
    "kind": "main",
    "number": 4,
    "title": "Placement",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Placement",
        "url": "https://taloswiki.org/wiki/Placement",
        "revision": "4239"
      }
    ],
    "actions": [
      "鑽連接器旁牆，把它取出；改鑽壓板旁牆。",
      "連接器先壓板，搬出方塊並放風扇上。",
      "隔孔拿連接器，選藍光源與藍接收器，放方塊頂。",
      "開風扇，再把孔改到接收器那側的牆，接通光線。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 4"
  },
  {
    "id": "E2-main-5",
    "region": "E2",
    "kind": "main",
    "number": 5,
    "title": "Duet",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Duet",
        "url": "https://taloswiki.org/wiki/Duet",
        "revision": "4477"
      }
    ],
    "actions": [
      "隔窗鑽開開關旁牆，打開風扇；改鑽第二台鑽孔器的房間。",
      "搭風進去，用干擾器隔孔開門，把第二台鑽孔器遞出去。",
      "繞路用第二台反向維持洞口，取出第一台。一台壓板，另一台開干擾器旁牆。",
      "搭風回房，將干擾器遞出孔外；鑽孔器改開終點牆，再用干擾器隔孔開終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 5"
  },
  {
    "id": "E2-main-6",
    "region": "E2",
    "kind": "main",
    "number": 6,
    "title": "Passage",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Passage",
        "url": "https://taloswiki.org/wiki/Passage",
        "revision": "4491"
      }
    ],
    "actions": [
      "抱可拆扇葉搭角落風扇上層，把扇葉放壓板；再把鑽孔器帶上去。",
      "鑽旁邊牆，把另一台遞出；下樓用它從反面維持孔，再回上層將剩下一台遞出。",
      "一台鑽塔頂；另一台透過第一個孔再鑽干擾器所在的天花板。",
      "取干擾器，放壓板並干擾終點門。",
      "帶一台鑽孔器飛上去，換下壓板上的扇葉。把扇葉帶下暫放。",
      "用剩下鑽孔器開扇葉旁牆，回上層把扇葉從孔遞下，裝回最後風扇，搭風到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 6"
  },
  {
    "id": "E2-main-7",
    "region": "E2",
    "kind": "main",
    "number": 7,
    "title": "Eye of the Needle",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Eye of the Needle",
        "url": "https://taloswiki.org/wiki/Eye_of_the_Needle",
        "revision": "4615"
      }
    ],
    "actions": [
      "拿鑽孔器站上壓板，向房內方塊旁牆開孔，再把鑽孔器留壓板；隔孔取出方塊。",
      "同樣方式改開另一間房的牆，把方塊放到房內柵欄旁。",
      "墊方塊翻過柵欄，用干擾器隔孔開門。",
      "連接器隔孔接藍光源與終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 7"
  },
  {
    "id": "E2-main-8",
    "region": "E2",
    "kind": "main",
    "number": 8,
    "title": "Seesaw",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Seesaw",
        "url": "https://taloswiki.org/wiki/Seesaw",
        "revision": "4641"
      }
    ],
    "actions": [
      "只拿入口的連接器，接紅光源與紅接收器，打開內室。",
      "帶鑽孔器進內室，隔窗鑽紅光源前的銅牆。",
      "回入口拿同一根連接器，同時選兩個光源、兩個接收器。放到兩個接收器都看得見的位置：紅光穿孔，藍光被銅牆擋住。",
      "回內室，把鑽孔器改對準藍光源前的牆。紅側封回，藍光改從新孔通過，終點門打開。",
      "啟動終點輪盤，核對 Single Rod；全程不要碰第二根連接器。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 正規 8",
    "diagram": "seesaw",
    "warning": "Single Rod：全程只拿入口那一根連接器，另一根不要碰。"
  },
  {
    "id": "E2-lost-1",
    "region": "E2",
    "kind": "lost",
    "number": 1,
    "title": "Keeping Connections",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Keeping Connections",
        "url": "https://taloswiki.org/wiki/Keeping_Connection",
        "revision": "4480"
      }
    ],
    "actions": [
      "鑽紅光源旁牆；連接器先選紅光源。",
      "改鑽另一面牆；保留連線拿連接器，加選紅接收器，隔孔放入。",
      "繞路取第二根，隔紫屏接紅光源與接收器，取回第一根。",
      "一根靠紫屏作紅光中繼，另一根接它與終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · Lost 1"
  },
  {
    "id": "E2-lost-2",
    "region": "E2",
    "kind": "lost",
    "number": 2,
    "title": "Loop",
    "stepId": "region-e2",
    "sources": [
      {
        "title": "Talos Wiki · Loop",
        "url": "https://taloswiki.org/wiki/Loop",
        "revision": "4642"
      }
    ],
    "actions": [
      "連接器壓入口壓板；從門外鑽房內後牆。繞過紫屏，把方塊從孔遞入。",
      "繞回，用方塊換下壓板上的連接器，再把連接器從孔遞到紅光源側。",
      "繞路取連接器，接紅光源與風扇旁紅接收器，放在終點兩塊壓板的其中一塊。",
      "方塊放到風扇發射位置；隔窗鑽右側牆，洞口盡量貼地。",
      "站住風扇壓板，直到方塊穿孔、到達遠處牆邊停穩才離開。",
      "把孔改到窗戶左側、方塊落點旁的牆。繞過紫屏，隔新孔拿方塊，放終點另一塊壓板，啟動輪盤。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · Lost 2",
    "diagram": "loop",
    "warning": "Just One Lap：方塊只送一趟；停到遠牆後才改鑽孔。"
  },
  {
    "id": "E2-bridge",
    "region": "E2",
    "kind": "bridge",
    "number": 1,
    "label": "E2 · 橋與塔",
    "stepId": "region-e2",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：2 → 3 → 1 → 4（轉）。",
      "第 2 段：3 → 4 → 1（轉）→ 2。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/04_East_2_Plateau/East_2_2/east_2_platform_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E2-star-sphinx",
    "region": "E2",
    "kind": "star",
    "number": 1,
    "label": "E2 · 星星",
    "stepId": "region-e2",
    "title": "Sphinx 星星",
    "actions": [
      "將正規 2、4、7、8 路牌背面的開關打開，其餘保持關閉。回雕像底拿星星。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · E2 雕像",
        "url": "https://taloswiki.org/wiki/Wooded_Plateau#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E2-star-pandora",
    "region": "E2",
    "kind": "star",
    "number": 1,
    "label": "E2 · 星星",
    "stepId": "region-e2",
    "title": "Pandora 星星",
    "actions": [
      "正規 3 Backup 的 RGB 轉換器接紅＋藍，產生綠光，連到戶外岩石上固定連接器。",
      "在正規 8 Seesaw 用連接器接戶外那條綠光，轉送 Pandora 的綠接收器。若退出遊戲後光線重置，先回第 3 題恢復。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · E2 雕像",
        "url": "https://taloswiki.org/wiki/Wooded_Plateau#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E2-gold-1",
    "region": "E2",
    "kind": "gold",
    "number": 1,
    "title": "Lonely Heights",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/20_Golden_Gates/Golden_Gates_East/golden_gates_east_1.htm"
      }
    ],
    "actions": [
      "鑽孔器鑽風扇上方天花板並壓板；搭風上屋頂取方塊，帶下壓側房板。",
      "鑽孔器移側房開牆，隔孔取連接器；再搬鑽孔器回風扇板，重新開天花板，抱連接器上屋頂。",
      "連接器同選紅光源、屋頂門紅接收器、側房門紅接收器與終點高處紅接收器，留屋頂門邊。",
      "下樓改鑽側房牆，把方塊隔孔遞到原連接器壓板，短開屋頂門使紅光接通並自持，再拿回方塊。",
      "重建風扇天花板孔，上樓保留連線取回連接器；下樓將方塊放風扇、連接器放方塊頂。",
      "鑽孔器維持天花板孔並壓板，把整組送高，紅光到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E2 · 黃金 1"
  },
  {
    "id": "E3-main-1",
    "region": "E3",
    "kind": "main",
    "number": 1,
    "title": "Inversion",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Inversion",
        "url": "https://taloswiki.org/wiki/Inversion",
        "revision": "4648"
      }
    ],
    "actions": [
      "反相器 A 接藍光源與紅接收器，搬出 B。",
      "A 改接紅光源與藍接收器；B 接 A 的藍光，輸出紅光到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 1"
  },
  {
    "id": "E3-main-2",
    "region": "E3",
    "kind": "main",
    "number": 2,
    "title": "Energy Maintenance",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Energy Maintenance",
        "url": "https://taloswiki.org/wiki/Energy_Maintenance",
        "revision": "4654"
      }
    ],
    "actions": [
      "連接器 A 先開反相器房；反相器改開另一門。",
      "B 接紅光源與遠處紅接收器，放到第一間房看得見的位置。",
      "A 接 B 與第一門接收器，讓紅光持續供電；反相器改接紅光源，輸出藍光開終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 2"
  },
  {
    "id": "E3-main-3",
    "region": "E3",
    "kind": "main",
    "number": 3,
    "title": "There and Back Again",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · There and Back Again",
        "url": "https://taloswiki.org/wiki/There_and_Back_Again",
        "revision": "4664"
      }
    ],
    "actions": [
      "連接器先開第一門，放角落。反相器接紅光源與門另一側藍接收器，接手開門。",
      "連接器改接藍光源、藍接收器並壓板；反相器接這條藍光，輸出紅光開轉換器房，將轉換器搬回第一房。",
      "反相器改接紅光源、藍接收器；連接器改接紅光源與另一側紅接收器。",
      "轉換器接紅光源＋反相器的藍光，輸出綠光到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 3"
  },
  {
    "id": "E3-main-4",
    "region": "E3",
    "kind": "main",
    "number": 4,
    "title": "Refraction",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Refraction",
        "url": "https://taloswiki.org/wiki/Refraction",
        "revision": "4671"
      }
    ],
    "actions": [
      "反相器 A 先接紅接收器。",
      "B 同時選 A、紅光源，輸出藍光；A 改接 B 的藍光，兩台互相供電。",
      "C 接 A 的紅光，輸出藍光到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 4"
  },
  {
    "id": "E3-main-5",
    "region": "E3",
    "kind": "main",
    "number": 5,
    "title": "Imprisoned",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/05_East%203_Eastern_Wetlands/Wetlands_Part_2/wetlands_2.htm"
      }
    ],
    "actions": [
      "開入口左側開關，先讓入口門打開。",
      "反相器接內側紅光源與藍接收器；連接器接藍光源與同一藍接收器。",
      "回入口切開關，等後門打開，再切回。",
      "連接器移左房窗口，選反相器的藍光與終點藍接收器，放下完成。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 5",
    "researchNote": "Wiki 的 red inverter 是供電色描述誤植；以另一份逐步圖文核對為紅入、藍出。"
  },
  {
    "id": "E3-main-6",
    "region": "E3",
    "kind": "main",
    "number": 6,
    "title": "Hidden",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Hidden",
        "url": "https://taloswiki.org/wiki/Hidden",
        "revision": "6765"
      }
    ],
    "actions": [
      "連接器先接藍光源，放遠處。",
      "反相器在走廊選藍光源、連接器與中間紅接收器。",
      "連接器接藍光源與遠處藍接收器，打開門。",
      "反相器移到紫屏另一側，選連接器、藍光源與紅門接收器；最後兩台設備各壓一板。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 6"
  },
  {
    "id": "E3-main-7",
    "region": "E3",
    "kind": "main",
    "number": 7,
    "title": "Backward Propagation",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Backward Propagation",
        "url": "https://taloswiki.org/wiki/Backward_Propagation",
        "revision": "6774"
      }
    ],
    "actions": [
      "反相器 A 壓板。B 接藍光源，產生紅光。",
      "A 選紅光源與門後 B；自己踩板，等紅光接通。",
      "A 改選 B 的紅光與兩個藍接收器；自己再踩板，等兩道門都接通。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 7"
  },
  {
    "id": "E3-main-8",
    "region": "E3",
    "kind": "main",
    "number": 8,
    "title": "Positional Interchange",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Positional Interchange",
        "url": "https://taloswiki.org/wiki/Positional_Interchange",
        "revision": "6782"
      }
    ],
    "actions": [
      "風扇旁反相器 A 選主區紅接收器；連接器接藍光源與 A。",
      "B 搬到連接器所在小房；A 放方塊頂。",
      "連接器移開壓板，B 選藍光源、全部三個紅接收器與 A。",
      "連接器帶入終點走廊，接空中反相器與終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 正規 8"
  },
  {
    "id": "E3-lost-1",
    "region": "E3",
    "kind": "lost",
    "number": 1,
    "title": "Transposition",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Transposition",
        "url": "https://taloswiki.org/wiki/Transposition",
        "revision": "6747"
      }
    ],
    "actions": [
      "反相器接藍光源，放窗前。干擾左門，連接器隔門接反相器紅光與小房紅接收器。",
      "繞路用干擾器隔窗開門，再改回左門；進小房取鑽孔器，開走廊盡頭牆。",
      "連接器與反相器先後從孔遞過去，自己繞路取。",
      "連接器放窗前，接藍光源與終點藍接收器；反相器繞到另一側，接連接器與兩個紅接收器。",
      "干擾器最後隔窗開門。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · Lost 1"
  },
  {
    "id": "E3-lost-2",
    "region": "E3",
    "kind": "lost",
    "number": 2,
    "title": "Preconnected",
    "stepId": "region-e3",
    "sources": [
      {
        "title": "Talos Wiki · Preconnected",
        "url": "https://taloswiki.org/wiki/Preconnected",
        "revision": "6795"
      }
    ],
    "actions": [
      "隔孔取反相器 A 壓板，再用鑽孔器換壓；A 選紅光源與兩個藍接收器，放銅牆後。",
      "鑽開牆讓紅光通過，取出 B。",
      "鑽孔器改鑽最右牆，同時留在壓板上；B 隔孔接紅光源。",
      "A 接 B 的藍光，輸出紅光到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · Lost 2"
  },
  {
    "id": "E3-bridge",
    "region": "E3",
    "kind": "bridge",
    "number": 1,
    "label": "E3 · 橋與塔",
    "stepId": "region-e3",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：4（轉）→ 3（轉）→ 1（轉）→ 2（轉）。",
      "第 2 段：1 → 2（轉）→ 3（轉）→ 4。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/05_East%203_Eastern_Wetlands/Wetlands_part_4/wetlands_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E3-star-sphinx",
    "region": "E3",
    "kind": "star",
    "number": 1,
    "label": "E3 · 星星",
    "stepId": "region-e3",
    "title": "Sphinx 星星",
    "actions": [
      "到交通站左側海岸的人形大雕像；背對雕像、面向山坡終端時，在左手邊混凝土柱上找開關並打開，再回 Sphinx 拿星星。"
    ],
    "sources": [
      {
        "title": "Phil Hornshaw · E3 Sphinx",
        "url": "https://www.gamespot.com/articles/the-talos-principle-2-sphinx-statue-guide-all-sphinx-puzzles-and-stars/1100-6518920/"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E3-star-pandora",
    "region": "E3",
    "kind": "star",
    "number": 1,
    "label": "E3 · 星星",
    "stepId": "region-e3",
    "title": "Pandora 星星",
    "actions": [
      "正規 3 There and Back Again 的轉換器，用紅光源＋藍反相器產生綠光，送到戶外岩石固定連接器。",
      "到正規 6 Hidden，連接器接戶外綠光與 Pandora。退出後若重置，先回第 3 題恢復綠光。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · E3 雕像",
        "url": "https://taloswiki.org/wiki/Eastern_Wetlands#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "E3-gold-1",
    "region": "E3",
    "kind": "gold",
    "number": 1,
    "title": "Non-overlapping Magisteria",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Non-overlapping Magisteria",
        "url": "https://taloswiki.org/wiki/Non-overlapping_Magisteria",
        "revision": "4395"
      }
    ],
    "actions": [
      "內側反相器 A 接紅光源與藍接收器，放到紫屏外看得見的位置。B 在外側接 A 與紅接收器。",
      "連接器搬入內側；A 保留連線移到紅光源另一側，能隔開啟的門看見 B。連接器接 A、B，放 A 原處。",
      "取連接器走出兩門，直接接紅光源與紅接收器，位置避開 B 的光束。",
      "B 改直接接紅光源與藍接收器。此時門由它與連接器接手，A 可先取出壓終點板，再取 B、連接器各壓一板。"
    ],
    "verificationStatus": "consensus",
    "label": "E3 · 黃金 1"
  },
  {
    "id": "N1-main-1",
    "region": "N1",
    "kind": "main",
    "number": 1,
    "title": "Mind-Body Dualism",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Talos Wiki · Mind-Body Dualism",
        "url": "https://taloswiki.org/wiki/Mind-Body_Dualism",
        "revision": "6810"
      }
    ],
    "actions": [
      "切換到窗後身體 B，爬梯到壓板區，踩第一板開入口。",
      "切回 A 走進去踩第二板；B 走到內房踩第三板。",
      "切回 A，沿已開啟的門到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 1"
  },
  {
    "id": "N1-main-2",
    "region": "N1",
    "kind": "main",
    "number": 2,
    "title": "Leg Up",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_1/desolated_island_1.htm"
      }
    ],
    "actions": [
      "A 用托盤壓第二板，自己踩第一板放出 B。",
      "B 拿托盤站風扇板；A 搭風跳到 B 頭上的托盤。",
      "切 B 托著 A 走到終點高台，切 A 跳上去。",
      "A 從高處拿走托盤，放終點壓板。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 2"
  },
  {
    "id": "N1-main-3",
    "region": "N1",
    "kind": "main",
    "number": 3,
    "title": "Dual Stream",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_1/desolated_island_1.htm"
      }
    ],
    "actions": [
      "A 拿托盤站風扇 A 旁；B 拿連接器，先選紅光源與兩個紅接收器。",
      "B 搭風升空，把連接器放 A 的托盤上。",
      "A 托設備搭風，先讓右接收器通電；B 穿過第一門，站到仍看得見 A 的位置。",
      "A 移向另一座風扇，讓左接收器通電；切 B 進終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 3"
  },
  {
    "id": "N1-main-4",
    "region": "N1",
    "kind": "main",
    "number": 4,
    "title": "High Ground",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Luke Lawrie · High Ground 三身體堆疊",
        "url": "https://www.gamepur.com/guides/how-to-solve-high-ground-puzzle-in-the-talos-principle-2-n1-puzzle-4"
      }
    ],
    "actions": [
      "方塊放右側第二托盤下方。A 拿地面托盤站方塊旁；B 踩方塊跳 A 托盤。",
      "切 A 踩方塊，再切 B 拿高處第二托盤。此時 A、B 各抱一個托盤，C 空手。",
      "C 將方塊移終點牆旁。A 拿托盤站方塊旁；C 踩方塊跳 A 托盤。",
      "B 拿另一托盤站方塊旁。切 A，連同上面的 C 一起踩方塊，再跳到 B 托盤上。",
      "切最底下 B 踩方塊。逐層切到最上面 C，跳上終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 4"
  },
  {
    "id": "N1-main-5",
    "region": "N1",
    "kind": "main",
    "number": 5,
    "title": "The Gift",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_3/desolated%20island_3.htm"
      }
    ],
    "actions": [
      "B 從高台下來踩方塊房壓板；A 取方塊墊柵欄旁，站上去拿連接器。",
      "連接器接紅光源、紅接收器，放方塊上開門。A 進門踩風扇板，B 搭風回高台。",
      "A 保留連線拿連接器，連方塊一起移到高台邊；B 從高處接走連接器，放高台邊保持供電。",
      "A 把方塊改壓風扇板，搭風回高台踩終點板；B 啟動輪盤。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 5"
  },
  {
    "id": "N1-main-6",
    "region": "N1",
    "kind": "main",
    "number": 6,
    "title": "Two-Body Problem",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_3/desolated%20island_3.htm"
      }
    ],
    "actions": [
      "A 在外側鑽開銅牆，留在能看見內側壓板的位置；切 B。",
      "B 用方塊壓板取出內側連接器，再改壓開紅光源的板，把連接器從洞遞給 A。B 自己踩紅光源板。",
      "A 隔孔接紅光源與紅接收器，取出另一根；兩根都從孔遞回內側。",
      "B 用一根選孔外終點藍接收器；另一根接藍光源與它。方塊壓開藍光源的板，B 自己踩另一板。",
      "保持兩身體可互看，切 A 去終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 6"
  },
  {
    "id": "N1-main-7",
    "region": "N1",
    "kind": "main",
    "number": 7,
    "title": "Redshift",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_4/desolated%20island_4.htm"
      }
    ],
    "actions": [
      "A 拿托盤踩風扇板；B 搭風上托盤。切 A 托 B 到右側柱子，B 取連接器。",
      "連接器同選紅、藍光源與紅、藍接收器。A 回風扇板，B 升空把連接器放托盤。",
      "B 穿過藍門，站紅接收器右側，保持看得見 A。",
      "A 托設備走向右側柱子，讓紅光接通；切 B 進終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 7"
  },
  {
    "id": "N1-main-8",
    "region": "N1",
    "kind": "main",
    "number": 8,
    "title": "Drilling Party",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_4/desolated%20island_4.htm"
      }
    ],
    "actions": [
      "A 抱鑽孔器留入口上方平台，向左側第一面銅牆開孔。B 踩近旁壓板，讓 A 能切到 C。",
      "C 用連接器隔孔接紅光源與紅接收器，開門後搬出它，用它壓第二道門的板，取另一根。",
      "第二根交 B，B 用它替代腳下壓板，再走到中段門前壓板。看不見 C 時，先切 A 再切 C。",
      "C 取第一根，選紅光源與中段紅接收器，放後段壓板；A 改鑽能讓這條紅光通過的中間牆。",
      "C 穿過新開門，踩終點門板；A 改鑽最右側銅牆。B 把自己那根從新孔遞給 C，C 用它換壓終點板後完成。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 正規 8"
  },
  {
    "id": "N1-lost-1",
    "region": "N1",
    "kind": "lost",
    "number": 1,
    "title": "Passing Through",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_2/desolated%20island_2.htm"
      }
    ],
    "actions": [
      "B 干擾自己的門；A 把方塊遞到門邊，B 搬到干擾器旁。",
      "A 拿托盤站方塊前；B 抱干擾器踩方塊，保持干擾門，同時把干擾器放到 A 托盤。",
      "切 A，托著仍在干擾的設備走出門，再放下托盤，改用干擾器開終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · Lost 1"
  },
  {
    "id": "N1-lost-2",
    "region": "N1",
    "kind": "lost",
    "number": 2,
    "title": "Interplay",
    "stepId": "region-n1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_5/desolated%20island_5.htm"
      }
    ],
    "actions": [
      "A 用方塊壓風扇板，搭風到第二院；連接器接紅光源與 B 門紅接收器，自己踩供電板放出 B。",
      "兩身體回第一院。A 抱方塊站風扇，B 踩風扇板送 A 與方塊回第二院。",
      "第二院把方塊放風扇，連接器同選兩院紅接收器，放方塊頂。A 踩風扇板抬設備，B 取出第一院連接器。",
      "A 下風扇板，清除方塊上連接器的紅線；回第一院踩風扇板。B 抱另一根搭風到高處，接藍光源與第二院方塊上的連接器。",
      "B 到第二院，讓方塊上的連接器再選終點藍接收器。A 爬梯回第二院踩風扇板，切 B 完成。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · Lost 2"
  },
  {
    "id": "N1-bridge",
    "region": "N1",
    "kind": "bridge",
    "number": 1,
    "label": "N1 · 橋與塔",
    "stepId": "region-n1",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：3（轉）→ 7 → 5（轉）→ 6（轉）→ 1 → 4（轉）→ 8（轉）→ 2。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_5/desolated%20island_5.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N1-star-sphinx",
    "region": "N1",
    "kind": "star",
    "number": 1,
    "label": "N1 · 星星",
    "stepId": "region-n1",
    "title": "Sphinx 星星",
    "actions": [
      "正規 7 Redshift 外牆是 3×3：由上到下按出 111 / 010 / 010。",
      "Lost Passing Through 後牆是 3×3：按出 111 / 100 / 111。",
      "Lost Interplay 後牆是 3×4：按出 111 / 101 / 111 / 101。1 表示按入，0 保持凸出。完成後回正規 7 後方山丘的 Sphinx。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_3/desolated%20island_3.htm"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_5/desolated%20island_5.htm"
      }
    ],
    "verificationStatus": "consensus",
    "researchNote": "T 的按鈕 1/2/3/5/8 與 A、C 原始畫面交叉核對；A 第一行是三格，不是一般字型的單格尖頂。"
  },
  {
    "id": "N1-star-prometheus",
    "region": "N1",
    "kind": "star",
    "number": 1,
    "label": "N1 · 星星",
    "stepId": "region-n1",
    "title": "Prometheus 星星",
    "actions": [
      "從正規 3 離開後，到塔左側往下的階梯，從平台邊緣下去碰第一團藍光。",
      "往正規 4 方向追；經第 4 題後的岔路與 Lost Passing Through 入口，繼續到題內與建築後方。",
      "最後沿通往 Prometheus 山丘的步道，依序碰途中與像底光團，再拿星星。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_1/desolated_island_1.htm"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/07_North%201_%20Desolated_Island/Desolated_2/desolated%20island_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N1-gold-1",
    "region": "N1",
    "kind": "gold",
    "number": 1,
    "title": "Vantage Point",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Vantage Point",
        "url": "https://taloswiki.org/wiki/Vantage_Point",
        "revision": "4282"
      }
    ],
    "actions": [
      "切後院 B，連接器啟風扇，搭風到前院。身體踩板開方塊房，拿方塊。",
      "一身體踩風扇板，另一身體抱方塊飛後院；方塊換壓風扇板，抱連接器飛回前院。",
      "身體開門，連接器接藍光源與藍接收器，降柵欄。",
      "一身體飛後院，把方塊放風扇送回前院；另一身體先進終點前房。",
      "外側身體用方塊開門，連接器改選紅光源與紅接收器；方塊再壓風扇板，外側身體飛後院踩板，切終點前身體完成。"
    ],
    "verificationStatus": "consensus",
    "label": "N1 · 黃金 1"
  },
  {
    "id": "N2-main-1",
    "region": "N2",
    "kind": "main",
    "number": 1,
    "title": "Absorption",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_1/flooded_1.htm"
      }
    ],
    "actions": [
      "蓄能器 A 充紅，搬去接紅接收器開第一門。",
      "B 從 A 充紅，再同時接兩個紅接收器，維持第一門。",
      "清空 A 的顏色，改充藍並接藍接收器，開終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 1"
  },
  {
    "id": "N2-main-2",
    "region": "N2",
    "kind": "main",
    "number": 2,
    "title": "Triptych",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_1/flooded_1.htm"
      }
    ],
    "actions": [
      "轉換器接紅＋藍，把蓄能器充成綠色。",
      "綠蓄能器接綠接收器。",
      "轉換器改接綠蓄能器＋紅光源，輸出藍光給兩個藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 2"
  },
  {
    "id": "N2-main-3",
    "region": "N2",
    "kind": "main",
    "number": 3,
    "title": "Crossing",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_1/flooded_1.htm"
      }
    ],
    "actions": [
      "搭風取方塊帶回；干擾器停用第一風扇，方塊放風扇、蓄能器放方塊頂並選藍光源。",
      "干擾器改開門，設備飛到另一側充藍；搭風取回蓄能器與方塊。",
      "方塊壓內側板，藍蓄能器開門。把干擾器搬入，從內側接手開門。",
      "清空蓄能器，干擾紅光源房門，充紅。",
      "干擾器改開大門，紅蓄能器接紅接收器，降下終點柵欄。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 3"
  },
  {
    "id": "N2-main-4",
    "region": "N2",
    "kind": "main",
    "number": 4,
    "title": "Wellspring",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_2/flooded_2.htm"
      }
    ],
    "actions": [
      "兩根連接器隔窗接力送藍光，開蓄能器房。",
      "蓄能器取到左窗旁。外側連接器改接紅光源，隔窗替它充紅。",
      "外側連接器接紅蓄能器與入口紅接收器。",
      "內側連接器移左走廊，隔窗接同一蓄能器與終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 4"
  },
  {
    "id": "N2-main-5",
    "region": "N2",
    "kind": "main",
    "number": 5,
    "title": "Balance of Force",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_3/flooded_3.htm"
      }
    ],
    "actions": [
      "抱方塊搭第一風扇越門，關內側開關，方塊壓板開門。",
      "蓄能器在紫屏邊充藍，先選終點藍接收器，再帶回第二風扇側，加選另一藍接收器。",
      "方塊從板移到第二風扇，保留連線的蓄能器放方塊頂。",
      "開開關讓設備往返飛行，爬梯出去，繞紫屏到已開終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 5"
  },
  {
    "id": "N2-main-6",
    "region": "N2",
    "kind": "main",
    "number": 6,
    "title": "Reconnaissance",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_3/flooded_3.htm"
      }
    ],
    "actions": [
      "自己踩入口板，讓蓄能器充藍，再用它接藍接收器並壓同一板。",
      "內房鑽孔器壓板，將轉換器經已開門搬入，換壓該板；先選藍光源與紅接收器。",
      "把鑽孔器搬入口，鑽銅牆並換壓入口板。清空蓄能器，隔孔遞入綠光源房充綠，再遞回。",
      "綠蓄能器接轉換器，使它輸出紅光；普通連接器接藍光源與藍接收器，注意不交叉。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 6"
  },
  {
    "id": "N2-main-7",
    "region": "N2",
    "kind": "main",
    "number": 7,
    "title": "Rainbow",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_4/flooded_4.htm"
      }
    ],
    "actions": [
      "蓄能器充紅，接紅接收器，靠近接收器放。",
      "轉換器 A 接紅＋藍，輸出到兩個綠接收器。",
      "B 接 A 的綠光＋紅蓄能器，輸出到兩個藍接收器；放在兩條綠光之間，避開交叉。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 7"
  },
  {
    "id": "N2-main-8",
    "region": "N2",
    "kind": "main",
    "number": 8,
    "title": "Remember",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_4/flooded_4.htm"
      }
    ],
    "actions": [
      "紫屏內蓄能器充紅，放另一紫屏旁；外側連接器接它與紅接收器，開內房。",
      "方塊放外風扇送進紫屏，再把蓄能器疊方塊上，用內風扇一起送出。",
      "紅蓄能器移門邊維持開門；方塊壓內房板，將牆上接收器轉向室外。",
      "連接器改接紅光源與轉過來的接收器，換下蓄能器。",
      "方塊移終點柵欄旁，蓄能器放方塊頂，接終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 正規 8"
  },
  {
    "id": "N2-lost-1",
    "region": "N2",
    "kind": "lost",
    "number": 1,
    "title": "Field of View",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_2/flooded_2.htm"
      }
    ],
    "actions": [
      "兩台蓄能器分別充藍、紅，搬到左側接一藍一紅接收器，開前門。",
      "反相器帶過前門，放左上樓梯的窗口，接藍蓄能器，輸出到紅接收器。",
      "搬紅蓄能器去另一側紅接收器；反相器再移右上窗口，接紅蓄能器，輸出到藍接收器，開後門。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · Lost 1"
  },
  {
    "id": "N2-lost-2",
    "region": "N2",
    "kind": "lost",
    "number": 2,
    "title": "Lateral Inhibition",
    "stepId": "region-n2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_3/flooded_3.htm"
      }
    ],
    "actions": [
      "反相器接藍光源，把蓄能器充紅；反相器放到走廊窗口可見處。",
      "紅蓄能器放風扇後、第一門前的窗口。反相器保留藍光源，再選紅蓄能器與紅接收器，兩色輸入暫時讓它停輸出。",
      "先走過停轉風扇，到蓄能器旁；拿起它後紅輸入消失，反相器重新輸出紅光開門。",
      "抱蓄能器進門，放內側壓板，開第二門完成。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · Lost 2"
  },
  {
    "id": "N2-bridge",
    "region": "N2",
    "kind": "bridge",
    "number": 1,
    "label": "N2 · 橋與塔",
    "stepId": "region-n2",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：1 → 4 → 2 → 3（轉）。",
      "第 2 段：3 → 2（轉）→ 4（轉）→ 1（轉）。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_4/flooded_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N2-star-sphinx",
    "region": "N2",
    "kind": "star",
    "number": 1,
    "label": "N2 · 星星",
    "stepId": "region-n2",
    "title": "Sphinx 星星",
    "actions": [
      "打開三座小人形雕像底部開關：正規 1 旁岔路海岸、正規 4 左側岔路、塔前右側水中小島。",
      "第三處要先搭橋到塔附近；三個全開後回交通站前的 Sphinx。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_4/flooded_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N2-star-prometheus",
    "region": "N2",
    "kind": "star",
    "number": 1,
    "label": "N2 · 星星",
    "stepId": "region-n2",
    "title": "Prometheus 星星",
    "actions": [
      "到通往正規 4 的岔路，找金色混凝土構造裡的藍光團。",
      "一路追到正規 4 路上、岸邊、小島，再到 Prometheus 所在島，碰最後光團拿星星。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/08_North_2_Flooded_Valley/Flooded_Valley_2/flooded_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N2-gold-1",
    "region": "N2",
    "kind": "gold",
    "number": 1,
    "title": "Embodied Cognition",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Embodied Cognition",
        "url": "https://taloswiki.org/wiki/Embodied_Cognition",
        "revision": "4503"
      }
    ],
    "actions": [
      "蓄能器充紅開門；連接器帶進小房，選藍光源。",
      "繞路清空蓄能器，用連接器充藍，改接藍接收器重新開門。",
      "連接器搬出小房，同選藍光源、兩個藍接收器；第二道光暫被擋正常。",
      "清空蓄能器，選紅光源。自己站到藍光束上擋光，讓被交叉藍光擋住的紅光通過，完成充紅。",
      "紅蓄能器接終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "N2 · 黃金 1"
  },
  {
    "id": "N3-main-1",
    "region": "N3",
    "kind": "main",
    "number": 1,
    "title": "Substitution",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_1/north_3_1.htm"
      }
    ],
    "actions": [
      "拆扇葉換干擾器，停用方塊下方的屏障，讓方塊落地。",
      "用方塊換回扇葉，裝回風扇；搭風到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 1"
  },
  {
    "id": "N3-main-2",
    "region": "N3",
    "kind": "main",
    "number": 2,
    "title": "Possibilities",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_1/north_3_1.htm"
      }
    ],
    "actions": [
      "搭風取高台方塊，換蓄能器；抱蓄能器搭風到高台充藍。",
      "回地面把蓄能器換回方塊，移方塊到終點平台旁，踩它登台並從上方取回。",
      "站平台上把方塊換回已充藍的蓄能器，接藍接收器並壓板，同開兩門。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 2"
  },
  {
    "id": "N3-main-3",
    "region": "N3",
    "kind": "main",
    "number": 3,
    "title": "The Wall",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_1/north_3_1.htm"
      }
    ],
    "actions": [
      "方塊換鑽孔器，鑽銅牆；紫屏另一側連接器換干擾器。",
      "隔孔將干擾器換方塊，再用方塊換連接器；接紅光源、紅接收器。",
      "回入口用鑽孔器換出干擾器，開終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 3"
  },
  {
    "id": "N3-main-4",
    "region": "N3",
    "kind": "main",
    "number": 4,
    "title": "Prison",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_2/north_3_2.htm"
      }
    ],
    "actions": [
      "A 接紅光開入口；內房方塊換 B，B 接 A 開另一連接器房。",
      "把取出的連接器換方塊，方塊墊入口旁；另一根放方塊頂接藍光與入口藍接收器，接手開門。",
      "把多餘連接器都換方塊，三個方塊疊成階梯翻到柵欄後，按開關降柵欄。",
      "取柵欄後連接器，選紅光源與後段紅接收器。",
      "再換兩根出來：一根墊方塊開入口藍接收器；另一根接這條藍光與終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 4"
  },
  {
    "id": "N3-main-5",
    "region": "N3",
    "kind": "main",
    "number": 5,
    "title": "Twice",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_2/north_3_2.htm"
      }
    ],
    "actions": [
      "蓄能器換干擾器，開第一門取第二台干擾器；第二台開紅光源前門。",
      "第一台換反相器，放紅光源房壓板並選紅光源。第二台換回蓄能器，從反相器充藍。",
      "蓄能器先換干擾器維持紅光源房門；再把反相器換另一台干擾器。",
      "兩台先後從外、內側接手開終點第一門，騰出一台換回藍蓄能器。",
      "藍蓄能器選內側藍接收器，干擾器開第二門，光線接通後前進。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 5"
  },
  {
    "id": "N3-main-6",
    "region": "N3",
    "kind": "main",
    "number": 6,
    "title": "Up and Down",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_3/north_3_3.htm"
      }
    ],
    "actions": [
      "拆第一風扇扇葉壓板，反相器換方塊；裝回扇葉，抱方塊連搭兩座風扇到高台，換轉換器。",
      "轉換器帶下壓板；再搭第一風扇上屋頂，拆第二風扇扇葉，帶下換反相器。",
      "反相器選終點藍接收器，放綠光源前矮柵旁。",
      "抱轉換器搭第一風扇回屋頂，選藍＋綠光源與反相器，放高方塊上，送紅光給反相器。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 6"
  },
  {
    "id": "N3-main-7",
    "region": "N3",
    "kind": "main",
    "number": 7,
    "title": "Propulsion",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_3/north_3_3.htm"
      }
    ],
    "actions": [
      "第二房鑽牆；把反相器隔孔遞入，換蓄能器後遞回第一房。",
      "第一風扇扇葉換方塊，墊高蓄能器接藍光充滿；蓄能器遞回第二房。",
      "方塊換回扇葉並裝回。第二房用藍蓄能器換反相器，隔孔遞回，抱它搭風到高台，選終點紅接收器。",
      "鑽孔器換回藍蓄能器，接上高台反相器，輸出紅光。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 7"
  },
  {
    "id": "N3-main-8",
    "region": "N3",
    "kind": "main",
    "number": 8,
    "title": "Transmission",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_4/north_3_4.htm"
      }
    ],
    "actions": [
      "A 搭第一風扇到屋頂，干擾器開 B 的門，切 B 出來。A 改干擾另一道門。",
      "B 拆第一風扇扇葉，換鑽孔器；鑽屋頂並壓門板。",
      "切 A，抱干擾器穿屋頂孔落下，換連接器；選紅光源與下方風扇紅接收器。",
      "搭第二風扇到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 正規 8"
  },
  {
    "id": "N3-lost-1",
    "region": "N3",
    "kind": "lost",
    "number": 1,
    "title": "All Around",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_3/north_3_3.htm"
      }
    ],
    "actions": [
      "一根連接器換反相器，隔窗接紅光源與入口藍接收器。",
      "另一根帶入換干擾器，從內側接手入口門；反相器換回連接器。",
      "干擾第二門，連接器進去接紅光源與內側紅接收器，接手開門。",
      "干擾器換反相器，接紅光源產生藍光；普通連接器換 RGB 轉換器。",
      "RGB 接紅光源＋反相器的藍光，輸出綠光到窗口綠接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · Lost 1"
  },
  {
    "id": "N3-lost-2",
    "region": "N3",
    "kind": "lost",
    "number": 2,
    "title": "Elegance",
    "stepId": "region-n3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_4/north_3_4.htm"
      }
    ],
    "actions": [
      "干擾器開入口；搭風到平台取鑽孔器，換第二台干擾器，從內側接手開門。",
      "外側干擾器換扇葉，再拿到內側換鑽孔器；抱鑽孔器搭風上平台開左牆。",
      "抱干擾器上平台，隔孔換連接器，選孔後紅光源與第二風扇紅接收器；保留連線把連接器遞過孔。",
      "鑽孔器換扇葉，裝第二風扇，搭風到牆另一側；連接器換回干擾器，開終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · Lost 2"
  },
  {
    "id": "N3-bridge",
    "region": "N3",
    "kind": "bridge",
    "number": 1,
    "label": "N3 · 橋與塔",
    "stepId": "region-n3",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：2 → 6 → 3 → 5 → 8 → 1 → 4 → 7。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_4/north_3_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N3-star-pandora",
    "region": "N3",
    "kind": "star",
    "number": 1,
    "label": "N3 · 星星",
    "stepId": "region-n3",
    "title": "Pandora 星星",
    "actions": [
      "正規 2 Possibilities：藍蓄能器放高台，接戶外柱頂 RGB。",
      "正規 3 The Wall：連接器接戶外 RGB 與 Pandora 綠接收器。",
      "正規 5 Twice：蓄能器改充紅，從入口接同一戶外 RGB。紅＋藍合成綠後，到像底拿星星。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_2/north_3_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N3-star-prometheus",
    "region": "N3",
    "kind": "star",
    "number": 1,
    "label": "N3 · 星星",
    "stepId": "region-n3",
    "title": "Prometheus 星星",
    "actions": [
      "從正規 7 旁的戶外構造與水中雕像開始追光。",
      "沿階梯、森林、山丘一路追到塔支架；由正規 6 樓梯側攀上支架碰光團。",
      "再到正規 6 終端旁岩石，最後過水到 Prometheus 雕像。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/09_North_3_Lost_%20Marshes/North_3_3/north_3_3.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "N3-gold-1",
    "region": "N3",
    "kind": "gold",
    "number": 1,
    "title": "The Rearranger",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · The Rearranger",
        "url": "https://taloswiki.org/wiki/The_Rearranger",
        "revision": "4355"
      }
    ],
    "actions": [
      "扇葉換連接器 A，接藍光源、藍接收器並壓板。鑽孔器換方塊，墊高隔欄拿另一根 B。",
      "B 換反相器，開第二門。方塊換壓板，A 放遠處，能從第二門與銅牆方向看見。",
      "第二方塊換 B，開第三門；扇葉換回鑽孔器，開銅牆左側。",
      "B 調到光束穿孔的位置，反相器移孔旁；繞到牆另一側隔孔取反相器，接藍色連接器，輸出紅光開終點。"
    ],
    "verificationStatus": "consensus",
    "label": "N3 · 黃金 1"
  },
  {
    "id": "S1-main-1",
    "region": "S1",
    "kind": "main",
    "number": 1,
    "title": "Phase Entry",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Phase Entry",
        "url": "https://taloswiki.org/wiki/Phase_Entry",
        "revision": "4416"
      }
    ],
    "actions": [
      "隔柵欄看見傳送器後傳送進第一房；過紫屏取方塊，抱著它傳送回來。",
      "把方塊放風扇、傳送器疊上去；短踩壓板把兩者吹進第二房。",
      "拆下扇葉，抱扇葉傳送進第二房並裝到風扇。",
      "傳送器與方塊各壓一板，搭風到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 1"
  },
  {
    "id": "S1-main-2",
    "region": "S1",
    "kind": "main",
    "number": 2,
    "title": "The Escape",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · The Escape",
        "url": "https://taloswiki.org/wiki/The_Escape",
        "revision": "4246"
      }
    ],
    "actions": [
      "到第四房鑽牆，隔孔取連接器，接第三房紅接收器，繞路進去。",
      "再隔孔拿連接器，同接兩個紅接收器，打開第二房取傳送器。",
      "傳送器放室外；回第三房抱連接器傳送出去，再回第四房抱鑽孔器傳送出去。",
      "連接器隔窗接藍接收器；鑽開第一房的牆，將傳送器遞入孔，再傳送到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 2"
  },
  {
    "id": "S1-main-3",
    "region": "S1",
    "kind": "main",
    "number": 3,
    "title": "Through the Wall",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Through the Wall",
        "url": "https://taloswiki.org/wiki/Through_the_Wall",
        "revision": "4687"
      }
    ],
    "actions": [
      "到最後一房，將傳送器隔孔放到第三房，傳送進去。",
      "鑽開第二房牆，利用孔和兩台傳送器搬運，讓兩台都能帶到第三房。",
      "鑽向室外，留一台在房內，另一台放室外中央，兩側窗戶都看得見。",
      "回第三房改鑽第二房，把一台傳送器遞進去；自己抱鑽孔器傳送到室外，再傳送第二房。",
      "鑽第一房牆，把傳送器遞過去，傳送進去啟動輪盤。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 3"
  },
  {
    "id": "S1-main-4",
    "region": "S1",
    "kind": "main",
    "number": 4,
    "title": "Pushing Through",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Pushing Through",
        "url": "https://taloswiki.org/wiki/Pushing_Through",
        "revision": "4365"
      }
    ],
    "actions": [
      "抱連接器傳送第一房，隔窗接紅光源與看得見的兩個紅接收器。",
      "把第一房傳送器、第二房方塊都搬到室外；自己抱連接器傳送出去。",
      "連接器改開第三房紅接收器，方塊壓第三房壓板，傳送器壓第四房壓板。",
      "回第三房抱方塊，自己留在壓板上，傳送第四房；方塊壓最後一板。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 4"
  },
  {
    "id": "S1-main-5",
    "region": "S1",
    "kind": "main",
    "number": 5,
    "title": "Dyad",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Dyad",
        "url": "https://taloswiki.org/wiki/Dyad",
        "revision": "4415"
      }
    ],
    "actions": [
      "到第四房取干擾器，傳送第六房並干擾門。",
      "傳送器放室外中央；繞回抱干擾器傳送出去。",
      "干擾第一房門，傳送器移窗邊；抱干擾器傳送進去，改開第二房門。",
      "把第二台傳送器移近終點，讓室外窗口看得見。",
      "回第一房，干擾通室外門並把傳送器放窗旁；抱干擾器傳送室外，隔窗干擾終點門，傳送進去。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 5"
  },
  {
    "id": "S1-main-6",
    "region": "S1",
    "kind": "main",
    "number": 6,
    "title": "Translocator",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Translocator",
        "url": "https://taloswiki.org/wiki/Translocator",
        "revision": "4412"
      }
    ],
    "actions": [
      "方塊壓第一板，自己踩第二板，傳送第三房。",
      "傳送器壓板；繞路抱方塊傳送回來。交替用兩件設備壓板，把兩件都搬到開放區。",
      "傳送器放左房，抱方塊傳送進去；用方塊墊高，把傳送器放到終點高台。",
      "把方塊移到另一側壓板高台，踩它登台，再拿上方塊壓板；傳送終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 6"
  },
  {
    "id": "S1-main-7",
    "region": "S1",
    "kind": "main",
    "number": 7,
    "title": "Remote Interchange",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Remote Interchange",
        "url": "https://taloswiki.org/wiki/Remote_Interchange",
        "revision": "4565"
      }
    ],
    "actions": [
      "一個方塊放柵欄旁，隔欄遞另一個過去，再跳過去把兩個都帶入第一房。",
      "方塊換連接器，接藍光開第二房；另一方塊也換連接器，接手第二房藍接收器。",
      "第一根換傳送器，放兩房間柵欄旁；另一根移壓板開第三房，自己傳送回第一房。",
      "到第四房取干擾器，隔窗傳送回第一房；從角落干擾室外門，爬梯到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 7"
  },
  {
    "id": "S1-main-8",
    "region": "S1",
    "kind": "main",
    "number": 8,
    "title": "Switcheroo",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Switcheroo",
        "url": "https://taloswiki.org/wiki/Switcheroo",
        "revision": "4586"
      },
      {
        "title": "Gamepressure · The Hard Way 專用解法",
        "url": "https://www.gamepressure.com/the-talos-principle-2/how-to-solve-switcheroo-puzzle/zc11118"
      }
    ],
    "actions": [
      "連接器壓入口板，方塊壓風扇板；搭風，對後方傳送器傳送。",
      "傳送器壓後房門板，把方塊搬進來換壓；傳送器移中央風扇旁，抱方塊站門板，再傳送出去。",
      "回入口抱連接器，自己站板，傳送中央。到目前都不要選光源。",
      "方塊放風扇，傳送器放方塊頂；連接器壓風扇板。傳送上去，將傳送器移到紅接收器旁上層邊緣。",
      "跳下，正常拾取連接器，傳送上層，先放邊緣。抱傳送器跳下，爬上方塊，從方塊上把傳送器放風扇板。",
      "方塊升空後跳到上層，正常拿連接器，現在才選下方紅光源與紅接收器，放到浮空方塊頂。啟動終端，核對 The Hard Way。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 正規 8",
    "diagram": "switcheroo",
    "warning": "The Hard Way：每次都用一般拾取，不按「保留連線」。最後才選光源。",
    "researchNote": "Wiki 一般解法第 12 步會使用 Keep Connections，不能用於此盃；採 Gamepressure 獎盃流程，延後至最後才接紅光。"
  },
  {
    "id": "S1-lost-1",
    "region": "S1",
    "kind": "lost",
    "number": 1,
    "title": "Aerial Warp",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Aerial Warp",
        "url": "https://taloswiki.org/wiki/Aerial_Warp",
        "revision": "4606"
      }
    ],
    "actions": [
      "傳送左高台，拿傳送器跳下；從矮台邊把它放上去，傳送越過後方取得方塊。",
      "方塊壓板，搭風過紫屏；傳送器換壓門板，搬出方塊。把內側扇葉裝右側風扇。",
      "右風扇放方塊＋傳送器，開風升空；傳送登台，取另一方塊跳下。",
      "左側照樣放扇葉、方塊＋傳送器，風扇運轉時再把第二方塊放氣流裡，增加高度。",
      "傳送上去，站高台邊緣拿回傳送器，放邊緣。下樓關風，抱方塊傳送上台，墊高到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · Lost 1"
  },
  {
    "id": "S1-lost-2",
    "region": "S1",
    "kind": "lost",
    "number": 2,
    "title": "Minimalism",
    "stepId": "region-s1",
    "sources": [
      {
        "title": "Talos Wiki · Minimalism",
        "url": "https://taloswiki.org/wiki/Minimalism",
        "revision": "4686"
      }
    ],
    "actions": [
      "干擾器開第一門，搭風上樓，把傳送器移邊緣。",
      "下樓拆扇葉，抱著傳送上層壓板；傳送器靠格柵外緣。",
      "下樓抱干擾器傳送上去，開上層門；用扇葉與傳送器壓住兩板。",
      "下樓抱蓄能器傳送上去，選仍可看見輪廓的紅光源，放格柵邊。",
      "自己下樓踩板，等充滿、紅色充電光斷開再回上層。抱蓄能器下樓，接終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · Lost 2"
  },
  {
    "id": "S1-bridge",
    "region": "S1",
    "kind": "bridge",
    "number": 1,
    "label": "S1 · 橋與塔",
    "stepId": "region-s1",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：1（轉）→ 2 → 3（轉）→ 4。",
      "第 2 段：4（轉）→ 1 → 3 → 2（轉）。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/12_South_%201/South_1_5/south_1_page_5.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S1-star-sphinx",
    "region": "S1",
    "kind": "star",
    "number": 1,
    "label": "S1 · 星星",
    "stepId": "region-s1",
    "title": "Sphinx 星星",
    "actions": [
      "從正規 8 右側沿海岸、淺水走到石柱陣；背對海、面向北方崖壁對齊陣列。",
      "以左上為第 1 欄第 1 列，按下（欄,列）：(1,3)、(2,4)、(3,1)、(3,2)、(3,3)、(4,2)。其餘不按；回雕像取星。"
    ],
    "sources": [
      {
        "title": "Graves · S1 六根石柱座標",
        "url": "https://eip.gg/guides/the-talos-principle-2-south-1-star-statue-puzzles/"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S1-star-pandora",
    "region": "S1",
    "kind": "star",
    "number": 1,
    "label": "S1 · 星星",
    "stepId": "region-s1",
    "title": "Pandora 星星",
    "actions": [
      "正規 2 The Escape 完成後，把鑽孔器帶到終點，看下方岩壁開孔露出綠光源，連接器轉送山頂固定接點。",
      "正規 4 Pushing Through 的連接器再接山頂綠光與交通站下方固定接點。回正規 5 下方的 Pandora 拿星星。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · S1 雕像",
        "url": "https://taloswiki.org/wiki/Southern_Coast#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S1-gold-1",
    "region": "S1",
    "kind": "gold",
    "number": 1,
    "title": "Pillars of Ascension",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Pillars of Ascension",
        "url": "https://taloswiki.org/wiki/Pillars_of_Ascension",
        "revision": "4364"
      }
    ],
    "actions": [
      "傳送第二柱，拿朝後風扇扇葉跳第三柱裝回，跳回第二柱，抱傳送器跳第三柱。",
      "傳送器留第三柱；跳回第二柱，抱另一扇葉傳送第三柱，裝朝前風扇。",
      "傳送器壓板，拿另一扇葉跳前方；取方塊後傳送回，方塊放前送風扇、傳送器疊上方，踩板送兩者前進。",
      "抱剩下扇葉傳送前方並裝風扇；傳送器與一個扇葉各壓板，抱方塊跳前方。",
      "方塊壓板，搭風到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S1 · 黃金 1"
  },
  {
    "id": "S2-main-1",
    "region": "S2",
    "kind": "main",
    "number": 1,
    "title": "Mountaineer",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_1/south_2_1.htm"
      }
    ],
    "actions": [
      "跳上左側重力牆，越過第一柵欄落入第二區；搭紫色重力柱越過第二柵欄，取重力轉換器。",
      "對終點旁重力牆上緣發射橫向光束，將高台連接器吸到牆上；設備壓住門板。",
      "進門跳上重力牆，拿連接器，選藍光源與藍接收器，放牆面供電。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 1"
  },
  {
    "id": "S2-main-2",
    "region": "S2",
    "kind": "main",
    "number": 2,
    "title": "Spiderweb",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_1/south_2_1.htm"
      }
    ],
    "actions": [
      "重力轉換器對內房牆面發橫向光束並壓風扇板；搭風進房，把連接器移到天花板正下方地磚。",
      "爬梯出去，改用向上重力把連接器吸到天花板。",
      "再改橫向光束並壓風扇板，搭風登牆再上天花板；連接器接藍光源與終點藍接收器。",
      "要順便準備 Pandora，再加選接收器上方洞口外、岩石上的固定連接器。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 2"
  },
  {
    "id": "S2-main-3",
    "region": "S2",
    "kind": "main",
    "number": 3,
    "title": "Upward Migration",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_3/south_2_3.htm"
      }
    ],
    "actions": [
      "以入口左側終點角為 1，右側依序 2、3，餘角為 4。先對角 4 天花板發向上重力。",
      "A 選角 3 紅光源，抱到角 4 登頂後放牆磚。改對角 3 牆磚發橫向光，把 A 移過去。",
      "角 2 發向上重力；B 先選 A 與角 1 終點紅接收器，登角 2 後放牆磚。",
      "改對角 1 牆磚發橫向光，將 B 移到終點角，紅光接通。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 3"
  },
  {
    "id": "S2-main-4",
    "region": "S2",
    "kind": "main",
    "number": 4,
    "title": "Lateral Thinking",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_3/south_2_3.htm"
      }
    ],
    "actions": [
      "連接器接紅光源與紅接收器，開入口門。跳上右側重力牆，走到紫屏房取方塊，再抱它落地壓板。",
      "抱連接器回重力牆，走到內側紅接收器牆邊，利用側緣看見藍光源與另一藍接收器。",
      "選這兩個藍色目標，把連接器穩放牆面凸塊上；通路打開後進房，在重力牆上啟動輪盤。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 4"
  },
  {
    "id": "S2-main-5",
    "region": "S2",
    "kind": "main",
    "number": 5,
    "title": "Recycling",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_4/south_2_4.htm"
      }
    ],
    "actions": [
      "走重力牆取方塊，帶回壓第一風扇板，搭風越牆。重力轉換器壓門板，取連接器。",
      "重力轉換器改壓內風扇板，抱連接器飛回外側；連接器選藍光源、隔窗藍接收器，放外風扇板。",
      "抱方塊飛回內側壓門板；重力轉換器隔窗對外側地磚發橫向光，把連接器吸過去。",
      "帶轉換器進下一房，改對天花板發向上重力，抬高連接器。",
      "轉換器壓最後門板，前進。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 5"
  },
  {
    "id": "S2-main-6",
    "region": "S2",
    "kind": "main",
    "number": 6,
    "title": "Other Side",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_4/south_2_4.htm"
      }
    ],
    "actions": [
      "鑽孔器鑽右牆並壓入口板，把重力轉換器遞過孔。",
      "繞紫屏到另一側；重力轉換器壓內側板，向洞口發橫向重力，目標是對面的重力牆。",
      "回入口拿鑽孔器，保持洞口對準光束，自己連同設備進入重力光束，被帶到對面牆上。",
      "將鑽孔器留在牆面，回地面取重力轉換器；兩台各壓終點一板。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 6"
  },
  {
    "id": "S2-main-7",
    "region": "S2",
    "kind": "main",
    "number": 7,
    "title": "Delivery",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_4/south_2_4.htm"
      }
    ],
    "actions": [
      "拆扇葉換下門板上的連接器；連接器接紅光源開重力房。方塊換重力轉換器。",
      "先橫向、再向下發射重力，將牆上第二方塊移入重力房地面。",
      "重力轉換器換壓門板，取扇葉裝回風扇；第二方塊放風扇上。",
      "連接器選紅光源與終點紅接收器，放方塊頂，開風升空。",
      "房內取重力轉換器，隔窗把空中設備吸回原先牆上，再換扇葉壓板取出轉換器。",
      "到重力房對上層牆磚發橫向重力，將方塊與連接器吸過來，紅光接通終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 7"
  },
  {
    "id": "S2-main-8",
    "region": "S2",
    "kind": "main",
    "number": 8,
    "title": "Step and Release",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_5/south_2_5.htm"
      }
    ],
    "actions": [
      "拆扇葉，走重力牆換重力轉換器。對蓄能器發橫向重力，一台設備壓板、自己踩另一板，把蓄能器吸出。",
      "改向天花板發重力；抱蓄能器走牆換扇葉，再抱扇葉登頂換干擾器。",
      "干擾器壓左板；重力轉換器換回蓄能器，放右板。干擾器同時開紅光源門；自己踩右板，讓蓄能器充紅。",
      "蓄能器換回重力轉換器，建立上天花板光束；干擾器換回扇葉，裝風扇。",
      "重力轉換器再換紅蓄能器；留在重力牆上接風扇紅接收器，放穩後下樓搭風。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 正規 8"
  },
  {
    "id": "S2-lost-1",
    "region": "S2",
    "kind": "lost",
    "number": 1,
    "title": "Question Block",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_2/south_2_2.htm"
      }
    ],
    "actions": [
      "重力轉換器先把高處方塊橫向吸到外側牆磚，再向下吸到地面，放風扇上。",
      "對內房上層牆磚發橫向重力並壓風扇板；自己搭風，把方塊頂進光束。",
      "改向內房地磚發向下重力，將方塊吸落；繞紫屏進去，用方塊壓門板。",
      "帶重力轉換器進門，對終點上方重力磚發橫向光；方塊移光束下當墊腳石，跳入光束，落到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · Lost 1"
  },
  {
    "id": "S2-lost-2",
    "region": "S2",
    "kind": "lost",
    "number": 2,
    "title": "Stowaway",
    "stepId": "region-s2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_5/south_2_5.htm"
      }
    ],
    "actions": [
      "重力轉換器壓風扇板，連接器搭風搬上右高台。",
      "改發朝左高台的橫向重力；抱連接器從右高台進光束到左側，接紅光源、方塊房接收器並壓板。",
      "方塊先壓風扇板，重力轉換器搭風上右高台；方塊再用風扇送上同一高台。",
      "方塊放高台外緣，重力轉換器發朝左的光束，讓兩件都在光束內，一起移去左高台。",
      "重力轉換器換下壓板上的連接器；方塊墊高連接器，接紅光源與終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · Lost 2"
  },
  {
    "id": "S2-bridge",
    "region": "S2",
    "kind": "bridge",
    "number": 1,
    "label": "S2 · 橋與塔",
    "stepId": "region-s2",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：2 → 3（轉）→ 1 → 4（轉）。",
      "第 2 段：1 → 3（轉）→ 2（轉）→ 4（轉）。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_5/south_2_5.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S2-star-pandora",
    "region": "S2",
    "kind": "star",
    "number": 1,
    "label": "S2 · 星星",
    "stepId": "region-s2",
    "title": "Pandora 星星",
    "actions": [
      "正規 2 Spiderweb 的高處連接器，除終點外再接洞口外的固定接點，把藍光送出。",
      "Lost Question Block 的重力轉換器，對戶外岩石重力磚發向上光束。",
      "從 Lost 後方峽谷爬岩、連搭兩座風扇，取高處 RGB，抱回重力柱登岩台。",
      "洞內反相器接屋頂藍光，產生紅光；岩台 RGB 接屋頂藍光＋洞內紅光，輸出綠光給 Pandora。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_2/south_2_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S2-star-prometheus",
    "region": "S2",
    "kind": "star",
    "number": 1,
    "label": "S2 · 星星",
    "stepId": "region-s2",
    "title": "Prometheus 星星",
    "actions": [
      "Lost Stowaway 對岸水邊是起點；碰光後追到水中央，再進峽谷重力牆構造。",
      "從右側重力磚一路登頂，碰光後跳岩台，再下水。",
      "沿正規 8 後方岩石，過水到正規 1 後方，再爬樹枝間岩石、正規 2 前方岩島。",
      "回交通站入口碰光，再沿站外階梯到 Prometheus，拿星星。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/13_South_2/South_2_5/south_2_5.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S2-gold-1",
    "region": "S2",
    "kind": "gold",
    "number": 1,
    "title": "Outside the Box",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Outside the Box",
        "url": "https://taloswiki.org/wiki/Outside_the_Box",
        "revision": "5390"
      }
    ],
    "actions": [
      "方塊搬上層，放對面重力牆前；用重力轉換器吸過去。",
      "方塊對準反方向牆，重力轉換器放方塊上，使兩件一起移過去。",
      "轉換器帶兩門中間，再把方塊送對面，換反相器。",
      "反相器放牆前吸回來，選紅光源與藍接收器，放對面重力牆前，先容許光被擋。",
      "再把反相器吸向另一側，光線接通；最後對金屬天花板發重力，自己登頂到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S2 · 黃金 1"
  },
  {
    "id": "S3-main-1",
    "region": "S3",
    "kind": "main",
    "number": 1,
    "title": "Centrifuge",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_1/south_3_1.htm"
      }
    ],
    "actions": [
      "先把右側紅光源房的轉換器搬到中央轉盤；轉盤轉半圈，取左房反相器與終點側連接器。",
      "轉盤改成紅光源房與終點房同時可通行。連接器放紅光源房，送紅光到中央。",
      "反相器接紅連接器，輸出到終點藍接收器；轉換器接紅連接器＋藍反相器，輸出到綠接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 1"
  },
  {
    "id": "S3-main-2",
    "region": "S3",
    "kind": "main",
    "number": 2,
    "title": "The Passageway",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_1/south_3_1.htm"
      }
    ],
    "actions": [
      "入口 A 接藍光開第一門。到轉盤轉半圈，讓入口與兩根連接器房可見；把 A 搬轉盤上。",
      "轉盤轉到紅光源與連接器房相通；A 接紅光開門取 B。轉回入口與連接器房相通。",
      "A 搬回入口接藍光源，B 在轉盤上接 A 與另一藍接收器，取 C。",
      "轉盤轉到入口、出口方向；C 在內側接藍光源與入口、後門兩個藍接收器，接手供電。",
      "B 改選紅光源並留轉盤；A 也先放轉盤，將它轉到紅光源與出口相通。",
      "A 搬過已開藍門，接 B 的紅光與最後紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 2"
  },
  {
    "id": "S3-main-3",
    "region": "S3",
    "kind": "main",
    "number": 3,
    "title": "Dismantling",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_2/south_3_2.htm"
      }
    ],
    "actions": [
      "抱方塊站升降台，再把方塊放地面壓板，升到上層。",
      "傳送器移升降台邊緣；下樓抱方塊傳送上來。傳送器放移動平台 A，方塊壓上層第一板，把它送對岸。",
      "傳送到對岸，把傳送器移到平台 B；抱對岸第二方塊跳下，用它壓地面升降台板回上層。",
      "把第一方塊從上層第一板移第二板，平台 B 帶傳送器到終點；走平台 A 看見傳送器後傳送。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 3"
  },
  {
    "id": "S3-main-4",
    "region": "S3",
    "kind": "main",
    "number": 4,
    "title": "Control",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_3/south_3_3.htm"
      }
    ],
    "actions": [
      "A 接藍光源與藍接收器並壓光源房板，進內區取 B。",
      "B 接紅光源與轉盤紅接收器，讓轉盤擺動；等側門打開回外側。",
      "A 改選紅光源、轉盤接收器與鑽孔器房紅接收器，等轉盤轉到能取鑽孔器的位置。",
      "鑽孔器帶進內區，鑽轉盤銅牆並壓終點第一板。",
      "B 保留連線移到側門外，接手維持轉盤；A 搬回藍光源房板，選紅光源與轉盤接收器。",
      "B 最後隔孔選藍光源、側門藍接收器與終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 4"
  },
  {
    "id": "S3-main-5",
    "region": "S3",
    "kind": "main",
    "number": 5,
    "title": "Bridging the Gap",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_4/south_3_4.htm"
      }
    ],
    "actions": [
      "連接器 A 接紅光源與移動平台，放階梯邊；平台靠岸時登上去，再取回 A 停住。",
      "站平台上，A 接紅光源與對岸房門紅接收器，放平台頂，取出 B。",
      "B 接紅光源與平台接收器，放平台另一端；A 也改接紅光源與平台，讓平台回終點岸。",
      "兩根連接器各壓終點一板；從岸邊取另一根，避免再踏上平台。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 5"
  },
  {
    "id": "S3-main-6",
    "region": "S3",
    "kind": "main",
    "number": 6,
    "title": "Displacement",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_4/south_3_4.htm"
      }
    ],
    "actions": [
      "反相器隔柵欄接紅光源與藍接收器，放軌道旁。踩板等移動房前進並鎖住。",
      "走進移動房，從內側拿反相器；房間退回，帶你進紅光源區。",
      "反相器接紅光源、內側藍接收器，取蓄能器充藍。",
      "藍蓄能器接外側藍接收器，放軌道間靠梯處；自己爬梯出去踩板，把房間再拉前。",
      "站室外從梯旁取蓄能器，帶去終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 6"
  },
  {
    "id": "S3-main-7",
    "region": "S3",
    "kind": "main",
    "number": 7,
    "title": "Above",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · Above 圖文",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_4/south_3_4.htm"
      }
    ],
    "actions": [
      "搭地面風扇上屋頂，反相器壓風扇板，再搭風到上層取鑽孔器。",
      "抱鑽孔器搭移動平台去對岸，再搭風到終點高台。",
      "鑽孔器開對面銅牆並壓板；抱終點連接器搭平台回原側屋頂，隔孔選終點藍接收器，放屋頂。",
      "反相器放移動平台，選另一同步移動平台的紅光源與屋頂連接器；兩平台一同移動時維持紅入藍出。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 7",
    "researchNote": "原文誤把鑽孔器稱為 Gravshifter；已核對 Talos_2_2309、2312、2313 圖，實際為 Driller。"
  },
  {
    "id": "S3-main-8",
    "region": "S3",
    "kind": "main",
    "number": 8,
    "title": "Preliminary",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_5/south_3_5.htm"
      }
    ],
    "actions": [
      "A 接紅光源與入口紅接收器。取轉盤內 C，也接這兩個目標，放外側樹旁，換下 A。",
      "轉盤左轉一次；A 改選藍光源，隔入口窗口接轉盤藍接收器。",
      "B 先選終點紅接收器，抱過可通行兩側到紫屏另一邊，再選外側 C，放轉盤出口邊。",
      "轉盤再左轉一次。保留連線移 A 到 C 附近，讓藍光接通轉盤，從紫屏繞回走向終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 正規 8"
  },
  {
    "id": "S3-lost-1",
    "region": "S3",
    "kind": "lost",
    "number": 1,
    "title": "Transfer",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_3/south_3_3.htm"
      }
    ],
    "actions": [
      "搭內側風扇取高台連接器 B；隔紫屏旁左窗口選外側紅光源，放窗口左側。",
      "A 在入口內側接 B 與後門紅接收器，開門取重力轉換器。",
      "重力轉換器隔最左窗，對滑動重力牆發橫向光，讓光束經風扇上方。",
      "保留連線拿 B 搭風進光束，放滑動牆面。按中央開關移牆，再對另一側重力牆發光，把 B 移過去。",
      "A 保留連線移灌木旁，恢復後門供電。到另一側牆取 B，保留紅光源連線，加選終點紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · Lost 1",
    "researchNote": "已核對 Talos_2_2213 圖的發光紅色光源；正文把 emitter 寫為 receiver，已依畫面修正。"
  },
  {
    "id": "S3-lost-2",
    "region": "S3",
    "kind": "lost",
    "number": 2,
    "title": "Convolution",
    "stepId": "region-s3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_2/south_3_2.htm"
      }
    ],
    "actions": [
      "A 在紅光源門板上接紅光源與入口紅接收器，取 B。B 隔窗選蓄能器及其門藍接收器。",
      "A 改接藍光源與 B，放升降台。自己踩升降板，抬 A 替蓄能器充藍。",
      "B 保留連線再選藍蓄能器；再次抬 A，使蓄能器接手供電。A 取下改回紅光源門板，打開入口。",
      "進蓄能器房拿它，從側窗接房門藍接收器；B 搬到內側，接蓄能器與終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · Lost 2"
  },
  {
    "id": "S3-bridge",
    "region": "S3",
    "kind": "bridge",
    "number": 1,
    "label": "S3 · 橋與塔",
    "stepId": "region-s3",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：1（轉）→ 2（轉）→ 3（轉）→ 4。",
      "第 2 段：1 → 2（轉）→ 4 → 3。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_5/south_3_5.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S3-star-sphinx",
    "region": "S3",
    "kind": "star",
    "number": 1,
    "label": "S3 · 星星",
    "stepId": "region-s3",
    "title": "Sphinx 星星",
    "actions": [
      "開三處開關：正規 1 建築南側突出走道、正規 2 東側外牆、正規 5 附近 Trevor 終端隔池對面。",
      "回上層正規 3、4 之間的 Sphinx 拿星星。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · S3 雕像",
        "url": "https://taloswiki.org/wiki/Circular_Oasis#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S3-star-pandora",
    "region": "S3",
    "kind": "star",
    "number": 1,
    "label": "S3 · 星星",
    "stepId": "region-s3",
    "title": "Pandora 星星",
    "actions": [
      "正規 2 入口內側，連接器接藍光源與塔頂藍接收器，放紫屏旁。",
      "轉盤左轉一次到 B、C 相通，取兩根連接器放轉盤；右轉回 C、D。一根接紅光源留轉盤中央。",
      "另一根站第一門內側，接轉盤紅光與塔頂固定連接器，放到紅光可通的位置。",
      "正規 3 完成後取隱藏連接器，放升降台，方塊壓板帶上樓；從第一壓板附近接塔頂紅光與 Pandora。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/14_South_3/South_3_3/south_3_3.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "S3-gold-1",
    "region": "S3",
    "kind": "gold",
    "number": 1,
    "title": "Thrust Vector",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Thrust Vector",
        "url": "https://taloswiki.org/wiki/Thrust_Vector",
        "revision": "4442"
      }
    ],
    "actions": [
      "A 接紅光源與凹室平台紅接收器，確保平台伸出仍持續供電；B 搬上層第一門前。",
      "回下層，A 改選藍光源、平台紅接收器、第二門紅接收器、第三門藍接收器，放平台邊緣。",
      "爬梯上樓；B 選紅光源、第一門紅接收器與 A。平台移動時兩道紅門會短暫開啟，趁此穿過。",
      "平台把 A 推下後，第二紅門關、最後藍門開，走終點。"
    ],
    "verificationStatus": "consensus",
    "label": "S3 · 黃金 1"
  },
  {
    "id": "W1-main-1",
    "region": "W1",
    "kind": "main",
    "number": 1,
    "title": "Servitor",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Servitor",
        "url": "https://taloswiki.org/wiki/Servitor",
        "revision": "5411"
      }
    ],
    "actions": [
      "踩移動平台翻過柵欄，取連接器，搭風回室外。",
      "移開原連接器，讓平台停在壓板上，再斷電。",
      "A 選藍光源，放平台頂。B 到第二房，隔窗接紅光驅動平台，移到能看見 A 的位置就停。",
      "B 改接 A 的藍光與終點藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 1"
  },
  {
    "id": "W1-main-2",
    "region": "W1",
    "kind": "main",
    "number": 2,
    "title": "Supportive Apparatus",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Supportive Apparatus",
        "url": "https://taloswiki.org/wiki/Supportive_Apparatus",
        "revision": "5506"
      }
    ],
    "actions": [
      "連接器 A 隔窗選紅光源、第一接收器與移動平台。",
      "自己踩室外板讓平台出來；A 換壓板，拿平台方塊換下 A。",
      "A 接紅光源與第二接收器，放平台上；必要時先調整平台位置。",
      "拿出 B，隔窗驅動平台到最遠端。",
      "方塊移牆角，B 站方塊上，接平台 A 的紅光與終點接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 2"
  },
  {
    "id": "W1-main-3",
    "region": "W1",
    "kind": "main",
    "number": 3,
    "title": "Automatic Doors",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Automatic Doors",
        "url": "https://taloswiki.org/wiki/Automatic_Doors",
        "revision": "5419"
      }
    ],
    "actions": [
      "反相器選紅接收器與移動平台。",
      "到第三房拿連接器，先選終點紅接收器，抱回第二房再選藍光源、藍接收器與反相器。",
      "確認共四個目標，放平台上；等它打開藍門就進內室。",
      "平台繼續移動，等紅色終點門打開後完成。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 3"
  },
  {
    "id": "W1-main-4",
    "region": "W1",
    "kind": "main",
    "number": 4,
    "title": "Surfing",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Surfing",
        "url": "https://taloswiki.org/wiki/Surfing",
        "revision": "5412"
      }
    ],
    "actions": [
      "先驅動平台停在藍光源與左接收器之間；連接器放平台上開門，搬出方塊。",
      "再驅動平台壓板，用方塊墊高連接器，開右房取扇葉與另一根連接器。",
      "裝扇葉；一根連接器選藍光源與遠處終點藍接收器，放平台上。",
      "驅動平台到風扇，讓它被抬高。另一根開右房門，沿已開通路到終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 4"
  },
  {
    "id": "W1-main-5",
    "region": "W1",
    "kind": "main",
    "number": 5,
    "title": "Nuisance",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/16_West_1/West_1_3/west_1_3.htm"
      }
    ],
    "actions": [
      "A 接紅光源與第一門紅接收器，放入口門正前方，能照進第二房。",
      "B 放白色移動軌道旁，同選 A、紅色移動平台、隔兩道紫屏的紅接收器。",
      "紅光開風扇房門，同時驅動平台往返擋光。趁門開跑進去，站上風扇等待。",
      "平台擋光時門關、風扇啟動，把你吹過終點柵欄。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 5"
  },
  {
    "id": "W1-main-6",
    "region": "W1",
    "kind": "main",
    "number": 6,
    "title": "Elements",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Elements",
        "url": "https://taloswiki.org/wiki/Elements",
        "revision": "5421"
      }
    ],
    "actions": [
      "驅動藍色平台到風扇後斷電。連接器選室外藍光源、藍接收器，放藍平台上；暫時被擋住正常。",
      "開開關讓藍平台升高。",
      "另一根連接器從小房角落驅動紅平台；紅平台飛起後再托高藍平台，接通終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 6"
  },
  {
    "id": "W1-main-7",
    "region": "W1",
    "kind": "main",
    "number": 7,
    "title": "Breach",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Breach",
        "url": "https://taloswiki.org/wiki/Breach",
        "revision": "5418"
      }
    ],
    "actions": [
      "連接器把藍光送固定連接器，開外門取蓄能器。",
      "蓄能器充藍，選兩個藍接收器，後面都保持這組。",
      "連接器改選固定連接器與移動平台，暫時不供電。",
      "自己踩室外板，等平台到盡頭再離開；把連接器放壓板，固定連接器改為紅光。",
      "紅、藍接收器同時啟動，內門打開；踩平台登終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 7"
  },
  {
    "id": "W1-main-8",
    "region": "W1",
    "kind": "main",
    "number": 8,
    "title": "Transference",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Transference",
        "url": "https://taloswiki.org/wiki/Transference",
        "revision": "5420"
      }
    ],
    "actions": [
      "鑽孔器放偏右開牆，留下左側設備空間。入口連接器換傳送器，隔孔放入並傳送。",
      "內室連接器選平台，放壓板開門；傳送器換回連接器，在室外隔孔送光給內側連接器。",
      "等平台壓到內室板，斷電；室外設備再換傳送器，隔孔傳送進去。",
      "踩平台上高台，把傳送器放室外能看見的邊緣。",
      "爬梯回外側，抱鑽孔器從左角傳送上高台，鑽終點牆；遞傳送器進去再傳送。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 正規 8"
  },
  {
    "id": "W1-lost-1",
    "region": "W1",
    "kind": "lost",
    "number": 1,
    "title": "Jailbreak",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Jailbreak",
        "url": "https://taloswiki.org/wiki/Jailbreak",
        "revision": "5415"
      }
    ],
    "actions": [
      "A 接藍光源與第二房藍接收器，放平台上。B 接第一房外紅接收器與固定連接器，驅動平台到第三房。",
      "平台壓板時，用連接器換壓該板；從外側驅動平台，自己到第四房踩板讓它進來。",
      "回第三房，連接器選平台並壓板；外側另一根接光源、第三房連接器與盡頭紅接收器，放平台上。",
      "自己踩板讓平台走出，開始橫移後離開板。取下平台連接器，踩平台登終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · Lost 1"
  },
  {
    "id": "W1-lost-2",
    "region": "W1",
    "kind": "lost",
    "number": 2,
    "title": "Vertical Locomotion",
    "stepId": "region-w1",
    "sources": [
      {
        "title": "Talos Wiki · Vertical Locomotion",
        "url": "https://taloswiki.org/wiki/Vertical_Locomotion",
        "revision": "5416"
      }
    ],
    "actions": [
      "連接器選藍光源與平台，放壓板啟動風扇；搭風傳送上層，傳送器移邊緣。",
      "下樓抱連接器傳送上去，從側邊驅動平台越過壓板。",
      "自己或連接器壓板，讓平台進內室後斷電；連接器留壓板。",
      "抱傳送器踩平台登高，放上方其中一板。",
      "回去抱連接器，自己站壓板傳送上去，把連接器壓另一板。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · Lost 2"
  },
  {
    "id": "W1-bridge",
    "region": "W1",
    "kind": "bridge",
    "number": 1,
    "label": "W1 · 橋與塔",
    "stepId": "region-w1",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：3（轉）→ 8（轉）→ 1（轉）→ 2 → 4 → 5（轉）→ 6（轉）→ 7（轉）。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/16_West_1/West_1_4/west_1_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W1-star-prometheus",
    "region": "W1",
    "kind": "star",
    "number": 1,
    "label": "W1 · 星星",
    "stepId": "region-w1",
    "title": "Prometheus 星星",
    "actions": [
      "正規 6 Elements：方塊／移動平台帶你升到風扇上方，碰天花板光團。",
      "依序追到題外、正規 5 與 6 之間終端、交通系統軌道、雕像前。軌道上用走路與跳躍，避免衝刺掉下。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · W1 雕像",
        "url": "https://taloswiki.org/wiki/Western_Delta#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W1-star-sphinx",
    "region": "W1",
    "kind": "star",
    "number": 1,
    "label": "W1 · 星星",
    "stepId": "region-w1",
    "title": "Sphinx 星星",
    "actions": [
      "到正規 6 後方找八根石柱。從和雕像圖樣相同的方向看，左到右按下第 3、5、7、8 根，其餘留原位。回 Sphinx 拿星星。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/16_West_1/West_1_4/west_1_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W1-gold-1",
    "region": "W1",
    "kind": "gold",
    "number": 1,
    "title": "The Mule",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · The Mule",
        "url": "https://taloswiki.org/wiki/The_Mule",
        "revision": "5507"
      }
    ],
    "actions": [
      "傳送器放平台；連接器選紅光源、門紅接收器與側邊固定連接器。開開關，自己踩板送平台到盡頭。",
      "隔窗傳送，取鑽孔器開終點對面銅牆，鑽孔器放平台；傳送器隔孔遞入並傳送。",
      "回板上送平台到最左，關開關；取鑽孔器開藍光源旁牆，傳送器遞入，抱鑽孔器隔側柵傳送。",
      "再次鑽牆並壓板，將傳送器遞孔後傳送。",
      "傳送器放平台，開開關、踩板送到最右；抱連接器傳送，接藍光源與藍接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "W1 · 黃金 1"
  },
  {
    "id": "W2-main-1",
    "region": "W2",
    "kind": "main",
    "number": 1,
    "title": "Universal Activation",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_1/west_2_1.htm"
      }
    ],
    "actions": [
      "藍啟動器接藍光源，範圍罩住 A 門，取紅啟動器。",
      "紅啟動器隔 B 門選紅光源，放到範圍能罩 B 門的位置。",
      "藍啟動器保留連線移到能啟動紅設備的位置，使紅設備接手維持 B 門。",
      "藍啟動器拿去壓終點板。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 1"
  },
  {
    "id": "W2-main-2",
    "region": "W2",
    "kind": "main",
    "number": 2,
    "title": "Chain Reaction",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_1/west_2_1.htm"
      }
    ],
    "actions": [
      "藍啟動器 A 接光源開第一柵欄，拿 B 放第三房柵欄旁。",
      "A 移入口右牆，範圍覆蓋 B，讓 B 開第三房取 C。",
      "C 搬回第一柵欄，A 也移回開入口；C 帶入第二房，接光源並從內側維持入口。",
      "A 帶入 C 的範圍內，延伸到第三房外；B 移到 A 範圍內，再延伸罩住終點柵欄。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 2"
  },
  {
    "id": "W2-main-3",
    "region": "W2",
    "kind": "main",
    "number": 3,
    "title": "Permeability",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_1/west_2_1.htm"
      }
    ],
    "actions": [
      "A 接藍光源，靠牆罩住梯邊；爬梯進房，B 放 A 範圍內接力開門。",
      "搬鑽孔器出門，鑽開藍光源前銅牆；A 改成光線穿孔仍能維持開門的位置。",
      "把 B 隔孔送進藍光源房，繞紫屏過去，接藍光源並放右角牆邊。",
      "A 搬到終點門角落，放進 B 範圍，使它接力開終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 3"
  },
  {
    "id": "W2-main-4",
    "region": "W2",
    "kind": "main",
    "number": 4,
    "title": "Conveyance",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_2/west_2_2.htm"
      }
    ],
    "actions": [
      "干擾器開入口，啟動器在內側窗口選藍光源。干擾器隔窗改開光源門，讓啟動器同時維持兩門。",
      "干擾器改開連接器房，取連接器，接藍光源與光源門接收器。",
      "啟動器改接藍連接器，移到移動平台柵欄，放平台出來。",
      "平台走出範圍停住後，啟動器放平台上，跟著平台開終點柵欄。",
      "平台進終點時，用干擾器停住平台，保持柵欄開啟。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 4"
  },
  {
    "id": "W2-main-5",
    "region": "W2",
    "kind": "main",
    "number": 5,
    "title": "Balance",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/west_2_3.htm"
      }
    ],
    "actions": [
      "連接器接藍光源與高台啟動器；搭左風扇拿下啟動器，移到方塊房開門。",
      "兩方塊各放一座風扇；連接器選藍光源，放右方塊上。",
      "啟動器選連接器；自己踩左方塊，將啟動器放地上開風扇，登中央高台。",
      "從高台拿上左方塊，右方塊升起時拿其連接器，保留藍光源連線放高台方塊上。",
      "下樓拿啟動器，接高處連接器，移到終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 5"
  },
  {
    "id": "W2-main-6",
    "region": "W2",
    "kind": "main",
    "number": 6,
    "title": "Ascent",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/west_2_3.htm"
      }
    ],
    "actions": [
      "藍啟動器接光源，靠入口角罩住內房；過紫屏，紅啟動器放藍設備範圍內，延伸開方塊門。",
      "方塊搬到入口風扇，藍啟動器疊方塊上，連同設備送過入口。",
      "取藍啟動器到內側紫屏邊，罩住方塊門並靠近下一門；紅啟動器接力罩下一門。",
      "方塊先壓內側板。藍啟動器移白管彎角，維持門但暫時不要罩終點風扇。",
      "方塊移終點風扇；自己抱紅啟動器踩上方塊，再把紅設備放藍設備範圍內，接力啟動風扇上高台。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 6"
  },
  {
    "id": "W2-main-7",
    "region": "W2",
    "kind": "main",
    "number": 7,
    "title": "Closed Off",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_3/west_2_3.htm"
      }
    ],
    "actions": [
      "入口啟動器保留連線移到岩石角，罩住入口與干擾器房，取干擾器。",
      "干擾器從外側維持入口。啟動器搬外側，改選干擾器房藍光源，範圍罩它的房門與終點房門。",
      "干擾器改開光源房，讓啟動器接手維持兩門。",
      "干擾器搬終點房，從內側維持門；啟動器移風扇旁。",
      "干擾器隔窗重新開光源房，啟動器通電啟動風扇。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 7"
  },
  {
    "id": "W2-main-8",
    "region": "W2",
    "kind": "main",
    "number": 8,
    "title": "Backwards",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_4/west_2_4.htm"
      }
    ],
    "actions": [
      "第一方塊放入口風扇。爬梯進內側，把啟動器放第二風扇旁，範圍罩住方塊門與第二風扇。",
      "回入口，連接器選藍光源與啟動器，放第一方塊頂；自己踩板，第二方塊被吹出房。",
      "爬梯進去，把第二方塊放入口門內、梯旁；啟動器選藍光源，放該方塊上。",
      "回入口再次踩板，使啟動器接通並維持入口門；從內側拿走它下面方塊，不移啟動器。",
      "第二方塊搬入口風扇板，維持第一方塊升空。啟動器最後保留連線移終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 正規 8"
  },
  {
    "id": "W2-lost-1",
    "region": "W2",
    "kind": "lost",
    "number": 1,
    "title": "Slide",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_5/west_2_5.htm"
      }
    ],
    "actions": [
      "第一方塊放風扇；A 選藍光源與內側啟動器，放方塊頂。B 同選光源、啟動器與 A，放風扇板。",
      "爬梯進內側，啟動器移方塊房，取第二方塊放牆邊風扇；啟動器再移入口門旁維持開門。",
      "回外側拆扇葉讓 A 降下，保留連線搬 A 到內側風扇旁牆上，讓它看得見入口風扇。",
      "B 移開板，裝回扇葉；B 放入口方塊上。爬梯進內側，把啟動器放第二方塊上。",
      "回外側踩風扇板，B 升空供電，使內風扇把第二方塊與啟動器吹出。拿啟動器接藍光源，移終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · Lost 1"
  },
  {
    "id": "W2-lost-2",
    "region": "W2",
    "kind": "lost",
    "number": 2,
    "title": "Two of Three",
    "stepId": "region-w2",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_2/west_2_2.htm"
      }
    ],
    "actions": [
      "啟動器接藍光源，放光源門壓板右側，範圍涵蓋光源門與連接器門；自己踩板讓它通電。",
      "拿連接器，到紫屏邊選藍光源、啟動器與內側反相器。",
      "啟動器保留連線移兩門間柵欄角，讓範圍同時涵蓋全部三道門；再踩光源板啟動。",
      "進去取反相器，保留藍色輸入，加選紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · Lost 2"
  },
  {
    "id": "W2-bridge",
    "region": "W2",
    "kind": "bridge",
    "number": 1,
    "label": "W2 · 橋與塔",
    "stepId": "region-w2",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：1 → 2 → 4（轉）→ 3。",
      "第 2 段：1 → 2（轉）→ 4（轉）→ 3。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_5/west_2_5.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W2-star-pandora",
    "region": "W2",
    "kind": "star",
    "number": 1,
    "label": "W2 · 星星",
    "stepId": "region-w2",
    "title": "Pandora 星星",
    "actions": [
      "正規 4 Conveyance：入口連接器接藍光源與戶外石頭耳朵上的固定接點。",
      "把題內啟動器移藍光源房右牆邊，範圍開啟建築外側的鑽孔器房，出去取鑽孔器。",
      "沿正規 5 → 6 路線走到池塘、巨像手臂階梯旁，鑽岩壁銅牆，取出另一啟動器。",
      "抱啟動器回 Pandora，接岩石固定接點的藍光，放像底，讓範圍罩住雕像。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/17_West_2/West_2_2/west_2_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W2-star-prometheus",
    "region": "W2",
    "kind": "star",
    "number": 1,
    "label": "W2 · 星星",
    "stepId": "region-w2",
    "title": "Prometheus 星星",
    "actions": [
      "從正規 8 往終端走，再上正規 2 上方，找到起點。",
      "依序追風扇旁、交通站到正規 3 的階梯、黃金門下方、正規 8 到 7 的路、正規 6 右側崖壁。",
      "最後跟光團跳下崖，落到 Prometheus 前，碰最後光團拿星星。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · W2 雕像",
        "url": "https://taloswiki.org/wiki/Anthropic_Hills#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W2-gold-1",
    "region": "W2",
    "kind": "gold",
    "number": 1,
    "title": "Hollow",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Hollow",
        "url": "https://taloswiki.org/wiki/Hollow",
        "revision": "4487"
      }
    ],
    "actions": [
      "RGB 接紅＋藍，輸出綠光給綠啟動器，開外門；綠設備移內門旁。",
      "紅啟動器接紅光源，範圍同時涵蓋外門與綠設備。RGB 換連接器，搬到外側牆角、紫屏旁。",
      "紅啟動器接連接器，移到開內門的位置；綠啟動器換 RGB，搬出去。",
      "紅啟動器在外房重新調位，直接加選紅光源維持自供電。",
      "連接器改接藍光源與藍接收器，開走廊第一門；RGB 接紅光源＋藍連接器，輸出到兩個綠接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "W2 · 黃金 1"
  },
  {
    "id": "W3-main-1",
    "region": "W3",
    "kind": "main",
    "number": 1,
    "title": "From Within",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_1/west_3_1.htm"
      }
    ],
    "actions": [
      "巷道取干擾器，開連接器房；連接器在房內接藍光源與藍接收器。",
      "帶干擾器回兩座風扇的巷道，隔窗干擾同一道門，使藍光重新通過，走終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 1"
  },
  {
    "id": "W3-main-2",
    "region": "W3",
    "kind": "main",
    "number": 2,
    "title": "Chicken Flight",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_1/west_3_1.htm"
      }
    ],
    "actions": [
      "抱 A 搭入口風扇進紫屏區；A 接紅光源與室外紅接收器，放內側風扇上，打開室外門。",
      "B 帶到已開門內窗口，接 A 與內側風扇紅接收器，將 A 吹到牆後，解除擋路風扇。",
      "B 取下改壓最後壓板，走終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 2"
  },
  {
    "id": "W3-main-3",
    "region": "W3",
    "kind": "main",
    "number": 3,
    "title": "Precision",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_1/west_3_1.htm"
      }
    ],
    "actions": [
      "連接器選藍光源與三個藍接收器：終點門、風扇、擋住風扇前方的門。",
      "把它放在風扇正前方，自己站側邊，避免一起被吹走。",
      "前門開啟，風扇將連接器吹到窗口前，光線穿窗打開終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 3"
  },
  {
    "id": "W3-main-4",
    "region": "W3",
    "kind": "main",
    "number": 4,
    "title": "Duality",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_2/west_3_2.htm"
      }
    ],
    "actions": [
      "A 接藍光源開第一門；B 從內側窗口接藍光源與 A。",
      "A 清除原連線，改選 B 與紅、藍兩個接收器。",
      "B 清除原連線，改選內房紅光源與 A；光色切紅，終點門打開。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 4"
  },
  {
    "id": "W3-main-5",
    "region": "W3",
    "kind": "main",
    "number": 5,
    "title": "Rerouting",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_2/west_3_2.htm"
      }
    ],
    "actions": [
      "A 隔窗接紅光源與第一紅接收器，放到後面兩扇窗口也看得見的位置。",
      "B 在第二窗前，同選紅光源、第一及第二紅接收器、A，讓它接手第一門供電。",
      "A 清除原連線，改接 B 與第二紅接收器，暫開下一門，讓 B 的光到達並接手。",
      "A 再帶過門，隔第二窗接 B 與最後紅接收器。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 5"
  },
  {
    "id": "W3-main-6",
    "region": "W3",
    "kind": "main",
    "number": 6,
    "title": "Mobile Instruments",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_3/west_3_3.htm"
      }
    ],
    "actions": [
      "連接器接藍光源與方塊房藍接收器，取方塊放風扇；自己站方塊上開風，登高取托盤。",
      "下樓關風，連接器保留連線加選終點藍接收器，放方塊頂，再開風。",
      "拿托盤進氣流，從下方托起空中的方塊與連接器。",
      "托著整組走入方塊房，到窗口放下，兩條藍光接通。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 6"
  },
  {
    "id": "W3-main-7",
    "region": "W3",
    "kind": "main",
    "number": 7,
    "title": "Gateway Switch",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_3/west_3_3.htm"
      }
    ],
    "actions": [
      "干擾器隔窗開藍光源門；先維持入口可進，連接器接紅光源與入口紅接收器。",
      "干擾器改開藍光源門；連接器保留紅線搬窗口外，干擾器也取出到大房。",
      "連接器同選紅、藍光源與所有接收器，放到各光源都經自己房門才能照到的位置。",
      "干擾藍光源門，待藍門保持開啟，抱干擾器過第一藍門。",
      "從窗口改干擾紅光源門，光色切紅後過紅門；下一窗口再改藍光源門，最後用干擾器開終點門。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 7"
  },
  {
    "id": "W3-main-8",
    "region": "W3",
    "kind": "main",
    "number": 8,
    "title": "Photon Sail",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_4/west_3_4.htm"
      }
    ],
    "actions": [
      "連接器接紅光源與第一風扇門紅接收器，靠方塊交換台放；搭第一風扇進柵欄。",
      "方塊墊柵欄旁，隔欄取連接器換第二方塊，將第二方塊遞外面；踩方塊翻出，再將內側方塊換回連接器。",
      "連接器重新開風扇門；拆第一風扇扇葉，站外側方塊隔欄換最後方塊，兩方塊都在外面。",
      "一方塊放第二風扇，抱連接器站上去，把連接器放壓板，升到左高台；拿方塊上來放橫向紫屏。",
      "第二方塊同法搬上來。站在方塊上，交替把另一方塊往前放、跳過去、取回後方方塊，一路走過紫屏。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 正規 8"
  },
  {
    "id": "W3-lost-1",
    "region": "W3",
    "kind": "lost",
    "number": 1,
    "title": "Alternator",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_3/west_3_3.htm"
      }
    ],
    "actions": [
      "左連接器 A 同選紅光源、藍光源、紅接收器與藍接收器，放升降柵欄前，使藍光穿兩根柱子之間。",
      "右連接器 B 接藍光源與藍接收器，位置讓 A 輸出的紅光會切斷通往 B 的藍光束。",
      "柵欄降下時 A 收到兩色而停止，B 輸出藍光開第一門；升起時 A 改輸出紅光開第二門。",
      "自己過紫屏，等第一門開先進去，再等第二門開走終點。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · Lost 1"
  },
  {
    "id": "W3-lost-2",
    "region": "W3",
    "kind": "lost",
    "number": 2,
    "title": "Hexahedral Stacking",
    "stepId": "region-w3",
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文解法",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_2/west_3_2.htm"
      }
    ],
    "actions": [
      "連接器接藍光源與藍接收器開第一門；把外側方塊搬入，疊在內側方塊上，擋住紅光源。",
      "連接器保留藍線，加選紅光源，放窗口前；紅光暫被方塊擋，第一門仍開。",
      "走入第一門拿走上層方塊，紅光照到連接器後兩色輸入互相抵消，第一門關、第二門開。",
      "抱方塊走第二門，墊到終點高台旁跳上去。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · Lost 2"
  },
  {
    "id": "W3-bridge",
    "region": "W3",
    "kind": "bridge",
    "number": 1,
    "label": "W3 · 橋與塔",
    "stepId": "region-w3",
    "title": "通往塔的拼塊橋",
    "actions": [
      "第 1 段：4 → 2（轉）→ 1 → 3（轉）。",
      "第 2 段：4 → 3 → 1 → 2（轉）。",
      "完成後進塔，搭紫色升降柱上去啟動光束，再回交通站前往下一區。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_4/west_3_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W3-star-sphinx",
    "region": "W3",
    "kind": "star",
    "number": 1,
    "label": "W3 · 星星",
    "stepId": "region-w3",
    "title": "Sphinx 星星",
    "actions": [
      "到正規 8 外、石手上方的階梯旁，從牆上孔洞進入相連走廊，打開隱藏開關。回正規 4 後方山丘的 Sphinx 拿星星。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/18_West_3/West_3_4/west_3_4.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W3-star-prometheus",
    "region": "W3",
    "kind": "star",
    "number": 1,
    "label": "W3 · 星星",
    "stepId": "region-w3",
    "title": "Prometheus 星星",
    "actions": [
      "正規 4 後方爬到巨手指尖，跳碰光團。",
      "依序追正規 5、通往 6 的路、第 6 題內高台；第 6 題要用方塊放風扇搬上台，再墊高碰光。",
      "繼續追通往 7、8 的路與第 8 題兩側，最後回 Prometheus。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · W3 雕像",
        "url": "https://taloswiki.org/wiki/High_Plain#Star_monuments"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "W3-gold-1",
    "region": "W3",
    "kind": "gold",
    "number": 1,
    "title": "Windstream",
    "stepId": "all-puzzles",
    "sources": [
      {
        "title": "Talos Wiki · Windstream",
        "url": "https://taloswiki.org/wiki/Windstream",
        "revision": "4463"
      }
    ],
    "actions": [
      "A 放藍接收器正前方擋光。B 接藍光源與藍接收器，放到光束會被 A 擋的位置，風扇先不啟動。",
      "繞到 A 旁拿起它，藍光恢復、風扇啟動。",
      "A 選紅光源與紅接收器，放風扇正前方；被風吹到後方後，紅光接通。"
    ],
    "verificationStatus": "consensus",
    "label": "W3 · 黃金 1"
  },
  {
    "id": "MEGA-E-green",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "first-megastructure",
    "title": "東側巨構 · 綠光束",
    "actions": [
      "從中央島右側金環搭橋，上樓進紫屏。",
      "鑽開銅牆，隔孔取連接器，同選紅光源與兩個紅接收器，從孔遞回並放穩。",
      "沿兩道已開門下樓，跟電線找到拉桿，啟動綠光束。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/06_Megastructure_East/megastructure_east_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MEGA-E-red",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "first-megastructure",
    "title": "東側巨構 · 紅光束",
    "actions": [
      "從綠光路線回岔路，走另一側階梯與金環到紅光區。",
      "紫屏後反相器選藍接收器；另一側連接器清除原線，改接方塊上的反相器與這台反相器。",
      "兩台反相器經連接器接力，開藍門後到拉桿啟動紅光束。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/06_Megastructure_East/megastructure_east_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MEGA-E-blue",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "first-megastructure",
    "title": "東側巨構 · 藍光束",
    "actions": [
      "從紅光區向下走到有紅、綠接收器的紫屏，進金環搭橋到另一房。",
      "連接器送紅光到橋對面紅接收器；RGB 選紅光源與對面綠接收器。",
      "回橋對面，第二根連接器送藍光給 RGB，使它輸出綠光開門；上樓拉桿啟動藍光。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/06_Megastructure_East/megastructure_east_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MEGA-N-blue",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "north-exit",
    "title": "北側巨構 · 藍光束",
    "actions": [
      "用入口終端 Door override 開門。進中央大廳，跳上重力牆繞到 Byron；他會啟動紅光。",
      "往右金環搭橋，上重力牆與天花板，沿階梯、金環到藍光區。",
      "紫屏內蓄能器充紅，放窗口接紅接收器，取反相器。",
      "反相器接紅蓄能器與藍接收器，同時壓板，通門後拉桿。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/10_Megastructure_North/Structure_North_1/mega_north_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MEGA-N-green",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "north-exit",
    "title": "北側巨構 · 綠光束",
    "actions": [
      "回藍光區外的金環，下樓右轉，沿金環和重力牆走到綠光區。",
      "連接器換鑽孔器，開牆取反相器；鑽孔器換回連接器，一根送紅、反相器送藍，同時開門取干擾器。",
      "干擾器接手開門；反相器換鑽孔器，開綠光束下方銅牆，露出綠接收器。",
      "連接器改接綠光源與綠接收器，通往拉桿。三色接通後跟黃色目標到終端，劇情後循標記撤退。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/10_Megastructure_North/Structure_North_2/mega_north_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MEGA-S-pins",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "prometheus-rescue",
    "title": "南側巨構 · 五根鎖鏈插銷",
    "actions": [
      "正面大拉桿先拉一次，出現 0/5。以下橋塊用各段左上清單原始編號，（轉）表示旋轉到可放置。",
      "插銷 1：環道金環橋 2→3→4（轉）→1（轉），岔路左轉再右轉。下一橋 4→2→1→3（轉），沿樓梯上行，最後橋 2（轉）→1（轉），拔銷。",
      "插銷 2：回第一岔路，走另一側往下的樓梯；連過兩段 2→1 的橋，再上樓拔銷，回環道。",
      "插銷 3：環道下一金環，橋 1→2（轉）→3，再接 4→3（轉）→1（轉）→2（轉）。走重力牆、上下樓梯到三根金柱，左轉搭 1→3（轉）→2（轉），沿重力牆上樓拔銷。",
      "插銷 4：回環道下一橋 1→3→4→2（轉）。右轉下樓，岔路直走搭 2→3→1（轉），和 Yaqut 對話，離開高台等他代解。",
      "插銷 5：回前一岔路左轉，一路下樓到底再右轉，走重力牆與天花板；橋 2→3（轉）→1（轉）→4（轉）。再走右側重力牆，搭紫色升降柱到插銷。",
      "顯示 5/5 後，回正面大拉桿再拉一次，釋放 Prometheus。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/15_Megastructure_South/megastructure_south_1.htm"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/15_Megastructure_South/megastructure_south_2.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MIRANDA",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "主線",
    "stepId": "miranda",
    "title": "Golden Gate · Miranda 的地雷迷宮",
    "actions": [
      "在交通站附近 Golden Gate 找 Cornelius，談完後選擇合作並進機器。",
      "第一段窄道靠右，避開左側地雷；下一房等兩顆地雷離開中央路線，分次通過。",
      "三雷房等左右地雷錯開，先到左柵欄前，再趁右雷通過缺口後進右走廊；末端右轉。",
      "跟著下一顆雷到第一缺口左轉，再右轉；下一缺口等雷通過，再繼續向右。",
      "到雕像房取右側方塊，墊低柵欄翻過去。最後一段等雷向右經過，左轉進房，再沿右側靠近 Miranda 並喚醒她。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/21_Free_Miranda/free_miranda.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-gate",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "入口 · 光線交換",
    "actions": [
      "反相器壓板開門。內房連接器送紅光到牆上交換裝置；回外房用反相器接另一端紅光，輸出藍光開蓄能器房。",
      "蓄能器充藍後換壓板，反相器接它並輸出紅光到終點。內房連接器斷線，再讓外房藍蓄能器照交換裝置；內房連接器把交換來的藍光送終點。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-u1",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Utopia · 第一個輪盤",
    "actions": [
      "先去 Dystopia，用連接器送藍光給牆上交換裝置。",
      "回 Utopia，用反相器把交換來的藍光變紅，開門；鑽孔器壓板維持門，啟動輪盤。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-d1",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Dystopia · 第一個輪盤",
    "actions": [
      "Utopia 反相器先斷線；去 Dystopia 斷連接器，讓交換裝置可反向供電。",
      "回 Utopia，用反相器把內側藍光變紅送交換裝置；Dystopia 連接器接交換來的紅光開門。蓄能器充藍，搬到兩橋後的風扇接收器，搭風啟動輪盤。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-d2",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Dystopia · 第二個輪盤",
    "actions": [
      "踩輪盤旁壓板，看見對岸傳送器就傳送；把它帶上樓留紫屏旁。",
      "下樓把蓄能器清空，從入口紅連接器充紅；抱蓄能器傳送上樓，接紅接收器，啟動輪盤。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-d3",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Dystopia · 第三個輪盤",
    "actions": [
      "進 Utopia 新區重力柱，上天花板取反相器，接紅光源與交換裝置，送藍光。",
      "回 Dystopia，連接器接交換來的藍光開鑽孔器房；鑽牆切換另一身體，啟動輪盤。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-u3",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Utopia · 第三個輪盤",
    "actions": [
      "取出藍啟動器，搬到另一側被柵欄擋住的紫屏前。",
      "回天花板，反相器改接紅光源與啟動器，輸出藍光。",
      "下樓過紫屏，啟動第七個輪盤。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-d4",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Dystopia · 第四個輪盤",
    "actions": [
      "天花板反相器換 RGB；在天花板接紅光源、遠處藍光源與交換裝置，送綠光。",
      "回 Dystopia，連接器選交換來的綠光，隔孔遞另一側，切身體加選綠接收器開門。原身體也過門；一人抱托盤、另一人踩方塊上托盤，再讓下方人踩方塊，疊高到輪盤。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "FINAL-u2",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Utopia · 第二個輪盤",
    "actions": [
      "回 Utopia 天花板，把 RGB 換回反相器。",
      "反相器接先前用過的遠處藍光源，輸出紅光到後方紅接收器；下樓沿新開門啟動第六個輪盤。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus",
    "researchNote": "採圖文攻略的 Dystopia 四輪盤先完成、再回 Utopia 的順序；不混用 Gamepressure 先解 Utopia 第二輪盤的另一套中間狀態。"
  },
  {
    "id": "FINAL-u4",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "最終巨構",
    "stepId": "ending",
    "title": "Utopia · 第四個輪盤",
    "actions": [
      "把 RGB 換回反相器，天花板接紅光源，輸出藍光給啟動器。",
      "啟動器接力開紫屏通路，再保留連線移到另一終點門；啟動最後輪盤。過金環橋登塔，搭電梯到 Athena。"
    ],
    "sources": [
      {
        "title": "Gamepressure · Utopia / Dystopia 圖文",
        "url": "https://www.gamepressure.com/the-talos-principle-2/utopia-and-dystopia/z81114a"
      },
      {
        "title": "Dick Leeuw / Louis Koot · 圖文流程",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/22_Free_Athena/free_athena_1.htm"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "TEXT-goldboom",
    "region": "STORY",
    "kind": "text",
    "number": 1,
    "label": "城市文字遊戲",
    "stepId": "text-adventures",
    "title": "Jefferson Goldboom and the Specter of Modernity",
    "actions": [
      "找 John 問情況，關警報、彈吉他。",
      "和團隊談，問警報原因，查看 John 的發現。",
      "採取行動，等待回覆，帶 John 同行。",
      "對抗現代性幽靈，進機械巢穴，要求解釋。",
      "承認對方有道理並道歉，返回研究所，退出。"
    ],
    "sources": [
      {
        "title": "Margareth · 三部文字冒險成功路線",
        "url": "https://itemlevel.net/the-talos-principle-2-all-text-adventures-solution-text-adventurer-achievement/"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "TEXT-atlantis",
    "region": "STORY",
    "kind": "text",
    "number": 1,
    "label": "城市文字遊戲",
    "stepId": "text-adventures",
    "title": "Ghosts of Atlantis",
    "actions": [
      "開始朝聖，去破塔找魔法師，先選否定自我毀滅的回答。",
      "接著選：Then find another way to witness the Sublime without being annihilated.（那就另找不必自我毀滅，也能見證崇高的方法。）再邀請魔法師同行。",
      "繼續到失落海岸找詩人：不接受死亡、完成偉業，邀請同行。",
      "繼續到貓頭鷹神殿找科學家：真相最重要。",
      "繼續到蛇神殿找醫師：無論未來如何，每條生命都值得救，邀請同行。",
      "繼續到古農田找農夫：答應，邀請同行。",
      "繼續到宮殿找國王：批評凌駕他人與囤積奢侈品，再指出問題在王權本身，邀請同行。",
      "查看並取回馬賽克，請幽靈協助，返回船上、退出。"
    ],
    "sources": [
      {
        "title": "Game Guides Channel · 遊戲終端原文 03:59",
        "url": "https://www.youtube.com/watch?v=pB1VTo02kB4&t=239s"
      },
      {
        "title": "Margareth · 三部文字冒險成功路線",
        "url": "https://itemlevel.net/the-talos-principle-2-all-text-adventures-solution-text-adventurer-achievement/"
      }
    ],
    "verificationStatus": "confirmed",
    "researchNote": "2026-11-03 直接檢視 Game Guides Channel 實玩影片：03:49 底部選項、03:59 終端已選取紀錄均為 without being annihilated；Item Level 的 with 是誤植。英文逐字核對限魔法師這句，其餘路線仍依攻略摘要，並非 PS5 實機驗收。"
  },
  {
    "id": "TEXT-argument",
    "region": "STORY",
    "kind": "text",
    "number": 1,
    "label": "城市文字遊戲",
    "stepId": "text-adventures",
    "title": "Argument Simulator",
    "actions": [
      "呼叫圖書館助理 → 肯定是真的 → 指出明顯不正確 → 表示能反駁 → 尋找彼此共識 → 退出。"
    ],
    "sources": [
      {
        "title": "Margareth · 三部文字冒險成功路線",
        "url": "https://itemlevel.net/the-talos-principle-2-all-text-adventures-solution-text-adventurer-achievement/"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MUSEUM-exercise",
    "region": "STORY",
    "kind": "story",
    "number": 1,
    "label": "博物館",
    "stepId": "museum",
    "title": "Rand 的終端練習",
    "actions": [
      "在博物館左室和 Rand 談完，接下中央終端的測試。",
      "操作左室三台終端中的中央那台，進行文字模擬；一路回答到結束即可，這段沒有需要猜出的成功答案。",
      "回去和 Rand 談，告訴他測試結果，再繼續參觀。"
    ],
    "sources": [
      {
        "title": "Dick Leeuw / Louis Koot · Rand 終端測試",
        "url": "https://mysterymanor.net/walkthroughs/Talos_Principle_2/02_New_Jerusalem_1/jerusalem_1_1.htm"
      },
      {
        "title": "玩家與開發者 · 中央終端",
        "url": "https://steamcommunity.com/app/835960/discussions/0/3936769163102066579/"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MUSEUM-ruins",
    "region": "MUSEUM",
    "kind": "museum",
    "number": 1,
    "label": "可選展示",
    "title": "Land of Ruins",
    "stepId": "museum",
    "actions": [
      "A 選藍光源與藍接收器，放遠處；B 接 A 與同一藍接收器，開門取 C。",
      "C 接紅光源與兩個紅接收器；B 改壓最後壓板。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館重現謎題",
        "url": "https://taloswiki.org/wiki/Museum_of_the_Simulation",
        "revision": "5128"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MUSEUM-death",
    "region": "MUSEUM",
    "kind": "museum",
    "number": 1,
    "label": "可選展示",
    "title": "Land of Death",
    "stepId": "museum",
    "actions": [
      "A 接藍光源與藍接收器，放壓板。",
      "方塊放風扇；B 選藍光源與風扇藍接收器，放方塊頂。",
      "A 先接藍光源與風扇接收器，啟動後由升空的 B 維持；A 改接 B 與終點藍接收器。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館重現謎題",
        "url": "https://taloswiki.org/wiki/Museum_of_the_Simulation",
        "revision": "5128"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MUSEUM-faith",
    "region": "MUSEUM",
    "kind": "museum",
    "number": 1,
    "label": "可選展示",
    "title": "Land of Faith",
    "stepId": "museum",
    "actions": [
      "A 隔窗接紅光源與第一門紅接收器。",
      "B 接紅光源與第二門紅接收器；C 接藍光源，靠第二窗放遠處。",
      "A 改接 C 的藍光與拼塊前藍接收器。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館重現謎題",
        "url": "https://taloswiki.org/wiki/Museum_of_the_Simulation",
        "revision": "5128"
      }
    ],
    "verificationStatus": "consensus"
  },
  {
    "id": "MUSEUM-arranger-1",
    "region": "MUSEUM",
    "kind": "arranger",
    "number": 1,
    "label": "可選拼塊 1",
    "title": "綠色 4 × 4",
    "stepId": "museum",
    "actions": [
      "到博物館後室找對應顏色與尺寸的拼塊盤。",
      "依下圖旋轉並放入拼塊；同一字母是同一塊，全部填滿即可。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館拼塊 1 遊戲畫面",
        "url": "https://taloswiki.org/wiki/File:Museum_of_the_Simulation_-_Arranger_1.jpg"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "AABB",
      "CAAB",
      "CCDB",
      "CDDD"
    ]
  },
  {
    "id": "MUSEUM-arranger-2",
    "region": "MUSEUM",
    "kind": "arranger",
    "number": 2,
    "label": "可選拼塊 2",
    "title": "綠色 4 × 5",
    "stepId": "museum",
    "actions": [
      "到博物館後室找對應顏色與尺寸的拼塊盤。",
      "依下圖旋轉並放入拼塊；同一字母是同一塊，全部填滿即可。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館拼塊 2 遊戲畫面",
        "url": "https://taloswiki.org/wiki/File:Museum_of_the_Simulation_-_Arranger_2.jpg"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "AAAB",
      "ABBB",
      "CCCD",
      "EECD",
      "EEDD"
    ]
  },
  {
    "id": "MUSEUM-arranger-3",
    "region": "MUSEUM",
    "kind": "arranger",
    "number": 3,
    "label": "可選拼塊 3",
    "title": "黃色 8 × 5",
    "stepId": "museum",
    "actions": [
      "到博物館後室找對應顏色與尺寸的拼塊盤。",
      "依下圖旋轉並放入拼塊；同一字母是同一塊，全部填滿即可。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館拼塊 3 遊戲畫面",
        "url": "https://taloswiki.org/wiki/File:Museum_of_the_Simulation_-_Arranger_3.jpg"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "ABBCCDDD",
      "AABBCEDF",
      "GAHICEEF",
      "GHHIIJEF",
      "GGHIJJJF"
    ]
  },
  {
    "id": "MUSEUM-arranger-4",
    "region": "MUSEUM",
    "kind": "arranger",
    "number": 4,
    "label": "可選拼塊 4",
    "title": "黃色 6 × 6",
    "stepId": "museum",
    "actions": [
      "到博物館後室找對應顏色與尺寸的拼塊盤。",
      "依下圖旋轉並放入拼塊；同一字母是同一塊，全部填滿即可。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館拼塊 4 遊戲畫面",
        "url": "https://taloswiki.org/wiki/File:Museum_of_the_Simulation_-_Arranger_4.jpg"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "ABBBCC",
      "AABDCC",
      "AEEDFG",
      "EEHDFG",
      "IIHDFG",
      "IIHHFG"
    ]
  },
  {
    "id": "MUSEUM-arranger-5",
    "region": "MUSEUM",
    "kind": "arranger",
    "number": 5,
    "label": "可選拼塊 5",
    "title": "紅色 4 × 10",
    "stepId": "museum",
    "actions": [
      "到博物館後室找對應顏色與尺寸的拼塊盤。",
      "依下圖旋轉並放入拼塊；同一字母是同一塊，全部填滿即可。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館拼塊 5 遊戲畫面",
        "url": "https://taloswiki.org/wiki/File:Museum_of_the_Simulation_-_Arranger_5.jpg"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "ABBB",
      "AACB",
      "ADCC",
      "DDDC",
      "EEFF",
      "EEFF",
      "GHHH",
      "GGGH",
      "IIII",
      "JJJJ"
    ]
  },
  {
    "id": "MUSEUM-arranger-6",
    "region": "MUSEUM",
    "kind": "arranger",
    "number": 6,
    "label": "可選拼塊 6",
    "title": "紅色 8 × 8",
    "stepId": "museum",
    "actions": [
      "到博物館後室找對應顏色與尺寸的拼塊盤。",
      "依下圖旋轉並放入拼塊；同一字母是同一塊，全部填滿即可。"
    ],
    "sources": [
      {
        "title": "Talos Wiki · 博物館拼塊 6 遊戲畫面",
        "url": "https://taloswiki.org/wiki/File:Museum_of_the_Simulation_-_Arranger_6.jpg"
      }
    ],
    "verificationStatus": "consensus",
    "diagramCells": [
      "AAABCCDD",
      "AEBBBCCD",
      "EEFGGGHD",
      "EFFFGHHH",
      "IIIIJJJJ",
      "KKKKLLLL",
      "MMNNOOPP",
      "MMNNOOPP"
    ]
  }
];
