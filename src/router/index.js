import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../pages/SplashScreen';
import Login from'../pages/Login';
import Home from'../pages/Home';
import Menu from'../pages/Menu';
import Ticket from'../pages/Tickets/Ticket';
import ViewTicket from'../pages/Tickets/Ticket/view';
import EditTicket from'../pages/Tickets/Ticket/edit';
import AddTicket from'../pages/Tickets/Ticket/add';
import Action from'../pages/Tickets/Action';
import ViewAction from'../pages/Tickets/Action/view';
import AddAction from '../pages/Tickets/Action/add';
import EditAction from '../pages/Tickets/Action/edit';
import EditActionStatus from '../pages/Tickets/Action/editstatus';
import StaffAction from '../pages/Tickets/Staff';
import ViewStaffAction from '../pages/Tickets/Staff/view'
import AddStaffAction from '../pages/Tickets/Staff/add';
import EditStaffAction from '../pages/Tickets/Staff/edit';
import Master from'../pages/Master';
import Customer from '../pages/Master/Customer';
import ViewCustomer from'../pages/Master/Customer/view';
import AddCustomer from'../pages/Master/Customer/add';
import EditCustomer from'../pages/Master/Customer/edit';
import Kategory from'../pages/Master/Kategory';
import AddKategory from'../pages/Master/Kategory/add';
import EditKategory from'../pages/Master/Kategory/edit';
import Departemen from'../pages/Master/Departemen';
import ViewDepartemen from'../pages/Master/Departemen/view';
import AddDepartemen from'../pages/Master/Departemen/add';
import EditDepartemen from'../pages/Master/Departemen/edit';
import SubDepartemen from'../pages/Master/SubDepartemen';
import AddSubDepartemen from '../pages/Master/SubDepartemen/add';
import EditSubDepartemen from '../pages/Master/SubDepartemen/edit';
import Staff from'../pages/Master/Staff/index';
import ViewStaff from'../pages/Master/Staff/view';
import AddStaff from'../pages/Master/Staff/add';
import EditStaff from'../pages/Master/Staff/edit';
import UsersManagement  from '../pages/UsersManagement';
import Permissions from'../pages/UsersManagement/Permissions';
import AddPermissions from'../pages/UsersManagement/Permissions/add';
import EditPermissions from'../pages/UsersManagement/Permissions/edit';
import Users from'../pages/UsersManagement/Users';
import ViewUsers from'../pages/UsersManagement/Users/view';
import AddUsers from'../pages/UsersManagement/Users/add';
import EditUsers from'../pages/UsersManagement/Users/edit';
import Roles from '../pages/UsersManagement/Roles';
import ViewRoles from '../pages/UsersManagement/Roles/view';
import AddRoles from '../pages/UsersManagement/Roles/add';
import EditRoles from '../pages/UsersManagement/Roles/edit';
import Profile from '../pages/Profile';
import Maps from'../pages/MAPS';


const Stack = createStackNavigator();
const Router = () =>{
    return(
        <Stack.Navigator initialRoutName="SplashScreen">
            <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Menu"
            component={Menu}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Ticket"
            component={Ticket}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewTicket"
            component={ViewTicket}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditTicket"
            component={EditTicket}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddTicket"
            component={AddTicket}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Action"
            component={Action}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewAction"
            component={ViewAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddAction"
            component={AddAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditAction"
            component={EditAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditActionStatus"
            component={EditActionStatus}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="StaffAction"
            component={StaffAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewStaffAction"
            component={ViewStaffAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddStaffAction"
            component={AddStaffAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditStaffAction"
            component={EditStaffAction}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Master"
            component={Master}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Customer"
            component={Customer}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewCustomer"
            component={ViewCustomer}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddCustomer"
            component={AddCustomer}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditCustomer"
            component={EditCustomer}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Kategory"
            component={Kategory}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddKategory"
            component={AddKategory}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditKategory"
            component={EditKategory}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Departemen"
            component={Departemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewDepartemen"
            component={ViewDepartemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddDepartemen"
            component={AddDepartemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditDepartemen"
            component={EditDepartemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="SubDepartemen"
            component={SubDepartemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddSubDepartemen"
            component={AddSubDepartemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditSubDepartemen"
            component={EditSubDepartemen}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Staff"
            component={Staff}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewStaff"
            component={ViewStaff}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddStaff"
            component={AddStaff}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditStaff"
            component={EditStaff}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="UsersManagement"
            component={UsersManagement}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Permissions"
            component={Permissions}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddPermissions"
            component={AddPermissions}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditPermissions"
            component={EditPermissions}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Users"
            component={Users}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewUsers"
            component={ViewUsers}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddUsers"
            component={AddUsers}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditUsers"
            component={EditUsers}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Roles"
            component={Roles}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="ViewRoles"
            component={ViewRoles}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="AddRoles"
            component={AddRoles}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="EditRoles"
            component={EditRoles}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown:false}}
            />
            <Stack.Screen
            name="Maps"
            component={Maps}
            options={{headerShown:false}}
            />
        </Stack.Navigator>
        )
    }
    export default Router