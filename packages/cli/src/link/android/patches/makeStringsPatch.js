/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import _ from 'lodash';

export default function makeStringsPatch(params, prefix) {
  const values = Object.keys(params).map(param => {
    const name = `${_.camelCase(prefix)}_${param}`;
    return (
      '    ' +
      `<string moduleConfig="true" name="${name}">${params[param]}</string>`
    );
  });

  const patch = values.length > 0 ? `${values.join('\n')}\n` : '';

  return {
    pattern: '<resources>\n',
    patch,
  };
}
