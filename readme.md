# glob-concat

Merge a list of globs or files into a single unique list.

Rougly equivalent to the bash command: `find . -name '<pattern>' -or -name '<pattern>' ...`.

Run synchronously.
````javascript
globConcat.sync(['tests/item.*', tests/*.txt]);

// ['tests/item.txt', 'tests/item.bar', 'tests/foo.txt']
````

... or asynchronously.
````javascript
globConcat(['tests/item.*', tests/*.txt], function(err, matches) {
    if (err) throw err;
    /* do stuff with matches */
});
````

Just a thing wrapper around `node-glob`, so the options are just passed on.
````pass
var opts = {nonull: true};

globConcat(['tests/item.*', tests/*.txt], opts, function(err, matches) {
    if (err) throw err;
    /* do stuff with matches */
});
````

Input is liberal, `glob-concat` can handle a single string.

````
// this is the same as running glob.sync('tests/item.*');
globConcat.sync('tests/item.*');
// ['tests/item.txt', 'tests/item.bar']
````
