from flask_restful import Resource
from flask import request

#Diccionario de prueba
USUARIOS = {
    1: {'nombre': 'Pedro','mail':'pedro@hotmail.com','contrasena':'pedro1234'},
    2: {'nombre': 'Juan','mail':'juan@hotmail.com','contrasena':'juancito1234'},
}

#Recurso Usuario
class Usuario(Resource):
    #Obtener recurso
    def get(self, id):
        #Verificar que exista un Usuario con ese Id en diccionario
        if int(id) in USUARIOS:
            #Devolver usuario correspondiente
            return USUARIOS[int(id)]
        #Devolver error 404 en caso que no exista
        return 'no existe el usuario', 404
    #Eliminar recurso
    def delete(self, id):
        #Verificar que exista un Usuario con ese Id en diccionario
        if int(id) in USUARIOS:
            #Eliminar usuario del diccionario
            del USUARIOS[int(id)]
            return '', 204
        return 'no se pudo eliminar el usuario, ingrese id valido', 404
    #Modificar recurso
    def put(self, id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            #Obtengo los datos de la solicitud
            data = request.get_json()
            usuario.update(data)
            return usuario, 201
        return 'no se pudo actualizar el usuario, ingrese id valido', 404

#Recurso Usuarios
class Usuarios(Resource):
    #Obtener lista de recursos
    def get(self):
        return USUARIOS
    #Insertar recurso
    def post(self):
        #Obtener datos de la solicitud
        user = request.get_json()
        id = int(max(USUARIOS.keys())) + 1
        USUARIOS[id] = user
        return USUARIOS[id], 201