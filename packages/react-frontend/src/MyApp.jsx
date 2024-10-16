// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
	const [characters, setCharacters] = useState([]);

function removeOneCharacter(index){
	const updated = characters.filter((character, i) => {
		return i !== index;
	});
	setCharacters(updated);
	}

function deleteUser(index, id){
    const promise = fetch("Http://localhost:8000/users/:id", {
    method: "DELETE",})

  return promise;
}

function deleteFromList(index, id){
        deleteUser(person)
        .then((response) => {
        if (response.status === 204){
        const updateCharacters = characters.filter((character, i) =>
                i !== index);
        setCharacters(updatedCharacters);
        } else if (response.status === 404){
                console.log("User not found.");
        }
        }).catch((error) => console.log("Error:", error));
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
