# EDUARDO.DEV — Portfolio

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint    # type-check (tsc --noEmit)
```
Requires Node.js 18.18+ (20+ recommended). Read PROJECT_CONTEXT.md before continuing development.

## Adding real projects
Edit `CASE_STUDIES` in `src/lib/projects.ts` (template in the comments). Screenshots go in `public/projects/`.

## SEO / deployment
Copy `.env.example` → `.env.local`, set `NEXT_PUBLIC_SITE_URL` to the real domain once deployed.
Favicon and Open Graph image are generated at runtime (`src/app/icon.tsx`, `opengraph-image.tsx`) —
no image assets to replace manually. Full deploy steps, env var table and a post-deploy checklist
are in `DEPLOYMENT.md`. Security headers and CSP live in `next.config.mjs`.


## Windows: tela escura com apenas menu e rodapé (correção local)

A configuração de segurança foi ajustada para permitir o JavaScript e o WebSocket do Next.js **somente no modo de desenvolvimento** (`npm run dev`). O Hero agora mantém seu conteúdo principal visível mesmo antes da inicialização das animações. A política restritiva de scripts de produção permanece em vigor.

Para executar no Windows, abra o CMD **nesta pasta**, onde está `package.json`, e rode:

```cmd
npm install
npm run dev
```

Acesse http://localhost:3000. Se tinha uma sessão do servidor aberta, pressione `Ctrl+C` antes de reiniciar. Caso a página continue em branco, recarregue com `Ctrl+Shift+R` e verifique o Console do navegador (F12).

**Observação:** esta correção não atualiza dependências apontadas pelo `npm audit`. Revise a segurança dessas bibliotecas antes de publicar o site publicamente.
