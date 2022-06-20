import React from 'react'
import MultiSelectAll from '../MultiSelect/MultiSelectAll'
import MultiSelectDriver from '../MultiSelect/MultiSelectDriver'

function NotificationContent() {
  return (
    <>
      <div className='row'>
        <div className='col-md-3'>
          <label >
            Notification Title:
          </label>
        </div>
        <div className='col-md-6'>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-3 '>
          <label >
            Notification Description:
          </label>
        </div>
        <div className='col-md-6'>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-3 '>
          <label >
            Schedule on:
          </label>
        </div>
        <div className='col-md-6'>
          <input type="date" className="form-control" />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-2'> </div>
        <div className='col-md-4'>
          <MultiSelectAll />
        </div>
        <div className='col-md-4'>
          <MultiSelectDriver />
        </div>
      </div>
    </>
  )
}

export default NotificationContent