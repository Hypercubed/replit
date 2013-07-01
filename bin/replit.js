#!/usr/bin/env node

// TODO: split to library and bin.  
// TODO: require('replit').repl(command, options);

var program         = require('commander');
var child_process   = require('child_process');
var readline        = require('readline');

//
var pkg             = require('../package.json');
var repl         = require('../lib/replit.js').repl;

program
    .version(pkg.version)
    .usage('[options] <cmd>')
    // turn off repl cmd capture
    .option('-d, --debug', "enable debugger")
    .option('-p, --pmt <prompt>', 'set readline prompt')
    .parse(process.argv);
  
program.name = 'replit';

program.on('--help', function(){
  console.log('  Example:');
  console.log('');
  console.log('    $ '+program.name+' git');
  console.log('');
  console.log('  Bug reports, suggestions, updates:');
  console.log('  ', pkg.bugs.url);
});

var cmd = program.args.join(' ');
if (!cmd) program.help();

var options = {};
options.prompt = program.pmt || cmd+'> ';
options.debug = program.debug || false;
options.name = program.name || 'replit';

repl(cmd, options);
