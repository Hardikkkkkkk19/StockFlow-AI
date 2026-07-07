function DashboardPreview() {
  return (
    <section className="dashboard-preview" id="analytics">
      <div className="container dashboard-preview-container">

        <div className="preview-left">

          <span className="preview-tag">
            Analytics Dashboard
          </span>

          <h2>
            Monitor your business
            <br />
            in real time.
          </h2>

          <p>
            Track sales, monitor inventory, visualize reports and
            make smarter decisions using AI-powered analytics.
          </p>

          <button className="primary-btn">
            Explore Dashboard
          </button>

        </div>

        <div className="preview-right">

          <div className="preview-dashboard">

            <div className="chart-card">

              <div className="chart-header">
                Monthly Sales
              </div>

              <div className="bars">

                <span style={{height:"70px"}}></span>
                <span style={{height:"110px"}}></span>
                <span style={{height:"90px"}}></span>
                <span style={{height:"150px"}}></span>
                <span style={{height:"120px"}}></span>
                <span style={{height:"170px"}}></span>

              </div>

            </div>

            <div className="stats-row">

              <div className="small-card">
                <h3>₹48K</h3>
                <p>Total Revenue</p>
              </div>

              <div className="small-card">
                <h3>+18%</h3>
                <p>Growth</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;
