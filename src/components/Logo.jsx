import { Link } from "react-router-dom";

export default function Logo({ width = "100px" }) {
    return (
        <Link to="/">
            <img
                src="/logoImagte.jpeg"
                alt="App Logo"
                style={{ width }}
                className="flex items-center justify-center rounded-full transition-transform hover:scale-105"
            />
        </Link>
    );
}
