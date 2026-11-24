-- Optional SQLite schema for storing test run results. The application does not use it.
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS test_runs (
  id TEXT PRIMARY KEY CHECK (length(id) BETWEEN 1 AND 64),
  commit_sha TEXT NOT NULL CHECK (length(commit_sha) BETWEEN 7 AND 64),
  app_version TEXT NOT NULL CHECK (length(app_version) BETWEEN 1 AND 32),
  node_version TEXT NOT NULL CHECK (length(node_version) BETWEEN 1 AND 32),
  status TEXT NOT NULL CHECK (status IN ('passed', 'failed')),
  started_at TEXT NOT NULL,
  finished_at TEXT NOT NULL,
  CHECK (finished_at >= started_at)
) STRICT;

CREATE TABLE IF NOT EXISTS test_case_results (
  run_id TEXT NOT NULL REFERENCES test_runs (id) ON DELETE CASCADE,
  suite_name TEXT NOT NULL CHECK (length(suite_name) BETWEEN 1 AND 255),
  case_name TEXT NOT NULL CHECK (length(case_name) BETWEEN 1 AND 255),
  status TEXT NOT NULL CHECK (status IN ('passed', 'failed', 'skipped')),
  duration_ms INTEGER NOT NULL CHECK (duration_ms >= 0),
  PRIMARY KEY (run_id, suite_name, case_name)
) STRICT, WITHOUT ROWID;

CREATE INDEX IF NOT EXISTS idx_test_runs_commit_sha ON test_runs (commit_sha);
CREATE INDEX IF NOT EXISTS idx_test_runs_started_at ON test_runs (started_at);
CREATE INDEX IF NOT EXISTS idx_test_case_results_failed
  ON test_case_results (suite_name, case_name)
  WHERE status = 'failed';
