// Radar de Oportunidades: coletor do WhatsApp Web (só leitura).
// Rola a conversa aberta para cima, junta as mensagens das últimas `horas`,
// apaga telefones e baixa um .txt na pasta Downloads (radar_<grupo>.txt).
// Não escreve, não envia e não reage a nada.
//
// Uso manual: abra um grupo no WhatsApp Web, cole este arquivo no Console (F12)
// e rode:  await window.__radarColetar()          (últimas 24 horas)
//          await window.__radarColetar(null, 72)  (últimas 72 horas)
window.__radarColetar = async function (nome, horas) {
  horas = horas || 24;
  const desde = new Date(Date.now() - horas * 3600 * 1000);
  const cabecalho = document.querySelector('#main header span[title]');
  const grupo = nome || (cabecalho && cabecalho.title) || 'grupo';

  // Aceita o WhatsApp em inglês "[2:32 PM, 11/6/2026]" e em português "[14:32, 06/11/2026]".
  const parse = p => {
    let m = p.match(/\[(\d{1,2}):(\d{2})\s*([AP])\.?\s*M\.?,\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\]/i);
    if (m) {
      const h = (+m[1] % 12) + (/p/i.test(m[3]) ? 12 : 0);
      return new Date(+m[6], +m[4] - 1, +m[5], h, +m[2]);
    }
    m = p.match(/\[(\d{1,2}):(\d{2}),\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\]/);
    if (m) return new Date(+m[5], +m[4] - 1, +m[3], +m[1], +m[2]);
    return null;
  };

  const vistos = new Map();
  const juntar = () => document.querySelectorAll('#main [data-pre-plain-text]').forEach(e => {
    const p = e.getAttribute('data-pre-plain-text');
    const k = p + e.innerText.slice(0, 60);
    if (!vistos.has(k)) vistos.set(k, { d: parse(p), p, t: e.innerText });
  });
  const rolagem = [...document.querySelectorAll('#main div')].find(d =>
    d.scrollHeight > d.clientHeight + 50 && getComputedStyle(d).overflowY !== 'visible' &&
    d.querySelector('[data-pre-plain-text]'));
  if (!rolagem) return grupo + ': abra um grupo com mensagens antes de rodar';

  for (let i = 0; i < 60; i++) {
    juntar();
    const datas = [...vistos.values()].map(v => v.d).filter(Boolean);
    if (datas.length && Math.min(...datas) < desde) break;
    rolagem.scrollTop = 0;
    await new Promise(r => setTimeout(r, 1800));
  }
  juntar();

  const semTelefone = s => s.replace(/\+?\(?\d[\d\s().-]{7,}\d/g, '(nº)');
  const msgs = [...vistos.values()].filter(v => v.d && v.d >= desde).sort((a, b) => a.d - b.d);
  const linhas = msgs.map(v => semTelefone(v.p + v.t.replace(/\n+/g, ' / ')));
  const texto = ['Grupo: ' + grupo, 'Mensagens desde: ' + desde.toLocaleString('pt-BR'), ''].concat(linhas).join('\n');

  const arquivo = 'radar_' + grupo.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\w]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() + '.txt';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([texto], { type: 'text/plain' }));
  a.download = arquivo;
  document.body.appendChild(a); a.click(); a.remove();
  return grupo + ': ' + msgs.length + ' mensagens salvas em ' + arquivo;
};
'coletor pronto';
