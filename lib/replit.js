var child_process   = require('child_process');
var readline        = require('readline');

exports.repl = function(command, options) {
    options = options || {};
    options.prompt = options.prompt || command+'> ';
    
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.setPrompt(options.prompt);
    rl.prompt();
    
    rl.on('line', function(line,err) {

        // Check to see this should be handled here
        if (line && line.charAt(0) === '.') {  // TODO: Option to turn this off
            var matches = line.match(/^\.([^\s]+)\s*(.*)$/);
            var _cmd = matches ? matches[1] : cmd;
            var _rest = matches ? matches[2] : '';
            var _argv = _rest.split(' ');
            
            if (_cmd == 'exit') {  // Todo* save, load, clear, break
                process.exit();
            } else if (_cmd == 'help') {
                console.log('help pending');
                rl.prompt();
                return;
            } else if (_cmd == 'cmd' || _cmd == options.name) {
                command = _rest;
                prompt = options.pmt || command+'> ';
                rl.setPrompt(prompt);
                rl.prompt();
                return;
            } else if (_cmd == 'prompt') {
                prompt = _rest;
                rl.setPrompt(prompt);
                rl.prompt();
                return;
            }
        } else {
            var _cmd = command;
            var _argv = line.split(' ');  // Todo: need to respect quotes, etc
        }
        
        if (_argv[0] == 'exit')
            console.log('Warning', 'Use Ctrl-D (i.e. EOF) to exit');

        var cp = child_process.spawn(_cmd,_argv);
        cp.stdout.pipe(process.stdout);
        cp.stderr.pipe(process.stderr);
        cp.on('close', function (code) {
          rl.prompt();
        });
    })
}