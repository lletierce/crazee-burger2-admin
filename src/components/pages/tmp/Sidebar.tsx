export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-white shadow-lg p-4">
      <nav className="space-y-2">
        <a href="#" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </a>
        <a href="#" className="block p-2 rounded hover:bg-gray-100">
          Users
        </a>
        <a href="#" className="block p-2 rounded hover:bg-gray-100">
          Settings
        </a>
      </nav>
    </aside>
  );
}