import 'es6-promise'; // for regenerator
import 'regenerator-runtime/runtime'; // only for tests, because async/await tests are very nice
import chai from 'chai';
import chaiFiles from 'chai-files';
import walkSync from 'walk-sync';
import fixture from 'fixturify';
import whatChanged from '../';
import builder from 'broccoli-builder';
import fs from 'fs-extra';

const { expect } = chai;
const { file } = chaiFiles;

chai.use(chaiFiles);

describe('BroccoliWhatchanged', function() {
  const input = 'tmp/fixture-input';
  let node, pipeline;

  beforeEach(function() {
    fs.mkdirpSync(input);
    fixture.writeSync(input, {
      'add.js': 'export default x => x + x;',
      'index.js': 'import add from "./add"; const two = add(1); export default two;'
    });

    node = whatChanged(input);
    pipeline = new builder.Builder(node);
  });

  afterEach(function() {
    fs.removeSync(input);
    return pipeline.cleanup();
  });

  it('simple', async function() {
    return pipeline.build();
  });

  describe('rebuild', function() {
    it('simple', async function() {

    });

    describe('stability', function(){
      it('is stable on idempotent rebuild', async function() {

      });
    });
  });
});
