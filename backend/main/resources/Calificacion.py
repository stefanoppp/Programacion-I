from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import CalificacionModel


#Recurso Calificacion
class Calificacion(Resource):
   
    def get(self, id):
        calificacion = db.session.query(CalificacionModel).get_or_404(id)
        return calificacion.to_json_complete()
    
    def delete(self, id):
        
        calificacion = db.session.query(CalificacionModel).get_or_404(id)
        db.session.delete(calificacion)
        db.session.commit()
        return '', 204


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