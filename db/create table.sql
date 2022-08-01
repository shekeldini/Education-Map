CREATE TABLE IF NOT EXISTS region(
id_region SERIAL,
region_name VARCHAR (50) NOT NULL,
CONSTRAINT "K1" PRIMARY KEY (id_region)
);

CREATE TABLE IF NOT EXISTS district(
id_district INTEGER,
id_region INTEGER,
district_name VARCHAR(30) NOT NULL,
CONSTRAINT "K2" PRIMARY KEY (id_district),
CONSTRAINT "C1" FOREIGN KEY (id_region)
    REFERENCES region (id_region)
);

CREATE TABLE IF NOT EXISTS oo(
id_oo SERIAL,
oo_login VARCHAR(20) NOT NULL,
filial boolean default FALSE NOT NULL,
filial_number INTEGER,
id_district INTEGER NOT NULL,
oo_name text NOT NULL,
oo_address text NOT NULL,
director text NOT NULL,
email_oo text NOT NULL,
phone_number text NOT NULL,
key_ege INTEGER,
url text NOT NULL,
coordinates text NOT NULL,
show boolean default TRUE NOT NULL,
CONSTRAINT "K4" PRIMARY KEY (id_oo),
CONSTRAINT "C3" FOREIGN KEY (id_district)
    REFERENCES district (id_district)
);

CREATE TABLE IF NOT EXISTS digital(
oo_login VARCHAR(20) NOT NULL,
filial boolean NOT NULL,

CONSTRAINT "K4" PRIMARY KEY (oo_login, filial),
CONSTRAINT "C3" FOREIGN KEY (id_district)
    REFERENCES district (id_district)
);

CREATE TABLE IF NOT EXISTS roles(
id_role SERIAL,
role text NOT NULL,
UNIQUE (role),
CONSTRAINT "K5" PRIMARY KEY (id_role)
);

CREATE TABLE IF NOT EXISTS users(
id_user  SERIAL,
login text NOT NULL,
name text NOT NULL,
password text NOT NULL,
id_role INTEGER NOT NULL,
time integer NOT NULL,
UNIQUE (login),
CONSTRAINT "K6" PRIMARY KEY (id_user),
CONSTRAINT "C4" FOREIGN KEY (id_role)
    REFERENCES roles (id_role)
);
