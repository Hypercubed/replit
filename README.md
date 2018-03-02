replit [![Build Status](https://secure.travis-ci.org/Hypercubed/replit.png?branch=master)](https://travis-ci.org/Hypercubed/replit) [![NPM version](https://badge.fury.io/js/replit.png)](http://badge.fury.io/js/replit)
=============

sometimes you need a repl (inspired by http://defunkt.io/repl/)

# Description
`replit` wraps a non-interactive shell command in an interactive read-eval-print-loop (repl) prompt.
Each line you type into the prompt is executed as arguments to command.
Anything written to standard output or standard error by the command is displayed.

## Status
Useful but not under active development.

# Installation

```
	$ npm install -g @hypercubed/replit
```

# Usage

```
	Usage: replit [options] <cmd>

	Options:

	-h, --help     output usage information
	-V, --version  output the version number
```

# Example

```
replit echo
```

# License

Copyright (c) 2013-2018 Jayson Harshbarger
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

# Acknowledgments

Built using [generator-commader](https://github.com/Hypercubed/generator-commander), inspired by [http://defunkt.io/repl/](http://defunkt.io/repl/).
