import React, { useEffect, useState } from 'react'
import { Tabs, Table, Tag, Space, Button } from 'antd'
import axios from 'axios';
import { PathUrl ,Token} from '../../config/Config';
import Moment from 'react-moment';


function BookingContent() {
    const { TabPane } = Tabs;

    const token = Token().token;
    const url = PathUrl().url;

    const [onGoingDataList, setOnGoingDataList] = useState([])
    const [completedDataList, setCompletedDataList] = useState([])
    const [cancelledDataList, setCancelledDataList] = useState([])

    useEffect(() => {
        OnGoingData()
        CompletedData()
        CancelledData()
    }, [])
    

    // For OnGoing Rides 
    const OnGoingData = ()=>{
        axios.get(`${url}/admin-panel/getrideapi?ride_status=ongoing`,{ headers: { Authorization: 'Bearer ' + token } })
                    .then((response) => {
                        setOnGoingDataList(response.data.data)
                        console.log(response,"Ongoing data")
                    })
                    .catch((response) => {
                        console.log(response.error)
                    });
    }
    console.log(onGoingDataList,"onging after")

    const OngoingColumns = [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: '',
            key: 'id',
            render: (text, record) => (
                <span>{record.user && record.user.full_name}
               </span>
            )
        },
        {
            title: 'Date',
            dataIndex: '',
            key: 'name',
           render: (text, record) => (
                <span>{(record.date_created && <Moment format="DD MMMM YYYY">
                    {record.date_created}
                </Moment>)}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => (
                 <span>{(record.date_created && <Moment format="hh:mm A">
                     {record.date_created}
                 </Moment>)}</span>
             )
        },
        {
            title: 'Driver Id',
            dataIndex: '',
            key: 'restro_name',
            render: (text, record) => (
                <span>{record.driver && record.driver.id}
               </span>
            )
        },
        {
            title: 'Driver Name',
            dataIndex: '',
            key: 'driver_name',
            render: (text, record) => (
                <span>{record.driver && record.driver.full_name}
               </span>
            )
        },
        {
            title: 'Pick Up Location',
            dataIndex: 'starting_address',
            key: 'starting_address',
        },
        {
            title: 'Drop Location',
            dataIndex: 'destination_address',
            key: 'destination_address',
        },
        {
            title: 'Final Amount',
            dataIndex: 'final_fare',
            key: 'final_fare',
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <i className="fa fa-motorcycle" aria-hidden="true"></i>

                </Space>
            ),
        },
    ];


    // For Completed Rides

    const CompletedData = ()=>{
        axios.get(`${url}/admin-panel/getrideapi?ride_status=completed`, { headers: { "Authorization": `Bearer ${token}` } })
                    .then((response) => {
                        setCompletedDataList(response.data.data)
                        console.log(response.data.data,"Completed data")
                    })
                    .catch((response) => {
                        console.log(response.error)
                    });
    }

    const CompletedColumns = [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: '',
            key: 'id',
            render: (text, record) => (
                <span>{record.user && record.user.full_name}
               </span>
            )
        },
        {
            title: 'Date',
            dataIndex: '',
            key: 'name',
           render: (text, record) => (
                <span>{(record.date_created && <Moment format="DD MMMM YYYY">
                    {record.date_created}
                </Moment>)}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => (
                 <span>{(record.date_created && <Moment format="hh:mm A">
                     {record.date_created}
                 </Moment>)}</span>
             )
        },
        {
            title: 'Driver Id',
            dataIndex: '',
            key: 'restro_name',
            render: (text, record) => (
                <span>{record.driver && record.driver.id}
               </span>
            )
        },
        {
            title: 'Driver Name',
            dataIndex: '',
            key: 'driver_name',
            render: (text, record) => (
                <span>{record.driver && record.driver.full_name}
               </span>
            )
        },
        {
            title: 'Pick Up Location',
            dataIndex: 'starting_address',
            key: 'starting_address',
        },
        {
            title: 'Drop Location',
            dataIndex: 'destination_address',
            key: 'destination_address',
        },
        {
            title: 'Final Amount',
            dataIndex: 'final_fare',
            key: 'final_fare',
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <i className="fa fa-motorcycle" aria-hidden="true"></i>

                </Space>
            ),
        },
    ];

    // For Cancelled Ride

    const CancelledData = ()=>{
        axios.get(`${url}/admin-panel/getrideapi?ride_status=cancelled`, { headers: { "Authorization": `Bearer ${token}` } })
                    .then((response) => {
                        setCancelledDataList(response.data.data)
                        console.log(response.data.data,"canceleed data")
                    })
                    .catch((response) => {
                        console.log(response.error)
                    });
    }

    const CancelledColumns =  [

        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: '',
            key: 'id',
            render: (text, record) => (
                <span>{record.user && record.user.full_name}
               </span>
            )
        },
        {
            title: 'Date',
            dataIndex: '',
            key: 'name',
           render: (text, record) => (
                <span>{(record.date_created && <Moment format="DD MMMM YYYY">
                    {record.date_created}
                </Moment>)}</span>
            )
        },
        {
            title: 'Time',
            dataIndex: 'code',
            key: 'code',
            render: (text, record) => (
                 <span>{(record.date_created && <Moment format="hh:mm A">
                     {record.date_created}
                 </Moment>)}</span>
             )
        },
        {
            title: 'Driver Id',
            dataIndex: '',
            key: 'restro_name',
            render: (text, record) => (
                <span>{record.driver && record.driver.id}
               </span>
            )
        },
        {
            title: 'Driver Name',
            dataIndex: '',
            key: 'driver_name',
            render: (text, record) => (
                <span>{record.driver && record.driver.full_name}
               </span>
            )
        },
        {
            title: 'Pick Up Location',
            dataIndex: 'starting_address',
            key: 'starting_address',
        },
        {
            title: 'Drop Location',
            dataIndex: 'destination_address',
            key: 'destination_address',
        },
        {
            title: 'Final Amount',
            dataIndex: 'final_fare',
            key: 'final_fare',
        },
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="large">
                    <i className="fa fa-motorcycle" aria-hidden="true"></i>

                </Space>
            ),
        },
    ];


  return (
    <>
    <div className="card-container">
                <h4 className="ml-5 colorblack bold mt-3">Orders Management</h4>
                <Tabs type="card" centered >
                    <TabPane tab="Ongoing" key="1" >

                        <div className="container-fluid mt-3">
                           
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="row mb-4">
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                                <input type="text" className="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Last 7 Days</option>
                                                <option>Last Month</option>
                                                <option>Last 6 Months</option>

                                            </select>
                                        </div>
                                        {/* <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select Country Here</option>

                                            </select>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select City Here</option>

                                            </select>
                                        </div> */}
                                    </div>
                                    <Table dataSource={onGoingDataList} columns={OngoingColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Completed" key="2">
                        <div className="container-fluid mt-3">
                          
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="row mb-4">
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                                <input type="text" className="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Last 7 Days</option>
                                                <option>Last Month</option>
                                                <option>Last 6 Months</option>

                                            </select>
                                        </div>
                                        {/* <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select Country Here</option>

                                            </select>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select City Here</option>

                                            </select>
                                        </div> */}
                                    </div>
                                    <Table dataSource={completedDataList} columns={CompletedColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Cancelled" key="3">
                        <div className="container-fluid mt-3">
                          
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-sm-12">
                                    <div className="row mb-4">
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text " id="basic-addon1"><i className="fa fa-search"></i></span>
                                                <input type="text" className="form-control" placeholder="Search By City or Country" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Last 7 Days</option>
                                                <option>Last Month</option>
                                                <option>Last 6 Months</option>

                                            </select>
                                        </div>
                                        {/* <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select Country Here</option>

                                            </select>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-sm-12">
                                            <select className="form-control">
                                                <option>Select City Here</option>

                                            </select>
                                        </div> */}
                                    </div>
                                    <Table dataSource={cancelledDataList} columns={CancelledColumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />

                                </div>

                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
    </>
  )
}

export default BookingContent