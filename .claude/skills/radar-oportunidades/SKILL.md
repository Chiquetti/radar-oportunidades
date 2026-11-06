---
name: radar-oportunidades
description: Radar de Oportunidades nos grupos de WhatsApp. Lê, só leitura, os grupos listados em CONFIGURACAO.md pelo WhatsApp Web (Claude in Chrome), encontra quem está pedindo indicação ou procurando o que a empresa vende e entrega o relatório do dia com sugestões de resposta. Use quando pedirem "radar", "rodar o radar", "oportunidades nos grupos" ou /radar-oportunidades.
---

# Radar de Oportunidades

## Antes de tudo
1. Ler `CONFIGURACAO.md` na raiz desta pasta. Se ainda tiver campos `[preencher]` em "O que vendemos", "Para quem" ou "Grupos para acompanhar", pedir que a pessoa preencha e parar.
2. Definir a janela: "Horas para trás" da configuração (padrão 24; na segunda-feira, 72).

## Coleta (Claude in Chrome)
1. Abrir `https://web.whatsapp.com` numa aba nova. Se aparecer o QR code, avisar que é preciso entrar no WhatsApp Web pelo celular e parar. Quem faz o login é sempre a pessoa.
2. Colar o conteúdo de `coleta/coletor.js` na aba com a ferramenta de JavaScript.
3. Para cada grupo da configuração:
   - Achar `span[title="<nome do grupo>"]` dentro de `#pane-side`.
   - Rolar até ele com `scrollIntoView({block:'center'})`, pegar as coordenadas com `getBoundingClientRect` e **clicar** nelas.
   - Conferir que `#main header` mostra o nome do grupo.
   - Rodar `await window.__radarColetar('<nome do grupo>', <horas>)`. O arquivo `radar_<grupo>.txt` vai para a pasta Downloads.
   - Se o grupo não estiver visível na lista, pular e avisar no relatório: "não achei na lista, fixe o grupo no topo". **Nunca digitar na busca.**
4. Fechar a aba no fim.

## Análise
1. Mover os `radar_*.txt` de Downloads para `relatorios/brutos/` e ler todos.
2. Seguir `prompts/analise.md` com a configuração e as mensagens.
3. Salvar em `relatorios/AAAA-MM-DD.md` e mostrar o resultado.
4. Apagar `relatorios/brutos/` no fim: as mensagens dos grupos não ficam guardadas.

## Regras
- **Só leitura.** Nunca escrever, enviar, reagir ou encaminhar nada no WhatsApp. Nada de digitar com uma conversa aberta. As respostas são rascunhos que a pessoa envia, se quiser.
- **Privacidade.** Telefones nunca aparecem no relatório. Das pessoas, só o primeiro nome. Não montar lista de contatos dos grupos.
- **Sem disparo.** Não mandar mensagem automática nem em massa para ninguém.
- **Só os grupos da configuração.** Conversas pessoais não são lidas.
