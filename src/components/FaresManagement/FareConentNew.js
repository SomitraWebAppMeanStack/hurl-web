import React, { useEffect, useState } from 'react'
import { PathUrl, Token } from '../../config/Config';
import { Table, Tabs } from 'antd';
import axios from 'axios';

function FareConentNew() {
    const { TabPane } = Tabs;
    const token = Token().token;
    const url = PathUrl().url;
    const [baseData, setBaseData] = useState([])

    useEffect(() => {
        BaseDataList();
    }, [])

        .catch((error) => {
            console.error(error);
        });
    const BaseDataList = async() => {
      await  axios.get(`${url}/admin-panel/fareapi`, { headers: { Authorization: 'Bearer ' + token } })
            .then((response) => {
                setBaseData(response.data.data)
                //   console.log(response.data.data, "base fare list")
            })
    }


    const Basecolumns = [
        {
            title: 'Base Charge',
            dataIndex: 'base_charge',
            style: { width: '10px' },
            align: 'center',
            render: (text) => <>
                <p>adfsrfer</p>
            </>
        },
        {
            title: 'Base Km.',
            className: 'column-money',
            dataIndex: 'base_km',
            align: 'center',
        },
        {
            title: 'Commision (in %)',
            className: 'column-money',
            dataIndex: 'commision_percentage',
            align: 'center',
        },
        {
            title: 'Per/Km. Charge',
            className: 'column-money',
            dataIndex: 'per_km_charge',
            align: 'center',
        },
        {
            title: 'Per/Min. Charge',
            className: 'column-money',
            dataIndex: 'per_min_charge',
            align: 'center',
        },
        {
            title: 'Action',
            className: 'column-money',
            dataIndex: 'id',
            align: 'center',
        },
    ];

    function callback(key) {
        console.log(key);
    }
    return (
        <>
            <Tabs onChange={callback} type="card">
                <TabPane tab="Tab 1" key="1">
                    <Table dataSource={baseData} columns={Basecolumns} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }}
                        style={{ width: '100%' }} />
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>
        </>
    )
}

export default FareConentNew