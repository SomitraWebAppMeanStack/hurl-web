import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Form, InputNumber, Button, Card, Table,TimePicker, message, Input } from 'antd';
import $ from 'jquery'
// import TimePicker from 'react-time-picker';
import axios from 'axios';
import { PathUrl, Token } from '../../config/Config';

function FareContent() {

  const token = Token().token;
  const url = PathUrl().url;

  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  // const [specialData] = useState([])
  const specialData = []
  const [basedata, setBasedata] = useState([])
  const [surgeData, setSurgeData] = useState([])
  useEffect(() => {
    BaseDataList()
    SurgeDataList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  // For Base Fare Data List
  const BaseDataList = async () => {
    await axios.get(`${url}/admin-panel/fareapi`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        // console.log(response.data)
        setBasedata(response.data.data)
        // console.log(response.data.data, "base fare list")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const Basecolumns = [
    {
      title: 'Base Charge',
      dataIndex: 'base_charge',
      style: { width: '10px' },
      align: 'center',
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
    }
  ];


  const onFinish = (values) => {
    $("#second").click()
    form.resetFields();
    const formData = new FormData();

    formData.append('base_charge', values.base_charge)
    formData.append('base_km', values.base_km)
    formData.append('commision_percentage', values.commision_percentage)
    formData.append('per_km_charge', values.per_km_charge)
    formData.append('per_min_charge', values.per_min_charge)

    axios.put(`${url}/admin-panel/fareapi`, formData, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        BaseDataList()
        message.success('Base fare Created Successfully..!!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  // For Surge Fare 

  const Surgecolumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      style: { width: '10px' },
      align: 'center',
    },
    {
      title: 'Price increase during high demand(%)',
      className: 'column-money',
      dataIndex: 'increased_percent',
      align: 'center',
    },
    {
      title: 'From',
      className: 'column-money',
      dataIndex: 'from_time',
      align: 'center',
    },
    {
      title: 'To',
      className: 'column-money',
      dataIndex: 'to_time',
      align: 'center',
    },
    {
      title: 'Action',
      className: 'column-money',
      dataIndex: 'id',
      align: 'center',
      render: (text, record) => (
        <span><EditOutlined style={{ color: 'blue' }} onClick={() => SurgeEdit(record.id)} />
          <DeleteOutlined style={{ color: 'red', marginLeft: '2rem' }} onClick={() => Surgedelete(record.id)} /></span>
      )
    },
  ];

  const SurgeDataList =  () => {
     axios.get(`${url}/admin-panel/specialfareapi`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        setSurgeData(response.data.data)
        console.log(response.data.data, "Surge fare list")
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const SurgeEdit = (id) => {
    axios.put(`${url}/admin-panel/specialfareapi?fare_id=${id}`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        SurgeDataList()
        message.success('Surge fare Deleted Successfully..!!');
      })
      .catch((error) => {
        console.error(error);
      });
  }


  const Surgedelete = (id) => {
    axios.delete(`${url}/admin-panel/specialfareapi?fare_id=${id}`, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        SurgeDataList()
        message.success('Surge fare Deleted Successfully..!!');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const onFinish2 = (values) => {
    $("#second2").click()
    form2.resetFields();
    const formData = new FormData();

    formData.append('from_time', values.from_time)
    formData.append('to_time', values.to_time)
    formData.append('name', values.name)
    formData.append('increased_percent', values.increased_percent)

    axios.post(`${url}/admin-panel/specialfareapi`, formData, { headers: { Authorization: 'Bearer ' + token } })
      .then((response) => {
        SurgeDataList()
        message.success('Surge fare Created Successfully..!!');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onFinishFailed2 = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onReset2 = () => {
    form.resetFields();
  };
  return (

    <>
      {/* { console.log(basedata)} */}
      <div className="container" style={{ height: '68vh', overflow: 'scroll', overflowX: 'hidden' }}>
        <Card title="Base Fare Calculation" extra={<EditOutlined data-toggle="modal" data-target="#myModal" />} style={{ width: '100%' }}>

          <Table dataSource={basedata} columns={Basecolumns} pagination={false}
          />

        </Card>

        <Card className='mt-2' title="Surge Pricing" extra={<EditOutlined data-toggle="modal" data-target="#myModal2" />} style={{ width: '100%' }}>
          <Table
            columns={Surgecolumns}
            dataSource={surgeData}
            bordered

          />

        </Card>

        <Card className='mt-2' title="Special Price" extra={<EditOutlined />} style={{ width: '100%' }}>
          <form>
            <div className='row'>
              {
                specialData.map(value => (
                  <>
                    <div className='col-md-4 mt-2'>
                      <label >
                        {value.type}
                      </label>
                    </div>
                    <div className='col-md-2 mt-2 d-flex'>
                      {value.from === "null" ? '' : <label >
                        <b>From :</b> <span>{value.from}</span>
                      </label>}

                    </div>
                    <div className='col-md-2 mt-2 d-flex'>
                      {value.from === "null" ? '' : <label >
                        <b>To :</b> <span>{value.to}</span>
                      </label>}
                    </div>
                    <div className='col-md-2 mt-2'>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control" value={value.charge} readOnly />
                        <div class="input-group-append">
                          <span className="input-group-text  mr-3" style={{ color: 'black', fontWeight: 'bold' }}>%</span>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-2 mt-3'>
                      {/* {value.approve == 0 ? <Switch onChange={(e) => specialValue(e, value.id)} /> : <Switch defaultChecked onChange={(e) => specialValue(e, value.id)} />} */}


                    </div>
                  </>
                ))
              }

            </div>
          </form>
        </Card>
      </div>


      <div class="modal" id="myModal" >
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Add Base Fare</h4>
              <button type="button" class="close" data-dismiss="modal" id='second'>&times;</button>
            </div>

            <div class="modal-body">
              <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Base Charge"
                  name="base_charge"
                  defaultValue={0}
                  rules={[{ required: true, message: 'Please input Base Charge!!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Base Km"
                  name="base_km"
                  rules={[{ required: true, message: 'Please input Base Km Charge!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Commission(in Percentage)"
                  name="commision_percentage"
                  rules={[{ required: true, message: 'Please input Commision Charge!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Charge(Per/Km.)"
                  name="per_km_charge"
                  rules={[{ required: true, message: 'Please input Per Km Charge!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Charge(Per/Min.)"
                  name="per_min_charge"
                  rules={[{ required: true, message: 'Please input Per Min. Charge!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button type='danger' className='ml-2' htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </div>

          </div>
        </div>
      </div>

      {/* Modal For surge Price  */}

      <div class="modal" id="myModal2" >
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Add Surge Fare</h4>
              <button type="button" class="close" data-dismiss="modal" id='second2'>&times;</button>
            </div>

            <div class="modal-body">
              <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ remember: true }}
                onFinish={onFinish2}
                onFinishFailed={onFinishFailed2}
                autoComplete="off"
                form={form2}
              >
                <Form.Item
                  label="Start Time"
                  name="from_time"
                  defaultValue={0}
                  rules={[{ required: true, message: 'Please input Start time!!' }]}
                >
                  <TimePicker style={{ width: '100%' }}  />

                </Form.Item>

                <Form.Item
                  label="End Time"
                  name="to_time"
                  defaultValue={0}
                  rules={[{ required: true, message: 'Please input End time!!' }]}
                >
                  <TimePicker style={{ width: '100%' }}  />

                </Form.Item>

                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input Name!' }]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  label="Increased Percentage"
                  name="increased_percent"
                  rules={[{ required: true, message: 'Please input Increased Percentage!' }]}
                >
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button type='danger' className='ml-2' htmlType="button" onClick={onReset2}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default FareContent