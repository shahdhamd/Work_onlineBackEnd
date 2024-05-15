import { roles } from './../../services/roles.js';

export const endpoint={
    add:[roles.Admin,roles.User],
    delete:[roles.Admin,roles.User],
    show:[roles.Admin,roles.User],
    update:[roles.User,roles.Admin]
}
