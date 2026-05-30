const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Middleware para processar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API Acadêmica Simulada (Para persistência leve no Hackathon)
app.get('/api/livros', (req, res) => {
    res.json([
        { id: 1, titulo: "Java para Iniciantes", autor: "Carlos Silva", categoria: "Programação", local: "Estante 2, Prateleira B", status: "Disponível", rfid: "RFID-FATEC-88321" },
        { id: 2, titulo: "Banco de Dados Básico", autor: "Maria Souza", categoria: "Banco de Dados", local: "Estante 1, Prateleira C", status: "Emprestado", rfid: "RFID-FATEC-77419", retorno: "06/06/2026" },
        { id: 3, titulo: "Python Essencial", autor: "André Oliveira", categoria: "Programação", local: "Estante 3, Prateleira A", status: "Reservado", rfid: "RFID-FATEC-99412" }
    ]);
});

// Rota principal - Entrega a interface do ecossistema
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicialização do servidor na porta 8080
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  CONECTA FATEC - MÓDULO BIBLIOTECA INICIADO        `);
    console.log(`  URL de Acesso: http://localhost:${PORT}          `);
    console.log(`====================================================`);
});