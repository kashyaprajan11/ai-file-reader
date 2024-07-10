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
    creator_id uuid not null references file_reader_public.user(id),
    extension text not null check(char_length(extension) < 20),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists file_reader_public.github_url (
    id uuid primary key default gen_random_uuid(),
    creator_id uuid not null references file_reader_public.user(id),
    url text not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists file_reader_public.github_url_sections (
    id uuid primary key default gen_random_uuid(),
    github_url_id uuid not null references file_reader_public.github_url(id) on delete cascade,
    content text not null,
    embedding vector (384),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


create table if not exists file_reader_public.document_sections (
    id uuid primary key default gen_random_uuid(),
    document_id uuid not null references file_reader_public.document(id),
    content text not null,
    embedding vector (384),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- rambler down

drop table if exists file_reader_public.document_sections;
drop table if exists file_reader_public.github_url_sections;
drop table if exists file_reader_public.github_url;
drop table if exists file_reader_public.document;
drop table if exists file_reader_public.user;
