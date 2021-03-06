/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

const { spawnSync } = require('child_process');
const log = require('npmlog');
const PackageManager = require('../util/PackageManager');

const spawnOpts = {
  stdio: 'inherit',
  stdin: 'inherit',
};

log.heading = 'rnpm-install';

function install(args, ctx) {
  const name = args[0];

  let res = PackageManager.add(name, ctx.root);

  if (res.status) {
    process.exit(res.status);
  }

  res = spawnSync('react-native', ['link', name], spawnOpts);

  if (res.status) {
    process.exit(res.status);
  }

  log.info(`Module ${name} has been successfully installed & linked`);
}

module.exports = {
  func: install,
  description: 'install and link native dependencies',
  name: 'install <packageName>',
};
