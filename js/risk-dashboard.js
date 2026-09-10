/*
js/risk-dashboard.js
风险仪表板占位脚本
提供：RiskDashboard.render(containerId, metrics)
metrics 示例: { drawdown:0.12, vol:0.02, riskScore: 55 }
*/
(function(window){
  function render(containerId, metrics){
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h4>风险仪表板</h4>
      <div class="kv"><div>最大回撤</div><div>${(metrics.drawdown||0)*100}%</div></div>
      <div class="kv"><div>波动率</div><div>${((metrics.vol||0)*100).toFixed(2)}%</div></div>
      <div class="kv"><div>综合风险评分</div><div>${metrics.riskScore||0}</div></div>
    `;
    el.appendChild(card);
  }

  window.RiskDashboard = { render };
})(window);
