/*
js/sector-heatmap.js
板块热力图占位脚本
提供：SectorHeatmap.render(containerId, data)
data 示例: [{sector:'金融', value: 0.5}, ...]
*/
(function(window){
  function render(containerId, data){
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = '';
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit,minmax(120px,1fr))';
    grid.style.gap = '8px';

    (data||[]).forEach(item =>{
      const card = document.createElement('div');
      card.className = 'index-card';
      const hue = item.value >= 0 ? 140 : 0; // 绿=正，红=负
      const intensity = Math.min(1, Math.abs(item.value));
      card.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))';
      card.innerHTML = `<div class="index-name">${item.sector}</div><div class="index-value">${(item.value*100).toFixed(1)}%</div>`;
      card.style.borderLeft = `6px solid rgba(${hue===140?38:239},${hue===140?166:83},${hue===140?154:80},${0.9*intensity})`;
      grid.appendChild(card);
    });

    el.appendChild(grid);
  }

  window.SectorHeatmap = { render };
})(window);
