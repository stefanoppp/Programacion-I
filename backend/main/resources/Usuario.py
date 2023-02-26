from sqlite3 import IntegrityError
from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import UsuarioModel, PoemaModel, CalificacionModel
from sqlalchemy import func
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.auth.decoradores import admin_required
from werkzeug.security import generate_password_hash, check_password_hash


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
            data = request.get_json()
            correo_existente = db.session.query(UsuarioModel).filter_by(email=data.get('email')).first()
            if correo_existente and correo_existente.id != usuario.id:
                return {'error': 'El correo electrónico ya está en uso por otro usuario'}, 400
            if 'contrasena' in data:
                nueva_contrasena = data.pop('contrasena')
                usuario.contrasena = generate_password_hash(nueva_contrasena)
            for key, value in data.items():
                setattr(usuario, key, value)
            db.session.add(usuario)
            db.session.commit()
            return usuario.to_json(), 201
        else:
            return 'No tiene permisos', 403



#Recurso Usuarios
class Usuarios(Resource):
    #Obtener lista de recursos                #primero los filtros y luego ordenamiento
    @jwt_required(optional=True)
    def get(self):
        page= request.args.get('page',default=1,type=int)
        per_page= request.args.get('per_page',default=10,type=int)
        order_by= request.args.get('order_by',type=str)
        nombre = request.args.get('nombre') #tomo el nombre por parametro y no por el cuerpo
        usuarios = db.session.query(UsuarioModel)
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
        if  order_by:
                if order_by == "nombre[desc]": #ordena los nombres de la z-a
                    usuarios = usuarios.order_by(UsuarioModel.nombre.desc())
                if order_by == "nombre[asc]": #ordena nombres de la a-z
                    usuarios = usuarios.order_by(UsuarioModel.nombre)
                if order_by == "poemas_cant[asc]":
                    usuarios = usuarios.outerjoin(UsuarioModel.poemas).group_by(UsuarioModel.id).order_by(func.count(PoemaModel.id))
                if order_by == "poemas_cant[desc]":
                    usuarios = usuarios.outerjoin(UsuarioModel.poemas).group_by(UsuarioModel.id).order_by(func.count(PoemaModel.id).desc())
                if order_by == "calificaciones_cant[asc]":
                    usuarios = usuarios.outerjoin(UsuarioModel.calificaciones).group_by(UsuarioModel.id).order_by(func.count(CalificacionModel.id))
                if order_by == "calificaciones_cant[desc]":
                    usuarios = usuarios.outerjoin(UsuarioModel.calificaciones).group_by(UsuarioModel.id).order_by(func.count(CalificacionModel.id).desc())
        usuarios = usuarios.paginate(page,per_page,True,10)
        return jsonify({ 
            'usuarios': [usuario.to_json() for usuario in usuarios.items],
            'total':usuarios.total,
            'paginas':usuarios.pages,
            'pagina':page
            })

    
    #Insertar recurso
    def post(self):
        data = request.get_json()
        usuario = UsuarioModel.from_json(data)
        if 'contrasena' in data:
            nueva_contrasena = data.pop('contrasena')
            usuario.contrasena = generate_password_hash(nueva_contrasena)
        if UsuarioModel.query.filter_by(email=usuario.email).first() is not None:
            return {'mensaje': 'El correo electrónico ya está en uso'}, 400
        db.session.add(usuario)
        db.session.commit()
        return usuario.to_json(), 201
    
    

        