import db from '../database.js'

class ClientController {
async list(req, res) {
    const { nome, email, telefone } = req.query;
    let query = 'SELECT * FROM clientes WHERE true';
    const params = [];
  
    if (nome) {
      params.push(`%${nome}%`);
      query += ` AND nome LIKE $${params.length}`;
    }
  
    if (email) {
      params.push(email);
      query += ` AND email = $${params.length}`;
    }
  
    if (telefone) {
      params.push(telefone);
      query += ` AND telefone = $${params.length}`;
    }
  
    try {
      const response = await db.query(query, params);
      res.status(200).json(response.rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar clientes');
    }
  }
  
  
    async create(req, res) {
      const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
      const response = await db.query(
        'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, email, telefone, coordenada_x, coordenada_y]
      );
      res.status(201).send(`Cliente adicionado com ID: ${response.rows[0].id}`);
    }

    async calculateRoute(req, res) {
        try {
          const response = await db.query('SELECT * FROM clientes');
          const clients = response.rows;
    
          // Função para calcular a distância euclidiana até a origem (0,0)
          function calculateDistance(x, y) {
            return Math.sqrt(x * x + y * y);
          }
    
          // Ordena os clientes pela distância até a origem
          const sortedClients = clients.sort((a, b) => {
            return calculateDistance(a.coordenada_x, a.coordenada_y) - calculateDistance(b.coordenada_x, b.coordenada_y);
          });
    
          res.status(200).json(sortedClients);
        } catch (error) {
          console.error(error);
          res.status(500).send('Erro ao calcular a rota');
        }
      }

      async delete(req, res) {
        const { id } = req.params;
      
        try {
          await db.query('DELETE FROM clientes WHERE id = $1', [id]);
          res.status(200).send(`Cliente com ID ${id} foi excluído com sucesso.`);
        } catch (error) {
          console.error(error);
          res.status(500).send('Erro ao excluir o cliente');
        }
      }
  }
  
  export default new ClientController();