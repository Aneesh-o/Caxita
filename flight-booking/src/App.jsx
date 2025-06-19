import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col, Table, Card, Spinner } from 'react-bootstrap';
import { addFlightDetailsApi, getFlightDetailsApi } from './Services/allAPi';

function App() {
  const [form, setForm] = useState({
    airline: '', flightNumber: '', departureCity: '', arrivalCity: '',
    departureDate: '', arrivalDate: '', departureTime: '', arrivalTime: '', price: ''
  });
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', airline: '' });
  const [sort, setSort] = useState({ sortBy: '', order: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSort = (sortBy, order) => {
    setSort({ sortBy, order });
  };

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ ...filters, ...sort }).toString();
      const response = await getFlightDetailsApi(query);
      if (response && Array.isArray(response.data)) {
        setFlights(response.data);
      } else {
        setFlights([]);
        console.warn("Unexpected API response:", response);
      }
    } catch (err) {
      console.error("Error fetching flights:", err);
      setFlights([]);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addFlightDetailsApi(form);
      if (result.status === 201 || result.status === 200) {
        alert("Flight added successfully!");
        fetchFlights();
      } else {
        alert("Failed to add flight.");
      }
    } catch (err) {
      console.error("Error adding flight:", err);
      alert("An error occurred while adding the flight.");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [filters, sort]);

  return (
    <Container>
      <h2 className="text-center my-4">Flight Search System</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={4}><Form.Group><Form.Label>Airline</Form.Label><Form.Control name="airline" required value={form.airline} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Flight Number</Form.Label><Form.Control name="flightNumber" required value={form.flightNumber} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Departure City</Form.Label><Form.Control name="departureCity" pattern="[A-Za-z ]+" required value={form.departureCity} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={4}><Form.Group><Form.Label>Arrival City</Form.Label><Form.Control name="arrivalCity" pattern="[A-Za-z ]+" required value={form.arrivalCity} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Departure Date</Form.Label><Form.Control type="date" name="departureDate" required value={form.departureDate} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Arrival Date</Form.Label><Form.Control type="date" name="arrivalDate" required value={form.arrivalDate} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Row>
          <Col md={4}><Form.Group><Form.Label>Departure Time</Form.Label><Form.Control type="time" name="departureTime" required value={form.departureTime} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Arrival Time</Form.Label><Form.Control type="time" name="arrivalTime" required value={form.arrivalTime} onChange={handleChange} /></Form.Group></Col>
          <Col md={4}><Form.Group><Form.Label>Price (KWD)</Form.Label><Form.Control type="number" name="price" required value={form.price} onChange={handleChange} /></Form.Group></Col>
        </Row>
        <Button className="mt-3" type="submit">Add Flight</Button>
      </Form>

      <Card className="p-3 mb-4">
        <Row>
          <Col md={4}><Form.Control placeholder="Min Price" name="minPrice" onChange={handleFilterChange} /></Col>
          <Col md={4}><Form.Control placeholder="Max Price" name="maxPrice" onChange={handleFilterChange} /></Col>
          <Col md={4}><Form.Control placeholder="Airline (e.g. Emirates)" name="airline" onChange={handleFilterChange} /></Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}><Button onClick={() => handleSort('price', 'asc')}>Price Low to High</Button></Col>
          <Col md={4}><Button onClick={() => handleSort('price', 'desc')}>Price High to Low</Button></Col>
          <Col md={4}><Button onClick={() => handleSort('airline', 'asc')}>Flight A-Z</Button></Col>
        </Row>
      </Card>

      {loading ? <Spinner animation="border" /> : (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Airline</th>
              <th>Flight No</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(flights) && flights.length > 0 ? (
              flights.map(f => {
                const dep = new Date(`${f.departureDate}T${f.departureTime}`);
                const arr = new Date(`${f.arrivalDate}T${f.arrivalTime}`);
                const duration = Math.floor((arr - dep) / 60000);
                return (
                  <tr key={f._id}>
                    <td>{f.airline}</td>
                    <td>{f.flightNumber}</td>
                    <td>{f.departureCity} → {f.arrivalCity}</td>
                    <td>{f.departureDate} {f.departureTime}</td>
                    <td>{f.arrivalDate} {f.arrivalTime}</td>
                    <td>{Math.floor(duration / 60)}h {duration % 60}m</td>
                    <td>KWD {f.price}</td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="7" className="text-center">No flights found</td></tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default App;