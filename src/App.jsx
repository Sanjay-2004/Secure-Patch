import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Usernav from './Components/User/Usernav'
import Report from './Components/User/Report'
import Update from './Components/User/Update'
import Reporternav from './Components/Reporter/Reporternav'
import Newreports from './Components/Reporter/Newreports'
import Fromusers from './Components/Reporter/Fromusers'
import Sentreq from './Components/Reporter/Sentreq'
import Adminnav from './Components/Admin/Adminnav'
import Deployment from './Components/Admin/Deployment'
import Current from './Components/Admin/Current'
import Developernav from './Components/Developer/Developernav'
import Patches from './Components/Developer/Patches'
import Qualitynav from './Components/Quality/Qualitynav'
import Verification from './Components/Quality/Verification'

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="user" element={<Usernav/>}>
            <Route index element={<Report/>}/>
            <Route path='report' element={<Report/>}/>
            <Route path='updates' element={<Update/>}/>
          </Route>
          <Route path='reporter' element={<Reporternav/>}>
            <Route index element={<Newreports/>}/>
            <Route path='report-new' element={<Newreports/>} />
            <Route path='from-users' element={<Fromusers/>}/>
            <Route path='previous-requests' element={<Sentreq/>}/>
          </Route>
          <Route path='admin' element={<Adminnav/>}>
            <Route index element={<Deployment/>}/>
            <Route path='deployment' element={<Deployment/>}/>
            <Route path='current-request' element={<Current/>}/>
          </Route>
          <Route path='developer' element={<Developernav/>}>
            <Route index element={<Patches/>}/>
            <Route path='requests' element={<Patches/>}/>
          </Route>
          <Route path='quality' element={<Qualitynav/>}>
            <Route index element={<Verification/>}/>
            <Route path='check' element={<Verification/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}