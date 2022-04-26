from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import UsuarioModel, PoemaModel, CalificacionModel
from sqlalchemy import func


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
    #Obtener lista de recursos                #primero los filtros y luego ordenamiento
    def get(self):
        page=1
        per_page=10
        usuarios = db.session.query(UsuarioModel)
        if request.get_json():
            filters=request.get_json().items()
            for key,value in filters:
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
                if key == "nombre":
                    usuarios = usuarios.filter(UsuarioModel.nombre.like("%"+value+"%")) #cualquier caracter antes y cualquier caracter despues del value, aunque sepa el nombre parcialmente nos va a traer lo que busquemos
                if key == "poemas_cant":
                    usuarios = usuarios.outerjoin(UsuarioModel.poemas).group_by(UsuarioModel.id).having(func.count(PoemaModel.id) > value)
                if key == "calificaciones_cant":
                    usuarios = usuarios.outerjoin(UsuarioModel.calificaciones).group_by(UsuarioModel.id).having(func.count(CalificacionModel.id) > value)
                if key == "order_by":
                    if value == "nombre[desc]": #ordena los nombres de la z-a
                        usuarios = usuarios.order_by(UsuarioModel.nombre.desc())
                    if value == "nombre": #ordena nombres de la a-z
                        usuarios = usuarios.order_by(UsuarioModel.nombre)
        usuarios = usuarios.paginate(page,per_page,True,10)
        return jsonify({ 
        'usuarios': [usuario.to_json() for usuario in usuarios.items],
        'total':usuarios.total,
        'paginas':usuarios.pages,
        'pagina':page
        })

    
    #Insertar recurso
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json()) #traemos los valores del json
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201

       