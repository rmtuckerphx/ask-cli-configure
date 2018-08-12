'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const jsonUtility = require('./json-utility');
// const FORMATTER_SPACING = 26;
// const CONSTANT = require('./constants');

module.exports = {
    checkASKProfileExist: checkASKProfileExist,
    deleteProfile: deleteProfile,
    getListProfile: getListProfile
};

function checkASKProfileExist(profileName) {
    if (profileName === '__ENVIRONMENT_ASK_PROFILE__') return true;
    let askCliConfig = path.join(os.homedir(), '.ask', 'cli_config');
    let askProfile = jsonUtility.read(askCliConfig);
    return askProfile.profiles.hasOwnProperty(profileName);
}

function deleteProfile(profile) {
    let configPath = path.join(os.homedir(), '.ask', 'cli_config');
    let targetPath = ['profiles', profile];
    jsonUtility.deleteProperty(configPath, targetPath);
}

function getListProfile() {
    let askConfig = path.join(os.homedir(), '.ask', 'cli_config');
    if (!fs.existsSync(askConfig)) {
        return null;
    }
    let profileObject = jsonUtility.read(askConfig);
    let profiles = profileObject.profiles;
    if (!profiles || Object.keys(profiles).length === 0) {
        return null;
    }
    let printOut = [];
    for (let profile of Object.getOwnPropertyNames(profiles)) {
        printOut.push({
            'askProfile': profile,
            'awsProfile': profiles[profile].aws_profile
        });
    }
    return printOut;
}
