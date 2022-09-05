import { useState, useEffect, React } from 'react';
import * as api from './../api';

export default function Customers() {
    const [state, setState] = useState({});
    const [data, setData] = useState([]);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async()=>{
        const result = await api.readCustomers()
        console.log(result)
        setData(result.data)
        }
        fetchData ()
    }, [])  
    const createCustomer = async () => {
        try{
            const { data_x } = await api.createCustomers(state);
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

    const editCustomer = (id, name, phone, email, address) =>{
        setState({id, name, phone, email, address})
        setEdit(true)
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
    return (
        <div className='App m-5'>
            <h2 className='mt-100'>Customers</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="name" className="form-control" value={state.name}
                    onChange={e => setState({...state, name:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone Numbers</label>
                    <input type="phone" className="form-control" value={state.phone}
                    onChange={e => setState({...state,phone:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={state.email}
                    onChange={e => setState({...state, email:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="address" className="form-control" value={state.address}
                    onChange={e => setState({...state, address:e.target.value})}
                    />
                </div>
                {edit?<button className="btn btn-primary"  onClick={updateCustomer}>update</button>:
                <button type="submit" className="btn btn-primary" onClick={createCustomer}>Submit</button>}
                
            </form>
            <pre>{JSON.stringify(state,null,"\t")}</pre>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                
                {data.map((value, index) =>(
                <tbody key={value.id}>
                    <tr>
                        <th >{index+1}</th>
                        <th scope="row">{value.name}</th>
                        <td>{value.phone}</td>
                        <td>{value.email}</td>
                        <td>{value.address}</td>
                        <td >
                            <div>
                                <span className="badge text-bg-success" onClick={() => editCustomer(value.id, value.name, value.phone, value.email, value.address)}>update</span>
                                <a><span  className="badge text-bg-danger" onClick={() => deleteCustomer(value.id)}>Delete</span></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
                ))}
            </table>

        </div>
    )
}
