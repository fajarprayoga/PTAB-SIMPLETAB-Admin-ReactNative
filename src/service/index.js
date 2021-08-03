import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
import Put from './Put';
import Delete from './Delete';

// GET
const customers = (token) => Get('/api/close/admin/customers', false, token)
const categories =(token) => Get('/api/close/admin/categories', false, token)
const dapertements =(token) => Get('/api/close/admin/dapertements', false, token)
const staffs =(token) => Get('/api/close/admin/staffs', false, token)
const ticktes =(token) => Get('/api/close/admin/tickets', false, token)
const actions =(data, token) => Get(`/api/close/admin/actionlists/${data}`, false, token)
const actionStaffs =(data, token) => Get(`/api/close/admin/actionStaffs/${data}`, false, token)
const actionStaffLists =(data, token) => Get(`/api/close/admin/actionStaffLists/${data}`, false, token)

//POST
const login = (data) => Post('/api/open/admin/login', false, data);
const customerCreate = (data, token) => Post('/api/close/admin/customers', false, data, token);
const categoriesCreate = (data, token) => Post('/api/close/admin/categories', false, data, token);
const dapertementsCreate = (data, token) => Post('/api/close/admin/dapertements', false, data, token);
const staffsCreate = (data, token) => Post('/api/close/admin/staffs', false, data, token);
const actionsCreate = (data, token) => Post('/api/close/admin/actions', false, data, token);
const actionsStaffStore = (data, token) => Post('/api/close/admin/actionStaffStore', false, data, token);
const customerstest =(data, token) => Post(`/api/close/admin/customerstest`, false, data, token)
// PUT
const customerEdit = (data, token) => Put(`/api/close/admin/customers/${data.id}`, false, data, token);
const categoriesEdit = (data, token) => Put(`/api/close/admin/categories/${data.id}`, false, data, token);
const dapertementsEdit = (data, token) => Put(`/api/close/admin/dapertements/${data.id}`, false, data, token);
const staffsEdit = (data, token) => Put(`/api/close/admin/staffs/${data.id}`, false, data, token);
const ticketsEdit = (data, token) => Put(`/api/close/admin/tickets/${data.id}`, false, data, token);
const actionsEdit = (data, token) => Put(`/api/close/admin/actions/${data.id}`, false, data, token);
const actionStaffUpdate = (data, token) => Put(`/api/close/admin/actionStaffUpdate`, false, data, token);

// DELETE
const customerDelete = (id, token) => Delete(`/api/close/admin/customers/${id}`, false, token);
const categoriesDelete = (id, token) => Delete(`/api/close/admin/categories/${id}`, false, token);
const dapertementsDelete = (id, token) => Delete(`/api/close/admin/dapertements/${id}`, false, token);
const staffsDelete = (id, token) => Delete(`/api/close/admin/staffs/${id}`, false, token);
const ticketsDelete = (id, token) => Delete(`/api/close/admin/tickets/${id}`, false, token);
const actionsDelete = (id, token) => Delete(`/api/close/admin/actions/${id}`, false, token);
const actionStaffDestroy = (data, token) => Delete(`/api/close/admin/actionStaffDestroy/${data.action_id}/${data.staff_id}`, false, token);
const API = {
      login,
      customers,
      customerEdit,
      customerDelete,
      customerCreate,
      categories,
      categoriesCreate,
      categoriesEdit,
      categoriesDelete,
      dapertements,
      dapertementsCreate,
      dapertementsEdit,
      dapertementsDelete,
      staffs,
      staffsCreate,
      staffsEdit,
      staffsDelete,
      ticktes,
      ticketsEdit,
      ticketsDelete,
      actions,
      actionsCreate,
      actionsEdit,
      actionsDelete,
      actionStaffs,
      actionStaffLists,
      actionsStaffStore,
      actionStaffUpdate,
      actionStaffDestroy,
      customerstest
}

export default API;