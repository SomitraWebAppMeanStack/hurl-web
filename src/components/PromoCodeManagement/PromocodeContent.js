import { Card, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PathUrl, Token } from '../../config/Config'

function PromocodeContent() {

  const token = Token().token;
  const url = PathUrl().url;

  const [promoCodeList, setPromoCodeList] = useState([])

  useEffect(() => {

    axios.get(`${url}/admin-panel/promocodeapi`, { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
        setPromoCodeList(response.data.data)
      })
      .catch((response) => {
        console.log(response)
      });
  }, [])

  console.log(promoCodeList, "promocode list")

  const PromocodeColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 3,
      }
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: {
        compare: (a, b) => a.code - b.code,
        multiple: 3,
      }
    },
    {
      title: 'Start Date',
      dataIndex: 'valid_from',
      key: 'valid_from',
      sorter: {
        compare: (a, b) => a.valid_from - b.valid_from,
        multiple: 3,
      }
    },
    {
      title: 'Expire Date',
      dataIndex: 'valid_to',
      key: 'valid_to',
      sorter: {
        compare: (a, b) => a.valid_to - b.valid_to,
        multiple: 3,
      },
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

  return (
    <>
      <Card title="Promo Code Management" extra={<Link to="/Admin/AddPromoCode">More</Link>} >
        <Table dataSource={promoCodeList} columns={PromocodeColumn} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['05', '10', '20', '30'] }} />
      </Card>
    </>
  )
}

export default PromocodeContent