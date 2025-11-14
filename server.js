const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota principal - exibe o formulário
app.get('/', (req, res) => {
    res.render('index');
});

// Rota para processar o formulário
app.post('/enviar', (req, res) => {
    const { nome, sobrenome } = req.body;
    
    // Validação básica
    if (!nome || !sobrenome) {
        return res.render('resultado', {
            mensagem: 'Por favor, preencha todos os campos!',
            tipo: 'erro'
        });
    }
    
    // Mensagem de sucesso
    res.render('resultado', {
        mensagem: `Olá ${nome} ${sobrenome}! Seus dados foram recebidos com sucesso!`,
        tipo: 'sucesso',
        nome: nome,
        sobrenome: sobrenome
    });
});

// Rota para voltar ao formulário
app.get('/voltar', (req, res) => {
    res.redirect('/');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});