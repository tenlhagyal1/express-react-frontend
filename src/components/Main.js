
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = 'https://express-react7-1778ce8983ea.herokuapp.com/';

  const getPeople = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      // TODO: Add a task we'd like to perform in the event of an error
    }
  };

  const createPeople = async (person) => {
    try {
      await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(person),
      });
      getPeople();
    } catch (error) {
      // TODO: Add a task we'd like to perform in the event of an error
    }
  };


// ... more code above

// Inside of Main.js

const updatePeople = async (person, id) => {
    await fetch(URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

// ... more code below


const deletePeople = async (id) => {
    await fetch(URL + id, {
      method: 'DELETE',
    });
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <main>
      <Routes>
        <Route 
          path="/" 
          element={
            <Index 
              people={people} 
              createPeople={createPeople} 
            />
          }
        />
        <Route
          path="/people/:id"
          element={
            <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}

export default Main;