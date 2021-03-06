var init    = require('./lib/init');
var build   = require('./lib/build');
var watch   = require('./lib/watch');
var file    = require('./lib/file');
var clean   = require('./lib/clean');
var deploy  = require('./lib/deploy');
var pdf     = require('./lib/pdf');
var theme   = require('./lib/theme');
var color   = require('colorful');
var path    = require('path');
var server  = require('ssr');

module.exports = function(commander){
    var pkgurl = path.resolve('package.json');

    if(commander.V) return console.log('\n'+commander._version+'\n');

    // 判断是否初始化
    if(!commander.init){
        if(!file.exists(pkgurl)) {
            return console.log( color.red('\n In the project root directory to initialize, '+
            'run the "idoc init" command. \n') );   
        }
        // 载入配置文件
        var pkg = require(pkgurl);

        if(file.exists(pkgurl)&&!pkg.idoc){
            return console.log( color.red('\n This is not the "idoc" project. \n') );  
        }
    }else{
        return init(commander);
    }
    if(commander.build){
        return build(commander);
    }
    if(commander.watch){
        return watch(commander,build);
    }
    if(commander.server){
        server();
        return watch(commander,build);
    }
    if(commander.clean){
        return clean(commander);
    }
    if(commander.deploy){
        return deploy(commander);
    }
    if(commander.theme){
        return theme.runTask(commander);
    }
    // if(commander.pdf){
    //     return pdf(commander);
    // }
    commander.outputHelp();
}
