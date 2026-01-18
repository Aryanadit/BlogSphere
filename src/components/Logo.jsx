export default function Logo({ width = "100px" }) {
    return (
            <img
                src="/logoImagte.jpeg"
                alt="App Logo"
                style={{ width }}
                className="flex items-center rounded-full transition-transform hover:scale-105"
            />
    );
}
