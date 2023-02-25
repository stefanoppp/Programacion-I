from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PoemaModel,UsuarioModel,CalificacionModel
from sqlalchemy import desc, func
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from pprint import pprint

#Recurso Poema
class Poema(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        poema = db.session.query(PoemaModel).get_or_404(id)
        return poema.to_json_complete()
    
    @jwt_required() #tengo q verificar si el usuario es el dueño del poema
    def delete(self, id):
        usuario_id = get_jwt_identity()#extrae el id del usuario que esta en el token
        poema = db.session.query(PoemaModel).get_or_404(id)
        claims = get_jwt()
        if poema.usuarioId == usuario_id or claims['admin']: #igualo del campo usuarioId con el token usuario_id
            db.session.delete(poema)
            db.session.commit()
            return 'eliminacion exitosa', 204
        else:
            return 'permiso denegado',403


    #Modificar recurso
    @jwt_required()
    def put(self, id):
        poema = db.session.query(PoemaModel).get_or_404(id)
        data = request.get_json().items()
        token_id = get_jwt_identity()
        claims = get_jwt()
        if poema.usuarioId == token_id or claims['admin']:
            data = request.get_json().items()
            for key, value in data:
                setattr(poema, key, value)
            db.session.add(poema)
            db.session.commit()
            return poema.to_json() , 201
        else:
            return 'No tiene permisos',403


#Recurso Poemas
class Poemas(Resource):
    #Obtener lista de recursos     
    @jwt_required(optional=True)
    def get(self):
        page= request.args.get('page',default=1,type=int)
        per_page= request.args.get('per_page',default=10,type=int)
        order_by= request.args.get('order_by',type=str)
        titulo= request.args.get('titulo',type=str)
        print(page,per_page,order_by)
        #usuario_id = get_jwt_identity() #puede q el valor este lleno o no, por lo que hay q hacer un if
        poemas = db.session.query(PoemaModel)
        #usuarios = db.session.query(UsuarioModel)
            # if key == "titulo":
            #     poemas =poemas.filter(PoemaModel.titulo.like("%"+value+"%")) #cualquier caracter antes y cualquier caracter despues del value, aunque sepa el nombre parcialmente nos va a traer lo que busquemos
            # if key == "nombre":
            #     poemas = usuarios.filter(UsuarioModel.nombre.like("%"+value+"%"))
            # if key == "poemas_cant":
            #     poemas = poemas.outerjoin(PoemaModel.usuario).group_by(PoemaModel.id).having(func.count(PoemaModel.id) > value)
            # if key == "calificaciones_cant":
            #     poemas = poemas.outerjoin(PoemaModel.calificaciones).group_by(PoemaModel.id).having(func.count(CalificacionModel.id) > value)
            # if key == "valoracion":
            #     poemas = calificaciones.filter(CalificacionModel.valoracion == value)
            # if key == "fecha":
            #     poemas = poemas.filtessssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssr(PoemaModel.fecha == value)
        order_by = request.args.get('order_by')
        if titulo:
            poemas = poemas.filter(PoemaModel.titulo.like("%"+titulo+"%")) #cualquier caracter antes y cualquier caracter despues del value, aunque sepa el nombre parcialmente nos va a traer lo que busquemos

        if order_by:
            if order_by == "titulo[asc]":
                poemas = poemas.order_by(PoemaModel.titulo)
            elif order_by == "titulo[desc]":
                poemas = poemas.order_by(PoemaModel.titulo.desc())
            if order_by == "calificaciones[desc]":
                poemas = (
                    PoemaModel.query
                    .outerjoin(CalificacionModel)
                    .group_by(PoemaModel.id)
                    .order_by(desc(func.avg(CalificacionModel.valoracion)))
                )

            if order_by == "calificaciones[asc]":
                poemas = (
                    PoemaModel.query
                    .outerjoin(CalificacionModel)
                    .group_by(PoemaModel.id)
                    .order_by(func.avg(CalificacionModel.valoracion))
                )
            elif order_by == "fecha[asc]":
                poemas = poemas.order_by(PoemaModel.fecha)
            elif order_by == "fecha[desc]":
                poemas = poemas.order_by(PoemaModel.fecha.desc())


        print(poemas)
        poemas=poemas.paginate(page,per_page,True) # era 10 por defecto

        pprint(vars(poemas))
        return jsonify({ 
            'poemas':[poema.to_json_complete() for poema in poemas.items],
            'total':poemas.total,
            'paginas':poemas.pages,
            'pagina':page
            })

    #Insertar recurso
    @jwt_required()
    def post(self):  
        poema = PoemaModel.from_json(request.get_json()) #traemos los valores del json
        usuario_id = get_jwt_identity()      #guardo token en usuario_id
        usuario=db.session.query(UsuarioModel).get_or_404(usuario_id)
        poema.usuarioId = usuario_id  #el dueño del token va a ser el creador del poema
        poemas_cant = len(usuario.poemas)
        calificaciones_cant = len(usuario.calificaciones)
        if calificaciones_cant >= (poemas_cant*3):
            db.session.add(poema)
            db.session.commit()
            return poema.to_json(), 201
        else:
            return 'Este usuario necesita realizar mas calificaciones',403
            #'usuario inexistente',400
