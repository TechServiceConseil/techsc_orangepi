var cp = require('child_process');
let child = cp.spawn('bash', ["/home/perseigneUF/.node-red/projects/perseigneUF/scripts/codeEditorLauncher.sh"])
child.stdout.on('data', function (data) {
    process.stdout.write(data.toString())
    //console.log(data);
});
child.stderr.on('data', function (data) {
    console.log(`${data}`);
});
process.stdin.on('data', function (data) {
    child.stdin.write(data)
})

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

//process.on("message", function (message) {
//    console.log(`Message from main.js: ${message}`);
//    cp.stdin.write(message)
//});
//cp.stdout.on('data', function (data) {
//    console.log(`Message from main.js: ${data}`)
//    process.send(data)
//});

