# Complexity #

Helps validate the complexity of a string. It builds regular expressions based on common settings for passwords, usernames, and other user identification methods

## Install ##

Command Line

    npm install complexity

Your Node .js files

    var complexity = require('complexity');

## Use ##

First, you will need to have an object defining your options. Each key is a setting for your regular expression, and the value is the number of occurances you would like to have for that setting:

    var options = {
      uppercase    : 1,  // A through Z
      lowercase    : 1,  // a through z
      special      : 1,  // ! @ # $ & *
      digit        : 1,  // 0 through 9
      alphaNumeric : 1,  // a through Z
      min          : 8,  // minumum number of characters
      max          : 16, // silly idea to have maximum...
      exact        : 20  // also kinda silly
    }

There are 3 different methods available to you.

---
#### complexity.create(options)
---

Takes in an object with one or more of the settings outlined above. Returns a regular expression in the form of a string with the given options.

    var coolRegEx = complexity.create(options);

---
#### complexity.check(str, options)
---

Takes in a string to check against the regex that will be created from the options given. Return true if the string matches, returns false if it doesn't

    if (complexity.check(pass, options)) {
      // now that your password checks out...
    }

---
#### complexity.checkError(str, options)
---

This method is similar to one mentioned above, but rather than just returning true or false, it returns an object with all of the settings you passed in. For each key in the object, it will be set to true if the string passed in matches that setting, or false if the string passed in fails that setting.

    var passwordComplexity = complexity.checkError(pass, options)

    console.log(passwordComplexity);

    //  {
    //    uppercase : true,
    //    lowercase : true,
    //    special   : false,
    //    digit     : false,
    //    min       : true,
    //    max       : true
    //  }
