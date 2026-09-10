/*
js/pnl-chart.js
持仓盈亏可视化占位脚本
提供：PnlChart.init(canvasId, data)
data: [{label:'2026-09-01', value: 123.4}, ...]
*/
(function(window){
  function init(canvasId, data, options){
    const canvas = document.getElementById(canvasId);
    if(!canvas) return null;
    if(window.Chart){
      const ctx = canvas.getContext('2d');
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: (data||[]).map(d=>d.label),
          datasets: [{ label: '盈亏', data: (data||[]).map(d=>d.value), backgroundColor: (data||[]).map(d=> d.value>=0 ? 'rgba(38,166,154,0.9)' : 'rgba(239,83,80,0.9)') }]
        },
        options: Object.assign({ maintainAspectRatio:false }, options||{})
      });
    } else {
      const el = document.getElementById(canvasId+'-fallback');
      if(el) el.innerText = 'Chart.js 未加载 — 无法渲染 P&L 图。';
      return null;
    }
  }
  window.PnlChart = { init };
})(window);
