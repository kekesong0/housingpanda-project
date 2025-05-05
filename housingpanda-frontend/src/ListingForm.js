import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, Modal } from 'antd';
import { HomeOutlined, DollarOutlined, PhoneOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './ListingForm.css';

function ListingForm({ onSubmit }) {
  const [form] = Form.useForm();
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      setSuccessModalVisible(true);
      form.resetFields();
    } catch (error) {
      Modal.error({
        title: 'Submission Failed',
        content: 'Please try again.',
      });
    }
  };

  // Close the success modal
  const handleModalOk = () => {
    setSuccessModalVisible(false);
  };

  return (
    <div className="listing-page">
      <Card title="Submit Listing" className="listing-form-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
        >
          <Form.Item
            name="title"
            label="Listing Title"
            rules={[{ required: true, message: 'Please enter the listing title' }]}
          >
            <Input prefix={<HomeOutlined />} placeholder="Enter listing title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea
              prefix={<InfoCircleOutlined />}
              placeholder="Describe the property, type, decoration, etc."
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="rent"
            label="Rent (per month)"
            rules={[{ required: true, message: 'Please enter the rent' }]}
          >
            <InputNumber
              prefix={<DollarOutlined />}
              placeholder="Enter rent"
              min={0}
              style={{ width: '100%' }}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\¥\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input prefix={<EnvironmentOutlined />} placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            name="rooms"
            label="Number of Rooms"
            rules={[{ required: true, message: 'Please enter the number of rooms' }]}
          >
            <InputNumber
              prefix={<HomeOutlined />}
              placeholder="Enter number of rooms"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="contact_info"
            label="Contact Info"
            rules={[{ required: true, message: 'Please enter the contact info' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Enter contact info" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Listing
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Submission Failed"
        open={successModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>
        ]}
        getContainer={() => document.querySelector('.listing-form-card')}
      >
        <p>Your listing has been submitted successfully!</p>
      </Modal>
    </div>
  );
}

export default ListingForm; 