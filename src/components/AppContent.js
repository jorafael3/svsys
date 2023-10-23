import React, { Suspense, useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import * as r from '../routes'

const AppContent = () => {

  const [routes, setroutes] = useState([]);

  useEffect(() => {
    r.Cargar_Rutas(function (x) {
      
      setroutes(x);
    });
  }, []);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          {/* <Route path="/" element={1 == 1 ? <Navigate to="login" /> : <Navigate to="dashboard" />} /> */}
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
