import axios from 'axios'
import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function LoginForm() {
  const [validated,setValidated]=useState(false)
  const [error,setError]=useState(null)
  const [form,setForm]=useState({})
  const navigate=useNavigate()

  const handleSubmit=(event)=>{
    event.preventDefautl();
    const loginForm = event.currentTarget;

    if (loginForm.checkValidity() === false){
      event.stopPropagation();
    }

    setValidated(true)

    const data = {
      email:form.email,
      password:form.password
    }


    axios.post('http://localhost:8000/api/auth/login/',data)
    .then((res)=>{
        localStorage.setItem("auth", JSON.stringify({
          access:res.data.access,
          refresh:res.data.refresh,
          user:res.data.user
        }));

        navigate("/")
    })
    .catch((err)=>{
      if(err.message){
        setError(err.request.response)
      }
    })

  }
  return (
    <Form
      id="login-form"
      className='border p-4 round'
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
         value={form.username}
         onChange={(e)=>{setForm({...form, email:e.target.value})}}
         required
         type="email"
         placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          Please a current email
        </Form.Control.Feedback>
      </Form.Group>


      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
         value={form.username}
         onChange={(e)=>{setForm({...form, password:e.target.value})}}
         required
         minLength="8"
         type="password"
         placeholder="Enter Password"
        />
        <Form.Control.Feedback type="invalid">
          Please a valid password
        </Form.Control.Feedback>
      </Form.Group>


      <div className="text-content">
        {error && <p>{error}</p>}
      </div>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  )
}

export default LoginForm
