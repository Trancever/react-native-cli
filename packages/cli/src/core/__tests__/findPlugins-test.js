/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+javascript_foundation
 */

const path = require('path');
const findPlugins = require('../findPlugins');

const ROOT = path.join(__dirname, '..', '..');
const pjsonPath = path.join(ROOT, './package.json');

describe('findPlugins', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('returns an array of dependencies', () => {
    jest.doMock(
      pjsonPath,
      () => ({
        dependencies: { 'rnpm-plugin-test': '*' },
      }),
      { virtual: true }
    );

    expect(findPlugins(ROOT)).toHaveProperty('commands');
    expect(findPlugins(ROOT)).toHaveProperty('platforms');
    expect(findPlugins(ROOT).commands).toHaveLength(1);
    expect(findPlugins(ROOT).commands[0]).toBe('rnpm-plugin-test');
    expect(findPlugins(ROOT).platforms).toHaveLength(0);
  });

  it('returns an empty array if there are no plugins in this folder', () => {
    jest.doMock(pjsonPath, () => ({}), { virtual: true });
    expect(findPlugins(ROOT)).toHaveProperty('commands');
    expect(findPlugins(ROOT)).toHaveProperty('platforms');
    expect(findPlugins(ROOT).commands).toHaveLength(0);
    expect(findPlugins(ROOT).platforms).toHaveLength(0);
  });

  it('returns an object with empty arrays if there is no package.json in the supplied folder', () => {
    expect(findPlugins('fake-path')).toHaveProperty('commands');
    expect(findPlugins('fake-path')).toHaveProperty('platforms');
    expect(findPlugins('fake-path').commands).toHaveLength(0);
    expect(findPlugins('fake-path').platforms).toHaveLength(0);
  });

  it('returns plugins from both dependencies and dev dependencies', () => {
    jest.doMock(
      pjsonPath,
      () => ({
        dependencies: { 'rnpm-plugin-test': '*' },
        devDependencies: { 'rnpm-plugin-test-2': '*' },
      }),
      { virtual: true }
    );
    expect(findPlugins(ROOT)).toHaveProperty('commands');
    expect(findPlugins(ROOT)).toHaveProperty('platforms');
    expect(findPlugins(ROOT).commands).toHaveLength(2);
    expect(findPlugins(ROOT).platforms).toHaveLength(0);
  });

  it('returns unique list of plugins', () => {
    jest.doMock(
      pjsonPath,
      () => ({
        dependencies: { 'rnpm-plugin-test': '*' },
        devDependencies: { 'rnpm-plugin-test': '*' },
      }),
      { virtual: true }
    );
    expect(findPlugins(ROOT).commands).toHaveLength(1);
  });

  it('returns plugins in scoped modules', () => {
    jest.doMock(
      pjsonPath,
      () => ({
        dependencies: {
          '@org/rnpm-plugin-test': '*',
          '@org/react-native-test': '*',
          '@react-native/test': '*',
          '@react-native-org/test': '*',
        },
      }),
      { virtual: true }
    );

    expect(findPlugins(ROOT)).toHaveProperty('commands');
    expect(findPlugins(ROOT)).toHaveProperty('platforms');
    expect(findPlugins(ROOT).commands[0]).toBe('@org/rnpm-plugin-test');
  });
});
