# sherlock

This is a tool to assist determining the routes on which a target front end component renders.

# Files:

- index.js: Importable package with a single function "solve".
  <!-- - runner.js: Runnable command line tool. -->
- sherlock.js: Exports all the "helper" functions as a module.

# Usage:

- Make sure your terminal is in the application root that you intend to search.
  <!-- - Sherlock can be used two different ways: -->
- Imported as a package with a single function "solve": ( index.js )

  - Importation: 'const solve = require("./index");'
  - Arguments:
    - "hint" <String>: Name of the child component you would like to see the potential dependency chains for.
    - "directory" <String>: Name of the app root relative folder to begin search in.
      <!-- - Used as a command line tool that will write the JSON results of the function "solve" to a folder. -->
        <!-- - NOTE: Make sure the current terminal instance is in the root of the application folder. -->
        <!-- - Run: 'node path_to/runner.js <hint> <directory>' -->
        <!-- - Arguments: -->
