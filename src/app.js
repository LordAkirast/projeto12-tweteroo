import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5500' }));
app.use(express.json());

const users = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send({ error: 'Campos obrigatórios não preenchidos' });
        return;
    }

   
    const isUserRegistered = users.some(user => user.username === username);

    if (isUserRegistered) {
        res.status(409).send({ error: 'Usuário já cadastrado' });
        return;
    }

    
    users.push({ username, avatar });

    res.status(200).send('OK');
});


const tweets = []; 

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

   
    const isUserRegistered = users.some(user => user.username === username);

    if (!isUserRegistered) {
        res.status(401).send({ error: 'Usuário não autorizado' });
        return;
    }

   
    tweets.push({ username, tweet });

    res.send({ message: 'OK' });
});

app.get('/tweets', (req, res) => {
    if (tweets.length === 0) {
        res.send([]);
    } else {
        res.send(tweets);
    }
});


app.get('/tweets/latest', (req, res) => {
    const latestTweets = tweets.slice(-10).map(tweet => {
        const user = users.find(user => user.username === tweet.username);
        return {
            username: tweet.username,
            avatar: user.avatar,
            tweet: tweet.tweet
        }
    });

    res.send(latestTweets);
});

app.listen(5000, () => {
    console.log('Servidor iniciado na porta 5000');
});
