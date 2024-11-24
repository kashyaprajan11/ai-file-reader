-- rambler up
create index if not exists email_idx on file_reader_public.user(email);

create index if not exists document_creator_id_idx on file_reader_public.document(creator_id);

create index if not exists github_url_sections_id_idx on file_reader_public.github_url_sections(github_url_id);
create index if not exists github_url_embedding_idx on file_reader_public.github_url_sections using hnsw(embedding vector_ip_ops);

create index if not exists document_id_idx on file_reader_public.document_sections(document_id);
create index if not exists document_sections_embedding_idx on file_reader_public.document_sections using hnsw(embedding vector_ip_ops);

-- rambler down

drop index if exists document_sections_embedding_idx;
drop index if exists document_id_idx;

drop index if exists github_url_embedding_idx;
drop index if exists github_url_sections_id_idx;

drop index if exists document_creator_id_idx;
drop index if exists email_idx;