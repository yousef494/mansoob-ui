const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {

    ac.grant("ADMIN")
        .createAny("reading")
        .readAny("reading")
        .updateAny("reading")
        .deleteAny("reading")

    ac.grant("ADMIN")
        .createAny("consumption")
        .readAny("consumption")
        .updateAny("consumption")
        .deleteAny("consumption")

    ac.grant("ADMIN")
        .createAny("device")
        .readAny("device")
        .updateAny("device")
        .deleteAny("device")

    ac.grant("ADMIN")
        .createAny("user")
        .readAny("user")
        .updateAny("user")
    //.deleteAny("user")

    ac.grant("ADMIN")
        .createAny("user_device")
        .readAny("user_device")
        .updateAny("user_device")
        .deleteAny("user_device")

    ac.grant("ADMIN")
        .createAny("notification")
        .readAny("notification")
        .updateAny("notification")
        .deleteAny("notification")



    ac.grant("BASIC")
        .createOwn("reading")
        .readOwn("reading")
        .updateOwn("reading")
        .deleteOwn("reading")

    ac.grant("BASIC")
        .createOwn("consumption")
        .readOwn("consumption")
        .updateOwn("consumption")
        .deleteOwn("consumption")

    ac.grant("BASIC")
        .createOwn("device")
        .readOwn("device")
        .updateOwn("device")
        .deleteOwn("device")

    ac.grant("BASIC")
        .createOwn("user")
        .readOwn("user")
        .updateOwn("user")
    //.deleteOwn("user")

    ac.grant("BASIC")
        .createOwn("user_device")
        .readOwn("user_device")
        .updateOwn("user_device")
        .deleteOwn("user_device")

    ac.grant("BASIC")
        .createOwn("notification")
        .readOwn("notification")
        .updateOwn("notification")
        .deleteOwn("notification")


    //examples
    /*
    ac.grant("role").readAny("resource")
    //ac.grant("role").action("resource")
   
    ac.grant("basic")
    .readOwn("profile")
    .updateOwn("profile")
    
   ac.grant("supervisor")
    .extend("basic")
    .readAny("profile")
    
   ac.grant("admin")
    .extend("basic")
    .extend("supervisor")
    .updateAny("profile")
    .deleteAny("profile")
   */


    return ac;
})();