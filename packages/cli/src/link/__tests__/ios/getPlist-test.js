/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+javascript_foundation
 */

import xcode from 'xcode';
import path from 'path';
import getPlist from '../../ios/getPlist';

const project = xcode.project(
  path.join(__dirname, '../../__fixtures__/project.pbxproj')
);

describe('ios::getPlist', () => {
  beforeEach(() => {
    project.parseSync();
  });

  it('should return null when `.plist` file missing', () => {
    const plistPath = getPlist(project, process.cwd());
    expect(plistPath).toBeNull();
  });

  // @todo - Happy scenario
});
