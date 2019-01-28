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
import getPlistPath from '../../ios/getPlistPath';

const project = xcode.project(
  path.join(__dirname, '../../__fixtures__/project.pbxproj')
);

describe('ios::getPlistPath', () => {
  beforeEach(() => {
    project.parseSync();
  });

  it('should return path without Xcode $(SRCROOT)', () => {
    const plistPath = getPlistPath(project, '/');
    expect(plistPath).toBe(path.normalize('/Basic/Info.plist'));
  });
});
