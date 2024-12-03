// Importações necessárias
const express = require('express'); // Framework para criar o servidor
const cors = require('cors'); // Middleware para habilitar CORS
const bodyParser = require('body-parser'); // Middleware para processar JSON

// Inicialização do aplicativo
const app = express();
const port = 3000; // Porta onde o servidor irá rodar

// Middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(bodyParser.json()); // Configura o servidor para processar JSON no corpo das requisições

// Base de dados temporária (em memória)
let profissionais = [];

// Rota para cadastrar novos profissionais
app.post('/profissionais', (req, res) => {
  const { nome, cpf, especialidade } = req.body;

  // Validação dos dados recebidos
  if (!nome || !cpf || !especialidade) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  // Verifica se o CPF já está cadastrado
  const cpfExiste = profissionais.some((prof) => prof.cpf === cpf);
  if (cpfExiste) {
    return res.status(400).json({ error: 'CPF já cadastrado!' });
  }

  // Adiciona o novo profissional à lista
  const novoProfissional = { nome, cpf, especialidade };
  profissionais.push(novoProfissional);

  // Resposta de sucesso
  res.status(201).json({ message: 'Profissional cadastrado com sucesso!', profissional: novoProfissional });
});

// Rota para listar todos os profissionais
app.get('/profissionais', (req, res) => {
  res.status(200).json(profissionais); // Retorna a lista de profissionais cadastrados
});

// Rota para excluir um profissional pelo CPF
app.delete('/profissionais/:cpf', (req, res) => {
  const { cpf } = req.params;

  // Verifica se o CPF existe
  const indice = profissionais.findIndex((prof) => prof.cpf === cpf);
  if (indice === -1) {
    return res.status(404).json({ error: 'Profissional não encontrado!' });
  }

  // Remove o profissional da lista
  const profissionalRemovido = profissionais.splice(indice, 1);
  res.status(200).json({ message: 'Profissional removido com sucesso!', profissional: profissionalRemovido[0] });
});

// Inicializa o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
