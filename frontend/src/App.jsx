import React from 'react' ;
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
         {/*      Appointmentes       */}
import Appointmentes from './pages/Appointmentes/Appointmentes';
import CreateAppointment from './pages/Appointmentes/CreateAppointment';
import UpdateAppointment from './pages/Appointmentes/UpdateAppointment';
import DeleteAppointment from './pages/Appointmentes/DeleteAppointment';

         {/*      Departmentes       */}
import Departmentes from './pages/Departmentes/Departmentes';
import CreateDepartment from './pages/Departmentes/CreateDepartment';
import UpdateDepartment from './pages/Departmentes/UpdateDepartment';
import DeleteDepartment from './pages/Departmentes/DeleteDepartment';
         {/*      Employees       */}
import Employees from './pages/Employees/Employees';
import CreateEmployee from './pages/Employees/CreateEmployee';
import UpdateEmployee from './pages/Employees/UpdateEmployee';
import DeleteEmployee from './pages/Employees/DeleteEmploee';
         {/*      Pationtes       */}
import Pationtes from './pages/Pationtes/Pationtes';
import CreatePationt from './pages/Pationtes/CreatePationt';
import UpdatePationt from './pages/Pationtes/UpdatePationt';
import DeletePationt from './pages/Pationtes/DeletePationt';
         {/*      Operations       */}
import Operations from './pages/Operationes/Operationes';
import CreateOperation from './pages/Operationes/CreateOperation';
import UpdateOperation from './pages/Operationes/UpdateOperation';
import DeleteOperation from './pages/Operationes/DeleteOperation';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // استيراد ملف CSS الخاص بالمكتبة


import Home from './pages/Home';
import Test_page  from './pages/Test_page';


import Layout from './hocs/Layout'


function App()  {


  return(
    <Router>
       <Layout>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/test" element={<Test_page />} />


         {/*      Departmentes       */}
         <Route path="/departments" element={<Departmentes />} />
         <Route path="/departments/create" element={<CreateDepartment />} /> 
         <Route path="/departments/:id/update" element={<UpdateDepartment />} /> 
         <Route path="/departments/:id/delete" element={<DeleteDepartment />} />

         {/*      Appointmentes       */}
         <Route path="/appointment" element={<Appointmentes />} />
         <Route path="/appointment/create" element={<CreateAppointment />} />
         <Route path="/appointments/:id/update" element={<UpdateAppointment />} />
         <Route path="/appointments/:id/delete" element={<DeleteAppointment />} />


         {/*      Employees       */}
         <Route path="/employee" element={<Employees />} />
         <Route path="/employee/create" element={<CreateEmployee />} />
         <Route path="/employee/:id/update" element={<UpdateEmployee />} />
         <Route path="/employee/:id/delete" element={<DeleteEmployee />} />
         {/*      Pationtes       */}
         <Route path="/pationte" element={<Pationtes />} />
         <Route path="/pationte/create" element={<CreatePationt />} />
         <Route path="/pationte/:id/update" element={<UpdatePationt />} />
         <Route path="/pationte/:id/delete" element={<DeletePationt />} />
          {/*      Operationes       */}
          <Route path="/operation" element={<Operations />} />
          <Route path="/operation/create" element={<CreateOperation />} />
          <Route path="/operation/:id/update" element={<UpdateOperation />} />
          <Route path="/operation/:id/delete" element={<DeleteOperation />} />
    

      </Routes>
       </Layout>
    </Router>
  )
}

export default App