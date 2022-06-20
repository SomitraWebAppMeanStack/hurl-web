import { Card, Modal } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PathUrl, Token } from '../../config/Config';
import { EditOutlined } from '@ant-design/icons'



function SettingContent() {
  const token = Token().token;
  const url = PathUrl().url;
  const [data, setData] = useState([])
  const [id, setId] = useState()
  const [content, setContent] = useState("")
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  useEffect(() => {
    SettingDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SettingDataList = async () => {
    await axios.get(`${url}/admin-panel/pagesapi`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        setData(response.data.data)
        console.log(response.data.data, "setting data")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const editData = (id, type) => {

    if (type === 'Privacy Policy') {
      setIsModalVisible(true)
    }
    if (type === 'Terms & Condition') {
      setIsModalVisible2(true)

    }
    if (type === 'About Us') {
      setIsModalVisible3(true)
    }
    setId(id)
    // await axios.get(`${url}/admin-panel/pagesapi?page_id=${id}`, { headers: { Authorization: 'Bearer ' + token } })
    // .then((response) => {
    //   setData(response.data.data)
    //   console.log(response.data.data, "setting data")
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };

  const handleContentChange = event => {
    setContent(event.target.value)
  };

  const handlePrivacySubmit = event => {
    event.preventDefault();
    setIsModalVisible(false);

    alert(`From Policy Form`);
  };
  const handlePrivacySubmit2 = event => {
    event.preventDefault();
    setIsModalVisible2(false);

    alert(`From Term & Condition Form`);
  };
  const handlePrivacySubmit3 = event => {
    event.preventDefault();
    setIsModalVisible3(false);

    alert(`From Legal Form`);
  };
  return (


    <>
      <Card title="Settings" style={{ width: '100%' }}>
        {
          data.map(value => (
            <Card title={value.title} extra={<EditOutlined onClick={() => editData(value.id, value.title)} />} style={{ width: '100%' }}>
              <p>{value.content}</p>
            </Card>
          ))
        }

      </Card>

      <Modal title="Privacy Policy" visible={isModalVisible} cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
        <form onSubmit={handlePrivacySubmit}>
          <div>
            <label>Content : </label>
            <textarea
              type="text"
              name="content"
              className='form-control'
              placeholder="Enter Content Here"
              onChange={handleContentChange}
              value={content}
            />
          </div>
          <button type="submit" className='btn btn-primary mt-3'>
            Submit
          </button>
        </form>
      </Modal>

      <Modal title="Terms & Condition" visible={isModalVisible2} cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel2}>
        <form onSubmit={handlePrivacySubmit2}>
          <div>
            <label>Content : </label>
            <textarea
              type="text"
              name="content"
              className='form-control'
              placeholder="Enter Content Here"
              onChange={handleContentChange}
              value={content}
            />
          </div>
          <button type="submit" className='btn btn-primary mt-3'>
            Submit
          </button>
        </form>
      </Modal>

      <Modal title="Legal" visible={isModalVisible3} cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel3}>
        <form onSubmit={handlePrivacySubmit3}>
          <div>
            <label>Content : </label>
            <textarea
              type="text"
              name="content"
              className='form-control'
              placeholder="Enter Content Here"
              onChange={handleContentChange}
              value={content}
            />
          </div>
          <button type="submit" className='btn btn-primary mt-3'>
            Submit
          </button>
        </form>
      </Modal>

    </>
  )
}

export default SettingContent