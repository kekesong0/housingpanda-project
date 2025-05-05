import React from 'react';
import { Card, Row, Col, Tag, Empty, Spin } from 'antd';
import { HomeOutlined, DollarOutlined, PhoneOutlined, EnvironmentOutlined, CloseOutlined } from '@ant-design/icons';
import './ListingList.css';

function ListingList({ listings, loading, onDelete }) {
  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="listings-loading">
        <Spin size="large" />
      </div>
    );
  }

  // Show empty state if there are no listings
  if (!listings || listings.length === 0) {
    return (
      <div className="listings-empty">
        <Empty description="No listings available" />
      </div>
    );
  }

  // Render all listing cards
  return (
    <div className="listings-page">
      <h2 className="listings-title">All Listings</h2>
      <Row gutter={[24, 24]}>
        {listings.map((item, idx) => (
          <Col xs={24} sm={12} md={8} lg={6} key={idx}>
            <Card
              hoverable
              className="listing-card"
              cover={
                <div className="listing-card-cover">
                  <HomeOutlined className="listing-card-icon" />
                  <button
                    className="delete-btn"
                    onClick={e => {
                      e.stopPropagation();
                      if (onDelete) onDelete(item, idx);
                    }}
                    title="Delete"
                  >
                    <CloseOutlined />
                  </button>
                </div>
              }
            >
              {/* Listing details */}
              <h3 className="listing-card-title">{item.title}</h3>
              <div className="listing-card-content">
                <p className="listing-card-description">{item.description}</p>
                <div className="listing-card-info">
                  <Tag color="blue" icon={<DollarOutlined />}>
                    ¥{item.rent}/month
                  </Tag>
                  <Tag color="green" icon={<HomeOutlined />}>
                    {item.rooms} rooms
                  </Tag>
                </div>
                <div className="listing-card-address">
                  <EnvironmentOutlined /> {item.address}
                </div>
                <div className="listing-card-contact">
                  <PhoneOutlined /> {item.contact_info}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListingList; 