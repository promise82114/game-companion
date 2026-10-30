# 新遊戲模組骨架

這個目錄是開發範本，不會進入 Portal 或發布產物。先讀 `docs/MODULE_CONTRACT.md`；複製下列結構到 `games/{slug}/`，完成頁面與驗證後才加入可發布模組。

```text
games/{slug}/
  module.json              由 module.json.example 改成穩定識別
  README.md                功能、平台、儲存、備份與驗證指令
  dist/index.html          可獨立開啟的完整工具入口
  dist/                    該遊戲資源與編譯輸出
  data/                    若有原始攻略資料則在此維護
  scripts/                 該遊戲自己的資料產生／建置工具
  docs/                    資料來源、ID、Schema 與遷移紀錄
  verify.mjs               使用既有工具或 Node assert 的驗證入口
```

只有兩三份靜態檔時不必預先建立全部子目錄。Roadmap 優先使用穩定 stepId、章節、完成／略過狀態與筆記；沒有雲端需求就省略 OAuth／Drive 程式。範例中的 Drive 識別是保留欄位，不會自動賦予同步能力。

補上模組驗證與資料無損測試後，再跑根 build／verify-site 及隔離瀏覽器回歸。不要以空白 index 或未完成工具通過實際功能驗收。

新模組維持 cloudWritesEnabled:false。若要沿用 EDF 手動同步，需保留各模組的獨立授權／Base／namespace 與每次授權的條件寫入測試門檻，並補上該遊戲的資料無損與競爭回歸，不能只複製 manifest 開關。
