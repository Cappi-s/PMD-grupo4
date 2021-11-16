# PMD-grupo4 - MovieGetter

## Requisitos
Para rodar essa aplicação é necessário ter instalado o `docker-compose v1.29+`. 
> Para verificar use o comando `docker-compose -v` 

## Como rodar 
1. Clone o projeto: `git clone https://github.com/Cappi-s/PMD-grupo4.git`
2. Obter chave de API do The Movie Database. 
  - https://www.themoviedb.org/settings/account
  - Menu API na esquerda 
  - Copiar "API Key (v3 auth)  
3. Criar um arquivo `.env` na raiz do projeto com a chave de api
```
API_KEY=chavedasuapi
```
4. Agora é só rodar: `npm run all` 

