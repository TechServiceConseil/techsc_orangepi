// name: Function to use node-red variable vscode for TEMPLATE NODE
// outputs: 1
// initialize: // Code added here will be run once\n// whenever the node is started.\n
// finalize: // Code added here will be run when the\n// node is being stopped or re-deployed.\n
// info: 
//You can can have intellisense for msg but not for global and flow. They are here to avoid
//to go back in node-red to check value. With this setup you can use intelissense instead of go back to node-red
//all of the object create here is delete after so do not remove the \n in function below
const dir = global.get("projectDir")+'/tmp';
fs.readdir(dir, (err, files) => {
    console.log(files.length);
    let flows
    let globals
    flows = flow.keys()
    globals = global.keys()
    if(files.length%2===0){
        msg.filenameOfVscode = dir+'/vscode1.js';
    }else{
        msg.filenameOfVscode = dir+'/vscode2.js';
    }
    node.send({ payload: "let fullVariable = " + '{ "flow": ' + JSON.stringify(flows) + ', "global": ' + JSON.stringify(globals) + ', "msg": ' + JSON.stringify(msg) + ' }\n', filenameOfVscode: msg.filenameOfVscode}) 
});
return;
//TO DO
//transform all fullVariable.flows.nameofvariable par flow.get 