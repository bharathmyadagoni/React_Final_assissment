import React, { useEffect, useState } from "react";
import "./Home.css";
import {AiOutlineStar, AiOutlineEdit } from "react-icons/ai";
import { FaTrashRestore,FaTrash,FaStar} from "react-icons/fa"
const userhand = () => {
  const userha = JSON.parse(localStorage.getItem("u"));
  if (userha) {
    return userha;
  } else {
    return [];
  }
};
const paraData = ()=>{
  const s = JSON.parse(localStorage.getItem("paradata"));
  if (s){
      return s
  } else {
      return []
  }
}
const Home = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("Add");
  const [description, setDescription] = useState();
  const [data, setData] = useState(userhand());
  const [showAdd, setShowadd] = useState(true);
  const [userData, setUserdata] = useState(paraData());
  const [activeTab, setActivetab] = useState(0);
  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [starData, setstarData] = useState();
  const [deleteData, setDeletedata] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [formName,setFormname] = useState()
  const [formDes,setFormdes] = useState()
useEffect(() => {
    localStorage.setItem("u", JSON.stringify(data));
  },[data,starData,deleteData]); //store the data localStorage
    useEffect(() => {
      localStorage.setItem("paradata", JSON.stringify(userData));
    },[userData])
useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second
return () => {
      clearInterval(interval);
    };
  }, []); 
const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }; 
const formattedDate = currentDate.toLocaleString("en-US", options); //setDate
const titleHandler = (event) => {
    setTitle(event.target.value);
    if(!title){
       setFormname("required")
    } else if(title.length>1){
      setFormname(null)
    }
   }; //Enter the title
  const name = ()=>{
    if(!title){
      setFormname("required")
   } else if(title.length>1){
     setFormname(null)
   }
  }
  const discriptionHandler = (event) => {
    setDescription(event.target.value);
    if (!description){
      setFormdes("required")
    } else if(description.length>1) {
      setFormdes(null)
    }
  }; //Enter the Description
  const des = ()=>{
    if (!description){
      setFormdes("required")
    } else if(description.length>1) {
      setFormdes(null)
    }
  }
  const validation = (e) => {
    const userData = { date: formattedDate, title, description, stared: false,delete:false,id:data?.length+1, };
    setData([...data, userData]);
    setTitle("");
    setDescription("");
    setShowadd(true);
    e.preventDefault()
  }; //Input Data Stored(title,description)
  const LengthofData = (data.length); //length of the All data
   const lengthOfStarData = data?.filter((val)=>val?.stared===true)?.length; 
   //length of the star data
  const lengthOfDeleteData = data?.filter((val)=>val?.delete===true)?.length; //length of the delete data
const deletedHander = (i,each) => {
    // data.splice(i, 1);
    // setData([...data]);
    // starData.splice(i,1)
    // setstarData([...starData])
    // setDeletedata([...deleteData, each]);
 const updatedata =  JSON.parse(localStorage.getItem("u")).map((val) =>{
      if(val.id === each.id){
        val.delete=!each.delete;
        val.stared=false;
      }
      return val;
    });
    each.delete=!each.delete;
    each.stared=false;
     setDeletedata(updatedata.filter((val) =>val.delete===true));
    setData(updatedata);
    setstarData(updatedata.filter((val) =>val.stared===true))
  }; //Deleted Data
// localStorage.setItem("deletedData",JSON.stringify(deleteData))
const add = () => {
    setShowadd(false);
  }; //Add button clicking Show the Home page
  const editHandler = (e) => {
    setTitle(e.title);
    setDescription(e.description);
    setShowadd(false);
    setShow(false);
    setEdit(e);
    setNote("Edit");
  }; //Edit the Data
  const updateHandler = () => {
    const user =data.map((each) => {
      if (each === edit) {
        return { date: formattedDate, title, description,stared:each.stared};
      } else {
        return each;
      }
    })
    setData(user);
    setstarData(user);
    setShow(true);
    setShowadd(true);
    setTitle("");
    setDescription("");
  }; //Updating the data
  const dataHandler = (input) => {
    if (activeTab===1&& input.stared===false){
    setUserdata([])
    }  else if(activeTab===2&& input.delete===false){
      setUserdata ([])
    } else {
      setUserdata([input])
    }
  }; //Click data card Function
  const handleTabClick = (index) => {
    setActivetab(index);
    setUserdata([])
  }; //Vertical tabs function
  const starHandler = (item) => {
    const updatedata =   JSON.parse(localStorage.getItem("u")).map((val) =>{
      if(val.id === item.id){
        val.stared=!item.stared;
      }
      return val;
    });
    item.stared=!item.stared;
     setstarData(updatedata.filter((val) =>val.stared===true));
    setData(updatedata);
  }; //StarButton function
 const cancelHandler = () => {
    setShowadd(true);
  }; // cancelButton Function
  const searchHandler = (event) => {
    setSearchItem(event.target.value);
  };
  const searchData = data.filter((each) => {
    return each.title.toLowerCase().includes(searchItem.toLocaleLowerCase());
  });
  const finaldata = data<1 ? data : searchData;
  //Search All Notes Funtion
  const searchStardata = starData?.filter((each) => {
    return each.title.toLowerCase().includes(searchItem.toLocaleLowerCase());
  });
  const starSeachData = starData<1?starData:searchStardata
  // Search Star Notes Funtion
  const searchDeletedata =deleteData?.filter((each) => {
    return each.title.toLowerCase().includes(searchItem.toLocaleLowerCase());
  });
  const deleteSeachData = deleteData<1?deleteData:searchDeletedata
  // Search Star Notes Funtion
