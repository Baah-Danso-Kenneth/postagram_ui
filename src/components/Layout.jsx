import React, { createContext, useMemo, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import Navigationbar from './NavBar'
import Toaster from './Toaster'

export const Context = createContext("unknown")

function Layout(props) {
  const [toaster, setToaster] = useState({
    title:"",
    show:false,
    message:"",
    type:""
  })
 const navigate=useNavigate()
  const value=useMemo(()=>({ toaster, setToaster}),[toaster])
  const {hasNavigationBack} = props

  return (
    <Context.Provider value={value}>
    <div>
      <Navigationbar/>
      {hasNavigationBack && (
        <ArrowLeftOutlined
           style={{
            color:"#0D6EFD",
            marginLeft:"5%",
            fontSize:"24px",
            marginTop:"1%"
           }}
           onClick={()=>navigate(-1)}
        />
      )}
      <div className="container m-5">{props.children}</div>

      <Toaster
        title={toaster.title}
        message={toaster.message}
        type={toaster.type}
        showToast={toaster.show}
        onClose={()=>setToaster({...toaster, show:false})}
      />
    </div>
    </Context.Provider>
  )
}

export default Layout
