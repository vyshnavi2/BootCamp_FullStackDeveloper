import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = 3000; // You can choose any available port number

// PostgreSQL configuration
const pool = new Pool({
  user: 'postgres',
  host: 'database-1.cyiydomg2lvj.ap-south-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'Vyshnavi',
  port: 5432, // Default PostgreSQL port
  ssl: {rejectUnauthorized:false}
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// CRUD operations
app.get('/persons', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM persons');
    console.log(result);
    client.release();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching persons' });
  }
});

app.post('/persons', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name,phone_number } = req.body;
    console.log(req);
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO persons (first_name, last_name, phone_number) VALUES ($1, $2 $3) RETURNING *',
      [first_name, last_name,phone_number]
    );
    console.log(result);
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating person' });
  }
});

app.put('/persons/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    client.release();
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

app.delete('/persons/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await pool.connect();
    const result = await client.query('DELETE FROM Persons WHERE id = $1', [id]);
    client.release();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
