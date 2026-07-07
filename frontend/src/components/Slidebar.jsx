import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Add Product", path: "/add-product", icon: "➕" },
    { name: "Categories", path: "/categories", icon: "🗂️" },
    { name: "Analytics", path: "/analytics", icon: "📊" },
    { name: "AI Assistant", path: "/ai", icon: "🤖" },
    { name: "Vision", path: "/vision", icon: "👁️" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
    { name: "Contact", path: "/contact", icon: "📩" },
  ];

  return (
    <aside className="sidebar">

      <h2 className="sidebar-logo">
        StockFlow <span>AI</span>
      </h2>

      <nav className="sidebar-nav">

        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={pathname === link.path ? "active-link" : ""}
          >
            <span>{link.icon}</span>
            {link.name}
          </Link>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;