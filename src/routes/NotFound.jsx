import { Link } from "react-router"

function NotFound() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <p>This Page doesn't exist...It seems you have wandered off course.</p>
            <Link to="/" className="not-found-link">
                Back to the dashboard
            </Link>
        </div>
    )
}

export default NotFound