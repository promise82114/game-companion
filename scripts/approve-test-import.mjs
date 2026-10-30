// 保留工具的測試透過真正的差異、下載與確認 UI，不跳過正式保護。
export async function approveImport(page,mode='merge'){
 await page.locator('#importPreview').waitFor({state:'visible'});
 for(const row of await page.locator('#migrationRows tr').all()){
  const incoming=await row.locator('td').nth(2).textContent();
  const choice=mode==='merge'&&['未記錄','否'].includes(incoming)?'local':'source';
  await row.locator('select').selectOption(choice);
 }
 const downloaded=page.waitForEvent('download');await page.locator('#migrationBackup').click();await downloaded;await page.locator('#migrationAck').check();
}
