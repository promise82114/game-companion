import {createRequire} from 'node:module';
// 沿用來源 repo 已使用的本機測試工具；不下載瀏覽器、不新增產品套件。
export const require=createRequire(process.env.PLAYWRIGHT_REQUIRE_FROM||'C:/Users/promi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/placeholder.js');
export const {chromium}=require('playwright');
