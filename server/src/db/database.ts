import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import fs from 'fs'

export const db: Database = await open({
  filename: './chat.sqlite',
  driver: sqlite3.Database
})

const migrations = fs.readFileSync(
  new URL('./migrations.sql', import.meta.url),
  'utf-8'
)

await db.exec(migrations)