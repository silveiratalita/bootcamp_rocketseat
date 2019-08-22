const express = require('express');

const server = express();
server.use(express.json());

// server.get('/teste',(req,res)=>{
//     const name=req.query.name;
//     res.json({message:`Eu sou a ${name} linda`});
// })
const users = ['Talita', 'Gustavo', 'Andrey'];

// server.use((req,res,next)=>{
//     console.log('A requisição foi chamada');
//     return next();
// })

//middleware global
server.use((req,res,next)=>{
    console.time('Request')
    console.log(`Metodo :${req.method};,URL:${req.url}`);
     next();
     console.timeEnd('Request');
})
//middleware local
function checkUserExists(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error:'Username is required'})
    }
    return next();
}
//ultimo moddware para rotas que recebem usuarios como parametro
//o index realmente retorna um usuario presente nesse array? Em uma posição que não é undefined?
function checkUserInArray(req,res,next){
    const user=req.params.index;
    if(!user){
        return res.status(400).json({error:'User does not exist'})
    }
    req.user=user;
    return next();
}
server.get('/users', (req, res) => {
    return res.json(users);
})

server.post('/users', checkUserExists,(req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
})

server.get('/users/:index',checkUserInArray, (req, res) => { 
    return res.json(req.user);
})

server.put('/users/:index', checkUserExists,checkUserInArray,(req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    users[index]=name;
    return res.json(users)
})

server.delete('/users/:index',checkUserInArray,(req,res)=>{
    const {index}=req.params;
    users.splice(index,1);
    return res.send(200);
})

server.listen(3000);

//query params=?teste=1
//route params=/users/1
//request body={"name":"talita"}