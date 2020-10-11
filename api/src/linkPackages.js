const fs = require('fs');
const {exec} = require("child_process");

const packagesPath = '/usr/src/app/packages/unpublished/';
const projectPath = '/usr/src/app/';

fs.readdir(packagesPath, function (err, files) {
    if (err) throw err;
    let packages = files.filter((file) => fs.lstatSync(packagesPath + file).isDirectory());
    packages.forEach(packageName => {
        exec(`cd ${packagesPath}${packageName} && yarn link && cd ${projectPath} && yarn link ${packageName}`,
            (error, stdout, stderr) => {
                if (error) return console.error(error.message);
                if (stderr) return console.error(stderr);
                console.log(stdout);
            });
    });
});

