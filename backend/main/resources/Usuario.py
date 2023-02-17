from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import UsuarioModel, PoemaModel, CalificacionModel
from sqlalchemy import func
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decoradores import admin_required


#Recurso Usuario
class Usuario(Resource):
    
    @jwt_required(optional=True)
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        token_id = get_jwt_identity()
        claims = get_jwt()
        if token_id == usuario.id or claims['admin']:
            return usuario.to_json_complete()
        else:
            return usuario.to_json()
    
    @admin_required
    def delete(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return 'eliminacion exitosa', 204


    #Modificar recurso
    @jwt_required()
    def put(self, id):
        usuario = db.session.query(UsuarioModel).get_or_404(id)
        token_id = get_jwt_identity()
        claims = get_jwt()
        if token_id == usuario.id or claims['admin']:
            data = request.get_json().items()
            for key, value in data:
                setattr(usuario, key, value)
            db.session.add(usuario)
            db.session.commit()
            return usuario.to_json() , 201
        else:
            return 'No tiene permisos',403


#Recurso Usuarios
class Usuarios(Resource):
    #Obtener lista de recursos                #primero los filtros y luego ordenamiento
    @jwt_required(optional=True)
    def get(self):
        page=1
        per_page=10
        usuarios = db.session.query(UsuarioModel)
        nombre = request.args.get('nombre') #tomo el nombre por parametro y no por el cuerpo
        if nombre is not None:
            usuarios = usuarios.filter(UsuarioModel.nombre.like("%"+nombre+"%"))
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
                    if value == "poemas_cant":
                        usuarios = usuarios.outerjoin(UsuarioModel.poemas).group_by(UsuarioModel.id).order_by(func.count(PoemaModel.id))
                    if value == "poemas_cant[desc]":
                        usuarios = usuarios.outerjoin(UsuarioModel.poemas).group_by(UsuarioModel.id).order_by(func.count(PoemaModel.id).desc())
        usuarios = usuarios.paginate(page,per_page,True,10)
        return jsonify({ 
            'usuarios': [usuario.to_json() for usuario in usuarios.items],
            'total':usuarios.total,
            'paginas':usuarios.pages,
            'pagina':page
            })

    
    #Insertar recurso
    @admin_required
    def post(self):
        usuario = UsuarioModel.from_json(request.get_json()) #traemos los valores del json
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201

       