import { Card, message } from 'antd'
import React, { useEffect, useState } from 'react'
import {PathUrl,Token} from '../../config/Config'

import {
  EditOutlined
} from '@ant-design/icons';
import axios from 'axios';

function ComissionContent() {

  const token = Token().token;
  const url = PathUrl().url;

  const [card, setCard] = useState(true)
  const [comissionValue, setComissionValue] = useState("")

  useEffect(() => {
    ComissionData()
  }, [])
  
  const ComissionData = () =>{
    axios.get(`${url}/admin-panel/fareapi`, { headers: { Authorization: 'Bearer ' + token } })
    .then((response) => {
      setComissionValue(response.data.data.commision_percentage,"comission data")
    })
    .catch((response) => {
      console.log(response.error)
    });
  }

  const handleClick = () => {
    setCard(false)
  }
  const handleChange = e => {
    setComissionValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('commision_percentage', comissionValue)

    axios.put(`${url}/admin-panel/fareapi`, formData, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        setCard(true)
        message.success('Comission Percentage chenged successfully..!!');
      })
      .catch((response) => {
        console.log(response.error)
      });
  }
  return (
    <>
      <div className="site-card-border-less-wrapper">
        {
          card ? (<Card title="Comission Management" bordered={true} >
            <div className='container'>
              <div className='row'>
                <div className='col-md-2'>
                  <h5> <span className="label label-default">Comission :</span></h5>
                </div>
                <div className='col-md-6'>
                  <label className='form-control'>{comissionValue}</label>
                </div>
                <div className='col-md-4'>
                  <EditOutlined onClick={handleClick} style={{ fontSize: '25px' }} />
                </div>
              </div>
            </div>
          </Card>) : (<Card title="Comission Management" bordered={true} >
            <div className='container'>
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-2'>
                    <h5> <span className="label label-default">Comission :</span></h5>
                  </div>
                  <div className='col-md-6'>
                    <select className='form-control' onChange={e => handleChange(e)}>
                      <option value={'05'}>05</option>
                      <option  value={'10'}>10</option>
                      <option value={'15'}>15</option>
                      <option value={'20'}>20</option>
                      <option value={'25'}>25</option>
                      <option value={'30'}>30</option>
                      <option value={'50'}>50</option>
                      <option value={'60'}>60</option>
                    </select>
                  </div>
                  <div className='col-md-4'>
                    <button type='submit' className='btn btn-success'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </Card>)
        }

      </div>
    </>
  )
}

export default ComissionContent