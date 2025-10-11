import { Outlet } from "react-router-dom";
import PrivateRoute from "../layout/PrivateRoute";
import Layout from "./Layout";

export default function PrivateLayout(){
    return(
        <PrivateRoute>
            <Layout>
                <Outlet />
            </Layout>
        </PrivateRoute>
    );
}