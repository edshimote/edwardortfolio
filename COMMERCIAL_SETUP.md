# Plataforma comercial — configuração
Esta branch é uma preparação. Não publicar na produção antes de configurar e testar.

## Banco e acesso
1. Crie um projeto Supabase dedicado à plataforma comercial. Não use o banco escolar.
2. Execute `supabase/commercial-schema.sql` no SQL Editor.
3. No Auth, desabilite cadastro público e crie individualmente as contas dos dois administradores com e-mails verificados.
4. Configure na Vercel, somente no servidor: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY e COMMERCIAL_ADMIN_EMAILS (lista de e-mails permitidos, separados por vírgula). Nunca exponha service role ao navegador nem no GitHub.
5. A página /comercial usa login com senha individual e valida o token e a lista de e-mails em cada requisição de dados.

## Gmail
1. Entre em https://script.google.com/ com a conta Gmail que deve receber os pedidos.
2. Crie um projeto, copie integrations/google-apps-script.gs e configure as propriedades WEBHOOK_TOKEN (segredo aleatório forte) e RECIPIENT (Gmail de destino).
3. Implante como aplicativo da web executado como sua conta, acesso "qualquer pessoa"; o token é obrigatório no corpo e impede requisições sem autorização.
4. Autorize MailApp no Google e copie a URL /exec do deployment.
5. Configure CONTACT_FORM_WEBHOOK_URL e CONTACT_FORM_WEBHOOK_TOKEN (mesmo segredo) na Vercel. Nunca coloque o token no GitHub.
6. Teste um pedido fictício, confirme o registro e e-mail recebido. Se a notificação falhar o registro permanece, com notified=false.

## Antes de publicar
- Build e TypeScript sem erros; conferir preview.
- Testar formulário válido/inválido e bloqueio de spam, persistência, envio Gmail e resposta ao cliente.
- Testar login permitido e rejeição de terceiros, acesso anônimo negado, alteração de status, despesas e valores recebidos.
- Confirmar que dados e chaves não são expostos no frontend. Revisar aviso de privacidade, retenção e exclusão de dados.
- Confirmar prazo, preço, escopo e arredondamento financeiro. O painel atual lista até 500 registros e é um CRM inicial, não um sistema contábil.
- Pendências: proposta comercial em PDF, download de catálogo PDF, confirmação automática ao cliente, recuperação de senha, trilha de auditoria, retry de e-mail, proteção anti-spam distribuída e paginação.
