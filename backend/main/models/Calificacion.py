from .. import db

class Calificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    valoracion = db.Column(db.String(100), nullable=False)
    comentario = db.Column(db.String(100), nullable=False)
    
    def __repr__(self):
        return '<Calificacion: %r %r >' % (self.valoracion, self.comentario)
    
    #Convertir objeto en JSON
    def to_json(self):
        calificacion_json = {
            'id': self.id,
            'valoracion': str(self.valoracion),
            'comentario': str(self.comentario)
        }
        return calificacion_json

    def to_json_short(self):
        calificacion_json = {
            'id': self.id,
            'comentario': str(self.comentario),

        }
        return calificacion_json
    
    @staticmethod
    #Convertir JSON a objeto
    def from_json(calificacion_json):
        id = calificacion_json.get('id')
        valoracion = calificacion_json.get('valoracion')
        comentario = calificacion_json.get('comentario')
        
        
        return Calificacion(id=id,
                    valoracion=valoracion,
                    comentario=comentario
                    )
