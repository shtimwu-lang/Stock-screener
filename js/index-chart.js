/*
js/index-chart.js
简单的指数曲线图占位（支持 Chart.js 若已加载）
window.IndexChart.init(canvasId, seriesData, options)
seriesData 示例: [{label:'上证', data:[{x:timestamp, y:value}, ...]}, ...]
*/
(function(window){
  function init(canvasId, seriesData, options){
    const canvas = document.getElementById(canvasId);
    if(!canvas) return null;
    if(window.Chart){
      const ctx = canvas.getContext('2d');
      return new Chart(ctx, {
        type: 'line',
        data: {
          datasets: (seriesData||[]).map((s, i)=>({
            label: s.label,
            data: s.data,
            fill: false,
            borderWidth: 1.5
          }))
        },
        options: Object.assign({
          parsing: false,
          normalized: true,
          scales: { x: { type: 'time' }, y: { beginAtZero: false } }
        }, options || {})
      });
    } else {
      // Fallback: simple textual rendering
      const container = document.getElementById(canvasId + '-fallback');
      if(container){
        container.innerText = 'Chart.js 未加载 — 请在页面引入 Chart.js 或查看控制台。';
      }
      return null;
    }
  }
  window.IndexChart = { init };
})(window);
