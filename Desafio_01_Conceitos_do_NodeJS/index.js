const express = require('express');

const server = express();
server.use(express.json());


const projects = [{
    id: "01",
    title: "bootcamp",
    tasks: []
}];


function chekIfIdExists(req, res, next) {
    const{id}=req.params
    for (i = 0; i < projects.length; i++) {
        if (projects[i].id === id) {
            next();
        } else {
            return res.json({ msg: "O Id buscado não existe" })
        }
    }
    //return res.json({ msg: "O Id buscado não existe" })
}

server.use((req, res, next) => {
    console.count('Request')
    console.log(`O ultimo foi um ${req.method}`);
    next();
})

server.post('/projects', (req, res) => {
    const {
        id,
        title,
        tasks
    } = req.body;
    projects.push({
        id,
        title,
        tasks
    });
    return res.send(projects);
})

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', chekIfIdExists, (req, res) => {
    const{id}= req.params;
    const {
        title
    } = req.body;

    for (i = 0; i < projects.length; i++) {
        if (projects[i].id === id) {
            projects[i].title = title
            return res.json({
                msg: "nome do projeto alterado"
            })
        } else {
            return res.json({
                msg: "não encontrado"
            })
        }

    }
})

server.delete('/projects/:id', chekIfIdExists, (req, res) => {
    const{id} = req.params;
    for (i = 0; i < projects.length; i++) {
        if (projects[i].id === id) {
            projects.splice(i,1)
            return res.json({
                msg: "ok"
            })
        } else {
            return res.json({
                msg: "não encontrado"
            })
        }
    }
})

server.post('/projects/:id/tasks', chekIfIdExists, (req, res) => {
    const {
        id
    } = req.params;
    const {
        title
    } = req.body
    for (i = 0; i < projects.length; i++) {
        if (projects[i].id === id) {
            projects[i].tasks.push(title)
            return res.json({
                msg: `A task ${title} foi inserida com sucesso`
            })
        }
    }
    return res.json({
        msg: "ERROR"
    })



})

server.listen(3000)