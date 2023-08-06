import { customAlphabet } from 'nanoid'
import { db } from '../database/connection.database.js'
const nanoid = customAlphabet('1234567890abcdef', 8)


export async function postUrlShorten(req, res) {

  const { url } = req.body
  // Verificar se o token de autenticação foi fornecido no header
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")
  if (!token) {
    return res.status(401).send({ message: "Erro!" })
  }

  // Verificar se o corpo da requisição possui o formato correto
  if (!url || typeof url !== 'string') {
    return res.status(422).send({ message: "Formato inválido no corpo da requisição." })
  }

  try {
    // Verificar se o token de sessão é válido e obter o userID associado
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [token])
    if (session.rowCount === 0) {
      return res.status(401).send({ message: "Erro!!" })
    }
    const userId = session.rows[0].userId

    // Gerar o shortUrl usando a biblioteca nanoid
    const shortUrl = nanoid()

    // Inserir a URL longa, o shortUrl e o userId no banco de dados
    const result = await db.query(
      `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id, "shortUrl";`,
      [url, shortUrl, userId]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
}



export async function getUrl(req, res) {
  const { id } = req.params

  try {
    const result = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id])
    if (result.rowCount === 0) {
      return res.status(404).send({ message: "URL não encontrada." })
    }

    res.status(200).send({ "id": result.rows[0].id, "shortUrl": result.rows[0].shortUrl, "url": result.rows[0].url })
  } catch (err) {
    res.status(500).send({ message: "Ocorreu um erro no servidor." })
  }
}


export async function getUrlOpen(req, res) {

  const { shortUrl } = req.params
  try {
    // Consulta ao banco de dados para obter a URL correspondente à shortUrl
    const result = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
      shortUrl
    ])


    if (result.rowCount === 0) {
      return res.status(404).send({ message: "URL não encontrada." })
    }

    // Incrementa a contagem de visitas do link
    await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1;`, [
      shortUrl
    ])

    // Redireciona o usuário para a URL original correspondente
    const originalUrl = result.rows[0].url
    return res.redirect(originalUrl)
  } catch (err) {
    console.error("Erro ao abrir a URL encurtada:", err)
    res.status(500).send({ message: "Ocorreu um erro no servidor." })
  }
}


export async function deleteUrl(req, res) {
  const { id } = req.params

  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")
  if (!token) return res.sendStatus(401)

  try {
    const url = await db.query(`SELECT "userId" FROM urls WHERE id=$1;`, [id])

    if (url.rowCount === 0) {
      return res.sendStatus(404)
    }

    const session = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [
      token,
    ])

    if (session.rowCount === 0) {
      return res.sendStatus(401)
    }


    if (url.rows[0].userId !== session.rows[0].userId) {
      return res.sendStatus(401)
    }

    // Se a URL pertencer ao usuário, exclui a url encurtada do banco de dados
    await db.query(`DELETE FROM urls WHERE id=$1;`, [id])

    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
  }
}


