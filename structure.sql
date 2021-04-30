CREATE DATABASE IF NOT EXISTS pc_components;
USE pc_components;

CREATE TABLE users(
id       int(10) auto_increment not null,
name   varchar(50) not null,
last_name    varchar(50) not null,
documento   int(11) not null,
tipo_documento_id  int(11) not null,
email    varchar(50) not null,
pass    varchar(50) not null,
condicion_fiscal_id int(11) not null,
razon_social varchar(50) not null,
telefono int(11),
ofertas int(11),
tipo_persona_id int(11) not null,
dom_calle varchar(50) not null,
dom_cp varchar(50) not null,
dom_localidad varchar(50) not null,
dom_provincia_id int(11) not null,
dom_pais_id int(11) not null,
dom_env_calle varchar(50),
dom_env_cp varchar(50),
dom_env_localidad varchar(50),
dom_env_provincia_id int(11),
dom_env_pais_id int(11),
mail_confirmado int(11),
compra_id int(11),
createdAt date,
updatedAt date,
CONSTRAINT pk_users PRIMARY KEY(id),
CONSTRAINT fk_tipo_documento FOREIGN KEY(tipo_documento_id) REFERENCES tipos_documento(id),
CONSTRAINT fk_condicion_fiscal FOREIGN KEY(condicion_fiscal_id) REFERENCES condiciones_fiscales(id),
CONSTRAINT fk_tipo_persona FOREIGN KEY(tipo_persona_id) REFERENCES tipos_personas(id),
CONSTRAINT fk_dom_provincia FOREIGN KEY(dom_provincia_id) REFERENCES provincias(id),
CONSTRAINT fk_dom_pais FOREIGN KEY(dom_pais_id) REFERENCES paises(id),
CONSTRAINT fk_dom_env_provincia FOREIGN KEY(dom_env_provincia_id) REFERENCES provincias(id),
CONSTRAINT fk_dom_env_pais FOREIGN KEY(dom_env_pais_id) REFERENCES paises(id),
CONSTRAINT fk_compras FOREIGN KEY(compra_id) REFERENCES compras(id)
)ENGINE=InnoDB;

CREATE TABLE tipos_personas(
id       int(10) auto_increment not null,
nombre   varchar(20) not null,
CONSTRAINT pk_tipos_personas PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE tipos_documento(
id       int(10) auto_increment not null,
nombre   varchar(20) not null,
CONSTRAINT pk_tipos_documento PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE provincias(
id              int(10) auto_increment not null,  
pais_id     int(10) not null,  
nombre          varchar(20) not null,
CONSTRAINT pk_provincias PRIMARY KEY(id),
CONSTRAINT fk_pais FOREIGN KEY(pais_id) REFERENCES paises(id)
)ENGINE=InnoDB;

CREATE TABLE paises(
id              int(10) auto_increment not null,  
nombre          varchar(20) not null,
CONSTRAINT pk_paises PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE productos(
id       int(10) auto_increment not null,
nombre   varchar(20) not null,
createdAt date,
updatedAt date,
CONSTRAINT pk_productos PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE pedidos(
id       int(10) auto_increment not null,
cantidad   int(11) not null,
producto_id	int(11) not null,
createdAt date,
updatedAt date,
CONSTRAINT pk_pedidos PRIMARY KEY(id),
CONSTRAINT fk_productos FOREIGN KEY(producto_id) REFERENCES productos(id)
)ENGINE=InnoDB;

CREATE TABLE condiciones_fiscales(
id       int(10) auto_increment not null,
nombre   varchar(20) not null,
CONSTRAINT pk_condiciones_fiscales PRIMARY KEY(id)
)ENGINE=InnoDB;

CREATE TABLE compras(
id       int(10) auto_increment not null,
precio_historico   int(11) not null,
carrito_id	int(11) not null,
fecha date,
createdAt date,
updatedAt date,
CONSTRAINT pk_compras PRIMARY KEY(id),
CONSTRAINT fk_carritos FOREIGN KEY(carrito_id) REFERENCES carritos(id)
)ENGINE=InnoDB;

CREATE TABLE carritos(
id       int(10) auto_increment not null,
status   int(11) not null,
pedido_id	int(11) not null,
createdAt date,
updatedAt date,
CONSTRAINT pk_carrito PRIMARY KEY(id),
CONSTRAINT fk_pedidos FOREIGN KEY(pedido_id) REFERENCES pedidos(id)
)ENGINE=InnoDB;


#RELLENAR LA BASE DE DATOS CON INFORMACIÓN - INSERTS#

#USERS
INSERT INTO users VALUES(NULL, 'Rodrigo', 'Marsan', 25838149, 1,
'rodrigo@roma-it.com.ar','123456', 3,'MARSAN',4444444,1,1,'viamonte','1414','olivos',
1,1,null,null,null,null,null,1,1,
CURDATE(),CURDATE()
);


#CONDICIONES FISCALES
INSERT INTO condiciones_fiscales VALUES(NULL, 'Consumidor Final');
INSERT INTO condiciones_fiscales VALUES(NULL, 'RI');
INSERT INTO condiciones_fiscales VALUES(NULL, 'Monotributista');


#PAISES
INSERT INTO paises VALUES(NULL, 'Argentina');
INSERT INTO paises VALUES(NULL, 'Brasil');
INSERT INTO paises VALUES(NULL, 'Uruguay');

#PROVINCIAS
INSERT INTO provincias VALUES(NULL, 1, 'Buenos Aires');
INSERT INTO provincias VALUES(NULL, 1,'CABA');
INSERT INTO provincias VALUES(NULL, 1,'Córdoba');
INSERT INTO provincias VALUES(NULL, 1,'Santa Fe');
INSERT INTO provincias VALUES(NULL, 2,'San Pablo');

#TIPOS DOCUMENTO
INSERT INTO tipos_documento VALUES(NULL, 'DNI');
INSERT INTO tipos_documento VALUES(NULL, 'PASAPORTE');
INSERT INTO tipos_documento VALUES(NULL, 'LE');

#TIPOS PERSONA
INSERT INTO tipos_personas VALUES(NULL, 'HUMANA');
INSERT INTO tipos_personas VALUES(NULL, 'JURIDICA');

#PRODUCTOS
INSERT INTO productos VALUES(NULL, 'CPU', curdate(), CURDATE());

#PEDIDOS
INSERT INTO pedidos VALUES(NULL, 4, 1, CURDATE(),CURDATE());

#CARRITOS
INSERT INTO carritos VALUES(NULL, 1, 1, CURDATE(),CURDATE());

#COMPRAS
INSERT INTO compras VALUES(NULL, 10, 1, CURDATE(),CURDATE(),CURDATE());
