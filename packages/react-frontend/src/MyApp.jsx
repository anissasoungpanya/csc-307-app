// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
	const [characters, setCharacters] = useState([]);

function removeOneCharactesr(index){
        const deletedUser = characters[index].id;
	fetch('http://localhost:8000/users/${deletedUser}',{
	method: 'DELETE',
	})
        .then((response) => {
	if (response.status === 204){
		const updated = characters.filter(
		(character) => character.id !== deletedUser);
       		setCharacters(updated);
        } else if (response.status === 404) {
		console.log("User not found.");
	} else {console.log("Failed to delete. Status : $ {response.status}");
		}
	})
	.catch((error) => {console.log("Error:", error);
	});
}

function removeOneCharacter(index) {
    const deleted = characters[index].id;
    fetch(`http://localhost:8000/users/${deleted}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 204) {
        const updated = characters.filter(
          (character) => character.id !== deleted);
        setCharacters(updated);
      } else if (response.status === 404) {
        console.log("User not found.");
      } else {
        console.log(`Failed to delete. Status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  }

function updateList(person) {
  postUser(person)
    .then((response) => {
        if (response.status === 201) {
          return response.json(); 
        } else {
          throw new Error("Failed to create user");
        }
      })
    .then((person) => setCharacters([...characters, person]))
    .catch((error) => {
      console.log(error);
    });
}

function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
  });

  return promise;
}

useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

 return (
        <div className="container">
      <Table 
	characterData={characters} 
	removeCharacter={removeOneCharacter}
	/>
    	<Form handleSubmit={updateList} />
	</div>
  );
}

export default MyApp;
