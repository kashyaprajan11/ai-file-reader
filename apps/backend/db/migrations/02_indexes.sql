-- rambler up
create index if not exists document_key_idx on file_reader_public.document(key);
create index if not exists document_id_idx on file_reader_public.document_sections(document_id);
create index if not exists email_idx on file_reader_public.user(email);

-- rambler down

drop index if exists email_idx;
drop index if exists document_id_idx;
drop index if exists document_key_idx;