# Radar de Oportunidades

Uma IA que lê os grupos de WhatsApp em que vocês já estão e, todo dia, entrega a lista de quem está pedindo indicação ou procurando o que vocês vendem, com uma sugestão de resposta pronta. Vocês só revisam e respondem.

Feito pela CW Digital Marketing para o Indica Aí.

## O que ele faz e o que ele não faz

| Faz | Não faz |
| --- | --- |
| Lê os grupos que vocês escolheram | Não lê conversas pessoais |
| Encontra pedidos de indicação e de serviço | Não monta lista de telefones dos membros |
| Sugere uma resposta para cada pedido | Não envia nada sozinho |
| Mostra os assuntos que mais apareceram | Não escreve, não reage e não encaminha nos grupos |

Por que não fazemos disparo nem lista de telefones: o WhatsApp bloqueia números que mandam mensagem em massa para quem não pediu, a LGPD protege nome e telefone das pessoas, e os administradores de grupo removem quem faz spam. Responder pessoalmente a quem acabou de pedir uma indicação dá muito mais resultado.

## Do que vocês precisam
- Um computador com o **Google Chrome**.
- O **WhatsApp Web** aberto e conectado no Chrome ([web.whatsapp.com](https://web.whatsapp.com)).
- Uma IA: o **Claude** (o caminho mais automático) ou o **Grok Bot**, o **ChatGPT** etc. (o caminho simples).

## Passo 1: baixar e configurar (uma vez só)
1. Nesta página do GitHub, clique em **Code → Download ZIP** e descompacte a pasta no computador.
2. Abra o arquivo **`CONFIGURACAO.md`** e preencha: o que vocês vendem, para quem, os grupos que querem acompanhar e o tom das respostas.
3. No WhatsApp, **fixe os grupos** escolhidos no topo da lista. Assim o Radar encontra cada um sem precisar da busca.

## Passo 2: escolher o caminho

### Caminho A: automático com o Claude
O Claude abre o WhatsApp Web, lê os grupos e entrega o relatório sozinho.

1. Instale o **app do Claude** para computador e a extensão **Claude in Chrome**, conectada ao app.
2. No app do Claude, abra a aba **Code** e escolha a pasta `radar-oportunidades` que vocês baixaram.
3. Escreva: **`/radar-oportunidades`** (ou "rodar o radar").
4. O relatório do dia aparece na tela e fica salvo em `relatorios/`.

### Caminho B: simples, com qualquer IA (Claude, Grok Bot, ChatGPT)
1. **Crie o favorito do Radar no Chrome** (uma vez só):
   - Abra o arquivo `coleta/favorito.txt` e copie todo o texto.
   - No Chrome, clique com o botão direito na barra de favoritos → **Adicionar página**.
   - Nome: `Radar`. No campo URL, cole o texto copiado. Salve.
2. **Todo dia, para cada grupo:** abra o grupo no WhatsApp Web e clique no favorito **Radar**. Um arquivo `radar_<grupo>.txt` é baixado para a pasta Downloads.
3. Abra a sua IA, cole o texto de `prompts/analise.md`, cole o conteúdo do `CONFIGURACAO.md` e anexe os arquivos baixados.
4. A IA devolve as oportunidades do dia e as sugestões de resposta.

Se o favorito não funcionar, faça a coleta pelo Console: com o grupo aberto, aperte **F12**, vá em **Console**, cole o conteúdo de `coleta/coletor.js`, aperte Enter e depois digite `await window.__radarColetar()` e Enter.

## Rotina sugerida
- **De manhã, 10 minutos:** rodar o Radar, ler o relatório e responder os pedidos quentes.
- **Segunda-feira:** usar 72 horas na configuração para pegar o fim de semana.
- Responder sempre de forma pessoal e adaptar a sugestão. Mensagem igual para todo mundo parece robô.

## Exemplo
Veja um relatório de exemplo (fictício) em [`exemplos/relatorio-exemplo.md`](exemplos/relatorio-exemplo.md).

## Privacidade
- Os telefones são apagados já na coleta.
- As mensagens dos grupos ficam só no computador de vocês e podem ser apagadas depois da análise. O Caminho A apaga sozinho.
- Nada é enviado para a CW.

## Ajuda
Victor Chiquetti, CW Digital Marketing · WhatsApp +1 (407) 272-9527
