import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Variables from "./pages/Variables/Variables"


const AppRoutes = () => {
    const navigationRoutes = [
        {
            path: "/",
            element: <Navigate to = "Home"/>
        },
        {
            path: "Home",
            element: <Home/>
        },
        {
            path: "Variables",
            element: <Variables/>
        }
    ]

    return <Routes>{navigationRoutes.map(route => 
        <Route key={route.path} path={route.path} element={route.element}/>
    )}</Routes>
}

export default AppRoutes