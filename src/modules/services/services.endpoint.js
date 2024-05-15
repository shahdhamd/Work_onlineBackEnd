import {roles} from '../../services/roles.js'
export const endpoint={
    createServices:[roles.Admin],
    delete:[roles.Admin],
    update:[roles.Admin],
    serach:[roles.User,roles.Admin],
    showAll:[roles.User,roles.Admin],
    addmodelToServeces:[roles.Admin],
    DeletModelfromServices:[roles.Admin],
    showAllModel:[roles.User,roles.Admin],
    updateModel:[roles.Admin]

}