// @vitest-environment node
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

const schema = readFileSync(new URL('./schema.sql', import.meta.url), 'utf8');
const insertRun = `INSERT INTO test_runs VALUES (?, 'abcdef1', '1.0.0', 'v24.22.0', ?, '2026-01-01T00:00:00Z', ?)`;
const insertCase = `INSERT INTO test_case_results VALUES (?, 'suite', 'case', ?, ?)`;

describe('db/schema.sql', () => {
  let database: DatabaseSync;

  beforeEach(() => {
    database = new DatabaseSync(':memory:');
    database.exec(schema);
  });

  afterEach(() => {
    database.close();
  });

  it('can be applied twice', () => {
    expect(() => database.exec(schema)).not.toThrow();
  });

  it('stores a run with its case results', () => {
    database.prepare(insertRun).run('run-1', 'passed', '2026-01-01T00:00:01Z');
    database.prepare(insertCase).run('run-1', 'passed', 12);
    expect(database.prepare('SELECT count(*) AS total FROM test_case_results').get()).toEqual({ total: 1 });
  });

  it('rejects an unknown run status', () => {
    expect(() => database.prepare(insertRun).run('run-1', 'unknown', '2026-01-01T00:00:01Z')).toThrow();
  });

  it('rejects a run that finishes before it starts', () => {
    expect(() => database.prepare(insertRun).run('run-1', 'passed', '2025-12-31T00:00:00Z')).toThrow();
  });

  it('rejects a case result without a run', () => {
    expect(() => database.prepare(insertCase).run('missing', 'passed', 1)).toThrow();
  });

  it('enables foreign keys on the connection that applies it', () => {
    const connection = new DatabaseSync(':memory:', { enableForeignKeyConstraints: false });
    connection.exec(schema);
    expect(() => connection.prepare(insertCase).run('missing', 'passed', 1)).toThrow();
    connection.close();
  });

  it('rejects a negative duration', () => {
    database.prepare(insertRun).run('run-1', 'passed', '2026-01-01T00:00:01Z');
    expect(() => database.prepare(insertCase).run('run-1', 'passed', -1)).toThrow();
  });

  it('removes case results with their run', () => {
    database.prepare(insertRun).run('run-1', 'passed', '2026-01-01T00:00:01Z');
    database.prepare(insertCase).run('run-1', 'passed', 1);
    database.prepare('DELETE FROM test_runs WHERE id = ?').run('run-1');
    expect(database.prepare('SELECT count(*) AS total FROM test_case_results').get()).toEqual({ total: 0 });
  });
});
