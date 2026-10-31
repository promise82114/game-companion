// 只管理呈現與鍵盤狀態；進度、篩選計算與同步仍由原模組負責。
(() => {
  const toggle = document.getElementById('filterToggle');
  const fields = document.getElementById('filterFields');
  const compact = matchMedia('(max-width: 720px)');
  const disclosures = [...document.querySelectorAll('.progress-overview, .list-notes, .equipment-filters')];
  const equipment = document.getElementById('characterAccessoryFilters');
  const updateLabel = () => {
    const count = [...fields.querySelectorAll('select')].filter(field => !field.hidden && field.value !== '' && field.value !== 'all').length;
    toggle.textContent = count ? `篩選條件 (${count})` : '篩選條件';
    const equipmentCount = equipment.querySelectorAll('input:checked').length;
    document.querySelector('.equipment-filters > summary').textContent = equipmentCount ? `可裝備配件篩選 (${equipmentCount})` : '可裝備配件篩選';
  };
  const updateVisibility = () => {
    fields.hidden = compact.matches && toggle.getAttribute('aria-expanded') !== 'true';
  };
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
    updateVisibility();
  });
  const updateLayout = () => {
    updateVisibility();
    for (const disclosure of disclosures) disclosure.open = !compact.matches;
  };
  compact.addEventListener('change', updateLayout);
  fields.addEventListener('change', updateLabel);
  equipment.addEventListener('change', updateLabel);
  document.addEventListener('click', event => {
    if (event.target.closest('.level-stat, #clearFilters, #clearCharacterAccessories, #favoriteClearFilters, #tabs button')) queueMicrotask(updateLabel);
  });
  // 程式化快捷篩選也更新計數；不改寫篩選值。
  const updateSelection = () => {
    for (const button of document.querySelectorAll('#tabs button, #stats button')) {
      button.setAttribute('aria-pressed', String(button.classList.contains('active') || button.classList.contains('selected')));
    }
    updateLabel();
  };
  const observer = new MutationObserver(updateSelection);
  observer.observe(document.getElementById('tabs'), {subtree: true, attributes: true, attributeFilter: ['class', 'hidden']});
  observer.observe(document.getElementById('stats'), {subtree: true, attributes: true, attributeFilter: ['class']});
  updateLayout();
  updateSelection();
})();
