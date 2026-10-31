// 入口只篩選靜態目錄，不讀取各遊戲的玩家儲存。
const search = document.getElementById('game-search');
const filters = document.querySelectorAll('.catalogue-filters [data-kind]');
let kind = 'all';
function updateCatalogue() {
  let visible = 0;
  for (const game of document.querySelectorAll('.game')) {
    const matches = (kind === 'all' || game.dataset.kind === kind) && game.textContent.toLocaleLowerCase().includes(search.value.trim().toLocaleLowerCase());
    game.hidden = !matches;
    if (matches) visible++;
  }
  document.getElementById('visible-count').textContent = visible + ' 款遊戲';
  document.getElementById('no-games').hidden = visible > 0;
  document.querySelector('.game-list').classList.toggle('filtered', kind !== 'all' || !!search.value.trim());
}
search.addEventListener('input', updateCatalogue);
filters.forEach(button => button.addEventListener('click', () => {
  kind = button.dataset.kind;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateCatalogue();
}));
