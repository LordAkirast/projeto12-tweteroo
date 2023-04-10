import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5500' }));
app.use(express.json());

const users = []; // lista de usuários cadastrados

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send({ error: 'Campos obrigatórios não preenchidos' });
        return;
    }

    // verifica se o usuário já está cadastrado
    const isUserRegistered = users.some(user => user.username === username);

    if (isUserRegistered) {
        res.status(409).send({ error: 'Usuário já cadastrado' });
        return;
    }

    // adiciona o usuário à lista de usuários cadastrados
    users.push({ username, avatar });

    res.status(200).send('OK');
});


const tweets = []; // lista de tweets

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

    // verifica se o usuário está cadastrado
    const isUserRegistered = users.some(user => user.username === username);

    if (!isUserRegistered) {
        res.status(401).send({ error: 'Usuário não autorizado' });
        return;
    }

    // adiciona o tweet à lista de tweets
    tweets.push({ username, tweet });

    res.send({ message: 'OK' });
});

app.get('/tweets', (req, res) => {
    if (tweets.length === 0) {
        res.send([])
    } else {
        res.send({ tweets });
    }
});

app.listen(5000, () => {
    console.log('Servidor iniciado na porta 5000');
});
