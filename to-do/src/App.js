import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import './App.css';

function App() {
  const [toDo, setToDo] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState(''); //


  //add new item
  const addTask = () => {
    if(newTask){
      let num = toDo.length + 1;
      let newEntry = {
        id: num, title: newTask, status: false
      }
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
    
  }
  

  //delete the item
  const deleteTask = (id) => {
    let newTasks = toDo.filter(task=>task.id !== id);
    setToDo(newTasks);

  }

  //mark the task as complete or 
  const markDoneTask = (id) => {
    let newTask = toDo.map(task => {
      if (task.id == id){
        return ({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask);

  }
  const cancelUpdate = () => {
    setUpdateData('');


  }
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);

  }
  const updateTask = (e) => {
    let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
    let upDatedObject = [... filterRecords, updateData];
    setToDo(upDatedObject);
    setUpdateData("");

  }


  return (


    <div className="container App">
        <br /> <br />
        <h2> To-Do list application </h2>
        <br /> <br />
        Webstyle press
        <br /> <br />

        {/* Update the task HTML*/}
        {updateData && updateData ? (
          <>
          <div className="row">
          <div className="col">
            <input 
            value = {updateData && updateData.title}
            onChange = {(e)=> changeTask(e)}
            className = "form-control form-control-ig" ></input>
          </div>
          <div className="col-auto"> 
            <button 
            onClick = {updateTask}
            className="btn btn-lg btn-success mr-20"> 
            Update</button>
            <button
              onClick = {cancelUpdate}
              className="btn btn-lg btn-warning">
              Cancel</button>
          </div>
        </div>
        <br /> 
          </>
        ) : (
          <>
          <div className="row">
          <div className="col">
            <input
            value = {newTask}
            onChange = {(e) => setNewTask(e.target.value)} 
            className="form-control form-control-lg"/>
          </div>
          <div className="col-auto ">
            <button
            onClick = {(addTask)}
            className="btn btn-lg btn-success">
              Add task
            </button>

          </div>

        </div>
        <br />
          </>

        )}
        

{/*Add the task HTML*/}
        


        {toDo && toDo.length ? '' : 'There is no tasks.'}

        {toDo && toDo
        .sort((a,b)=> a.id > b.id ? 1: -1)
        .map((task,index) => {
          return(
            <React.Fragment key={task.id}>

              <div className = "task-col">
                <div className = {task.status ? 'done' : ''}> 
                  <span className="taskNumber">{index+1}</span> 
                  <span className="taskText">{task.title}</span> 
                </div>
                <div className = "iconsWrap">
                  <span title = "Completed / Not Completed"
                  onClick = {(e) => markDoneTask(task.id)}>
                    <FontAwesomeIcon icon = {faCircleCheck}> </FontAwesomeIcon>
                  </span> 
                  
                  {task.status ? null : (
                    <span title = "Edit"
                    onClick = {() => setUpdateData({id: task.id, title: task.title, status: task.status ? true : false })}>
                    <FontAwesomeIcon icon = {faPen}> </FontAwesomeIcon> 
                  </span> 

                  )}
                  <span title = "Delete"
                  onClick = {() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon = {faTrashCan}> </FontAwesomeIcon>
                  </span> 
                </div>
              </div>
              
            </React.Fragment>
          )
        })}
    </div>
  );
}

export default App;
