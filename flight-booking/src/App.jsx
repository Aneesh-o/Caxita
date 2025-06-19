import React, { useState, useEffect } from 'react';
import {
  Container, Form, Button, Row, Col, Card, Spinner, InputGroup
} from 'react-bootstrap';
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

  useEffect(() => {
    fetchFlights();
  }, [filters, sort]);

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

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Flight Search System</h2>

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

      <Card className="p-3 mb-4 bg-light">
        <h5>Filter & Sort Flights</h5>
        <Row>
          <Col md={3}><Form.Control placeholder="Min Price" name="minPrice" onChange={handleFilterChange} /></Col>
          <Col md={3}><Form.Control placeholder="Max Price" name="maxPrice" onChange={handleFilterChange} /></Col>
          <Col md={3}><Form.Control placeholder="Airline (e.g. Emirates)" name="airline" onChange={handleFilterChange} /></Col>
          <Col md={3} className="d-flex gap-2">
            <Button size="sm" variant="outline-primary" onClick={() => handleSort('price', 'asc')}>Cheapest</Button>
            <Button size="sm" variant="outline-success" onClick={() => handleSort('price', 'desc')}>Expensive</Button>
            <Button size="sm" variant="outline-warning" onClick={() => handleSort('airline', 'asc')}>A-Z</Button>
          </Col>
        </Row>
      </Card>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        flights.length > 0 ? (
          flights.map((f, idx) => {
            const dep = new Date(`${f.departureDate}T${f.departureTime}`);
            const arr = new Date(`${f.arrivalDate}T${f.arrivalTime}`);
            const duration = Math.floor((arr - dep) / 60000);
            // const hours = Math.floor(duration / 60);
            // const minutes = duration % 60;

            return (
              <Card className="mb-3 shadow-sm" key={idx}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={2} className="text-center">
                      <strong>{f.airline}</strong>
                      <div className="text-muted">{f.flightNumber}</div>
                    </Col>
                    <Col md={4}>
                      <div><strong>{f.departureCity}</strong> → <strong>{f.arrivalCity}</strong></div>
                      <div>{f.departureDate} at {f.departureTime}</div>
                      <div>{f.arrivalDate} at {f.arrivalTime}</div>
                    </Col>
                    {/* <Col md={3}>
                      <div>Duration: {hours}h {minutes}m</div>
                    </Col> */}
                    <Col md={3} className="text-end">
                      <h5 className="text-success">KWD {f.price}</h5>
                      <Button variant="primary" size="sm">Book Now</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p className="text-center">No flights found</p>
        )
      )}
    </Container>
  );
}

export default App;