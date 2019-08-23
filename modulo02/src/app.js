//aqui podem ficar as classes que dão nome as funcionalidades da nossa aplicação
import express from 'express';
//importa as rotas e passa la em routes
import routes from './routes';

class App{
    constructor(){
        //executado toda vez que  a classe for chamada
        this.server=express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
//aqui dentro cadastro todos os middlewares da aplicação
this.server.use(express.json());
    }
    
    routes(){
        this.server.use(routes);
        //importa a rota de outro arquivo e passo aqui dentro
    }
}
export default new App().server;