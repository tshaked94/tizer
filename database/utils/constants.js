const errMsg = (action, schemaName) => {
    return ("There was error in " + action + " in " + schemaName + " schema\n");
}

module.exports = {
    errMsg
}