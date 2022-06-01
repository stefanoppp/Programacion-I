from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import CalificacionModel,PoemaModel
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt
from main.mail.functions import sendmail


#Recurso Calificacion
class Calificacion(Resource):
    @jwt_required(optional=True)
    def get(self, id):
        calificacion = db.session.query(CalificacionModel).get_or_404(id)
        return calificacion.to_json_complete()
    
    @jwt_required()
    def delete(self, id):
        usuario_id = get_jwt_identity()
        calificacion = db.session.query(CalificacionModel).get_or_404(id)
        claims = get_jwt()
        if calificacion.usuarioId == usuario_id or claims['admin']: #verifico si el usuario es el dueño de la calificacion o si es el admin y puedo proceder a eliminarla
            db.session.delete(calificacion)
            db.session.commit()
            return 'eliminacion exitosa', 204
        else:
            return 'permiso denegado',403


    #Modificar recurso
    def put(self, id):
        calificacion = db.session.query(CalificacionModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(calificacion, key, value)
        db.session.add(calificacion)
        db.session.commit()
        return calificacion.to_json() , 201


#Recurso Calificaciones
class Calificaciones(Resource):
    #Obtener lista de recursos
    @jwt_required(optional=True)
    def get(self):
        page=1
        per_page=10
        calificaciones = db.session.query(CalificacionModel)
        if request.get_json():
            filters=request.get_json().items()
            for key,value in filters:
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
                if key == "valoracion":
                    calificaciones = calificaciones.filter(CalificacionModel.valoracion == value)
                if key == "order_by":
                    if value == "valoracion[desc]":
                        calificaciones = calificaciones.order_by(CalificacionModel.valoracion.desc())
                    if value == "valoracion":
                        calificaciones = calificaciones.order_by(CalificacionModel.valoracion)

        calificaciones = calificaciones.paginate(page,per_page,True,10)
        return jsonify({ 
            'calificaciones':[calificacion.to_json() for calificacion in calificaciones.items],
            'total':calificaciones.total,
            'paginas':calificaciones.pages,
            'pagina':page
            })

    
    #Insertar recurso
    @jwt_required()
    def post(self):  ##agregar condicion de que un usuario pueda agregar otro poema si ha realizado 3 calificaciones
            calificacion = CalificacionModel.from_json(request.get_json()) #traemos los valores del json
            #print(calificacion.poemaId)
            usuario_id = get_jwt_identity()
            calificacion.usuarioId = usuario_id #Agrega la calificacion al dueno del token
            poema = db.session.query(PoemaModel).get_or_404(calificacion.poemaId) ##traigo modelo poema para trabajar con sus atributos
            if poema.usuarioId == usuario_id:      ## compruebo que sea el usuario logeado con el jwt
                return 'No se puede calificar su propio poema'
            else:
                db.session.add(calificacion)
                db.session.commit()
            return calificacion.to_json(), 201