import React, { useState } from 'react';

export const Creategig = () => {
  let [gigName, setGigName] = useState('');
  let [description, setDescription] = useState('');
  let [price, setPrice] = useState('');

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ gigName, description, price });

    try {
      let result = await fetch('http://localhost:8000/addGig', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gigName, description, price })
      });

      if (result.status === 401) {
        window.alert("Please login");
        window.location.href = '/login'; // Redirect to login page
        return;
      } else {
        throw new Error('Failed to add gig');
      }
    } catch (error) {
      console.log(error);
      window.alert('Failed to add gig.');
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="gigName">Title</label>
          <input type="text" id="gigName" value={gigName} onChange={(e) => setGigName(e.target.value)} />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
          <button type="submit" onClick={handleSubmit}>
            Add Gig
          </button>
        </div>
      </form>
    </div>
  );
};