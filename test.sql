-- Table: public.tbl_admin

-- DROP TABLE IF EXISTS public.tbl_admin;

CREATE TABLE
IF NOT EXISTS public.tbl_admin
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    full_name character varying
(128) COLLATE pg_catalog."default",
    email_id character varying
(128) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    createdon_date timestamp
with time zone,
    updatedon_date timestamp
with time zone,
    status_enum_id bigint,
    user_type_enum_id bigint,
    CONSTRAINT tbl_admin_pkey PRIMARY KEY
(id),
    CONSTRAINT tbl_admin_emailid_key UNIQUE
(email_id)
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public.tbl_admin
    OWNER to postgres;




-- Table: public.tbl_customer

-- DROP TABLE IF EXISTS public.tbl_customer;

CREATE TABLE
IF NOT EXISTS public.tbl_customer
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY
( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    full_name character varying
(128) COLLATE pg_catalog."default",
    email_id character varying
(64) COLLATE pg_catalog."default",
    profile_picture character varying COLLATE pg_catalog."default",
    hash_password character varying COLLATE pg_catalog."default",
    account_status boolean,
    createdon_date timestamp
with time zone,
    updatedon_date timestamp
with time zone,
    token character varying COLLATE pg_catalog."default",
    phone_number character varying
(64) COLLATE pg_catalog."default",
    updated_by bigint,
    created_by bigint,
    CONSTRAINT pk_customer PRIMARY KEY
(id),
    CONSTRAINT tbl_customer_email_id_key UNIQUE
(email_id),
    CONSTRAINT tbl_customer_phone_no_key UNIQUE
(phone_number)
)

TABLESPACE pg_default;

ALTER TABLE
IF EXISTS public.tbl_customer
    OWNER to postgres;