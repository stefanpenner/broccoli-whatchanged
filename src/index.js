import Plugin from 'broccoli-plugin';
import FSTree from 'fs-tree-diff';
import walkSync from 'walk-sync';

export default class Whatchanged extends Plugin {
  constructor(node, options = {}) {
    super([node], options);

    this._persistentOutput = true;

    this.options = options;
    this.last = new FSTree.fromEntries([]);
  }

  build() {
    const next = FSTree.fromEntries(walkSync.entries(this.inputPaths[0]));
    const last = this.last;

    const patches = last.calculatePatches(next);

    if (typeof this.options === 'function') {
      this.options({
        patches,
        last,
        next
      });
    } else {
      console.log(patches);
    }

    // TODO: make work

    fs.unlinkSync(this.outputPath)
    fs.symlinkSync(this.inputPaths[0], this.outputPath);
  }
}