return (
    <div>
      {showAdd ? (
        <div>
          <div className="home">
            <h4 className="mt-3 notes">Notes</h4>
            <input
              type="search"
              className="form-control serach"
              placeholder="Search by title"
              onChange={searchHandler}
              value={searchItem}
            />
            <button onClick={add} className="addbutton">
              Add
            </button>
            <h6 className="welcome">
              WelCome <span className="name">Bharath</span>
            </h6>
          </div>
          {activeTab===0?<h4 className="head">All Notes</h4>:activeTab===1?<h4 className="head">Stared Notes</h4>:<h4 className="head">Deleted Notes</h4>}
          <div className="container-2">
            <div className="vertical-tabs">
              <div className="tab-nav mt4 ml-0">
                <ul>
                  <li
                    className={`tab-item ${
                      activeTab === 0 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(0)}
                  >
                    All ({LengthofData})
                  </li>
                  <li
                    className={`tab-item ${
                      activeTab === 1 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(1)}
                  >
                    Stared ({lengthOfStarData})
                  </li>
                  <li
                    className={`tab-item ${
                      activeTab === 2 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    Deleted ({lengthOfDeleteData})
                  </li>
                </ul>
              </div>
            </div>
            {activeTab ===0 &&(
              <div>
                {finaldata.map((each, index) => {
                  return (
                    <div>
                      <div
                        className="data"
                        onClick={() => 
                          dataHandler(each)}>
                        <div className="data-container">
                          <h6 className="title">{each?.title}</h6>
                         {each.delete?<button className="detele-button">Deleted</button>:""}
                          <div>
                            <button
                              onClick={() => starHandler(each)}
                              className="star-button"
                              disabled={each.delete}
                            >{!each.stared?<AiOutlineStar/>:<FaStar/>}
                            </button>
                            <button className="delete-button" onClick={()=>deletedHander(index, each)}>
                             {each.delete?<FaTrashRestore/>: <FaTrash/>}
                            </button> 
                          </div>
                        </div>
                        <p className="para-des">{each?.description}</p>
                      </div>
                    </div>
                    );
                })}
              </div>
            )}
            {activeTab === 1 && (
              <div>
                {starSeachData?.length<1?<h4 className="empty">There is no stared data</h4>:""}
                {starSeachData?.map((each, index) => {
                  return (
                    <div onClick={() => 
                        dataHandler(each)} className="data-star">
                      <div className="data-container">
                        <h6>{each.title}</h6>
                        <div>
                          <button onClick={() => starHandler(each,index)}
                            className="star-button"
                          >
                          {!each.stared?<AiOutlineStar/>:<FaStar/>}
                          </button>
                          <button className="delete-button" onClick={()=>deletedHander(index,each)}>
                          <FaTrash/>
                          </button>
                        </div>
                      </div>
                      <p>{each.description}</p>
                    </div>
                  );
                })} 
              </div>
            )}
            {activeTab === 2 && (
              <div>
                {deleteSeachData?.length<1?<h4 className="empty">There is no deleted data</h4>:""}
                {deleteSeachData?.map((each, index) => {
                  return (
                    <div onClick={() => 
                        dataHandler(each)} className="data-delete">
                      <div className="data-container">
                        <h6>{each.title}</h6>
                        <button className="detele-button">Deleted</button>
                        <div>
                          <button
                            className="star-button"
                          >
                            <AiOutlineStar/>
                          </button>
                          <button className="delete-button" onClick={()=>deletedHander(index, each)}>
                          <FaTrashRestore/>
                          </button>
                        </div>
                      </div>
                      <p>{each.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
            {userData.map((each,index) => {
              return (
                <div className="details">
                  <div className="title-date">
                    <p className="data-head">{each?.title}</p>
                    <p className="data-para">{each?.date}</p>
                    <p className="data-des">{each?.description}</p>
                  </div>
                  <div className="edit-delete-btn">
                          <button 
                            className="stars-button"
                            onClick={() => {
                              editHandler(each);
                            }}
                            disabled={each.delete}
                          >
                            <AiOutlineEdit />
                          </button>
                          <button className="stars-button" 
                          onClick={()=>{starHandler(each)}}
                          disabled={each.delete}
                          >
                            {!each.stared?<AiOutlineStar/>:<FaStar/>}
                          </button>
                          <button className="stars-button" onClick={()=>deletedHander(index, each)}>
                          {each.delete?<FaTrashRestore/>: <FaTrash/>}
                          </button>
                        </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="input">
            <h3>{note} Notes</h3>
            <form  onSubmit={validation}>
            <label className="label">
              Title <span className="start">*</span>
            </label>
            <input
              onChange={titleHandler}
              value={title}
              type="text"
              className="form-control inpu"
              placeholder="Enter Title"
              onBlur={name}
              required
            />
            <p style={{color:"red"}}>{formName}</p>
            <label className="label">
              Decsptions <span className="start">*</span>
            </label>
            <input
              onChange={discriptionHandler}
              value={description}
              type="text"
              className="form-control input2"
              placeholder="Enter Your Desprctions"
              onBlur={des}
              required
            />
            <p style={{color:"red"}}>{formDes}</p>
            <button  onClick={cancelHandler} className="cancel-button">
              Cancel
            </button>
            {show ? (
              <button type="submit"  className="button">
                Add
              </button>
            ) : (
              <button type="submit" className="button" onClick={updateHandler}>
                Save
              </button>
            )}
            </form>
          </div>
        </div>
      )}
    </div>
    
  );
};
export default Home;
