-- rambler up

create table if not exists file_reader_public.document (
    id uuid primary key default gen_random_uuid(),
    key text not null,
    info jsonb default '{}' :: jsonb,
    extension text not null check(char_length(extension) < 20),
    created_at timestampz not null default now(),
    updated_at timestampz not null default now()
)

create table if not exists file_reader_public.document_sections (
    id uuid primary key default gen_random_uuid(),
    document_id uuid references file_reader_public.document(id),
    content text not null,
    embedding vector (384)
    created_at timestampz not null default now(),
    updated_at timestampz not null default now()
)

create table if not exists file_reader_public.user (
    id uuid primary key default gen_random_uuid(),
    email citext unique check(email ~ '[^@]+@[^@]+\.[^@]+'),
    password_hash text,
    created_at timestampz not null default now(),
    updated_at timestampz not null default now()
)

alter table file_reader_public.document add column creator_id uuid not null references file_reader_public.user(id);

-- rambler down

drop table if exists file_reader_public.user;
drop table if exists file_reader_public.document_sections;
drop table if exists file_reader_public.document;
