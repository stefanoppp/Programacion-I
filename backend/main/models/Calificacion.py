from .. import db
from . import UsuarioModel, PoemaModel

class Calificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    valoracion = db.Column(db.String(100), nullable=False)
    comentario = db.Column(db.String(100), nullable=False)
    usuarioId = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    poemaId = db.Column(db.Integer, db.ForeignKey('poema.id'), nullable=False)
    usuario = db.relationship('Usuario',back_populates = "calificaciones", uselist=False, single_parent=True)
    poema = db.relationship('Poema',back_populates = "calificaciones", uselist=False, single_parent=True)

    
    #Convertir objeto en JSON
    def to_json_complete(self):
        #self.usuario = db.session.query(UsuarioModel).get_or_404(self.usuarioId)
        #self.poema = db.session.query(PoemaModel).get_or_404(self.usuarioId)
        calificacion_json = {
            'id': self.id,
            'valoracion': str(self.valoracion),
            'comentario': str(self.comentario),
            'usuario': self.usuario.to_json(),
            'poema': self.poema.to_json()
        }
        return calificacion_json

    def to_json(self):
        calificacion_json = {
            'id': self.id,
            'valoracion': str(self.valoracion),
            'comentario': str(self.comentario),
        }
        return calificacion_json
    
    @staticmethod
    #Convertir JSON a objeto
    def from_json(calificacion_json):
        id = calificacion_json.get('id')
        valoracion = calificacion_json.get('valoracion')
        comentario = calificacion_json.get('comentario')
        usuarioId = calificacion_json.get('usuarioId')
        poemaId = calificacion_json.get('poemaId')
        
        
        return Calificacion(id = id,
                    valoracion = valoracion,
                    comentario = comentario,
                    usuarioId = usuarioId,
                    poemaId = poemaId
                    )
