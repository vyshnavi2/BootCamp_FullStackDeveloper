import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const PersonList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [phone_number, setphone_number] = useState('');

  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Persons');
      setPeople(response.data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const createPerson = async () => {
    try {
      await axios.post('http://localhost:3000/Persons', {
        first_name,
        last_name,
        phone_number,
      });
      fetchPeople();
      clearForm();
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  const deletePerson = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/Persons/${id}`);
      fetchPeople();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const clearForm = () => {
    setfirst_name('');
    setlast_name('');
    setphone_number('');
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div>
      <h2>People List</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.first_name} {person.last_name} - {person.phone_number}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Create Person</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setfirst_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setlast_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone_number}
          onChange={(e) => setphone_number(e.target.value)}
        />
        <button onClick={createPerson}>Create</button>
      </div>
    </div>
  );
};

export default PersonList;
