/*
js/market-breadth.js
简单的市场宽度计算与渲染占位脚本
提供：MarketBreadth.init(containerId, options)
依赖：页面自行管理数据源（fetch）或传入 data 参数
*/
(function(window){
  const defaultOptions = {
    containerId: 'market-breadth',
    topN: 5
  };

  function computeBreadth(snapshot){
    // snapshot: { up: number, down: number, flat: number }
    // 返回一个简单的宽度指标
    const total = (snapshot.up||0) + (snapshot.down||0) + (snapshot.flat||0);
    const adv = snapshot.up || 0;
    const dec = snapshot.down || 0;
    const breadth = total ? (adv - dec) / total : 0;
    return { total, adv, dec, flat: snapshot.flat||0, breadth };
  }

  function render(containerId, stats){
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'card';
    wrapper.innerHTML = `
      <h4>市场宽度</h4>
      <div class="kv"><div>上涨家数</div><div>${stats.adv}</div></div>
      <div class="kv"><div>下跌家数</div><div>${stats.dec}</div></div>
      <div class="kv"><div>平盘家数</div><div>${stats.flat}</div></div>
      <div class="kv"><div>总数</div><div>${stats.total}</div></div>
      <div class="kv"><div>宽度指标</div><div>${(stats.breadth).toFixed(3)}</div></div>
    `;
    el.appendChild(wrapper);
  }

  function init(containerId, snapshot){
    const id = containerId || defaultOptions.containerId;
    const stats = computeBreadth(snapshot || {up:0,down:0,flat:0});
    render(id, stats);
    return stats;
  }

  window.MarketBreadth = { init, computeBreadth, render };
})(window);
