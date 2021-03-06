/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+javascript_foundation
 * @format
 */

const path = require('path');
const getProjectDependencies = require('../getProjectDependencies');

const CWD = path.resolve(__dirname, '../../');

describe('getProjectDependencies', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should return an array of project dependencies', () => {
    jest.doMock(
      path.join(CWD, './package.json'),
      () => ({
        dependencies: {
          lodash: '^6.0.0',
          'react-native': '^16.0.0',
          '@react-native-community/cli': '*',
        },
      }),
      { virtual: true }
    );

    expect(getProjectDependencies(CWD)).toEqual(['lodash']);
  });

  it('should return an empty array when no dependencies set', () => {
    jest.doMock(path.join(CWD, './package.json'), () => ({}), {
      virtual: true,
    });
    expect(getProjectDependencies(CWD)).toEqual([]);
  });
});
