from datetime import datetime
from .. import db
from . import UsuarioModel



class Poema(db.Model):
    id = db.Column(db.Integer, primary_key=True) #contenido base de datos
    titulo = db.Column(db.String(100), nullable=False) #contenido base de datos
    contenido = db.Column(db.String(100), nullable=False) #contenido base de datos
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.now() ) #contenido base de datos
    usuarioId = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False) # establezco la relacion con la fk
    usuario = db.relationship('Usuario',back_populates = "poemas", uselist=False, single_parent=True) #relacion, en back_populates le indico con que atributo se esta relacionando, en el archivo poema con el atributo poemas del archivo de usuario
    calificaciones = db.relationship('Calificacion', back_populates = "poema", cascade = 'all, delete-orphan')
    
    
    #Convertir objeto en JSON
    def to_json_complete(self):
        self.usuario = db.session.query(UsuarioModel).get_or_404(self.usuarioId)
        calificaciones = [calificacion.to_json() for calificacion in self.calificaciones] ##agarro de la clase poema las calificaciones y transformo una por una en json
        poema_json = { 
            'id': self.id,
            'titulo': str(self.titulo),
            'contenido': str(self.contenido),
            'fecha':str(self.fecha.strftime("%d-%m-%Y/%H:%M:%S")),
            'usuario': self.usuario.to_json(),  #al ser un usuario solo convierto uno (no tengo una lista por lo cual no debo recorrer nada)   
            'calificacion': calificaciones
        }
        return poema_json

    def to_json(self):        ##preguntar
        poema_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'contenido':str(self.contenido),
            'fecha':str(self.fecha.strftime("%d-%m-%Y/%H:%M:%S")),
        }
        return poema_json
    
    @staticmethod
    #Convertir JSON a objeto
    def from_json(poema_json):
        #db.session.query(UsuarioModel).get_or_404(usuarioId)
        id = poema_json.get('id')
        titulo = poema_json.get('titulo')
        contenido = poema_json.get('contenido')
        usuarioId = poema_json.get('usuarioId')
        
        return Poema(id=id,
                    titulo=titulo,
                    contenido=contenido,
                    usuarioId=usuarioId
                    )