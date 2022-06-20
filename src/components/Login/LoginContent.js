import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { PathUrl } from '../../config/Config';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

function LoginContent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector((state)=>state.isLogin);
    console.log(isLogin,"After  Login State")

    
    
    const url = PathUrl().url;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data =>{

        const formData = new FormData()

        formData.append('phone',data.phone);
        formData.append('password',data.password);

        axios.post(`${url}/admin-panel/adminloginapi`,formData)
                    .then((response) => {
                        dispatch({type:'AUTHRIZATION',payload: response.data.access})
                        localStorage.setItem('Hurl_token',response.data.access)
                        localStorage.setItem('is_login',true)
                        navigate("/Admin/User")
                    })
                    .catch((response) => {
                        console.log(response.error)
                    });
    }
    return (
        <>
             <section className="myform-area">
              <div className="container">
                  <div className="row justify-content-center">
                      <div className="col-lg-8">
                          <div className="form-area login-form">
                              <div className="form-content">
                                  <h2>Login</h2>
                                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla non aperiam cum quas quod reprehenderit.</p>
                                  <ul>
                                      <li><Link to="/" className="facebook"><i className="fa fa-facebook-f"></i><span>facebook</span></Link></li>
                                      <li><Link to="/" className="twitter"><i className="fa fa-twitter"></i><span>twitter</span></Link></li>
                                  </ul>
                              </div>
                              <div className="form-input">
                                  <h2>Admin-Login</h2>
                                  <form onSubmit={handleSubmit(onSubmit)}>
                                      <div className="form-group">
                                          <input type="number"  {...register("phone",{ required: true })} autoComplete='on' />
                                          <label>Contact Number</label>
                                          {errors.phone && <span>This field is required</span>}
                                      </div>
                                      <div className="form-group">
                                          <input type="password" {...register("password", { required: true })} autoComplete='on'  />
                                          <label>password</label>
                                          {errors.password && <span>This field is required</span>}

                                      </div>
                                      {/* <div className="form-group">
                                          <input type="hidden" defaultValue="user" {...register("account_type")} />
                                      </div> */}
                                      <div className="myform-button">
                                          <button className="myform-btn" type='submit'>Login</button>
                                      </div>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
        </>
    )
}

export default LoginContent