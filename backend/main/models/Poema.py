from collections import UserList
from .. import db

class Poema(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    contenido = db.Column(db.String(100), nullable=False)
    usuario_id = db.Column(db.integer,db.ForeignKey('usuario.id'),nullable=False)
    usuario = db.relationship('usuario', back_populates = "Poemas", uselist=False, single_parent=True)

    
    def __repr__(self):
        return '<Poema: %r %r >' % (self.titulo, self.contenido)
    
    #Convertir objeto en JSON
    def to_json(self):
        poema_json = {
            'id': self.id,
            'titulo': str(self.titulo),
            'contenido': str(self.contenido)
            
        }
        return poema_json

    def to_json_short(self):        ##preguntar
        poema_json = {
            'id': self.id,
            'titulo': str(self.titulo),

        }
        return poema_json
    
    @staticmethod
    #Convertir JSON a objeto
    def from_json(poema_json):
        id = poema_json.get('id')
        titulo = poema_json.get('titulo')
        contenido = poema_json.get('contenido')
        
        return Poema(id=id,
                    titulo=titulo,
                    contenido=contenido
                    )