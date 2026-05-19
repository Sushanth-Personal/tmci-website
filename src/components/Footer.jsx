"use client";
import Link from "next/link";

export default function Footer() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919742944306";
  const waMsg = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hello TMCI!",
  );

  return (
    <footer>
      <div className="ft-grid">
        <div className="ft-brand">
          <div className="ft-logo-wrap">
            <div className="ft-mark">TM</div>
            <div className="ft-name">TMCI Technology</div>
          </div>
          <p>
            Manufacturer, Exporter &amp; Supplier of Test &amp; Measurement,
            Calibration, and Control Instrumentation solutions since 2012.
          </p>
          <div className="ft-ci">
            <span className="ft-ci-ic">📍</span>
            <span>New Thippasandra, Bengaluru – 560075, Karnataka, India</span>
          </div>
          <div className="ft-ci">
            <span className="ft-ci-ic">📞</span>
            <span>+91 97429 44306 · +91 80 4895 7300</span>
          </div>
          <div className="ft-ci">
            <span className="ft-ci-ic">✉️</span>
            <span>info@tmci.in</span>
          </div>
          <div className="ft-ci">
            <span className="ft-ci-ic">🌐</span>
            <span>www.tmci.in</span>
          </div>
          <a
            href={`https://wa.me/${waNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 12,
              background: "rgba(37,211,102,0.12)",
              border: "1px solid rgba(37,211,102,0.25)",
              color: "rgba(37,211,102,0.85)",
              padding: "8px 16px",
              borderRadius: 6,
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        <div className="ft-col">
          <h5>Products</h5>
          <ul>
            <li>
              <a href="#">Calibration Test Benches</a>
            </li>
            <li>
              <a href="#">ESD Workstations</a>
            </li>
            <li>
              <a href="#">Pneumatic Test Benches</a>
            </li>
            <li>
              <a href="#">Gas Analyzers</a>
            </li>
            <li>
              <a href="#">Predictive Maintenance</a>
            </li>
            <li>
              <a href="#">Portable Calibrators</a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h5>Industries</h5>
          <ul>
            <li>
              <a href="#">Defence &amp; Aerospace</a>
            </li>
            <li>
              <a href="#">Oil &amp; Gas</a>
            </li>
            <li>
              <a href="#">Power Generation</a>
            </li>
            <li>
              <a href="#">Marine &amp; Shipbuilding</a>
            </li>
            <li>
              <a href="#">Pharma &amp; Biotech</a>
            </li>
            <li>
              <a href="#">Automotive &amp; EV</a>
            </li>
          </ul>
        </div>

        <div className="ft-col">
          <h5>Company</h5>
          <ul>
            <li>
              <a href="#">About TMCI</a>
            </li>
            <li>
              <a href="#">Our Process</a>
            </li>
            <li>
              <a href="#">Downloads</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <a href="#">AMC &amp; Service</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-bot">
        <p>
          © {new Date().getFullYear()} TMCI Technology Private Limited · GST:
          29**********1ZJ · Bengaluru, Karnataka, India · Designed & Developed
          by{" "}
          <a
            href="https://www.linkedin.com/in/sushanth-p"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(255,255,255,0.6)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sushanth P
          </a>
        </p>
        <div className="ft-certs">
          <div className="ft-cert">ISO 9001</div>
          <div className="ft-cert">Make in India</div>
          <div className="ft-cert">MSME</div>
        </div>
      </div>
    </footer>
  );
}
