import { describe, expect, it } from 'vitest';
import { compareVersions, inBanner, megabytes, parseRelease, type Release } from './appUpdate';

/** The release as GitHub's API gives it (fields the app reads, and a few it does not). */
const github = (name: string, assets: unknown[] = [apk]) => ({
  tag_name: 'android',
  name,
  draft: false,
  prerelease: false,
  published_at: '2026-11-09T10:00:00Z',
  body: 'Version construite depuis 5f97a2b.',
  assets,
});
const apk = {
  name: 'Epreuves.apk',
  size: 4062887,
  content_type: 'application/vnd.android.package-archive',
  browser_download_url: 'https://github.com/JRRocks/Learn-UI-UX/releases/download/android/Epreuves.apk',
  digest: 'sha256:1e506575357eb8febf7e29342ed1bb418f45c9d604433058c033a42a735e394e',
};

describe('the release of the Android app on GitHub', () => {
  it('gives the version in its title, the APK, its size and its digest', () => {
    expect(parseRelease(github('Épreuves pour Android 1.0.312'))).toEqual({
      version: '1.0.312',
      url: apk.browser_download_url,
      size: 4062887,
      digest: apk.digest,
    });
  });

  it('is not an update without a version in its title (the releases before this one)', () => {
    expect(parseRelease(github('Épreuves pour Android'))).toBeNull();
    expect(parseRelease(github('Épreuves pour Android 1.0'))).toBeNull();
    expect(parseRelease(github('Épreuves 2026.11.09-beta'))).toBeNull();
  });

  it('is not an update without the APK, or with one served elsewhere than from GitHub over HTTPS', () => {
    expect(parseRelease(github('Épreuves pour Android 1.0.312', []))).toBeNull();
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [{ ...apk, name: 'Epreuves.exe' }]))).toBeNull();
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [{ ...apk, browser_download_url: 'http://github.com/Epreuves.apk' }]))).toBeNull();
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [{ ...apk, browser_download_url: 'https://example.com/Epreuves.apk' }]))).toBeNull();
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [{ ...apk, browser_download_url: 'https://github.com.example.com/Epreuves.apk' }]))).toBeNull();
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [null, 'Epreuves.apk']))).toBeNull();
  });

  it('does without a size or a digest that GitHub does not give', () => {
    const { size: _, digest: __, ...bare } = apk;
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [bare]))).toEqual({ version: '1.0.312', url: apk.browser_download_url, size: 0, digest: undefined });
    expect(parseRelease(github('Épreuves pour Android 1.0.312', [{ ...apk, digest: 'md5:abc' }]))?.digest).toBeUndefined();
  });

  it('is nothing when the answer is not a release (an error message, an empty answer)', () => {
    expect(parseRelease({ message: 'Not Found', status: '404' })).toBeNull();
    expect(parseRelease(null)).toBeNull();
    expect(parseRelease('Épreuves pour Android 1.0.312')).toBeNull();
  });
});

describe('versions', () => {
  it('compare number by number, not as text', () => {
    expect(compareVersions('1.0.312', '1.0.99')).toBe(1);
    expect(compareVersions('1.0.99', '1.0.312')).toBe(-1);
    expect(compareVersions('1.0.312', '1.0.312')).toBe(0);
    expect(compareVersions('1.1.0', '1.0.999')).toBe(1);
    expect(compareVersions('2.0', '1.9.9')).toBe(1);
    expect(compareVersions('1.0', '1.0.0')).toBe(0);
  });
});

describe('sizes', () => {
  it('read in Mo as Android shows them, the number kept with its unit', () => {
    expect(megabytes(4062887)).toBe('4,1 Mo');
    expect(megabytes(0)).toBe('0,0 Mo');
    expect(megabytes(12_000_000)).toBe('12,0 Mo');
  });
});

describe('the banner', () => {
  const release: Release = { version: '1.0.312', url: apk.browser_download_url, size: 4062887 };
  const installed = '1.0.300';

  it('shows an update found and each step of its installation', () => {
    expect(inBanner({ step: 'available', installed, release }, null)).toBe(true);
    expect(inBanner({ step: 'downloading', installed, release, loaded: 10, total: 100 }, null)).toBe(true);
    expect(inBanner({ step: 'permission', installed, release, refused: false }, null)).toBe(true);
    expect(inBanner({ step: 'ready', installed, release }, null)).toBe(true);
    expect(inBanner({ step: 'failed', installed, release, error: 'Coupé', manual: true }, null)).toBe(true);
  });

  it('keeps quiet about a check: there is nothing to do (À propos says how it went)', () => {
    expect(inBanner({ step: 'idle' }, null)).toBe(false);
    expect(inBanner({ step: 'checking', installed, manual: false }, null)).toBe(false);
    expect(inBanner({ step: 'current', installed, manual: true }, null)).toBe(false);
    expect(inBanner({ step: 'failed', installed, error: 'Hors ligne', manual: false }, null)).toBe(false);
  });

  it('goes for the version put off, and comes back for a newer one', () => {
    expect(inBanner({ step: 'available', installed, release }, '1.0.312')).toBe(false);
    expect(inBanner({ step: 'available', installed, release: { ...release, version: '1.0.313' } }, '1.0.312')).toBe(true);
  });
});
