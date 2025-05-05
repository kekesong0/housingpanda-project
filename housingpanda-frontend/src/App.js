import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, message } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ListingForm from './ListingForm';
import ListingList from './ListingList';
import './App.css';

const { Header, Content } = Layout;

function Navigation() {
  const location = useLocation();
  const isSubmitPage = location.pathname === '/submitListing';
  const isViewPage = location.pathname === '/viewListing';

  return (
    <nav className="nav">
      <Link
        to="/submitListing"
        className={isSubmitPage ? 'nav-link active' : 'nav-link'}
      >
        <PlusOutlined style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
        <span className="nav-label">Submit Listing</span>
      </Link>
      <Link
        to="/viewListing"
        className={isViewPage ? 'nav-link active' : 'nav-link'}
      >
        <HomeOutlined style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
        <span className="nav-label">View Listings</span>
      </Link>
    </nav>
  );
}

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all listings from the backend
  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/listings');
      if (!res.ok) throw new Error('Failed to fetch listings');
      const data = await res.json();
      setListings(data);
    } catch (err) {
      setError(err.message);
      message.error('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Add a new listing
  const handleAddListing = async (data) => {
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Submission failed');
      message.success('Listing submitted successfully!');
      fetchListings(); // Refresh list after adding
    } catch (err) {
      setError(err.message);
      message.error('Submission failed, please try again');
    }
  };

  // Delete a listing by id
  const handleDeleteListing = async (item, idx) => {
    try {
      await fetch(`http://localhost:3000/listings/${item.id}`, { method: 'DELETE' });
      await fetchListings(); // Refresh list after deletion
      message.success('Deleted successfully');
    } catch (err) {
      message.error('Delete failed');
    }
  };

  return (
    <Router>
      <Layout className="app-layout">
        <Header className="app-header">
          <div className="logo">HousingPanda</div>
          <Navigation />
        </Header>
        <Content className="app-content">
          {error && <div className="error-message">{error}</div>}
          <Routes>
            <Route path="/submitListing" element={<ListingForm onSubmit={handleAddListing} />} />
            <Route path="/viewListing" element={<ListingList listings={listings} loading={loading} onDelete={handleDeleteListing} />} />
            <Route path="/" element={<ListingList listings={listings} loading={loading} onDelete={handleDeleteListing} />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
