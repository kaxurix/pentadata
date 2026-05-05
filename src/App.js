import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Beranda", "Layanan", "Tentang", "Portfolio", "Kontak"];

const SERVICES = [
  {
    icon: "🌐",
    title: "Infrastruktur Jaringan",
    desc: "Desain, instalasi, dan pengelolaan jaringan enterprise — dari LAN/WAN hingga SD-WAN dan data center. Uptime 99.9% terjamin.",
    tags: ["LAN/WAN", "SD-WAN", "Data Center", "VPN"],
    color: "#0ea5e9",
  },
  {
    icon: "🔌",
    title: "Internet of Things",
    desc: "Solusi IoT end-to-end: sensor, gateway, cloud platform, hingga dashboard monitoring real-time untuk industri dan gedung cerdas.",
    tags: ["Smart Building", "Industrial IoT", "Dashboard", "Monitoring"],
    color: "#10b981",
  },
  {
    icon: "💻",
    title: "Sewa Laptop & PC",
    desc: "Armada 500+ unit laptop & PC terkini. Siap dalam 24 jam untuk kebutuhan event, proyek, hingga operasional jangka panjang.",
    tags: ["Event", "Proyek", "Jangka Panjang", "Maintenance"],
    color: "#8b5cf6",
  },
  {
    icon: "📦",
    title: "Software & Lisensi",
    desc: "Distributor resmi software enterprise: Microsoft, AutoCAD, Adobe, dan solusi ERP/CRM. Garansi lisensi asli & support penuh.",
    tags: ["Microsoft", "Adobe", "ERP/CRM", "AutoCAD"],
    color: "#f59e0b",
  },
  {
    icon: "🛡️",
    title: "Keamanan Siber",
    desc: "Audit keamanan, firewall enterprise, SIEM, dan pelatihan keamanan digital untuk melindungi aset digital perusahaan Anda.",
    tags: ["Firewall", "SIEM", "Audit", "Training"],
    color: "#ef4444",
  },
  {
    icon: "☁️",
    title: "Cloud & Managed IT",
    desc: "Migrasi cloud, hybrid infrastructure, dan layanan managed IT 24/7 — tim ahli kami siap menjadi departemen IT Anda.",
    tags: ["AWS", "Azure", "Hybrid Cloud", "24/7 Support"],
    color: "#06b6d4",
  },
];

const STATS = [
  { value: "12+", label: "Tahun Pengalaman" },
  { value: "300+", label: "Klien Aktif" },
  { value: "1.200+", label: "Proyek Selesai" },
  { value: "99.9%", label: "Uptime Garansi" },
];

const CLIENTS = [
  "Bank Jateng", "Pemprov Jateng", "RS Kariadi", "Undip",
  "BPJS Kesehatan", "PLN Distribusi", "Telkom Indonesia", "Pertamina EP",
];

const PORTFOLIO = [
  {
    title: "Smart Campus Undip",
    cat: "IoT",
    desc: "Sistem monitoring energi dan kehadiran berbasis IoT untuk 42 gedung kampus.",
    year: "2024",
    color: "#10b981",
  },
  {
    title: "Core Network Bank Jateng",
    cat: "Infrastruktur",
    desc: "Upgrade infrastruktur jaringan 80 kantor cabang dengan SD-WAN terpusat.",
    year: "2023",
    color: "#0ea5e9",
  },
  {
    title: "Event Nasional BPJS",
    cat: "Sewa Perangkat",
    desc: "Penyediaan 400 laptop untuk Rakornas BPJS Kesehatan selama 5 hari.",
    year: "2024",
    color: "#8b5cf6",
  },
  {
    title: "ERP Pemprov Jateng",
    cat: "Software",
    desc: "Implementasi ERP terpadu untuk 35 dinas di lingkungan Pemprov Jateng.",
    year: "2022",
    color: "#f59e0b",
  },
];

const TEAM = [
  { name: "Anton Hanafi", role: "Direktur", exp: "Kepemimpinan PT. Pentadata Infracom Solusindo" },
];

