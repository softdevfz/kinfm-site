(() => {
  'use strict';
  const form = document.getElementById('gift-form');
  const text = JSON.parse(document.getElementById('gift-text').textContent);
  const to = document.getElementById('gift-to');
  const from = document.getElementById('gift-from');
  const message = document.getElementById('gift-message');
  const body = document.getElementById('card-body');
  const signature = document.getElementById('card-from');
  const note = document.getElementById('card-message');
  function update() {
    to.value = to.value.slice(0, 40);
    from.value = from.value.slice(0, 60);
    message.value = message.value.slice(0, 160);
    body.textContent = text.cardBody.replace('{para}', to.value.trim() || text.toDefault);
    signature.textContent = text.cardFrom.replace('{de}', from.value.trim() || text.fromDefault);
    note.textContent = message.value;
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  document.getElementById('gift-print').addEventListener('click', () => window.print());
  document.getElementById('gift-download').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f5f0e6';
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.strokeStyle = '#b74a30';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, 990, 1260);
    ctx.fillStyle = '#b74a30';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('KinFM · ∞', 100, 140);
    // Wrap at measured glyph widths, including names with no spaces.
    const segments = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter(undefined, {granularity:'grapheme'}) : null;
    const glyphs = value => segments ? Array.from(segments.segment(value), part => part.segment) : Array.from(value);
    function lines(value, width) {
      const result = [];
      for (const paragraph of value.split('\n')) {
        let line = '';
        for (const letter of glyphs(paragraph)) {
          if (line && ctx.measureText(line + letter).width > width) {
            const space = line.lastIndexOf(' ');
            if (space > 0) {
              result.push(line.slice(0, space));
              line = line.slice(space + 1) + letter;
            } else {
              result.push(line.trimEnd());
              line = letter.trimStart();
            }
          } else line += letter;
        }
        result.push(line);
      }
      return result;
    }
    const blocks = [
      {value:text.cardTitle, font:'bold', size:76, family:'serif', gap:38},
      {value:body.textContent, font:'', size:40, family:'sans-serif', gap:32},
      {value:note.textContent, font:'italic', size:38, family:'serif', gap:32},
      {value:signature.textContent, font:'bold', size:36, family:'sans-serif', gap:0}
    ];
    let layout;
    for (let scale = 1; scale >= 0.45; scale -= 0.025) {
      layout = blocks.map(block => {
        const size = Math.round(block.size * scale);
        const font = block.font + ' ' + size + 'px ' + block.family;
        ctx.font = font;
        return {font, rows:lines(block.value, 880), height:size * 1.35, gap:block.gap};
      });
      if (layout.reduce((sum, block) => sum + block.rows.length * block.height + block.gap, 0) <= 940) break;
    }
    ctx.fillStyle = '#242620';
    let y = 255;
    for (const block of layout) {
      ctx.font = block.font;
      for (const row of block.rows) { ctx.fillText(row, 100, y); y += block.height; }
      y += block.gap;
    }
    ctx.fillStyle = '#b74a30';
    ctx.font = '28px sans-serif';
    ctx.fillText('kinfm.com', 100, 1240);
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'kinfm.png';
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, 'image/png');
  });
  update();
  document.getElementById('gift-download').disabled = false;
  document.getElementById('gift-print').disabled = false;
})();
