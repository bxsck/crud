import Axios from 'axios'
import { useState }from 'react'

function App() {
  const [name,setName] = useState("");
  const [age,setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position,setPostion] = useState("");
  const [wage,setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const getEmployees = () =>{
    Axios.get('http://localhost:3001/employees').then((response)=>{
       setEmployeeList(response.data);
    });
  }
  const addEmployee = () =>{
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(()=>{
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    })
    console.log("post")
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    addEmployee();
  }

  const updateEmployeeWage = (id) =>{
    Axios.put("http://localhost:3001/update",{wage : newWage, id: id}).then((response)=>{
      setEmployeeList(
        employeeList.map((val) =>{
          return val.id == id ?{
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            wage: newWage
          } : val;
        })
      )
    })
  }

  const deleteEmployee=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) =>{
      setEmployeeList(
        employeeList.filter((val) =>{
          return val.id != id; 
        }
      ))
    })
  }
  
  

  return (
    
    <div className="App container">
      <h1>Employee Information</h1>
        <div className="information">
          <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control"
              onChange={(e)=>{
                setName(e.target.value);
                console.log("Name : " + name)
              }}
              
              value={name} placeholder="Enter Name"/>
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number"
              value={age}
              onChange={(e)=>{
                setAge(e.target.value);
                console.log("Age : " + age)
              }}
               className="form-control" placeholder="Enter Age"/>
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text"
              value={country}
              onChange={(e)=>{
                setCountry(e.target.value);
                console.log("Country : " + country)
              }}
               className="form-control" placeholder="Enter Country"/>
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">Position :</label>
              <input type="text"
              value={position}
              onChange={(e)=>{
                setPostion(e.target.value);
                console.log("Position : " + position)
              }}
               className="form-control" placeholder="Enter Postion"/>
            </div>  
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">Salary :</label>
              <input type="number"
              value={wage}
              onChange={(e)=>{
                setWage(e.target.value);
                console.log("Wage : " + wage)
              }} className="form-control" placeholder="Enter Salary"/>
            </div>
            <button className="btn btn-success" >Submit</button>
          </form>
        </div>
        <hr/>
        <div className="employees">
          <button className="btn btn-primary" onClick={getEmployees}>Show Employee</button>
        </div>
        {employeeList.map((val, key)=>{
          return(
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name : {val.name}</p>
                <p className="card-text">Age : {val.age}</p>
                <p className="card-text">Country : {val.country}</p>
                <p className="card-text">Postion : {val.position}</p>
                <p className="card-text">Salary : {val.wage}</p>
                <div className="d-flex">
                  <input type="text"
                  type="number"
                  placeholder="15000..."
                  style={{width:"300px"}}
                  className="form-control"
                  onChange={(event)=>{
                    setNewWage(event.target.value)
                  }}
                  />
                  <button className="btn btn-warning" onClick={()=>{updateEmployeeWage(val.id)}}>Update</button>
                  <button className="btn btn-danger" onClick={()=>{ deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  );
}

export default App;
