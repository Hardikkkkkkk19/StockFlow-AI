import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      title: "Inventory Management",
      description:
        "Manage products, stock quantity and categories from one dashboard.",
      icon: "📦",
    },
    {
      title: "Analytics",
      description:
        "Visualize business growth with charts and reports.",
      icon: "📊",
    },
    {
      title: "AI Assistant",
      description:
        "Use Groq AI to get inventory insights instantly.",
      icon: "🤖",
    },
    {
      title: "AI Vision",
      description:
        "Upload product images and identify details using AI Vision.",
      icon: "👁️",
    },
    {
      title: "Email Alerts",
      description:
        "Receive automatic low-stock notifications.",
      icon: "📧",
    },
    {
      title: "Fast & Secure",
      description:
        "Authentication and cloud database powered by Supabase.",
      icon: "🔒",
    },
  ];

  const featureRoutes = {
    "Inventory Management": "/products",
    Analytics: "/analytics",
    "AI Assistant": "/ai",
    "AI Vision": "/vision",
    "Email Alerts": "/settings",
    "Fast & Secure": "/profile",
  };

  return (
    <section className="features section" id="features">
      <div className="container">

        <h2 className="section-title">
          Powerful Features
        </h2>

        <p className="section-subtitle">
          Everything you need to manage your inventory in one place.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <Link
              className="feature-card"
              to={featureRoutes[feature.title]}
              key={index}
            >

              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;
