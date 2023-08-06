import { db } from '../database/connection.database.js'


export async function getRank(req, res) {

  try {
    const rankingResult = await db.query(`
      SELECT users.id, users.name, COUNT(urls.id) as linksCount, COALESCE(SUM(urls."visitCount"), 0) as visitCount
      FROM users
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY visitCount DESC
      LIMIT 10;
    `)

    const ranking = rankingResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      linksCount: parseInt(row.linksCount),
      visitCount: parseInt(row.visitCount),
    }))

    res.status(200).send(ranking)
    
  } catch (err) {
        res.status(500).send(err.message)
      }
    }
    
    
  
