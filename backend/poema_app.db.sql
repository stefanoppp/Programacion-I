BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "usuario" (
	"id"	INTEGER NOT NULL,
	"nombre"	VARCHAR(100) NOT NULL,
	"email"	VARCHAR(100) NOT NULL,
	"contrasena"	VARCHAR(100) NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "poema" (
	"id"	INTEGER NOT NULL,
	"titulo"	VARCHAR(100) NOT NULL,
	"contenido"	VARCHAR(100) NOT NULL,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "calificacion" (
	"id"	INTEGER NOT NULL,
	"valoracion"	VARCHAR(100) NOT NULL,
	"comentario"	VARCHAR(100) NOT NULL,
	PRIMARY KEY("id")
);
INSERT INTO "usuario" VALUES (1,'Fernando','fer@hotmail.com','fer123');
INSERT INTO "usuario" VALUES (2,'Juan Esteban','juan@hotmail.com','juan123');
INSERT INTO "usuario" VALUES (3,'Luis','luisito@hotmail.com','luissss');
INSERT INTO "poema" VALUES (1,'poema de verano','Lorem ipsum dolor sit amet');
INSERT INTO "poema" VALUES (2,'locuras','consectetur adipiscing eli');
INSERT INTO "calificacion" VALUES (1,'4','excelente poema');
INSERT INTO "calificacion" VALUES (2,'2','increible poema');
INSERT INTO "calificacion" VALUES (3,'1','no me gustó');
COMMIT;
