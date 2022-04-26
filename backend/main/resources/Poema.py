from flask_restful import Resource
from flask import request,jsonify
from .. import db
from main.models import PoemaModel,UsuarioModel,CalificacionModel
from sqlalchemy import func


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
        page=1
        per_page=10
        poemas = db.session.query(PoemaModel)
        usuarios = db.session.query(UsuarioModel)
        calificaciones = db.session.query(CalificacionModel)
        if request.get_json():
            filters=request.get_json().items()
            for key,value in filters:
                if key == "page":
                    page = int(value)
                if key == "per_page":
                    per_page = int(value)
                if key == "titulo":
                   poemas =poemas.filter(PoemaModel.titulo.like("%"+value+"%")) #cualquier caracter antes y cualquier caracter despues del value, aunque sepa el nombre parcialmente nos va a traer lo que busquemos
                if key == "nombre":
                   poemas = usuarios.filter(UsuarioModel.nombre.like("%"+value+"%"))
                if key == "poemas_cant":
                   poemas = poemas.outerjoin(PoemaModel.usuario).group_by(PoemaModel.id).having(func.count(PoemaModel.id) > value)
                if key == "calificaciones_cant":
                    poemas =poemas.outerjoin(PoemaModel.calificaciones).group_by(PoemaModel.id).having(func.count(CalificacionModel.id) > value)
                if key == "valoracion":
                    poemas = calificaciones.filter(CalificacionModel.valoracion == value)
                if key == "fecha":
                    poemas = poemas.filter(PoemaModel.fecha == value)
                if key == "order_by":
                    if value == "titulo[desc]": #ordena los titulos de la z-a
                       poemas = poemas.order_by(PoemaModel.titulo.desc())
                    if value == "titulo": #ordena titulos de la a-z
                       poemas = poemas.order_by(PoemaModel.titulo)
                    if value == "calificaciones[desc]":
                        poemas = calificaciones.order_by(CalificacionModel.valoracion.desc())
                    if value == "calificaciones":
                        poemas = calificaciones.order_by(CalificacionModel.valoracion)
                    if value == "fecha[desc]":
                        poemas = poemas.order_by(PoemaModel.fecha.desc())
                    if value == "fecha":
                        poemas = poemas.order_by(PoemaModel.fecha)
        poemas=poemas.paginate(page,per_page,True,10)
        return jsonify({ 
            'poemas':[poema.to_json() for poema in poemas.items],
            'total':poemas.total,
            'paginas':poemas.pages,
            'pagina':page
            })

    
    #Insertar recurso
    def post(self):
        try:
            poema = PoemaModel.from_json(request.get_json()) #traemos los valores del json
            db.session.add(poema)
            db.session.commit()
        except:
            return 'usuario inexistente',400
        return poema.to_json(), 201
       