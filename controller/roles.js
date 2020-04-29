const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {

 ac.grant("ADMIN")
 .readAny("consumption")
 .updateAny("profile")
 .deleteAny("profile")

 ac.grant("BASIC")
 .readAny("consumption")
 
 //examples
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



 return ac;
})();