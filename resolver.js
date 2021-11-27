const Project = require('./model/proyectoModel')
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
        usuario: (parent, args, context, info) => listUsuarios.find(user => user.identificacion === args.identificacion),
        proyectos: async () => await Project.find({})
    }
}
module.exports = resolvers
