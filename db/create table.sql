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
id_oo INTEGER NOT NULL,
cos2020 boolean NOT NULL,
cos2021 boolean NOT NULL,
cos2022 boolean NOT NULL,
osnash boolean NOT NULL,
klass INTEGER NOT NULL,
klass_smart INTEGER NOT NULL,
klass_ik INTEGER NOT NULL,
arm_ped INTEGER NOT NULL,
arm_adm INTEGER NOT NULL,
i_panel INTEGER NOT NULL,
notebook INTEGER NOT NULL,
mfu INTEGER NOT NULL,
ped_notebook INTEGER NOT NULL,
adm_notebook INTEGER NOT NULL,
server INTEGER NOT NULL,
smart_tv INTEGER NOT NULL,
ip_camera INTEGER NOT NULL,
ik INTEGER NOT NULL,
CONSTRAINT "K7" PRIMARY KEY (id_oo),
CONSTRAINT "C5" FOREIGN KEY (id_oo)
    REFERENCES oo (id_oo)
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

CREATE TABLE IF NOT EXISTS subject(
id SERIAL,
name text NOT NULL,
UNIQUE (name),
CONSTRAINT "K8" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ege(
id_oo INTEGER NOT NULL,
id_subject INTEGER NOT NULL,
low FLOAT,
medium FLOAT,
high FLOAT,
CONSTRAINT "K9" PRIMARY KEY (id_oo, id_subject),
CONSTRAINT "C6" FOREIGN KEY (id_subject)
    REFERENCES subject (id),
CONSTRAINT "C7" FOREIGN KEY (id_oo)
    REFERENCES oo (id_oo)
);

CREATE TABLE IF NOT EXISTS vpr(
id_oo INTEGER NOT NULL,
id_subject INTEGER NOT NULL,
parallel INTEGER NOT NULL,
low FLOAT,
medium FLOAT,
high FLOAT,
CONSTRAINT "K10" PRIMARY KEY (id_oo, id_subject, parallel),
CONSTRAINT "C8" FOREIGN KEY (id_subject)
    REFERENCES subject (id),
CONSTRAINT "C9" FOREIGN KEY (id_oo)
    REFERENCES oo (id_oo)
);