const COMPANY_INFO = {
  address: "Teluk, Purwokerto Selatan, Banyumas, Jawa Tengah",
  phone: "+62 (0274) XXX-XXXX",
  email: "info@pentadata.net",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Beranda");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["beranda", "layanan", "tentang", "portfolio", "kontak"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          setActiveSection(id.charAt(0).toUpperCase() + id.slice(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'Sora', sans-serif", background: "#050b18", color: "#e2e8f0", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(5,11,24,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(14,165,233,0.15)",
        padding: "0 clamp(1rem,4vw,4rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 18, color: "#fff",
          }}>P</div>
          <span style={{ fontWeight: 700, fontSize: 20, letterSpacing: "-0.5px" }}>
            penta<span style={{ color: "#0ea5e9" }}>data</span>
          </span>
          <span style={{
            fontSize: 10, padding: "2px 8px", borderRadius: 999,
            background: "rgba(14,165,233,0.15)", color: "#0ea5e9",
            letterSpacing: "0.08em", fontWeight: 600, marginLeft: 4,
          }}>NET</span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{
                border: "none", cursor: "pointer",
                padding: "8px 16px", borderRadius: 8,
                color: activeSection === l ? "#0ea5e9" : "#94a3b8",
                fontWeight: activeSection === l ? 600 : 400,
                fontSize: 14, fontFamily: "inherit",
                background: activeSection === l ? "rgba(14,165,233,0.1)" : "transparent",
                transition: "all 0.2s",
              }}>
              {l}
            </button>
          ))}
          <button onClick={() => scrollTo("kontak")} style={{
            marginLeft: 8, padding: "9px 22px", borderRadius: 8,
            background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
            border: "none", color: "#fff", fontWeight: 600,
            fontSize: 14, cursor: "pointer", fontFamily: "inherit",
          }}>
            Hubungi Kami
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#e2e8f0", fontSize: 24, display: "none",
        }} className="hamburger">☰</button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
          background: "rgba(5,11,24,0.98)", backdropFilter: "blur(20px)",
          padding: "1rem 2rem 2rem", borderBottom: "1px solid rgba(14,165,233,0.15)",
        }}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              color: "#e2e8f0", fontSize: 16, fontFamily: "inherit",
              padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section id="beranda" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px clamp(1rem,4vw,4rem) 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "10%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Grid lines decoration */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(rgba(14,165,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 800, position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 999,
            border: "1px solid rgba(14,165,233,0.3)",
            background: "rgba(14,165,233,0.08)",
            fontSize: 13, color: "#0ea5e9", marginBottom: 32,
            animation: "fadeDown 0.8s ease forwards",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s infinite" }} />
            Solusi IT Terpercaya di Jawa Tengah sejak 2012
          </div>

          <h1 style={{
            fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 800,
            lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 24,
            animation: "fadeUp 0.8s ease 0.1s both",
          }}>
            Infrastruktur Digital<br />
            <span style={{
              background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              yang Menggerakkan
            </span>
            <br />Bisnis Anda
          </h1>

          <p style={{
            fontSize: "clamp(1rem,2vw,1.2rem)", color: "#94a3b8",
            lineHeight: 1.7, maxWidth: 560, marginBottom: 40,
            animation: "fadeUp 0.8s ease 0.2s both",
          }}>
            Dari jaringan enterprise hingga IoT, sewa perangkat hingga software lisensi — kami adalah mitra teknologi one-stop untuk pertumbuhan bisnis Anda.
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            animation: "fadeUp 0.8s ease 0.3s both",
          }}>
            <button onClick={() => scrollTo("layanan")} style={{
              padding: "14px 32px", borderRadius: 10,
              background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
              border: "none", color: "#fff", fontWeight: 600,
              fontSize: 15, cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 0 40px rgba(14,165,233,0.3)",
            }}>
              Jelajahi Layanan →
            </button>
            <button onClick={() => scrollTo("portfolio")} style={{
              padding: "14px 32px", borderRadius: 10,
              background: "transparent",
              border: "1px solid rgba(14,165,233,0.3)",
              color: "#e2e8f0", fontWeight: 500,
              fontSize: 15, cursor: "pointer", fontFamily: "inherit",
            }}>
              Lihat Portfolio
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", gap: "clamp(1.5rem,4vw,3rem)", marginTop: 64, flexWrap: "wrap",
            animation: "fadeUp 0.8s ease 0.4s both",
          }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "clamp(1.6rem,3vw,2rem)", fontWeight: 800, color: "#e2e8f0" }}>{s.value}</div>
                <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating card decoration */}
        <div style={{
          position: "absolute", right: "5%", top: "30%",
          background: "rgba(14,165,233,0.06)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(14,165,233,0.15)", borderRadius: 16,
          padding: "20px 24px", display: "none", flexDirection: "column", gap: 12,
          animation: "float 4s ease-in-out infinite",
        }} className="floating-card">
          <div style={{ fontSize: 12, color: "#64748b" }}>Network Status</div>
          {["Core Switch", "Firewall", "IoT Gateway"].map((name, i) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 13, color: "#cbd5e1" }}>{name}</span>
              <span style={{ fontSize: 11, color: "#10b981", marginLeft: "auto" }}>Online</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="layanan" style={{ padding: "100px clamp(1rem,4vw,4rem)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", fontSize: 12, letterSpacing: "0.15em",
              color: "#0ea5e9", fontWeight: 600, textTransform: "uppercase", marginBottom: 16,
            }}>Layanan Kami</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16 }}>
              Satu Mitra,<br />Semua Solusi IT
            </h2>
            <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
              Kami menghadirkan layanan teknologi terintegrasi yang dirancang untuk skala bisnis Anda — dari startup hingga enterprise.
            </p>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.07)",
                padding: "28px 28px",
                transition: "all 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = `${s.color}44`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${s.color}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "#f1f5f9" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: 999,
                      background: `${s.color}15`, color: s.color, fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="tentang" style={{
        padding: "100px clamp(1rem,4vw,4rem)",
        background: "rgba(14,165,233,0.03)",
        borderTop: "1px solid rgba(14,165,233,0.08)",
        borderBottom: "1px solid rgba(14,165,233,0.08)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
          gap: 64, alignItems: "center",
        }}>
          <FadeIn>
            <div>
              <div style={{
                fontSize: 12, letterSpacing: "0.15em",
                color: "#0ea5e9", fontWeight: 600, textTransform: "uppercase", marginBottom: 16,
              }}>Tentang Pentadata</div>
              <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 20 }}>
                Membangun Fondasi Digital Indonesia
              </h2>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
                PT. Pentadata Infracom Solusindo berdiri sejak 2018 di Purwokerto, hadir sebagai mitra teknologi terpercaya bagi ratusan organisasi di Jawa Tengah dan sekitarnya.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
                Dengan tim insinyur bersertifikasi internasional (CCIE, CCNP, PMP) dan pengalaman lebih dari satu dekade, kami tidak sekadar menyediakan teknologi — kami memastikan teknologi tersebut benar-benar bekerja untuk bisnis Anda.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "ISO 9001:2015 Certified",
                  "Microsoft Gold Partner",
                  "Cisco Premier Certified Partner",
                  "Authorized Distributor 15+ Brand",
                ].map((v) => (
                  <div key={v} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "rgba(14,165,233,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: "#0ea5e9",
                    }}>✓</div>
                    <span style={{ fontSize: 14, color: "#cbd5e1" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <div style={{ marginBottom: 24, fontSize: 14, color: "#64748b", fontWeight: 600 }}>TIM INTI</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {TEAM.map((t) => (
                  <div key={t.name} style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "16px 20px", borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 16, color: "#fff",
                    }}>
                      {t.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#f1f5f9" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#0ea5e9" }}>{t.role}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{t.exp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Clients */}
        <FadeIn delay={0.1}>
          <div style={{ maxWidth: 1100, margin: "64px auto 0", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "#64748b", letterSpacing: "0.15em", fontWeight: 600, textTransform: "uppercase", marginBottom: 32 }}>
              Dipercaya oleh
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {CLIENTS.map((c) => (
                <div key={c} style={{
                  padding: "10px 20px", borderRadius: 8,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: 13, color: "#94a3b8", fontWeight: 500,
                }}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" style={{ padding: "100px clamp(1rem,4vw,4rem)" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", fontSize: 12, letterSpacing: "0.15em",
              color: "#0ea5e9", fontWeight: 600, textTransform: "uppercase", marginBottom: 16,
            }}>Portfolio</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px" }}>
              Proyek yang Berbicara<br />untuk Diri Sendiri
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
          gap: 24, maxWidth: 1100, margin: "0 auto",
        }}>
          {PORTFOLIO.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
              }}>
                <div style={{
                  height: 6,
                  background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
                }} />
                <div style={{ padding: "24px 24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "flex-start" }}>
                    <span style={{
                      fontSize: 11, padding: "3px 10px", borderRadius: 999,
                      background: `${p.color}18`, color: p.color, fontWeight: 600,
                    }}>{p.cat}</span>
                    <span style={{ fontSize: 12, color: "#64748b" }}>{p.year}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#f1f5f9" }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <FadeIn>
        <div style={{
          margin: "0 clamp(1rem,4vw,4rem) 100px",
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(124,58,237,0.15))",
          border: "1px solid rgba(14,165,233,0.2)",
          padding: "60px 48px",
          textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 50% 0%, rgba(14,165,233,0.15), transparent 70%)",
            pointerEvents: "none",
          }} />
          <h2 style={{ fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16, position: "relative" }}>
            Siap Transformasi Digital?
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 16, marginBottom: 32, position: "relative" }}>
            Konsultasikan kebutuhan IT Anda secara gratis. Tim ahli kami siap membantu.
          </p>
          <button onClick={() => scrollTo("kontak")} style={{
            padding: "14px 40px", borderRadius: 10,
            background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
            border: "none", color: "#fff", fontWeight: 700,
            fontSize: 16, cursor: "pointer", fontFamily: "inherit",
            position: "relative",
            boxShadow: "0 0 40px rgba(14,165,233,0.4)",
          }}>
            Konsultasi Gratis Sekarang →
          </button>
        </div>
      </FadeIn>

      {/* ===== CONTACT ===== */}
      <section id="kontak" style={{
        padding: "100px clamp(1rem,4vw,4rem)",
        background: "rgba(14,165,233,0.03)",
        borderTop: "1px solid rgba(14,165,233,0.08)",
      }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{
              display: "inline-block", fontSize: 12, letterSpacing: "0.15em",
              color: "#0ea5e9", fontWeight: 600, textTransform: "uppercase", marginBottom: 16,
            }}>Kontak</div>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px" }}>
              Mari Berkolaborasi
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
          gap: 48, maxWidth: 900, margin: "0 auto",
        }}>
          <FadeIn>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Info Kontak</h3>
              {[
                { icon: "📍", label: "Alamat", val: "Jl. Pemuda No. 72, Purwokerto, Jawa Tengah 53145" },
                { icon: "📞", label: "Telepon", val: "(024) 8441-2345" },
                { icon: "📧", label: "Email", val: "info@pentadata.net" },
                { icon: "🌐", label: "Website", val: "www.pentadata.net" },
              ].map((c) => (
                <div key={c.label} style={{
                  display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: "rgba(14,165,233,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "#64748b", marginBottom: 3 }}>{c.label}</div>
                    <div style={{ fontSize: 14, color: "#cbd5e1" }}>{c.val}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>Jam Operasional</div>
                <div style={{ fontSize: 14, color: "#cbd5e1" }}>Senin – Jumat: 08.00 – 17.00 WIB</div>
                <div style={{ fontSize: 14, color: "#cbd5e1" }}>Sabtu: 09.00 – 14.00 WIB</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                  <span style={{ fontSize: 13, color: "#10b981" }}>Support 24/7 untuk klien aktif</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Kirim Pesan</h3>
              {sent && (
                <div style={{
                  padding: "12px 16px", borderRadius: 10, marginBottom: 20,
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  color: "#10b981", fontSize: 14,
                }}>
                  ✓ Pesan terkirim! Kami akan menghubungi Anda segera.
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name", label: "Nama Lengkap", type: "text", placeholder: "Budi Santoso" },
                  { key: "email", label: "Email", type: "email", placeholder: "budi@perusahaan.com" },
                ].map((f) => (
                  <div key={f.key}>
                    <label style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                      style={{
                        width: "100%", padding: "12px 14px", borderRadius: 10,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
                        outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.5)"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 13, color: "#64748b", display: "block", marginBottom: 6 }}>Pesan</label>
                  <textarea
                    placeholder="Ceritakan kebutuhan IT Anda..."
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%", padding: "12px 14px", borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#e2e8f0", fontSize: 14, fontFamily: "inherit",
                      outline: "none", resize: "vertical", boxSizing: "border-box",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>
                <button onClick={handleSubmit} style={{
                  padding: "13px", borderRadius: 10,
                  background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
                  border: "none", color: "#fff", fontWeight: 700,
                  fontSize: 15, cursor: "pointer", fontFamily: "inherit",
                }}>
                  Kirim Pesan →
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "40px clamp(1rem,4vw,4rem)",
        display: "flex", flexWrap: "wrap",
        justifyContent: "space-between", alignItems: "center", gap: 20,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 15, color: "#fff",
            }}>P</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>
              penta<span style={{ color: "#0ea5e9" }}>data</span>.net
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
            {COMPANY_INFO.address}
          </div>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            © 2024 PT. Pentadata Nusantara. Hak Cipta Dilindungi.
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#475569", textAlign: "center" }}>
          PT. Pentadata Nusantara
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Kebijakan Privasi", "Syarat & Ketentuan"].map((l) => (
            <span key={l} style={{ fontSize: 13, color: "#475569", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .floating-card { display: none !important; }
        }
        @media (min-width: 900px) {
          .floating-card { display: flex !important; }
        }
      `}</style>
    </div>
  );
}