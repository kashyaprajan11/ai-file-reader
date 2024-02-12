-- rambler up
create schema if not exists file_reader_public;

create extension if not exists pg_crypto;
create extension if not exists citext;
create extension if not exists pg_net;
create extension if not exists vector;

create role file_reader_anon; --anonomous user who isn't logged in or authenticated
create role file_reader_user; --user who is logged in

grant file_reader_anon to file_reader_user;

-- rambler down

revoke usage on schema file_reader_public from file_reader_user, file_reader_anon;

drop extension if exists vector;
drop extension if exists pg_net;
drop extension if exists citext;
drop extenstion if exists pg_crypto;

drop role if exists file_reader_user;
drop role if exists file_reader_anon;

drop schema if exists file_reader_public;