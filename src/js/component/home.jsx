import React from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [list, setList] = useState([]);// en la izquierda esta la variable y la derecha es la funcion que la modifica!
	const [task, setTask] = useState("");

	const handleChange = (event) => {
		setTask(event.target.value);
	  };

	const handleKeyPress = (event) => {
		if(event.key === 'Enter'){
		  setList([...list, event.target.value]);		  
		  setTask('');  
		}
	  }

	const deleteTask = (index) => {
		const auxList = list.filter((task, position) => position != index);
		setList(auxList);
	}

	return (
		<div>			
			<div className="container d-flex justify-content-center">
					<p className="century display-2">Todo List</p>
			</div>	
			<div className="d-flex flex-column align-items-center">
			<ul className="input list-group list-group-flush">					
				<input className="listText list-group-item" type="text" placeholder="Pending Task" onChange={handleChange} value={task} onKeyDown={handleKeyPress}/>				
					{list.length==0 ? <span className="listText list-group-item">"No tasks, add a task"</span> : list.map((task, index)=>{ //pendiente del return, colocar la instruccion o funcion a su lado.
						return (<div key={index}>
								<li className="listText list-group-item display-4">{task}
									<i className="clear fa-solid fa-xmark ms-3 position-absolute end-0 me-4" onClick={()=>{
										deleteTask(index);
									}}></i>
								</li>								
								</div>)
					})}
				<li className="pendientes list-group-item display-4">{list.length==0 ? "No hay tareas pendientes" : list.length==1 ? `${list.length} item pendiente` : `${list.length} items pendientes`}</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
