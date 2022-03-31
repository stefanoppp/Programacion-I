from flask_restful import Resource
from flask import request

#Diccionario de prueba
CALIFICACIONES = {
    1: {'valoracion': '4', 'feedback': 'excelente poema'},
    2: {'valoracion': '5', 'feedback': 'falta inspiracion'},
}


class Calificacion(Resource):
    def get(self, id):
        if int(id) in CALIFICACIONES:
            return CALIFICACIONES[int(id)]
        return 'no se ha encontrado la calificacion', 404
    
    def delete(self, id):
        if int(id) in CALIFICACIONES:
            del CALIFICACIONES[int(id)]
            return '', 204
        return 'no se pudo eliminar la calificacion, ingrese id valido', 404
    def put(self, id):
        if int(id) in CALIFICACIONES:
            calificacion = CALIFICACIONES[int(id)]
            data = request.get_json()
            calificacion.update(data)
            return calificacion, 201
        return 'no se pudo actualizar la califiacion, ingrese id valido', 404

class Calificaciones(Resource):
    def get(self):
        return CALIFICACIONES
    def post(self):
        calificacion = request.get_json()
        id = int(max(CALIFICACIONES.keys())) + 1
        CALIFICACIONES[id] = calificacion
        return CALIFICACIONES[id], 201