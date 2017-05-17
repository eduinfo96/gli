#!/usr/bin/env node
const { exec } = require('child_process');

const argv = require('minimist')(process.argv.slice(2), {
    alias: {
       m: 'message',
       x: 'dry-run',
       h: 'help'
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

if(argv.rename) {
  if (argv.message) {
    const branchName = fmtBranchName(argv.message)
    !argv.x && exec(`git push origin :$(git_current_branch) && git branch -m ${branchName} && git commit --amend -m'${argv.message}' && git push origin $(git_current_branch)`,
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
