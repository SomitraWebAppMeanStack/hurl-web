import React, { useEffect, useState} from 'react'
import { Table, Tabs } from 'antd'
import { PathUrl, Token } from '../../config/Config'
import axios from 'axios';

const { TabPane } = Tabs;

function PaymentContent() {

  const token = Token().token;
  const url = PathUrl().url;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    loadUserList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // For User List 
  const loadUserList = () => {

    axios.get(`${url}/admin-panel/transactionapi?account_type=user`, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setUserData(response.data.data)
        console.log(response.data.data,"payment user data")
      })
      .catch((response) => {
        console.log(response)
      });

  }


  // For User Data Column

  const usercolumn = [
    {
      title: 'User Id',
      dataIndex: '',
      key: 'id',
      render: (record) => (
        <span>{(record.user && record.user.id)}</span>
      )
    },
    {
      title: 'User Name',
      dataIndex: '',
      key: 'full_name',
      sorter: {
        compare: (a, b) => a.full_name - b.full_name,
        multiple: 3,
      },
      render: (text, record) => (
        <span>{(record.user && record.user.full_name)}</span>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => a.email - b.email,
        multiple: 3,
      },
      render: (text, record) => (
        <span>{(record.user && record.user.email)}</span>
      )

    },
    {
      title: 'Number',
      dataIndex: 'phone',
      key: 'phone',
      sorter: {
        compare: (a, b) => a.phone - b.phone,
        multiple: 3,
      },
      render: (text, record) => (
        <span>{(record.user && record.user.phone)}</span>
      )

    },
    {
      title: 'Join Date',
      dataIndex: 'date_joined',
      key: 'date_joined',
      sorter: {
        compare: (a, b) => a.date_joined - b.date_joined,
        multiple: 3,
      },
      render: (text, record) => (
        <span>{(record.user && record.user.date_joined)}</span>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      }
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'timing',
      // render: (text, record) => (
      //     <span>
      //         <span>{(record.approve === '0' ? <Switch onClick={((event) => SwitchApprove(event, record.id))} /> : (record.approve === '1' ? <Switch defaultChecked onClick={((event) => SwitchReject(event, record.id))} /> : <Switch onClick={((event) => SwitchApprove(event, record.id))} />))}</span>
      //         <Link to={`/Admin/driverDetail/${record.id}`} className="fa fa-eye btn btn-outline-warning ml-3" ></Link>
      //     </span>


      // )
    },
  ];
  // For Restaurant Approve 
  // const SwitchApprove = (event, id) => {
  //   ChangeUserStatus(event, id)
  // }

  // For User Reject 
  // const SwitchReject = (event, id) => {
  //   ChangeUserStatus(event, id)
  // }


  // const ChangeUserStatus = (value1, id1) => {
    // axios.post(`${url}/UpdateRestaurantStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
    //     .then((response) => {
    //         loadUserList()
    //         message.success(`Status of ${response.data.name} has been Changed..!`)
    //     })
    //     .catch((response) => {
    //         console.log(response.error)
    //     });
  // }


  return (
    <>
      <div className="row">

        <div className="col-lg-12">

          <div className="card mb-4">

            <div className="card-body">
              <h3 className=" colorblack bold">Payment Management</h3>
              <Tabs defaultActiveKey="1" type="card" size={'large'} centered>
                <TabPane tab="Users List" key="1">
                  <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="row mb-4">
                      <div className="col-md-4 col-lg-4 col-sm-12">
                        <div className="input-group mb-3">
                          <span className="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                          <input type="text" className="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-sm-12">
                        <select className="form-control">
                          <option>Last 7 Days</option>
                          <option>Last Month</option>
                          <option>Last 6 Months</option>

                        </select>
                      </div>

                    </div>

                    <Table dataSource={userData} columns={usercolumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                  </div>
                </TabPane>
                <TabPane tab="Drivers List" key="2">
                  <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="row mb-4">
                      <div className="col-md-4 col-lg-4 col-sm-12">
                        <div className="input-group mb-3">
                          <span className="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                          <input type="text" className="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                      </div>
                      <div className="col-md-4 col-lg-4 col-sm-12">
                        <select className="form-control">
                          <option>Last 7 Days</option>
                          <option>Last Month</option>
                          <option>Last 6 Months</option>

                        </select>
                      </div>

                    </div>

                    <Table dataSource={userData} columns={usercolumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
                  </div>
                </TabPane>

              </Tabs>
             
            </div>
          </div>


        </div>



      </div>
    </>
  )
}

export default PaymentContent



