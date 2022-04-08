from email.policy import default
from .. import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    admin = db.Column(db.Boolean,default=False, nullable=False)
    poemas = db.relationship('Poema', back_populates = 'usuario', cascade = 'all, delete-orphan')
    
    def __repr__(self):
        return '<Usuario: %r %r >' % (self.nombre, self.email)
    
    #Convertir objeto en JSON
    def to_json(self):
        poemas = [poema.to_json_short() for poema in self.poemas]
        usuario_json = {
            'id': self.id,
            'nombre': str(self.nombre),
            'email': str(self.email),
            'admin': str(self.admin),
            'poemas':poemas
        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'id': self.id,
            'email': str(self.email),

        }
        return usuario_json
    
    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuario_json):
        id = usuario_json.get('id')
        nombre = usuario_json.get('nombre')
        email = usuario_json.get('email')
        contrasena = usuario_json.get('contrasena')
        
        return Usuario(id=id,
                    nombre=nombre,
                    email=email,
                    contrasena=contrasena
                    )
