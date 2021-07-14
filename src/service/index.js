import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
import Put from './Put';
import Delete from './Delete';

// GET
const customers = (token) => Get('/api/close/admin/customers', false, token)
const categories =(token) => Get('/api/close/admin/categories', false, token)


//POST
const login = (data) => Post('/api/open/admin/login', false, data);
const customerCreate = (data, token) => Post('/api/close/admin/customers', false, data, token);
const categoriesCreate = (data, token) => Post('/api/close/admin/categories', false, data, token);

// PUT
const customerEdit = (data, token) => Put(`/api/close/admin/customers/${data.id}`, false, data, token);
const categoriesEdit = (data, token) => Put(`/api/close/admin/categories/${data.id}`, false, data, token);


// DELETE
const customerDelete = (id, token) => Delete(`/api/close/admin/customers/${id}`, false, token);
const categoriesDelete = (id, token) => Delete(`/api/close/admin/categories/${id}`, false, token);

const API = {
      login,
      customers,
      customerEdit,
      customerDelete,
      customerCreate,
      categories,
      categoriesCreate,
      categoriesEdit,
      categoriesDelete
}

export default API;