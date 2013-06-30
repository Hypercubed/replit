#!/usr/bin/env node

var program = require('commander');
var child_process = require('child_process');
var readline  = require('readline');

program
  .version('0.0.1')
  // turn off repl cmd capture
  // debug on/off
  // set prompt
  
  .parse(process.argv);
  
var cmd = program.args[0];
var prompt = cmd+'> ';

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
rl.setPrompt(prompt, prompt.length);
rl.prompt();
  
rl.on('line', function(line,err) {
	// TODO: Handle repl commands

	var cp = child_process.spawn(cmd,line.split(' '));  // Todo: need to respect quotes, etc
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