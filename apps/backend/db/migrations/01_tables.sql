-- rambler up

create table if not exists file_reader_public.user (
    id uuid primary key default gen_random_uuid(),
    email citext unique check(email ~ '[^@]+@[^@]+\.[^@]+'),
    password_hash text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists file_reader_public.document (
    id uuid primary key default gen_random_uuid(),
    key text not null,
    info jsonb default '{}' :: jsonb,
    creator_id uuid not null references file_reader_public.user(id),
    extension text not null check(char_length(extension) < 20),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists file_reader_public.document_sections (
    id uuid primary key default gen_random_uuid(),
    document_id uuid references file_reader_public.document(id),
    content text not null,
    embedding vector (384),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists file_reader_private.session (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
) WITH (OIDS=FALSE);
alter table file_reader_private.session add constraint "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- rambler down

alter table file_reader_private.session drop constraint "session_pkey";
drop table if exists file_reader_private.session;
drop table if exists file_reader_public.document_sections;
drop table if exists file_reader_public.document;
drop table if exists file_reader_public.user;
