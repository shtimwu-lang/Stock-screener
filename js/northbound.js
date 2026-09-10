/*
js/northbound.js
北向资金数据抓取与展示占位脚本
提供：Northbound.fetchAndRender(containerId, apiUrl)
*/
(function(window){
  async function fetchNorthbound(apiUrl){
    try{
      const res = await fetch(apiUrl);
      if(!res.ok) throw new Error('网络错误 '+res.status);
      const data = await res.json();
      return data;
    }catch(e){
      console.error('fetchNorthbound error', e);
      return null;
    }
  }

  async function fetchAndRender(containerId, apiUrl){
    const el = document.getElementById(containerId);
    if(!el) return;
    el.innerText = '加载中...';
    const data = await fetchNorthbound(apiUrl);
    if(!data){ el.innerText = '北向资金数据获取失败'; return; }
    // 简单渲染：显示今日净流入数值（需根据接口调整）
    el.innerHTML = `<div class="card"><h4>北向资金</h4><div class="kv"><div>净流入</div><div>${data.net || data.amount || '-'}</div></div></div>`;
  }

  window.Northbound = { fetchNorthbound, fetchAndRender };
})(window);
