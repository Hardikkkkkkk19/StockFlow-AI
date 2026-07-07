import http from "http";
import url from "url";

const RESEND_API_KEY = "re_4EqTrpSq_J8FwuxFuVMdXSXiwYKKsL4co";

async function sendEmail(type, product, stock, email, threshold) {
  const alertTitle = type === "LOW_STOCK" ? "⚠️ Low Stock Alert" : "📈 High Stock Alert";
  const alertMessage =
    type === "LOW_STOCK"
      ? `Stock for ${product} has fallen below ${threshold} units. Current stock: ${stock}`
      : `Stock for ${product} has increased above ${threshold} units. Current stock: ${stock}`;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .header { background-color: ${type === "LOW_STOCK" ? "#ff6b6b" : "#51cf66"}; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .alert-box { background-color: ${type === "LOW_STOCK" ? "#ffe0e0" : "#e8f8f5"}; border-left: 4px solid ${type === "LOW_STOCK" ? "#ff6b6b" : "#51cf66"}; padding: 15px; margin: 15px 0; }
          .detail { margin: 10px 0; }
          .label { font-weight: bold; color: #555; }
          .button { display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 15px; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>${alertTitle}</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have received a stock alert notification:</p>
            <div class="alert-box">
              <div class="detail">
                <span class="label">Product:</span> ${product}
              </div>
              <div class="detail">
                <span class="label">Current Stock:</span> ${stock} units
              </div>
              <div class="detail">
                <span class="label">Alert Type:</span> ${type === "LOW_STOCK" ? "Low Stock" : "High Stock"}
              </div>
              <div class="detail">
                <span class="label">Threshold:</span> ${threshold} units
              </div>
            </div>
            <p>${alertMessage}</p>
            <p>Please take appropriate action in your inventory management system.</p>
            <a href="https://stockflow-ai.com/dashboard" class="button">View Dashboard</a>
          </div>
          <div class="footer">
            <p>This is an automated alert from StockFlow AI. Please do not reply to this email.</p>
            <p>&copy; 2026 StockFlow AI. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: email,
        subject: `${alertTitle} - ${product}`,
        html: emailHtml,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return {
        success: false,
        message: "Failed to send email",
        error: data.message || "Unknown error",
      };
    }

    console.log(`Email sent to ${email} for ${product}`);
    return {
      success: true,
      message: `${alertTitle} email sent successfully for ${product}`,
      emailId: data.id,
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      message: "Internal server error",
      error: error.message,
    };
  }
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/api/emails" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { type, product, stock, email, threshold } = JSON.parse(body);

        if (!type || !product || !email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            success: false,
            message: "Missing required fields: type, product, email",
          }));
          return;
        }

        const result = await sendEmail(type, product, stock, email, threshold);

        res.writeHead(result.success ? 200 : 500, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error("Request error:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: false,
          message: "Internal server error",
          error: error.message,
        }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Stock Alert Server running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: POST http://localhost:${PORT}/api/emails`);
});
