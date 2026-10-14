# App da Freddy Turismo London (Roberto Rivelino)

Protótipo fechado em 14/10/2026. Entrada em 10/11/2026, entrega em 10 dias,
2 meses de suporte. Domínio: www.freddyturismolondon.app (estava livre em 14/10).

Base: cópia do demo "Londres com a Bia" (`app-guia/londres`, v0.1.6).

## O que muda em relação ao demo de Londres

- **Cores:** verde-turquesa `#0B6E69` + água (`tokens.css`, `cores.js`, `carol.css`).
- **Marca:** logo em `arte/` (desenhado pela Ti Artes; troca quando ele tiver um).
- **Vitrine enxuta** (`freddy.js`), no estilo da Dulcineia: foto grande, redes no
  topo (Instagram, WhatsApp, Facebook, site, e-mail), Passeios, Transfer,
  Mensagens, Monte seu roteiro, Quem é o Roberto e a frota, Avaliações.
  Consultoria, ingressos, eBooks e vale-presente saíram da primeira tela.
- **Tours** (`catalogo.js`): os do site dele, com preço POR CARRO
  (Classe E até 3, V-Class até 7). **Preços de exemplo: ele confirma.**
- **Contratado:** tudo menos Atendimento e Marketing (`config.js → modulos`):
  as duas abas aparecem com cadeado.
- **Aba nova Comunicação** (`comunicacao.js` + `freddy.css`):
  - contatos = as fichas de cliente; conversa com histórico, como no WhatsApp;
  - "Enviar no app" vira notificação (push) no celular do cliente;
  - "Aviso para vários" (todos com o app, amanhã, próximos 7 dias, quem já viajou);
  - a mesma mensagem pelo WhatsApp (texto pronto) e pelo Instagram (abre a
    conversa, texto copiado);
  - ✨ IA escreve (assunto → mensagem) e 📝 resumo da conversa pelo WhatsApp;
  - card de mensagem nova no Hoje, bolinha de não lidas no menu, botão
    "Conversa" na ficha do cliente;
  - lado do cliente: vitrine → Mensagens (`#/mensagens`), com o botão de ligar
    as notificações e a instrução do iPhone.

## Para a entrega (com nuvem)

1. Projeto Supabase (ou sala `freddy` no banco da Ti Artes) + `SEGURANCA.sql`;
   preencher `supabaseUrl`, `supabaseKey`, `sala` no `config.js`.
2. Tabela `mensagens` (id, cliente_id, de, canal, txt, em, lida) com RLS:
   o cliente lê só a conversa dele, o Roberto lê todas. Realtime ligado.
3. Push: o mesmo caminho do aviso de reserva (`avisos.js`, `push_subs`, cofre
   `/api/avisar`), com `url: './#/mensagens'`. Gerar VAPID dele.
4. Instagram: conectar a conta comercial dele (Meta). Regra da Meta: só responde
   quem escreveu nas últimas 24h.
5. Domínio: registrar no nome dele, apontar, HTTPS (o .app exige).
6. Trocar fotos de Londres pelas dele e dos carros (`DB.settings.photo`,
   `photo2`, fotos dos tours), e os preços.
7. Tirar `meta robots noindex` do `index.html` quando estiver no ar.

## Lembrar (pedido do Eugênio, 14/10/2026)

O **Hoje** do demo "Londres com a Bia" (`carol-adm.js` + `boas-vindas.js` +
`fichas.js`) é o padrão: todo app novo nasce com ele. Este app já tem.
