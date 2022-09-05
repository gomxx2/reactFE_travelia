import { useState, useEffect, React } from 'react';
import * as api from './../api';

export default function TravelPackages() {
    const [state, setState] = useState({});
    const [data, setData] = useState([]);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        const fetchData = async()=>{
        const result = await api.readTravelPackages()
        console.log(result)
        setData(result.data)
        }
        fetchData ()
    }, [])  
    const createTravelPackages = async () => {
        try{
            const { data_x } = await api.createTravelPackages(state);
            setState([...data, data_x])
        } catch (error){
            console.log(error)
            console.log("---------catchh error-----------")
        }
    }  
    const deleteTravelPackages = async(id)=>{
        await api.deleteTravelPackages(id);
        console.log(id)
        console.log("----------cccccc-----------")
        const result = await api.readTravelPackages();
        setData(result.data     )
    }

    const editTravelPackages = (id, name, description, price, image) =>{
        setState({id, name, description, price, image})
        setEdit(true)
    }

    const updateTravelPackages = async()=>{
        let id = state.id
        delete state.id
        await api.updateTravelPackages(id,state);
        console.log(id)
        console.log(setState)
        
        console.log("----------after update----------")
       
            // const result = await api.readTravelPackages();
            // setData(result.data     )
    }
    return (
        <div className='App m-5'>
            <h2 className='mt-100'>TravelPackages</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name Package</label>
                    <input type="name" className="form-control" value={state.name}
                    onChange={e => setState({...state, name:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="description" className="form-control" value={state.description}
                    onChange={e => setState({...state,description:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="price" className="form-control" value={state.price}
                    onChange={e => setState({...state, price:e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">image</label>
                    <input type="file" className="form-control" 
                    // onChange={e => setState({...state, image:e.target.value})}
                    />
                     {state.image?.map((value_x, index) =>(
                        <div key={index}    >   
                            <div>
                                <img style={{ width: 100, height: 100 }} src={api.url+value_x.formats.small.url} alt />
                            </div>

                        </div>
                    ))}
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="address" className="form-control" value={state.address}
                    onChange={e => setState({...state, address:e.target.value})}
                    />
                </div> */}
                {edit?<button className="btn btn-primary"  onClick={updateTravelPackages}>update</button>:
                <button type="submit" className="btn btn-primary" onClick={createTravelPackages}>Submit</button>}
                
            </form>
            <pre>{JSON.stringify(state,null,"\t")}</pre>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name Package</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th> Image</th>
                    </tr>
                </thead>
                
                {data.map((value, index) =>(
                <tbody key={value.id}>
                    <tr>
                        <th >{index+1}</th>
                        <th scope="row">{value.name}</th>
                        <td>{value.description}</td>
                        <td>{value.price}</td>
                        <td>
                            {value.image?.map((value_x, index) =>(
                                <div key={index}    >
                                    <div>
                                        <img style={{ width: 50, height: 50 }} src={api.url+value_x.formats.small.url} alt='true'/>                                    
                                    </div>

                                </div>
                            ))}
                        </td>
                        <td >
                            <div>
                                <span className="badge text-bg-success" onClick={() => editTravelPackages(value.id, value.name, value.description, value.price, value.image)}>update</span>
                                <a><span  className="badge text-bg-danger" onClick={() => deleteTravelPackages(value.id)}>Delete</span></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
                ))}
            </table>

        </div>
    )
}
