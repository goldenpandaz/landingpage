// Pestañas de la página de servicios. Soporta enlace directo: servicios.html#invitaciones
(function () {
  const tabs = document.querySelectorAll('.svc-tab');
  const panels = document.querySelectorAll('.svc-panel');
  if (!tabs.length) return;

  function show(id, updateHash) {
    const target = document.getElementById(id);
    if (!target || !target.classList.contains('svc-panel')) return;

    tabs.forEach(t => {
      const on = t.dataset.panel === id;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(p => p.classList.toggle('active', p.id === id));

    if (updateHash) {
      try { history.replaceState(null, '', '#' + id); } catch (e) { /* sin historial: se ignora */ }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => show(tab.dataset.panel, true));
  });

  const initial = location.hash.replace('#', '');
  if (initial) show(initial, false);
})();
