import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createRestaurant, deleteRestaurant } from './graphql/mutations';
import { listRestaurants } from './graphql/queries';

import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

function HomePage({ signOut, user }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const result = await API.graphql(graphqlOperation(listRestaurants));
    setRestaurants(result.data.listRestaurants.items);
  };

  const createNewRestaurant = async (name, description, location, rating) => {
    await API.graphql(
      graphqlOperation(createRestaurant, {
        input: { name, description, location, rating },
      })
    );
    fetchRestaurants();
  };

  const deleteRestaurantById = async (id) => {
    await API.graphql(
      graphqlOperation(deleteRestaurant, { input: { id } })
    );
    fetchRestaurants();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewRestaurant(e.target.name.value, e.target.description.value, e.target.location.value, parseInt(e.target.rating.value));
    e.target.reset();
  };

  return (
    <>
      <h1>Hello {user.username}</h1>
      <Button onClick={signOut} variant="secondary">Sign out</Button>

      <Image src="/logo.jpg" alt="Logo" width={100} height={40} className="float-right" />

      {/* Add form for creating a restaurant */}
      <Container>
        <Row>
          <Col md ={6} className="mx-auto">
      <form onSubmit={handleSubmit}>
      <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control type="text" name="name" placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control type="text" name="description" placeholder="Description" />
        </Form.Group>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control type="text" name="location" placeholder="Location" />
        </Form.Group>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control type="number" name="rating" placeholder="Rating (0 t0 5)" min="0" max="5" />
        </Form.Group>
        <Button type="submit" variant="success">Add new Restaurant</Button>
      </form>
      </Col>
      </Row>
      </Container>

      {/* List restaurants with a delete button */}

<div className="mt-4">
  <ul style={{ display: "flex", padding: "2rem", AlignItems: "centre", JustifyContent: "pace-evenly", FlexWrap: "Wrap" }}>
    {restaurants.map((restaurant) => (
       <li key={restaurant.id} className="restaurant-item">
        <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontWeight: 'bold' }}>{restaurant.name}</h4>
            <p>
              <FontAwesomeIcon icon={faInfoCircle} /> Desc: {restaurant.description}
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Location: {restaurant.location}
            </p>
            <p>
              <FontAwesomeIcon icon={faStar} /> Rating (5.0 max): {restaurant.rating}
            </p>
          </div>
        <div>
          <Button onClick={() => deleteRestaurantById(restaurant.id)} variant="danger">Delete</Button>
        </div>
      </li>
    ))}
  </ul>
</div>
</>
  );
}

export default HomePage;