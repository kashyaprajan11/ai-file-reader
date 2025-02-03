-- rambler up
create or replace function file_reader_public.match_github_section(
    embedding vector(1536),
    match_threshold float,
    user_id uuid
)
returns setof file_reader_public.github_url_sections
language plpgsql
as $$
#variable_conflict use_variable
begin
    return query
    select gus.*
    from file_reader_public.github_url_sections gus
    join file_reader_public.github_url gu on gus.github_url_id = gu.id
    where gu.creator_id = user_id
    and gus.embedding <#> embedding < -match_threshold
    order by gus.embedding <#> embedding;
end;
$$;

-- rambler down

drop function if exists file_reader_public.match_github_section;