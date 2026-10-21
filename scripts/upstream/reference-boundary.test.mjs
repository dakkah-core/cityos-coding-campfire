import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

test('Astraly remains the primary and removed reference trees remain inactive', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../config/upstream/integration.json', import.meta.url)));
  assert.equal(manifest.upstream.repository, 'https://github.com/astraly-labs/campfire');
  assert.equal(manifest.selectiveTracking.mode, 'explicit-module-selection-only');
  assert.equal(execFileSync('git', ['ls-files', '--', '.repos'], { encoding: 'utf8', windowsHide: true }).trim(), '');
  execFileSync('git', ['merge-base', '--is-ancestor', manifest.upstream.commit, 'HEAD'], { windowsHide: true });
});
