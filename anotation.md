Para separar a lógica da manipulação de solicitações das definições de rotas em um aplicativo Express, você pode criar controladores (ou handlers) separados para cada recurso ou funcionalidade. Cada controlador é responsável por lidar com a lógica específica associada a um determinado endpoint.

Aqui está um exemplo de como você pode organizar suas rotas e controladores:

Crie uma estrutura de pastas:
Organize seu projeto em pastas para manter as coisas limpas. Por exemplo:

bash
Copy code
/seu-projeto
├── /controllers
│   ├── usuarioController.js
│   └── outroController.js
├── /routes
│   ├── usuarioRoutes.js
│   └── outroRoutes.js
└── app.js
Crie os controladores:
Em cada arquivo no diretório controllers, você define as funções que lidarão com a lógica específica para cada recurso ou funcionalidade. Por exemplo, em controllers/usuarioController.js:

javascript
Copy code
// usuarioController.js
exports.obterUsuarios = (req, res) => {
  // Lógica para obter e enviar informações sobre usuários
  res.json({ mensagem: 'Lista de usuários' });
};

exports.criarUsuario = (req, res) => {
  // Lógica para criar um novo usuário
  res.send('Usuário criado com sucesso');
};
Crie as rotas:
Em cada arquivo no diretório routes, você associa os endpoints aos controladores correspondentes. Por exemplo, em routes/usuarioRoutes.js:

javascript
Copy code
// usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para o endpoint '/api/usuarios'
router.get('/usuarios', usuarioController.obterUsuarios);
router.post('/usuarios', usuarioController.criarUsuario);

module.exports = router;
Use as rotas no seu aplicativo principal (app.js):
No seu arquivo principal (app.js ou outro), importe e use as rotas definidas:

javascript
Copy code
const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
// Importe outras rotas, se houver

const app = express();

// Use as rotas
app.use('/api', usuarioRoutes);
// Use outras rotas, se houver

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor Express em execução na porta 3000');
});
Essa abordagem ajuda a manter o código organizado, facilitando a leitura e a manutenção. Além disso, separar a lógica da rota permite que você reutilize os controladores em diferentes partes do seu aplicativo, se necessário.