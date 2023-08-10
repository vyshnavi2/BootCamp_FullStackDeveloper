import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

const PersonList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [phone_number, setPhone_number] = useState('');

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
    setFirst_name('');
    setLast_name('');
    setPhone_number('');
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div>
      <h2>People List</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.first_name}</TableCell>
                <TableCell>{person.last_name}</TableCell>
                <TableCell>{person.phone_number}</TableCell>
                <TableCell>
                  <Button onClick={() => deletePerson(person.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>Create Person</h2>
      <div>
        <TextField
          label="First Name"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <TextField
          label="Last Name"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <TextField
          label="Phone Number"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <Button variant="contained" onClick={createPerson}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default PersonList;
