#!/usr/bin/env node

var program = require('commander');
var child_process = require('child_process');
var readline  = require('readline');
var pkg = require('./package.json');

program
  .version(pkg.version)
  .usage('[options] <cmd>')
  // turn off repl cmd capture
  .option('-d, --debug', "enable debugger")
  .option('-p, --pmt <prompt>', 'set readline prompt')
  .parse(process.argv);
  
program.name = 'replit';
  
var cmd = program.args[0];  // TODO: If null exit with error
if (!cmd) throw new Error('cmd required');

var prompt = program.pmt || cmd+'> ';

// Todo: Read lines from stdin
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
rl.setPrompt(prompt);
rl.prompt();
//TODO: Auto-complete?

rl.on('line', function(line,err) {
	// TODO: Handle repl commands (.exit, .debug)
	// TODO: git way to run bare command (.ls)
	
	// Check to see if a REPL keyword was used. 
    if (line && line.charAt(0) === '.') {  // TODO: Option to turn this off
		var matches = line.match(/^\.([^\s]+)\s*(.*)$/);
		_cmd = matches ? matches[1] : cmd;
		_rest = matches ? matches[2] : '';
		_argv = _rest.split(' ');
		
		if (_cmd == 'exit') {  // Todo* save, load, clear, break
			process.exit();
		} else if (_cmd == 'help') {
			program.outputHelp();  // Todo: add these commands to help
			rl.prompt();
			return;
		} else if (_cmd == 'cmd' || _cmd == program.name) {
			cmd = _rest
			prompt = program.pmt || cmd+'> ';
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
		_cmd = cmd;
		_argv = line.split(' ');  // Todo: need to respect quotes, etc
	}
	
	var cp = child_process.spawn(_cmd,_argv);
	cp.stdout.pipe(process.stdout);
	cp.stderr.pipe(process.stderr);
	cp.on('close', function (code) {
	  rl.prompt();
	});
})
.on('close', function() {
    //self.emit('exit');
})
//.on('SIGINT')  TODO: handle ctrl-c