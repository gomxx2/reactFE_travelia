import { useState, useEffect, React } from 'react';
import * as api from './../api';
import Select from 'react-select'

import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function Customers() {
    const [state, setState] = useState({});
    const [data, setData] = useState([]);

    const [edit, setEdit] = useState(false);

    const [data_customers, setDataCustomers] = useState([]);
    const [data_one_customers, setOneDataCustomers] = useState({});
    const [listOrder, setListOrder] = useState([]);
    const [data_travelpackage, setDataTravelPackage] = useState([]);

    const [invoice, setInvoice] = useState(null);

    const [selectedOptions, setSelectedOptions] = useState([]);
    

    useEffect(() => {
        const fetchData = async()=>{
            const result = await api.readOrders()
            console.log(data_one_customers)
            setData(result.data)
            console.log(result.data)
            console.log('oiiiiiiiiiiiiidddddddddddiiiiiiiiii')
            let list_order = []
            for (let i = 0; i < result.data.length; i++) {
                if(result.data[i].customer_id != null)
                {
                   list_order.push(result.data[i].customer_id)
                    
                    // list_order.push({'value':result.data[i].id,'label':result.data[i].name+' || Price:'+result.data[i].price});
                }
              }
            console.log(list_order)
            console.log('oiiiiiiiiiiiiiiiiiiiiiii')
        }
        const fetchOneCustomers = async(id)=>{
            const result = await api.readOneCustomers(id)
            console.log(result)
            setOneDataCustomers(result.data)
        }
        const fetchDataCustomers = async()=>{
            const result = await api.readCustomers()
            console.log(result.data)
            setDataCustomers(result.data)
        }
        const fetchDataTravelPackage = async()=>{
            const result = await api.readTravelPackages()
           
            let optionPackage = []
            for (let i = 0; i < result.data.length; i++) {
                optionPackage.push({'value':result.data[i].id,'label':result.data[i].name+' || Price:'+result.data[i].price});
              }
            console.log(optionPackage)
            setDataTravelPackage(optionPackage)
        }
        const generatorInvoce = async()=>{
            let x = Math.floor((Math.random() * 3000) + 500);
            let invoice = '#INV-'+ x
            state.invoice_number = invoice
            setInvoice(invoice);
        }
        fetchData ()
        fetchDataCustomers ()
        fetchDataTravelPackage ()
        generatorInvoce()
    }, [])  
    const createOrders = async () => {
        try{
            
            const { data_x } = await api.createOrders(state);

            setState([...data, data_x])
        } catch (error){
            console.log(error)
            console.log("---------catchh error-----------")
        }
    }  
    const deleteCustomer = async(id)=>{
        await api.deleteCustomers(id);
        console.log(id)
        console.log("----------cccccc-----------")
        const result = await api.readCustomers();
        setData(result.data     )
    }

    const updateCustomer = async()=>{
        let id = state.id
        delete state.id
        await api.updateCustomers(id,state);
        console.log(id)
        console.log(setState)
        
        console.log("----------after update----------")
       
            // const result = await api.readCustomers();
            // setData(result.data     )
    }
    const handleChange = async(options) => {
        console.log(options)
        setSelectedOptions(options);
        state.package_test_id = options;
        
    }
    
    return (
        <div className='App m-5'>
            <h2 className='mt-100'>Order Package</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Invoice ID</label>
                    <input type="name" className="form-control" value={invoice}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Customer</label>
                    <select className="form-select" aria-label="Default select example" defaultValue="" onChange={e => setState({...state,customer_id:e.target.value})}>
                        <option selected>Open this select menu</option>
                        {data_customers.map((value, index) => (
                            <option value={value.id}>
                            {value.name}  || {value.phone}</option>
                        ))}
                        
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Package Name</label>
                        <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}            
                        isMulti
                        defaultValue={[]}
                        options={data_travelpackage}
                        onChange={handleChange}               
                        />
                </div>
                {edit?<button className="btn btn-primary"  onClick={updateCustomer}>update</button>:
                <button type="submit" className="btn btn-primary" onClick={createOrders}>Submit</button>}
                
            </form>
            <pre>{JSON.stringify(state,null,"\t")}</pre>

                
                {data.map((value, index) =>(

                    <tr>
                        <div className="card">
                            <h5 className="card-header">{value.invoice_number}</h5>
                            <div className="card-body">
                                <h5 className="card-title">Customer:</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>

                    </tr>

                ))}


        </div>
    )
}
