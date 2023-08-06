import { db } from '../database/connection.database.js'
import bcrypt from 'bcrypt'
import {v4 as uuid } from 'uuid'

export async function createSignUp(req, res) {
  const { name, email, password } = req.body
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    if (user.rowCount !== 0) return res.status(409).send({ message: "E-mail existente!" })

    //cryptografar senha
    const hash = bcrypt.hashSync(password, 10)

    await db.query(
      `INSERT INTO  users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]
    )

    res.sendStatus(201)

  } catch (err) {
    res.status(500).send(err.message)
  }
}


export async function createSignIn(req, res) {
  const { email, password } = req.body

  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1;`, [email])
    if (user.rowCount === 0) return res.status(401).send({ messege: "E-mail não cadastrado!" })

    const passwordOk = bcrypt.compareSync(password, user.rows[0].password)
    if (!passwordOk) return res.status(401).send({ message: "Senha incorreta" })

    const token = uuid()
    await db.query(
      `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,[user.rows[0].id, token]
    )

    res.send({ token })

  } catch (err) {
    res.status(500).send(err.message)
  }
}

