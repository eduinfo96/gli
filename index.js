#!/usr/bin/env node
const { exec } = require('child_process');

const argv = require('minimist')(process.argv.slice(2), {
    alias: {
       m: 'message',
       x: 'dry-run',
       h: 'help',
       n: 'rename',
       name: 'rename',
    }
});


function fmtBranchName(message) {
  let counter = 0
  function sort(ele){
    switch(ele) {
      case ' ': return '-';
      case '.': return '';
    }
  }
  return message.replace(/\s/, '/').replace(/[\s.]/g, sort).toLowerCase();
}

function fmtMessage(message){
  message = message.replace(/\./g, '');
  if(message.slice(-1) !== '.') message += '.';
  const newmessage = message.slice(0,1).toUpperCase() + message.slice(1);
  return newmessage;
}

if(argv.rename) {
  if (argv.message) {
    const message = fmtMessage(argv.message)
    const branchName = fmtBranchName(message)
    !argv.x && exec(`git push origin :$(git_current_branch) && git branch -m ${branchName} && git commit --amend -m'${message}' && git push --set-upstream origin ${branchName}`,
      (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
}
