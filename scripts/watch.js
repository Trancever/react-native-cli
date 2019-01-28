/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Watch files for changes and rebuild (copy from 'src/' to `build/`) if changed
 */

import fs from 'fs';
import childProcess from 'child_process';
import path from 'path';
import chalk from 'chalk';
import helpers from './helpers';

const BUILD_CMD = `node ${path.resolve(__dirname, './build.js')}`;

let filesToBuild = new Map();

const exists = filename => {
  try {
    return fs.statSync(filename).isFile();
  } catch (e) {
    // omit
  }
  return false;
};
const rebuild = filename => filesToBuild.set(filename, true);

helpers.getPackages().forEach(p => {
  const srcDir = path.resolve(p, 'src');
  try {
    fs.accessSync(srcDir, fs.F_OK);
    fs.watch(path.resolve(p, 'src'), { recursive: true }, (event, filename) => {
      const filePath = path.resolve(srcDir, filename);

      if ((event === 'change' || event === 'rename') && exists(filePath)) {
        console.log(chalk.green('->'), `${event}: ${filename}`);
        rebuild(filePath);
      } else {
        const buildFile = path.resolve(srcDir, '..', 'build', filename);
        try {
          fs.unlinkSync(buildFile);
          process.stdout.write(
            `${chalk.red('  \u2022 ') +
              path.relative(
                path.resolve(srcDir, '..', '..'),
                buildFile
              )} (deleted)\n`
          );
        } catch (e) {
          // omit
        }
      }
    });
  } catch (e) {
    // doesn't exist
  }
});

setInterval(() => {
  const files = Array.from(filesToBuild.keys());
  if (files.length) {
    filesToBuild = new Map();
    try {
      childProcess.execSync(`${BUILD_CMD} ${files.join(' ')}`, {
        stdio: [0, 1, 2],
      });
    } catch (e) {
      // omit
    }
  }
}, 100);

console.log(chalk.red('->'), chalk.cyan('Watching for changes...'));
