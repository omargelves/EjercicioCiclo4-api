const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
var aes256 = require('aes256');

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
const key = 'CLAVEDIFICIL';

const resolvers = {
    Query: {
        usuarios: () => listUsuarios,
        usuario: (parent, args, context, info) => listUsuarios.find(user => user.identificacion === args.identificacion),
        proyectos: async () => await Project.find({}),
        getProject: async (parent, args, context, info)=> await Project.findOne({nombre:args.nombre}),
    },
    Mutation: {
        createUser: async (parent, args, context, info) => {
            const {clave} = args.user;
            const nuevoUsuario = new User(args.user);
            //const buffer = Buffer.from(plaintext);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            nuevoUsuario.save();
            return "Usuario creado"
        }
    }
}
module.exports = resolvers
