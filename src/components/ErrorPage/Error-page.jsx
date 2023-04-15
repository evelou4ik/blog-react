import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (

        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>Go to the <Link to="/">Homepage</Link></p>
        </div>
    );
}