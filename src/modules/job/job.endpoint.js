import { roles } from "../../services/roles.js";

 export const endpoints={
    add:[roles.Admin,roles.User],
    delet:[roles.Admin,roles.User],
    showAll:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User]

}