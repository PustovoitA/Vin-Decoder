import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"


const AppRoutes = () => {
    const navigationRoutes = [
        {
            path: "/",
            element: <Navigate to = "Home"/>
        },
        {
            path: "Home",
            element: <Home/>
        }
    ]

    return <Routes>{navigationRoutes.map(route => 
        <Route key={route.path} path={route.path} element={route.element}/>
    )}</Routes>
}

export default AppRoutes