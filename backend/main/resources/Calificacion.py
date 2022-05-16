from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import CalificacionModel
from flask_jwt_extended import jwt_required,get_jwt_identity,get_jwt


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
    def post(self):
        try:
            calificacion = CalificacionModel.from_json(request.get_json()) #traemos los valores del json
            db.session.add(calificacion)
            db.session.commit()
        except:
            return 'ingrese datos correctos',400
        return calificacion.to_json(), 201