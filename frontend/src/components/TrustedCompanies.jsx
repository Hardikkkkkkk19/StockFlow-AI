function TrustedCompanies() {
  const companies = [
    {
      name: "Google",
      url: "https://www.google.com",
    },
    {
      name: "Microsoft",
      url: "https://www.microsoft.com",
    },
    {
      name: "Amazon",
      url: "https://www.amazon.com",
    },
    {
      name: "OpenAI",
      url: "https://openai.com",
    },
    {
      name: "Spotify",
      url: "https://www.spotify.com",
    },
    {
      name: "Netflix",
      url: "https://www.netflix.com",
    },
    {
      name: "Airbnb",
      url: "https://www.airbnb.com",
    },
  ];

  return (
    <section className="trusted">
      <div className="container">

        <p className="trusted-title">
          Trusted by modern businesses
        </p>

        <div className="trusted-grid">
          {companies.map((company, index) => (
            <a
              className="trusted-card"
              href={company.url}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              {company.name}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TrustedCompanies;
