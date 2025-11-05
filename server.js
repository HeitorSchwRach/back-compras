import { log } from 'console';
import Fastify from 'fastify';
import cors from '@fastify/cors'
import pkg from 'pg'

const{Pool} = pkg

const pool = new Pool({
    user: 'local',
    host: 'localhost',
    database: 'compras',
    password: '12345',
    port: 5432
})

const server = Fastify()

server.register(cors,{
    origin: true,
    methods: ['GET','POST','PUT','DELETE']
})


server.get('/compras', async (req, reply)=>{
    const result = await pool.query(`SELECT * FROM purchase`)
    return result.rows
})

server.post('/compras', async(req, reply)=>{ 
    const body = req.body

    console.log(
        body
    );
    
    const result = await pool.query(`
        INSERT INTO purchase (name, price, description) 
        VALUES ($1, $2, $3) RETURNING *
    `, [body.name, body.price, body.description ])
    
    return {response:'Deu bom!'}

    return {response: result.rows}
})

server.listen({port:3333})