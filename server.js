const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    fs.readFile('server/emails.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo de usuarios.');
        }
        const users = data.split('\n').map(line => {
            const [userEmail, userPassword] = line.split(',');
            return { email: userEmail.trim(), password: userPassword.trim() };
        });
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            res.status(200).send('Inicio de sesión exitoso.');
        } else {
            res.status(401).send('Credenciales incorrectas.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
