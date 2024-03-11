import db from '../database.js'

class ClientController {
    async list(req, res) {
      const response = await db.query('SELECT * FROM clientes');
      res.status(200).json(response.rows);
    }
  
    async create(req, res) {
      const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
      const response = await db.query(
        'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, email, telefone, coordenada_x, coordenada_y]
      );
      res.status(201).send(`Cliente adicionado com ID: ${response.rows[0].id}`);
    }
  }
  
  export default new ClientController();