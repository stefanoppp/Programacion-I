from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PoemaModel


#Recurso Poema
class Poema(Resource):
   
    def get(self, id):
        poema = db.session.query(PoemaModel).get_or_404(id)
        return poema.to_json_complete()
    
    def delete(self, id):
        
        poema = db.session.query(PoemaModel).get_or_404(id)
        db.session.delete(poema)
        db.session.commit()
        return 'eliminacion exitosa', 204


    #Modificar recurso
    def put(self, id):
        poema = db.session.query(PoemaModel).get_or_404(id)
        data = request.get_json().items()
        for key, value in data:
            setattr(poema, key, value)
        db.session.add(poema)
        db.session.commit()
        return poema.to_json() , 201


#Recurso Poemas
class Poemas(Resource):
    #Obtener lista de recursos
    def get(self):
        poemas = db.session.query(PoemaModel).all()
        return jsonify({ 'poemas':[poema.to_json() for poema in poemas] })

    
    #Insertar recurso
    def post(self):
        try:
            poema = PoemaModel.from_json(request.get_json()) #traemos los valores del json
            db.session.add(poema)
            db.session.commit()
            return poema.to_json(), 201
        except:
            return 'usuario inexistente',400

       