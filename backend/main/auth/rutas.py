from flask import request, Blueprint
from .. import db
from main.models import UsuarioModel
from flask_jwt_extended import create_access_token

#Blueprint para acceder a los métodos de autenticación
auth = Blueprint('auth', __name__, url_prefix='/auth')      #cuando quiero acceder por afuera seria http://127.0.0.1:5000/auth/login le ponemos el prefijo q queramos. Es menos eficiente para trabajar
                                                        
#Método de logueo
@auth.route('/login', methods=['POST'])
def login():
    #Busca al usuario en la db por mail
    usuario = db.session.query(UsuarioModel).filter(UsuarioModel.email == request.get_json().get("email")).first_or_404()
    #Valida la contraseña
    if usuario.validate_pass(request.get_json().get("contrasena")):
        #Genera un nuevo token
        #Pasa el objeto usuario como identidad
        access_token = create_access_token(identity=usuario)
        #Devolver valores y token
        data = {
            'id': str(usuario.id),
            'nombre': usuario.nombre,
            'email': usuario.email,
            'access_token': access_token,
            'admin': usuario.admin
        }

        return data, 200
    else:
        return 'Contraseña incorrecta', 401

