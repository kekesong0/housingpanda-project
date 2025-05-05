import React from 'react';
import { Card, Row, Col, Tag, Empty, Spin, Modal } from 'antd';
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
                      Modal.confirm({
                        title: (
                          <span style={{ color: '#FF9800', fontWeight: 700, fontSize: 18 }}>
                            Confirm Deletion
                          </span>
                        ),
                        content: (
                          <div style={{ color: '#333', fontSize: 16, marginTop: 8 }}>
                            Are you sure you want to delete this listing?<br />
                            <span style={{ color: '#888', fontSize: 14 }}>
                              This action cannot be undone.
                            </span>
                          </div>
                        ),
                        okText: 'Delete',
                        okType: 'danger',
                        cancelText: 'Cancel',
                        centered: true,
                        bodyStyle: { borderRadius: 12, padding: 28 },
                        okButtonProps: {
                          style: { background: '#FF9800', borderColor: '#FF9800', fontWeight: 600, borderRadius: 8 }
                        },
                        cancelButtonProps: {
                          style: { fontWeight: 500, borderRadius: 8 }
                        },
                        onOk: () => {
                          console.log('Modal onOk called with item:', item, 'id:', item.id);
                          return onDelete(item, idx);
                        },
                      });
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