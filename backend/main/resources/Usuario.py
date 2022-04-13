from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import UsuarioModel


#Recurso Usuario
class Usuario(Resource):
   
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        return usuario.to_json_complete()
    
    def delete(self, id):
        
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return 'eliminacion exitosa', 204


    #Modificar recurso
    def put(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(usuario, key, value)
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json() , 201


#Recurso Usuarios
class Usuarios(Resource):
    #Obtener lista de recursos
    def get(self):
        usuarios = db.session.query(UsuarioModel).all()
        return jsonify({ 'usuarios': [usuario.to_json() for usuario in usuarios] })

    
    #Insertar recurso
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json()) #traemos los valores del json
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201

       