import Logout from "../settings/Logout";

const Header = ({ title, message }) => {
  return (
    <header className=" bg-blue-950 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        {message && (
          <div className="mt-2 mb-2 px-4 py-2 rounded bg-green-600 text-white text-center font-medium animate-fade-in">
            {message}
          </div>
        )}
        <Logout />
      </div>
    </header>
  );
};
export default Header;
