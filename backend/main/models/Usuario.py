from email.policy import default
from .. import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    admin = db.Column(db.Boolean,default=False, nullable=False)
    poemas = db.relationship('Poema', back_populates = "usuario", cascade = 'all, delete-orphan')
    calificaciones = db.relationship('Calificacion', back_populates = "usuario", cascade = 'all, delete-orphan')
    
    #Convertir objeto en JSON
    
    def to_json_complete(self):
        poemas = [poema.to_json() for poema in self.poemas] #como es una lista de poemas debo recorrerlos y convertirlos uno por uno a json
        calificaciones = [calificacion.to_json() for calificacion in self.calificaciones]
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'email': str(self.email),
            'admin': str(self.admin),
            'poemas': poemas,
            'calificaciones':calificaciones,
            'poemas_cant':len(poemas)
        }
        return usuario_json

    def to_json(self):
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'email': str(self.email),
            'poemas_cant':len(self.poemas),
            'calificaciones_cant':len(self.calificaciones)
        }
        return usuario_json
    
    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuario_json):
        id = usuario_json.get('id')
        nombre = usuario_json.get('nombre')
        email = usuario_json.get('email')
        contrasena = usuario_json.get('contrasena')
        admin = usuario_json.get('admin')
        
        return Usuario(id=id,
                    nombre=nombre,
                    email=email,
                    contrasena=contrasena,
                    admin = admin
                    )
