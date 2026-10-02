create table public.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  study_mode text not null default 'mixed' check (study_mode in ('fullstack', 'java', 'mixed')),
  weekly_goal integer not null default 5 check (weekly_goal between 1 and 14),
  timezone text not null default 'Asia/Bangkok',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.step_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  step_id text not null,
  status text not null default 'attempted' check (status in ('attempted', 'completed')),
  answer text not null default '',
  notes text not null default '',
  answer_revealed boolean not null default false,
  completed_at timestamptz,
  content_version text not null,
  revision integer not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, step_id)
);

create table public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  status text not null default 'in-progress' check (status in ('not-started', 'in-progress', 'passed', 'review')),
  code text not null default '',
  notes text not null default '',
  reflection text not null default '',
  checklist jsonb not null default '[]'::jsonb check (jsonb_typeof(checklist) = 'array'),
  solution_viewed boolean not null default false,
  attempts_count integer not null default 0 check (attempts_count >= 0),
  latest_result jsonb,
  completed_at timestamptz,
  content_version text not null,
  test_version text,
  revision integer not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('step', 'lesson', 'review')),
  item_id text not null,
  code_snapshot text,
  outcome jsonb not null,
  verification_type text not null check (verification_type in ('self-reported', 'local-run', 'browser-verified', 'sandbox-verified', 'review-verified')),
  content_version text not null,
  test_version text,
  hints_used integer not null default 0 check (hints_used >= 0),
  solution_viewed boolean not null default false,
  duration_ms integer check (duration_ms >= 0),
  idempotency_key text,
  created_at timestamptz not null default now(),
  unique (user_id, idempotency_key)
);
create index attempts_user_item_created on public.attempts (user_id, item_type, item_id, created_at desc);

create table public.activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event_type text not null,
  source_type text not null,
  source_id text not null,
  occurred_at timestamptz not null default now(),
  idempotency_key text,
  unique (user_id, idempotency_key)
);
create index activity_events_user_time on public.activity_events (user_id, occurred_at desc);

create table public.skill_evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  skill_id text not null,
  source_type text not null,
  source_id text not null,
  verification_type text not null,
  content_version text not null,
  test_version text,
  created_at timestamptz not null default now()
);
create index skill_evidence_user_skill on public.skill_evidence (user_id, skill_id, created_at desc);

create table public.journal_entries (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  entry_date date not null,
  title text not null check (length(trim(title)) > 0),
  learned text not null default '',
  bug text not null default '',
  fix text not null default '',
  unclear text not null default '',
  link text not null default '',
  lesson_id text,
  revision integer not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now()
);
create index journal_entries_user_date on public.journal_entries (user_id, entry_date desc);

create table public.project_artifacts (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id text not null,
  repository_url text not null default '',
  demo_url text not null default '',
  checklist jsonb not null default '[]'::jsonb check (jsonb_typeof(checklist) = 'array'),
  revision integer not null default 0 check (revision >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, project_id)
);

alter table public.user_profiles enable row level security;
alter table public.step_progress enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.attempts enable row level security;
alter table public.activity_events enable row level security;
alter table public.skill_evidence enable row level security;
alter table public.journal_entries enable row level security;
alter table public.project_artifacts enable row level security;

grant select, insert, update on public.user_profiles to authenticated;
grant select, insert, update, delete on public.step_progress, public.lesson_progress, public.journal_entries, public.project_artifacts to authenticated;
grant select, insert on public.attempts, public.activity_events to authenticated;
grant select on public.skill_evidence to authenticated;

create policy "read own profile" on public.user_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own profile" on public.user_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own profile" on public.user_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "read own steps" on public.step_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own steps" on public.step_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own steps" on public.step_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own steps" on public.step_progress for delete to authenticated using ((select auth.uid()) = user_id);

create policy "read own lessons" on public.lesson_progress for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own lessons" on public.lesson_progress for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own lessons" on public.lesson_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own lessons" on public.lesson_progress for delete to authenticated using ((select auth.uid()) = user_id);

create policy "read own attempts" on public.attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own self-reported attempts" on public.attempts for insert to authenticated with check (
  (select auth.uid()) = user_id and verification_type in ('self-reported', 'local-run')
);

create policy "read own activity" on public.activity_events for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own activity" on public.activity_events for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "read own skill evidence" on public.skill_evidence for select to authenticated using ((select auth.uid()) = user_id);

create policy "read own journal" on public.journal_entries for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own journal" on public.journal_entries for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own journal" on public.journal_entries for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own journal" on public.journal_entries for delete to authenticated using ((select auth.uid()) = user_id);

create policy "read own projects" on public.project_artifacts for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own projects" on public.project_artifacts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own projects" on public.project_artifacts for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own projects" on public.project_artifacts for delete to authenticated using ((select auth.uid()) = user_id);
