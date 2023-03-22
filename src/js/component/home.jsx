import React, { useEffect } from "react";
import { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [list, setList] = useState([{label:"sample task", done:"false"}]);// en la izquierda esta la variable y la derecha es la funcion que la modifica!
	const [task, setTask] = useState("");

		/*startList: Inicia la lista (siempre debe existir un elemento, hay condicionales para 
		mostrar vacia la lista mientras solo tenga el elemento inicial con el que se creó)*/

	const startList = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/Otto123', {
		method: "POST",
		body: JSON.stringify([]),
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			if (resp.status == 200) {
				getTODOS();
			}
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
	}

	const handleChange = (event) => {
		setTask(event.target.value);
		console.log(list[0].label);
	  };

	const handleKeyPress = (event) => {
		if(event.key === 'Enter'){
			if(list[0].label == "sample task") {
				fetch('https://assets.breatheco.de/apis/fake/todos/user/Otto123', {
				method: "PUT",
				body: JSON.stringify([{"label":event.target.value,"done":false}]),
				headers: {
					"Content-Type": "application/json"
				}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if (resp.status == 200) {
						getTODOS();
					}
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
				//setList([...list, event.target.value]);		  
				setTask('');  
			} else {
				fetch('https://assets.breatheco.de/apis/fake/todos/user/Otto123', {
				method: "PUT",
				body: JSON.stringify([...list, {"label":event.target.value,"done":false}]),
				headers: {
					"Content-Type": "application/json"
				}
				})
				.then(resp => {
					console.log(resp.ok); // will be true if the response is successfull
					console.log(resp.status); // the status code = 200 or code = 400 etc.
					if (resp.status == 200) {
						getTODOS();
					}
				})
				.catch(error => {
					//error handling
					console.log(error);
				});
				//setList([...list, event.target.value]);		  
				setTask('');  
			}
		}
	  }
	
	const deleteTask = (index) => {
		const auxList = list.filter((task, position) => position != index);	
		if (list.length == 1) {
			deleteAllTasks();
		} else {
			fetch('https://assets.breatheco.de/apis/fake/todos/user/Otto123', {
			method: "PUT",
			body: JSON.stringify(auxList),
			headers: {
				"Content-Type": "application/json"
			}
			})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				if (resp.status == 200) {
					getTODOS();
				}
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
			}
	}

	const deleteAllTasks = () => {
		const auxList = [];		
		fetch('https://assets.breatheco.de/apis/fake/todos/user/Otto123', {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			if (resp.status == 200) {
				startList();				
			}
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
	}

	// Tareas del Fetch
	const getTODOS = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/Otto123', {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
    	})
		.then(resp => {
			//console.log(resp.ok); // will be true if the response is successfull
			//console.log(resp.status); // the status code = 200 or code = 400 etc.        
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			//here is were your code should start after the fetch finishes
			//console.log("Data puf");
			//console.log(data); //this will print on the console the exact object received from the server
			console.log(data);
			setList(data);
		})
		.catch(error => {
			//error handling
			console.log(error);
		});
	}
	useEffect(() => {		
		getTODOS();
	}, [])

	return (
		<div>			
			<div className="container d-flex justify-content-center">
					<p className="century display-2">Todo List</p>
			</div>	
			<div className="d-flex flex-column align-items-center">
			<ul className="input list-group list-group-flush">					
				<input className="listText list-group-item" type="text" placeholder="Pending Task" onChange={handleChange} value={task} onKeyDown={handleKeyPress}/>				
					{list[0].label=="sample task" && list.length == 1 ? <span className="listText list-group-item">"No tasks, add a task"</span> : list.map((task, index)=>{ //pendiente del return, colocar la instruccion o funcion a su lado.
						return (<div key={index}>
									<li className="listText list-group-item display-4">{task.label}
										<i className="clear fa-solid fa-xmark ms-3 position-absolute end-0 me-4" onClick={()=>{
											deleteTask(index);
										}}></i>
									</li>								
								</div>)
					})}
				<li className="pendientes list-group-item display-4">{list[0].label=="sample task" && list.length == 1 ? "No pending tasks" : list.length==1 ? `${list.length} pending task` : `${list.length} pending tasks`}</li>
				<button className="btn btn-secondary" onClick={()=>{deleteAllTasks()}}>Clean all tasks</button>
				</ul>
			</div>
		</div>
	);
};

export default Home;
