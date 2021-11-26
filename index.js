const ProjectModel = require('./model/proyectoModel')
const express = require('express')
const { gql,ApolloServer } = require('apollo-server-express')

const typeDefs = gql`

type Usuario{
    nombre: String
    identificacion: Int
    estado: String
    email: String
    perfil: String
}
type Query{
    usuarios: [Usuario]
    usuario(identificacion: Int): Usuario
}
`
const listUsuarios = [
    {
        nombre: 'Ramon Castaño',
        identificacion: 123456789,
        estado: 'activo',
        email: 'ramon@gmail.com',
        perfil: 'estudiante'
    },
    {
        nombre: 'Ernesto',
        identificacion: 98765,
        estado: 'activo',
        email: 'ernesto@gmail.com',
        perfil: 'estudiante'
    },
    {
        nombre: 'Daniel Saavedra',
        identificacion: 12345,
        estado: 'activo',
        email: 'daniel@gmail.com',
        perfil: 'lider'
    },
]


const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: ( parent,args,context,info) => {
           return listUsuarios.find(user=> user.identificacion===args.identificacion)
        }
    }
}
const api = express();


const iniciarServidor =async () => {
    const api = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start()
    apollo.applyMiddleware({ app: api })
    api.use((request, response) => {
        response.send('Hola')
    })
    api.listen('9090',()=>console.log('Inicio server'))
}
iniciarServidor()