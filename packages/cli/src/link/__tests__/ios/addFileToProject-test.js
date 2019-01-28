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
import _ from 'lodash';
import addFileToProject from '../../ios/addFileToProject';

const project = xcode.project(
  path.join(__dirname, '../../__fixtures__/project.pbxproj')
);

describe('ios::addFileToProject', () => {
  beforeEach(() => {
    project.parseSync();
  });

  it('should add file to a project', () => {
    const { fileRef } = addFileToProject(
      project,
      '../../__fixtures__/linearGradient.pbxproj'
    );
    expect(
      _.includes(Object.keys(project.pbxFileReferenceSection()), fileRef)
    ).toBeTruthy();
  });
});
