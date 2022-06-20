import React, { useEffect, useState, Suspense } from 'react'
import { NavLink } from 'react-router-dom';
import { Table, Switch, Tabs } from 'antd'
import { PathUrl, Token } from '../../config/Config'
import axios from 'axios';
const MapContainer = React.lazy(() => import('../../containers/MapContainer'));

const { TabPane } = Tabs;

function UserContent() {

    const token = Token().token;
    const url = PathUrl().url;
    // const [restaurantMap, setRestaurantMap] = useState(true);
    // const [restaurantList, setRestaurantList] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        loadUserList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // For User List 
    const loadUserList = () => {

        axios.get(`${url}/admin-panel/accountapiadmin?account_type=user`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
                setUserData(response.data.data)
            })
            .catch((response) => {
                console.log(response)
            });

    }


    // For User Data Column

    const usercolumn = [
        {
            title: 'User Id',
            dataIndex: 'id',
            key: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 3,
            }
        },
        {
            title: 'User Name',
            dataIndex: 'full_name',
            key: 'full_name',
            sorter: {
                compare: (a, b) => a.full_name - b.full_name,
                multiple: 3,
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: {
                compare: (a, b) => a.email - b.email,
                multiple: 3,
            }

        },
        {
            title: 'Number',
            dataIndex: 'phone',
            key: 'phone',
            sorter: {
                compare: (a, b) => a.phone - b.phone,
                multiple: 3,
            }
        },
        {
            title: 'Join Date',
            dataIndex: 'date_joined',
            key: 'date_joined',
            sorter: {
                compare: (a, b) => a.date_joined - b.date_joined,
                multiple: 3,
            },
            // render: (text, record) => (
            //     <span>{(record.date_joined && <Moment format="YYYY/MM/DD">
            //         {record.date_joined}
            //     </Moment>)}</span>
            // )
        },
        {
            title: 'Total Ride',
            dataIndex: 'ride_count',
            key: 'ride_count',
            sorter: {
                compare: (a, b) => a.ride_count - b.ride_count,
                multiple: 3,
            }
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'timing',
            render: (text, record) => (
                <span>
                    <span>{(record.approve === '0' ? <Switch onClick={((event) => SwitchApprove(event, record.id))} /> : (record.approve === '1' ? <Switch defaultChecked onClick={((event) => SwitchReject(event, record.id))} /> : <Switch onClick={((event) => SwitchApprove(event, record.id))} />))}</span>
                    <NavLink to={`/Admin/driverDetail/${record.id}`} className="fa fa-eye btn btn-outline-warning ml-3" ></NavLink>
                </span>


            )
        },
    ];

    // For Restaurant Approve 
    const SwitchApprove = (event, id) => {
        ChangeUserStatus(event, id)
    }

    // For User Reject 
    const SwitchReject = (event, id) => {
        ChangeUserStatus(event, id)
    }


    const ChangeUserStatus = (value1, id1) => {
        // axios.post(`${url}/UpdateRestaurantStatus`, { value: value1, id: id1 }, { headers: { Authorization: 'Bearer ' + token } })
        //     .then((response) => {
        //         loadUserList()
        //         message.success(`Status of ${response.data.name} has been Changed..!`)
        //     })
        //     .catch((response) => {
        //         console.log(response.error)
        //     });
    }


    return (
        <>
            <div className="row">

                <div className="col-lg-12">

                    <div className="card mb-4">

                        <div className="card-body">
                            <h3 className=" colorblack bold">User Management</h3>
                            <Tabs defaultActiveKey="1" type="card" size={'large'} centered>
                                <TabPane tab="Map view" key="1">
                                    <Suspense fallback={'Loading Map...'}>
                                        <MapContainer locations={userData} />

                                    </Suspense>
                                </TabPane>
                                <TabPane tab="List View" key="2">
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
                            {/* <div className="ml-5 text-center">
                                <div className="btn-group" style={{ minWidth: '50%' }}>
                                    <button type="button" className="btn btn-outline-warning active" id="restMap" onClick={openMap}>Map View</button>
                                    <button type="button" className="btn btn-outline-warning" onClick={openList} id="restList">List View</button>

                                </div>
                            </div> */}
                        </div>
                    </div>


                </div>



            </div>
        </>
    )
}

export default UserContent