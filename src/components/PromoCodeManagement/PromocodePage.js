import { Card, message } from 'antd';
import axios from 'axios';
import React from 'react'
import { PathUrl ,Token} from '../../config/Config';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function PromocodePage() {

    const token = Token().token;
    const url = PathUrl().url;

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const formData = new FormData();

        formData.append("name", data.name)
        formData.append("code", data.code)
        formData.append("valid_from", data.from_date)
        formData.append("valid_to", data.to_date)
        formData.append("discount", data.discount)
        formData.append("description", data.description)
        
        axios.post(`${url}/admin-panel/promocodeapi`,formData, { headers: { "Authorization": `Bearer ${token}` } })
                    .then((response) => {
                        message.success("Promo-Code Created Successfully..!")
                        navigate("/Admin/PromoCode")
                    })
                    .catch((response) => {
                        console.log(response.error)
                    });
    }
    return (
        <>
            <Card title="Promo-Code Management >> Add Promo-Code" bordered={true} >
                <div className='container'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row'>
                            <div className='col-md-4 form-group'>
                                <label>Coupon Code</label>
                            </div>
                            <div className='col-md-8'>
                                <input type="text" className='form-control' {...register("code", { required: true })} autoComplete='on' />
                                {errors.code && <span>This field is required</span>}
                            </div>

                            <div className='col-md-4 form-group'>
                                <label>ADD TITLE</label>
                            </div>
                            <div className='col-md-8'>
                                <input type="text" className='form-control' {...register("name", { required: true })} autoComplete='on' />
                                {errors.name && <span>This field is required</span>}
                            </div>

                            <div className='col-md-4 form-group'>
                                <label>Add Description</label>
                            </div>
                            <div className='col-md-8'>
                                <input type="text" className='form-control' {...register("description", { required: true })} autoComplete='on' />
                                {errors.description && <span>This field is required</span>}
                            </div>

                            <div className='col-md-4 form-group'>
                                <label>Duration</label>
                            </div>
                            <div className='col-md-1 mt-2'>
                                <label style={{ paddingLeft: '2rem' }}>From:</label>
                            </div>
                            <div className='col-md-3'>
                                <input type="date" className='form-control' {...register("from_date", { required: true })} autoComplete='on' />
                                {errors.from_date && <span>This field is required</span>}
                            </div>
                            <div className='col-md-1 mt-2'>
                                <label style={{ paddingLeft: '3rem' }}>To:</label>
                            </div>
                            <div className='col-md-3'>
                                <input type="date" className='form-control' {...register("to_date", { required: true })} autoComplete='on' />
                                {errors.to_date && <span>This field is required</span>}
                            </div>

                            <div className="form-group col-md-4">
                                <label>Select Discount</label>
                            </div>
                            <div className='col-md-8'>

                                <select className='form-control' {...register("discount", { required: true })}>
                                    <option value={'05'}>05</option>
                                    <option value={'10'}>10</option>
                                    <option value={'15'}>15</option>
                                    <option value={'20'}>20</option>
                                    <option value={'25'}>25</option>
                                    <option value={'30'}>30</option>
                                    <option value={'50'}>50</option>
                                    <option value={'60'}>60</option>
                                </select>
                            </div>

                        </div>


                        <div className="text-center mt-3">
                            <button className="btn btn" type='submit'>Submit</button>
                        </div>
                    </form>

                </div>
            </Card>

        </>
    )
}

export default PromocodePage