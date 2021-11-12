import * as Koa from 'koa'
import * as cors from '@koa/cors'
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as serverless from 'serverless-http'

const Epub = require('epub-gen');
const nodepub = require("nodepub");
// import { Post } from '@readdit/shared'

const app = new Koa();

app.use(cors())

app.use(async ctx => {
  ctx.body = 'hello'

  const options = {
    title: 'Test eBook',
    author: 'Jimmy',
    content: [{ title: 'Chapter 1', data: 'Chapter 1' }],
    verbose: true,
    tempDir: '',
    css: ''
  };

  console.log('OS TEMP DIR: ', os.tmpdir())
  const workingDir = path.join(os.tmpdir(), uuid.v4());
  fs.mkdirSync(workingDir);
  const tmpFilePath = path.join(workingDir, 'test.epub');
  options.tempDir = workingDir;
  console.log('TMP FILE PATH: ', tmpFilePath)
  console.log(fs.readdirSync('/var/task/_optimize/rest-local-api'))
  return generateEpub(options, tmpFilePath)
  //
  // new Epub(options, tmpFilePath).promise
  //   .then(() => 'SUCCESS!!')
  //   .catch(console.error)
  // ctx.attachment(workingDir + '/test.epub')

});

const generateEpub = (options: any, pathName: string) => new Promise((resolve, reject) => new Epub(options, pathName).promise.then(resolve).catch(reject));

export const api = serverless(app)
