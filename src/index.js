import Plugin from 'broccoli-plugin';
import FSTree from 'fs-tree-diff';
import walkSync from 'walk-sync';
import fs from 'fs';

export default class Whatchanged extends Plugin {
  constructor(node, options = {}) {
    super([node], options);

    this._persistentOutput = true;
    this._inputAndOutputLinked = false;

    this.options = options;
    this.last = new FSTree.fromEntries([]);
  }

  build() {
    const next = FSTree.fromEntries(walkSync.entries(this.inputPaths[0]));
    const last = this.last;
    this.last = next;

    const patches = last.calculatePatch(next);

    if (typeof this.options === 'function') {
      this.options({
        patches,
        last,
        next
      });
    } else {
      console.log(patches.map(([operation, relativePath]) => [operation, relativePath]));
    }

    // TODO: make work

    if (this._inputAndOutputLinked) {
      fs.rmdir(this.outputPath)
      fs.symlinkSync(this.inputPaths[0], this.outputPath);
      this._inputAndOutputLinked = true;
    }
  }
}
