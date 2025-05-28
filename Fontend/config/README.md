# Configuração do Frontend BlueJuri

Esta pasta contém os arquivos de configuração necessários para o deploy do frontend no Vercel.

## Estrutura de Arquivos

- `vercel.json`: Configuração do deploy no Vercel
- `package.json`: Dependências e scripts do projeto
- `.gitignore`: Arquivos e pastas ignorados pelo Git

## Como Usar

1. Instalar dependências:
```bash
npm install
```

2. Desenvolvimento local:
```bash
npm run dev
```

3. Deploy para produção:
```bash
npm run deploy
```

## Configuração do Vercel

O arquivo `vercel.json` contém as seguintes configurações:

- Builds para arquivos estáticos (HTML, CSS, JS, imagens)
- Rotas para diferentes tipos de arquivos
- Configuração de redirecionamentos

## Variáveis de Ambiente

Criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
VERCEL_PROJECT_ID=seu_project_id
VERCEL_ORG_ID=sua_org_id
```

## Notas Importantes

- Todos os caminhos nos arquivos de configuração são relativos à pasta raiz do projeto
- O deploy usa a configuração do arquivo `vercel.json`
- Os scripts no `package.json` já estão configurados para usar os arquivos desta pasta 