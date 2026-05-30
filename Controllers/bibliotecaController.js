// Dados simulados (No próximo passo, eles serão movidos para o Model)
const livrosSimulados = [
    { id: 1, titulo: "Java para Iniciantes", autor: "Carlos Silva", categoria: "Programação", local: "Estante 2, Prateleira B", status: "Disponível", rfid: "RFID-FATEC-88321" },
    { id: 2, titulo: "Banco de Dados Básico", autor: "Maria Souza", categoria: "Banco de Dados", local: "Estante 1, Prateleira C", status: "Emprestado", rfid: "RFID-FATEC-77419", retorno: "06/06/2026" },
    { id: 3, titulo: "Python Essencial", autor: "André Oliveira", categoria: "Programação", local: "Estante 3, Prateleira A", status: "Reservado", rfid: "RFID-FATEC-99412" }
];

// Controlador de Ações da Biblioteca
const bibliotecaController = {
    
    // 1. Renderiza a tela principal carregando todos os livros na View
    exibirPainel: (req, res) => {
        res.render('biblioteca', { livros: livrosSimulados });
    },

    // 2. Endpoint da API caso o Totem QR ou RFID precise validar dados via JSON
    listarLivrosAPI: (req, res) => {
        res.json(livrosSimulados);
    },

    // 3. Lógica para buscar um livro por RFID específico (usado pelo Totem e Vigilante)
    buscarPorRfid: (req, res) => {
        const { rfid } = req.params;
        const livro = livrosSimulados.find(l => l.rfid === rfid);
        
        if (livro) {
            // Removido o caractere '跟' que causava o erro de sintaxe
            return res.json({ encontrado: true, livro });
        }
        res.status(404).json({ encontrado: false, mensagem: "Livro não identificado no sistema." });
    }
};

module.exports = bibliotecaController;