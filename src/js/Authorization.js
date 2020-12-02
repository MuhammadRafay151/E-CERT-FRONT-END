export function CheckAuthorization(UserRoles, AllowedRoles) {
    var isvalid = false;
    for (var i = 0; i < UserRoles.length; i++) {
        if (AllowedRoles.includes(UserRoles[i])) {
            isvalid = true
            break;
        }
    }
    if (isvalid)
        return true
    else
        return false

}
