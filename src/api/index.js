import axios from 'axios';

const CUSTOMERS = '/customers'
const TRAVEL_PACKAGES = '/travel-packages'
const ORDERS = '/orders'
export const url = "http://localhost:1337";

//CUSTOMERS API
export const readCustomers   = ()=>axios.get(url+CUSTOMERS);
export const readOneCustomers   = (id)=>axios.get(`${url+CUSTOMERS}/${id}`);
export const createCustomers = newData => axios.post(url+CUSTOMERS, newData);
export const updateCustomers = (id, updateData) => axios.put(`${url+CUSTOMERS}/${id}`,updateData);
export const deleteCustomers = (id) => axios.delete(`${url+CUSTOMERS}/${id}`);

//TRAVELPACKAGE API
export const readTravelPackages   = ()=>axios.get(url+TRAVEL_PACKAGES);
export const createTravelPackages = newData => axios.post(url+TRAVEL_PACKAGES, newData);
export const updateTravelPackages = (id, updateData) => axios.put(`${url+TRAVEL_PACKAGES}/${id}`,updateData);
export const deleteTravelPackages = (id) => axios.delete(`${url+TRAVEL_PACKAGES}/${id}`);

//TRAVELPACKAGE API
export const readOrders   = ()=>axios.get(url+ORDERS);
export const createOrders = newData => axios.post(url+ORDERS, newData);
export const updateOrders = (id, updateData) => axios.put(`${url+ORDERS}/${id}`,updateData);
export const deleteOrders = (id) => axios.delete(`${url+ORDERS}/${id}`);