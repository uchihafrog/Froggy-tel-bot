const fs = require('fs');
const path = require('path');
const { install } = require('./system/install');
const { scriptsUtils } = require('./utility/scriptsUtils.js')

// Load the JSON files with absolute paths
const settings = require(path.join(process.cwd(), "setup/settings.json"));
const vip = require(path.join(process.cwd(), "setup/vip.json"));
const api = require(path.join(process.cwd(), "setup/api.json"));
// Set global variables
global.settings = settings;
global.vip = vip;
global.api = api;
// Initialize the chaldea object
global.chaldea = {
  commands: new Map(),
  cooldowns: new Map(),
  replies: new Map(),
  callbacks: new Map(),
  events: new Map()
};

global.scripts = scriptsUtils;

scriptsUtils();
// Require the login module and call its function
const { login } = require("./system/login");
login();