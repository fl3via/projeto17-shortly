import { db } from '../database/connection.database.js'


export async function getUser(req, res) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token=$1;`, [
      token,
    ])

    if (session.rowCount === 0) {
      return res.sendStatus(401)
    }

    const userId = session.rows[0].userId

    const userResult = await db.query(
      `SELECT id, name FROM users WHERE id=$1;`,
      [userId]
    )

    if (userResult.rowCount === 0) {
      return res.sendStatus(404)
    }

    const userData = userResult.rows[0]

    const urlsResult = await db.query(
      `SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId"=$1;`,
      [userId]
    )

    const shortenedUrls = urlsResult.rows

    // Calcula a quantidade total de visitas dos links do usuário
    const visitCount = shortenedUrls.reduce((acc, url) => acc + url.visitCount, 0)

    // Monta o corpo da resposta
    const responseBody = {
      id: userData.id,
      name: userData.name,
      visitCount: visitCount,
      shortenedUrls: shortenedUrls,
    };

    res.status(200).send(responseBody)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
