import React from "react";
import { useState, useEffect } from "react";
import phoneService from '../service/phone'
import Error from "./Error";

const Info = () => {	
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [number, setNumber] = useState()
	const [filterName, setFilterName] = useState('')
	const [successMessage, setSuccessMessage] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);


	useEffect(() => {
		phoneService.getAll().then(prevNum => {
			setPersons(prevNum)
		})
	}, [])


	const createId = () => {
		return Math.floor(Math.random() * 10000)
	}

	const addName = (e) => {
		e.preventDefault()
		const existingPerson = persons.find(person => person.name === newName)
		if(existingPerson) {
			updateUser(existingPerson.name, number, existingPerson.id)
		} else {
			const names = {
				name: newName,
				number: number,
				id: createId()
			}
			if (persons.some((person) => person.name === newName)) {
				alert(`${newName} is already added to the phonebook.`)
				return;
			}
			phoneService.create(names).then(() => {
				setPersons([...persons, names])	
				setNewName('')
				setNumber('')
				setSuccessMessage(`${names.name} added to phonebook`)
				setTimeout(() => {
					setSuccessMessage(null)
				}, 3000)

			}).catch((error) => {
				console.log(error);
				console.log(error.res.data.error);
			})
		}
		
	}

	const handleNameChange = (e) => {
		setNewName(e.target.value)
	}
	const handleNumChange = (e) => {
		setNumber(e.target.value)
	}
	const searchName = (e) => {
		setFilterName(e.target.value)
	}

	const filteredPerson = persons.filter(
		(pers) => pers.name.toLowerCase().includes(filterName.toLowerCase())
	)

	const updateUser = (name, newNumber,id) => {
		const check = window.confirm(`${name} is already added to the phonebook. Do you want to update the phone number?`)
		if(check) {
			const updatePerson = {
				name: name,
				number: newNumber,
				id: id,
			}
			phoneService.update(id, updatePerson).then(() => {
				setPersons(persons.map((pers) => (
					pers.id === id ? updatePerson : pers
				)))
			})
			setSuccessMessage(`${name} updated in the phonebook`)
			setTimeout(() => {
				setSuccessMessage(null)
			}, 3000)
		}
	}

	const removeContact = (id) => {
		const confirmed = window.confirm(`Are you sure you want to delete`);
		if (confirmed) {
			phoneService.remove(id)
			.then(() => {
				setPersons(persons.filter(pers => pers.id !== id));
				setErrorMessage(`deleted contact`)
				setTimeout(() => {
					setErrorMessage(null)
				}, 3000);
			})
			.catch(err => console.log(`delete error ${err}`, err));
		}
	};
	  


	return (
		<>
			<h2>Phonebook</h2>
			<Error 	
				messageSuc={successMessage} 
				messageErr={errorMessage}
			/>
			<div>
				Search Name:  <input
					value={filterName}
					onChange={searchName}
				/>
			</div>
			<h1>Add new Contact</h1>
			<form onSubmit={addName}>
				<div>
					name: {' '}
					<input
						value={newName}
						onChange={handleNameChange}
					/>
					<br />
					number: {' '}
					<input
						value={number}
						onChange={handleNumChange}
					/>
				</div>
				<button type="submit">add</button>
			</form>
			<h2>Numbers</h2>
			<ul>
				{filteredPerson.map((per) => (
					<li key={per.id}>
						{per.name} : {per.number}
						<button onClick={() => removeContact(per.id)}>
							Delete
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export default Info;
