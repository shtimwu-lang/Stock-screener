/*
js/market-stage.js
判断市场阶段的简单规则（占位实现）
提供：MarketStage.evaluate(indexSeries)
返回：{ stage: '多头'|'熊市'|'震荡', score: number }
*/
(function(window){
  function simpleMA(series, period){
    // series: [{x:ts,y:value},...]
    const vals = series.map(s=>s.y);
    if(vals.length < period) return null;
    const slice = vals.slice(-period);
    const sum = slice.reduce((a,b)=>a+b,0);
    return sum / period;
  }

  function evaluate(series){
    // 以短期/长期均线交叉为示例
    if(!series || series.length < 30) return { stage: '未知', score:0 };
    const ma5 = simpleMA(series,5);
    const ma20 = simpleMA(series,20);
    if(ma5 == null || ma20 == null) return { stage:'未知', score:0 };
    const diff = ma5 - ma20;
    const score = diff / ma20;
    let stage = '震荡';
    if(score > 0.01) stage = '多头';
    else if(score < -0.01) stage = '熊市';
    return { stage, score };
  }

  window.MarketStage = { evaluate };
})(window);
