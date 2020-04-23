# testcafe-reporter-xray-json
[![Build Status](https://travis-ci.org/s1mob/testcafe-reporter-xray-json.svg)](https://travis-ci.org/s1mob/testcafe-reporter-xray-json)

This is the **xray-json** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/s1mob/testcafe-reporter-xray-json/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-xray-json
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter xray-json
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('xray-json') // <-
    .run();
```

## Author
mboukhenaif (https://github.com/s1mob)
