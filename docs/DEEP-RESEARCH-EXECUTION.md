# Deep research execution on `floridae`

Source: `/Users/floridae/Downloads/deep-research-report-6.md`. This file tracks implementation work; recommendations in that report are not treated as shipped features.

## Personal Stable

- [x] Patch Next.js and matching ESLint configuration to 16.3.8.
- [x] Upgrade Vitest to a supported, audit-clean 4.1.11.
- [x] Replace the JavaScript runner's lossy object comparison and add regression tests against the actual worker source.
- [x] Add Chromium browser tests for a fresh user, draft restoration, failed/passed tests, one-time XP, mobile navigation, and activity evidence.
- [x] Add automated accessibility scans for Home, Curriculum, Roadmap, and a Lab; fix the detected contrast and keyboard-scroll issues.
- [x] Make streak, heatmap, and weekly goal read one activity stream. Preserve the latest snapshot from legacy exports during import.
- [x] Show authored/target step counts and label unfinished courses as partial.
- [x] Align Java beginner instructions with JDK 25 LTS and show the actual entry class filename when available.
- [ ] Complete the manual acceptance checklist across desktop, mobile, tablet, keyboard, reduced motion, and screen reader use.
- [x] Cover browser Back/Forward, legacy v1 JSON export/import, and Journal/project persistence in Chromium; fix Back/Forward state restoration.
- [ ] Expand browser tests for mixed-mode route, Lab checklist, and Roadmap marks.
- [ ] Make learner-code execution origin-isolated before adding persistent browser storage or accounts.

## Learning Engine and curriculum

- [x] Add a partial Web Platform Foundations course with 12 authored topics / 60 steps before JavaScript and React; continue authoring toward the 80-step target after learner validation.
- [ ] Distinguish exposure, attempt, practice, verification, retention, and transfer evidence.
- [ ] Add immutable attempt records with content and test version identifiers.
- [ ] Add a deterministic review queue and delayed retrieval tasks.
- [ ] Expand interaction formats after testing the existing five-step learning loop with a learner.
- [ ] Extend the Java route through testing, SQL/JDBC, and a backend project; keep SQL concepts ahead of ORM lessons.
- [ ] Build Friends Activity Planner into a sequence of project milestones backed by artifacts.
- [ ] Add diagnostics that allow a learner to skip content without claiming mastery.

## Personal Cloud and offline

- [ ] Design and test a migration from local schema v1 to a versioned data model without losing imports or exports.
- [ ] Add account/session recovery and two-device sync once the target Supabase project is selected.
- [ ] Protect all private database rows with tested RLS policies.
- [ ] Add IndexedDB drafts and a sync outbox after runner origin isolation.
- [ ] Define conflict resolution, export, and account deletion behavior.

## Assessment and platform

- [ ] Add an isolated Java runner prototype with compile feedback, visible/hidden tests, and resource limits.
- [ ] Keep execution separate from application secrets and learner data.
- [ ] Add test-versioned evidence and distinct badges for self, local, browser, sandbox, review, and project verification.
- [ ] Migrate hash routes and split `QuestApp.tsx` after the current interface passes acceptance.
- [ ] Consider PWA and contextual tutor only after data, sync, and assessment semantics are stable.
- [ ] Reassess public multi-user delivery, abuse prevention, quotas, and privacy before any public launch.

No deployment, external service mutation, repository push, or release is part of this local branch work.
