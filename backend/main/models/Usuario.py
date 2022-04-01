from .. import db

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    contrasena = db.Column(db.String(100), nullable=False)
    admin = db.Column(db.Boolean(), nullable=False)
    def __repr__(self):
        return '<Professor: %r %r >' % (self.firstname, self.lastname)
    #Convertir objeto en JSON
    def to_json(self):
        usuario_json = {
            'id': self.id,
            'firstname': str(self.firstname),
            'lastname': str(self.lastname),

        }
        return usuario_json

    def to_json_short(self):
        usuario_json = {
            'id': self.id,
            'lastname': str(self.lastname),

        }
        return usuario_json
    @staticmethod
    #Convertir JSON a objeto
    def from_json(usuario_json):
        id = usuario_json.get('id')
        firstname = usuario_json.get('firstname')
        lastname = usuario_json.get('lastname')
        return Usuario(id=id,
                    firstname=firstname,
                    lastname=lastname,
                    )
