# ***Shortly***

## ***Visão Geral***
**Shortly** é um sistema encurtador de URLs. Links que cabem no bolso!

## ***Principais Funcionalidades***
1. Criar cadastro de usuário;
2. Fazer login com cadastro criado;
3. Pegar a URL;
4. Criar URL encurtada;
5. Atualizar número de visitantes na URL;
6. Deletar URLs. 

O banco de dados PostgreSQL foi criado do zero para suportar essas funcionalidades.

## ***Deploy***
***Link:*** https://shortly-api-f74r.onrender.com

## ***Rotas Utilizadas por Entidades***
POST `/signup` 

    - Receber um corpo (body) no formato: 

    {
	  name: "João",
      email: "joao-1@gmail.com.br",
      password: "min225hA-Seçnha",
      confirmPassword: "min225hA-Seçnha"
    }


 POST `/signin`

    {
      email: "joao-1@gmail.com.br",
      password: "min225hA-Seçnha"
    }


 POST `urls/shorten`

    - Rota autenticada
    - Recebe um header Authorization no formato Bearer TOKEN

    {
      "url": "https://...."
    }
    
    - Responde com status 201 e corpo (body) no formato: 

    {
      "id": 1,
	  "shortUrl": "a8745bcf" // aqui o identificador que for gerado
    }


 GET `/urls/:id`

    - Responde com status 201 e corpo (body) no formato: 

    {
      "id": 1,
	  "shortUrl": "a8745bcf",
      "url": "https://...."
    }


 GET `/urls/open/:shortUrl`

    - Rota não autenticada;
    - Redireciona o usuário para o link correspondente;
    - Aumenta um na contagem de visitas no link;
    - Caso a URL encurtada não exista, responde com status code 400.


DELETE `/urls/:id`

    - Esta é uma *rota autenticada;
    - Deve receber um header Authorization no formato Bearer TOKEN;
    - Caso o header não seja enviado ou seja inválido, responder com status code 401;
    - Deve responder com status code 401 quando a URL encurtada não pertencer ao usuário;
    - Se a URL for do usuário, deve responder com status code 204 e excluir a URL encurtada;
    - Caso a URL encurtada não exista, responder com status code 404.


GET `/users/me`

    - Responde com status 200 e corpo (body) no formato: 

    {
      "id": id do usuário,
	  "name": nome do usuário,
	  "visitCount": soma da quantidade de visitas de todos os links do usuário,
	  "shortenedUrls": [
		{
			"id": 1,
			"shortUrl": "...",
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		},
		{
			"id": 2,
			"shortUrl": "...",'
			"url": "...",
			"visitCount": soma da quantidade de visitas do link
		}
	 ]
    }    
   

   GET `/ranking`

    - Esta não é uma rota autenticada.
    - Deve responder com status code 200 e corpo (body) no formato:

    [
	  {
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 5,
		"visitCount": 100000
	  },
	  {
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 3,
		"visitCount": 85453
	  },
	  {
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 10,
		"visitCount": 0
	  },
	  {
		"id": id do usuário,
		"name": nome do usuário,
		"linksCount": 0,
		"visitCount": 0
	  }
    ]


## ***Tecnologias Utilizadas***
- JavaScript;
- SQL;
- Nodejs;
- Axios;
- Bcrypt;
- Cors;
- Dayjs;
- Dotenv;
- Express;
- Joi;
- Nanoid;
- Pg;
- Uuid.
