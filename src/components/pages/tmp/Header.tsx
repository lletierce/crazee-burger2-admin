import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <h1 className="font-semibold">My App</h1>

      {/* Menu mobile */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden">
          <nav className="space-y-2">
            <a href="#" className="block">Dashboard</a>
            <a href="#" className="block">Users</a>
            <a href="#" className="block">Settings</a>
          </nav>
        </div>
      )}
    </header>
  );
}