import {Outlet, Link} from "react-router"
import Sidebar from "../components/Sidebar"

function Layout() {
    return (
        <div>
            <nav className="home-link" key="home-button">
                <Link style={{color: "black"}} to="/">
                Home
                </Link>
            </nav>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Layout