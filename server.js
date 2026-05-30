const express = require('express');
const path = require('path');
const app = express();

// IMPORTAÇÃO CORRETA DOS CONTROLLERS (Atenção ao 'C' maiúsculo de Controllers)
const bibliotecaController = require('./Controllers/bibliotecaController');

// Configuração do motor de visualização (EJS) e caminhos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Definir pasta pública para arquivos estáticos (CSS, imagens, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
//                 ROTAS
// ==========================================

// Rota Principal que renderiza a view biblioteca.ejs passando os dados simulados
app.get('/', (req, res) => {
    // Array simulado de livros para o EJS não dar erro de "livros is not defined"
    const livrosSimulados = [
        { rfid: "123456", titulo: "Java para Iniciantes", autor: "Thiago Silva", categoria: "Programação", status: "Disponível", local: "Estante 2, Prateleira B" },
        { rfid: "789012", titulo: "Banco de Dados SQL", autor: "FATEC Registro", categoria: "Banco de Dados", status: "Emprestado", local: "Estante 4, Prateleira A" }
    ];
    
    res.render('biblioteca', { livros: livrosSimulados });
});

// Rota da API que o seu hardware/Python vai consumir
app.get('/api/livro/:rfid', bibliotecaController.buscarPorRfid);

// Inicialização do Servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Servidor Conecta FATEC online em: http://localhost:${PORT}`);
    console.log(`==================================================`);
});