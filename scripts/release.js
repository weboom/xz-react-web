const chalk = require('chalk');
const semver = require('semver');
const shell = require('shelljs');
const { version } = require('../package.json');

// const nextVersion = semver.inc(version, 'patch');
const nextVersion = version;

const config = {
  register: 'dockerhub.qingcloud.com',
  ns: 'gaollard',
  app: 'xz-react-web',
  user: {
    username: 'gaollard',
    password: 'gaoxiong123'
  }
}

shell.exec(`docker login -p ${config.user.password} -u ${config.user.username} ${config.register}`);
shell.exec(`docker build -t ${config.app}.`);
shell.exec(`docker tag ${config.app} ${config.register}/${config.ns}/${config.app}:v${nextVersion}`)
shell.exec(`docker push ${config.register}/${config.ns}/${config.app}:v${nextVersion}`);

console.log(chalk.green('\n镜像推送成功!'));
