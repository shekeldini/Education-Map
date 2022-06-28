create table if not exists digital_environment(
oo_login text,
year varchar(4),
oo_name text,
oo_address text,
director text,
email_oo text,
phone_number text,
coordinates text,
url text,
district_name text,
CONSTRAINT "digital_environment_primary_key" PRIMARY KEY (oo_login, year),
CONSTRAINT "digital_environment_oo_login_foreign_key" FOREIGN KEY ("oo_login")
    REFERENCES "oo_logins" ("oo_login") ON DELETE CASCADE
);