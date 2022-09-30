import os
from flask import Flask
from dotenv import load_dotenv

#Importar librería flask_restful
from flask_restful import Api

#Importar SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

#Importar Flask JWT
from flask_jwt_extended import JWTManager

from flask_mail import Mail


#Inicializar API de Flask Restful
api = Api()

#Inicializar SQLAlchemy
db = SQLAlchemy()

#inicializar jwt
jwt = JWTManager()

mailsender = Mail()

def create_app():
    app = Flask(__name__)
    load_dotenv()    #Cargar a la API el Recurso Profesors e indicar ruta
    

    #Si no existe el archivo de base de datos crearlo (solo válido si se utiliza SQLite)
    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')#Url de configuración de base de datos
    
    import main.resources as resources
    db.init_app(app) #inicializamos la app con SQLAlchemy

    #Cargar a la API los recursos
   
    api.add_resource(resources.PoemasResource, '/poemas')
    api.add_resource(resources.CalificacionesResource, '/calificaciones')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    
    api.add_resource(resources.PoemaResource, '/poema/<id>')
    api.add_resource(resources.CalificacionResource, '/calificacion/<id>')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    
    api.init_app(app) #Cargar la aplicación en la API de Flask Restful

    #CARGAR LA CLAVE SECRETA JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    #CARGAR TIEMPO DE EXPIRACION DE LOS TOKENS
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    jwt.init_app(app)

    
    from main.auth import rutas                   ##rutas aparte de autentificacion no estan asociadas a un recurso
    #importar blueprint
    app.register_blueprint(rutas.auth) #nombre carpeta y nombre ruta

    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = os.getenv('MAIL_PORT')
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['FLASKY_MAIL_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')
    #Inicializar en app
    mailsender.init_app(app)
    
    return app
