import logo from './logo.svg';
import React, { useEffect, useState } from "react"
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [ data , setData] = useState([]);

  const [firstName , setFirstName]=useState("")
  const [lastName , setLastName] = useState("")
  const [age , setAge] = useState(0)
  const [id , setId] = useState(0)

  const [isUpdate , setIsUpdate] = useState(false)

  useEffect( () =>{
         setData(EmployeeData)
  },[])


  const handleEdit=(id)=>{
    const dt= data.filter(item => item.id === id);
    if( dt !== undefined)
      {
        setIsUpdate(true)
        setId(id);
        setFirstName(dt[0].firstName)
        setLastName(dt[0].lastName)
        setAge(dt[0].age)
      }
  }

  const handleDelete=(id)=>{
    if( id>0)
      {
        if (window.confirm("Are You Sure Want To Delete This Item ? "))
          {
        const dt= data.filter(item => item.id !== id);
        setData(dt)
      }
      }
    
  }

   const handleCreate = (e) => {
    let error = "";

    if(firstName === "")
    error += "First Name is Required";

    if(lastName === "")
      error += "last Name is Required";

    if(age <= 0)
      error += "age is Required";

    if (error === "")
      {
    e.preventDefault();
    const dt = [...data];
    const newObject = {
        id:EmployeeData.length +1,
        firstName: firstName,
        lastName: lastName,
        age:age
    }

    dt.push(newObject);
    setData(dt);
  }
  else{
    alert(error)
  }
   }


   const handleUpdate = () => {
    const index = data.map((item ) =>{
      return item.id
    }).indexOf(id);

    const dt=[...data];
    dt[index].firstName=firstName;
    dt[index].lastName=lastName;
    dt[index].age=age;

    setData(dt);
    handleClear();
   }



   const handleClear = () => {
    setId(0);
    setFirstName(" ")
    setLastName(" ")
    setAge(" ")
    setIsUpdate(false)
   }



  return (
    <div className="App" >
      <div ><h1>User Management Application  </h1></div>
       <div style={ { display:"flex" , justifyContent:"center", marginTop:"20px" , marginBottom:"20px", gap:"40px", backgroundColor:"aqua"}}>
           <div style={{backgroundColor:"aqua"}}>

            <label style={{color:"red" , fontSize:"20px", fontWeight:"bold"}}> First Name :
                <input type='text' placeholder="Enter First Name"  onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
            </label>
           </div>


           <div >
            <label style={{color:"red" , fontSize:"20px" , fontWeight:"bold"}}> Last Name :
                <input type='text' placeholder='Enter Last Name'  onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </label>
           </div>


           <div>
            <label style={{color:"red" , fontSize:"20px" , fontWeight:"bold"}}> Age :
                <input type='text' placeholder='Enter Age'  onChange={(e) => setAge(e.target.value)} value={age} />
            </label>
           </div>

           <div>

            {
              !isUpdate ? 
              <button className='btn btn-primary' onClick={(e) => handleCreate(e)}> Create </button>
              :
              <button className='btn btn-primary' onClick={() => handleUpdate()}> Update</button>

            }
           
          

          <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button> 
           </div>
       </div>



       <table className='table table-hover' >
        <thead>
          <tr>
            <td style={{backgroundColor:"#777a7e" , border:"2px solid black"}}>Sr.No</td>
            <td style={{backgroundColor:"#777a7e" , border:"2px solid black"}}>Id</td>
            <td style={{backgroundColor:"#777a7e" , border:"2px solid black"}}>First Name</td>
            <td style={{backgroundColor:"#777a7e" , border:"2px solid black"}}>Last Name</td>
            <td style={{backgroundColor:"#777a7e" , border:"2px solid black"}}>Age</td>
            <td style={{backgroundColor:"#777a7e" , border:"2px solid black"}}> Actions</td>
          </tr>
        </thead>

        <tbody>
          {
            data.map( (item , index) =>{
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                   <td>
                      <button className='btn btn-primary' onClick={() => handleEdit(item.id)}> Edit </button> &nbsp;
                      <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button> &nbsp;
                   </td>
                </tr>
              )
            })
          }
        </tbody>
       </table>
    </div>
  );
}

export default App;
