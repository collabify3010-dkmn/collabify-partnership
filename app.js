// Collabify — Multi-page app with role-based routing
;(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel)
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel))

  const state = {
    currentPage: "home",
    userRole: localStorage.getItem("collabify_role") || null,
    userProfile: JSON.parse(localStorage.getItem("collabify_profile") || "null"),
    partnerships: JSON.parse(localStorage.getItem("collabify_partnerships") || "[]"),
    applications: JSON.parse(localStorage.getItem("collabify_applications") || "[]"),
    messages: JSON.parse(localStorage.getItem("collabify_messages") || "[]"),
    filters: {
      type: "",
      industry: "",
      location: "",
      skill: "",
      search: "",
    },
    partnerFilters: {
      industry: "",
      location: "",
      partnershipType: "",
      budget: "",
      search: "",
    },
  }

  const samplePartnerships = [
    {
      id: "opp1",
      ownerId: "owner1",
      businessName: "PT TechStart Indonesia",
      industry: "Technology",
      location: "Jakarta",
      website: "https://techstart.example.com",
      description:
        "Platform SaaS B2B untuk manajemen proyek. Saat ini mencapai $500k ARR dengan 200+ pelanggan. Menargetkan pertumbuhan ke $5M ARR dalam 18 bulan.",
      partnershipType: "Co-founder",
      requiredExpertise: ["Sales", "Business Development", "Enterprise Sales"],
      budget: "$50k - $100k",
      timeline: "Immediate",
      objectives:
        "Mencari co-founder yang fokus pada penjualan untuk memimpin strategi penjualan enterprise dan membangun tim penjualan. Kompensasi berbasis ekuitas dengan potensi keuntungan signifikan.",
      createdAt: "2025-01-15T10:00:00Z",
    },
    {
      id: "opp2",
      ownerId: "owner2",
      businessName: "GreenEats Indonesia",
      industry: "Food & Beverage",
      location: "Surabaya",
      description:
        "Layanan pengiriman makanan berkelanjutan dengan fokus pada bahan lokal. Beroperasi di 3 kota dengan rencana ekspansi ke 10 kota tahun ini.",
      partnershipType: "Strategic Partner",
      requiredExpertise: ["Logistics", "Supply Chain", "Operations"],
      budget: "$10k - $50k",
      timeline: "1-3 months",
      objectives:
        "Mencari mitra logistik untuk mengoptimalkan operasi pengiriman dan mengurangi biaya 20%. Model revenue share tersedia.",
      createdAt: "2025-01-20T14:30:00Z",
    },
    {
      id: "opp3",
      ownerId: "owner3",
      businessName: "FinanceFlow Indonesia",
      industry: "Finance",
      location: "Jakarta",
      website: "https://financeflow.example.com",
      description:
        "Startup fintech yang membangun alat perencanaan keuangan bertenaga AI untuk bisnis kecil. Tahap pre-seed dengan MVP yang berfungsi dan 50 pengguna beta.",
      partnershipType: "Investor",
      requiredExpertise: ["Investment", "Fintech", "Product Strategy"],
      budget: "$500k+",
      timeline: "3-6 months",
      objectives:
        "Mengumpulkan putaran seed untuk mempercepat pengembangan produk dan akuisisi pelanggan. Mencari investor dengan pengalaman fintech dan jaringan.",
      createdAt: "2025-01-18T09:15:00Z",
    },
    {
      id: "opp4",
      ownerId: "owner4",
      businessName: "DesignHub Bandung",
      industry: "Creative",
      location: "Bandung",
      description:
        "Agensi kreatif yang mengkhususkan diri dalam identitas merek dan desain digital. Rekam jejak 5 tahun dengan 100+ klien termasuk perusahaan Fortune 500.",
      partnershipType: "Service Provider",
      requiredExpertise: ["Web Development", "Frontend Development", "React"],
      budget: "Revenue share",
      timeline: "Immediate",
      objectives:
        "Mencari mitra pengembangan untuk memperluas penawaran layanan. Revenue share pada proyek bersama dengan potensi kolaborasi jangka panjang.",
      createdAt: "2025-01-22T11:45:00Z",
    },
    {
      id: "opp5",
      ownerId: "owner5",
      businessName: "EduTech Solutions Yogyakarta",
      industry: "Education",
      location: "Yogyakarta",
      website: "https://edutech.example.com",
      description:
        "Platform pembelajaran online untuk pengembangan profesional. 10k+ pengguna aktif dan kemitraan dengan 50+ korporasi untuk pelatihan karyawan.",
      partnershipType: "Distribution Partner",
      requiredExpertise: ["Sales", "Partnership Development", "B2B Marketing"],
      budget: "$100k - $500k",
      timeline: "3-6 months",
      objectives:
        "Mencari mitra distribusi untuk ekspansi ke pasar baru. Model berbasis komisi dengan potensi perjanjian wilayah eksklusif.",
      createdAt: "2025-01-25T16:20:00Z",
    },
    {
      id: "opp6",
      ownerId: "owner6",
      businessName: "HealthTrack Medan",
      industry: "Healthcare",
      location: "Medan",
      description:
        "Platform kesehatan digital yang menghubungkan pasien dengan penyedia layanan kesehatan. Compliant HIPAA dengan 5k+ pengguna terdaftar.",
      partnershipType: "Technology Partner",
      requiredExpertise: ["Healthcare IT", "Security", "Compliance"],
      budget: "$50k - $100k",
      timeline: "1-3 months",
      objectives:
        "Mencari mitra teknologi untuk meningkatkan infrastruktur keamanan dan memastikan kepatuhan terhadap regulasi kesehatan.",
      createdAt: "2025-01-28T13:00:00Z",
    },
  ]

  const partnerProfiles = [
    {
      id: "p_keyla",
      type: "person",
      name: "Keyla Rindani",
      role: "Marketing Strategist",
      industry: "Technology",
      location: "Jakarta",
      rating: 4.9,
      skills: ["Content Marketing", "Social Media", "Brand Strategy", "Analytics"],
      expertise: ["Digital Marketing", "Growth Hacking", "Community Building"],
      bio: "Spesialis dalam membangun brand awareness dan engagement untuk startup tech. Telah membantu 30+ perusahaan mencapai 10x growth.",
      availability: "Available for projects",
    },
    {
      id: "p_putri",
      type: "person",
      name: "Putri Maysa",
      role: "Product Manager",
      industry: "Technology",
      location: "Bandung",
      rating: 4.8,
      skills: ["Product Strategy", "User Research", "Data Analysis", "Roadmapping"],
      expertise: ["Product Development", "User Experience", "Market Research"],
      bio: "Berpengalaman dalam mengembangkan produk dari 0 hingga 1M+ users. Ahli dalam product-market fit dan user retention.",
      availability: "Available for projects",
    },
    {
      id: "p_nathanael",
      type: "person",
      name: "Nathanael Osborne",
      role: "Business Development Manager",
      industry: "Finance",
      location: "Jakarta",
      rating: 4.7,
      skills: ["Strategic Partnerships", "Sales", "Negotiation", "Market Expansion"],
      expertise: ["B2B Sales", "Partnership Strategy", "Revenue Growth"],
      bio: "Membantu startup fintech dan SaaS mencapai $10M+ ARR. Ahli dalam membangun partnership strategis dan closing deals besar.",
      availability: "Open to opportunities",
    },
    {
      id: "p1",
      type: "person",
      name: "Budi Santoso",
      role: "Growth Marketing Specialist",
      industry: "Technology",
      location: "Jakarta",
      rating: 4.8,
      skills: ["Digital Marketing", "SEO", "Paid Ads", "Analytics"],
      expertise: ["SaaS Growth", "User Acquisition", "Lifecycle Marketing"],
      bio: "10+ tahun membantu perusahaan SaaS berkembang dari 0 hingga 10M ARR. Spesialis dalam strategi pertumbuhan B2B.",
      availability: "Available for projects",
    },
    {
      id: "p2",
      type: "person",
      name: "Rini Wijaya",
      role: "Full-Stack Developer",
      industry: "Technology",
      location: "Surabaya",
      rating: 4.9,
      skills: ["React", "Node.js", "Python", "AWS"],
      expertise: ["Web Development", "API Design", "Cloud Architecture"],
      bio: "Membangun aplikasi web yang scalable dan MVP. Turnaround cepat dengan kode yang bersih dan mudah dirawat.",
      availability: "Available for projects",
    },
    {
      id: "p3",
      type: "person",
      name: "Siti Nurhaliza",
      role: "UX/UI Designer",
      industry: "Creative",
      location: "Bandung",
      rating: 4.7,
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      expertise: ["Product Design", "User Experience", "Brand Identity"],
      bio: "Menciptakan antarmuka intuitif dan indah yang disukai pengguna. Pengalaman dengan produk B2C dan B2B.",
      availability: "Available for projects",
    },
    {
      id: "p4",
      type: "person",
      name: "Ahmad Hidayat",
      role: "Business Development Manager",
      industry: "Finance",
      location: "Jakarta",
      rating: 4.6,
      skills: ["Partnership Development", "Negotiation", "Sales Strategy"],
      expertise: ["Strategic Partnerships", "Market Expansion", "Deal Structuring"],
      bio: "Menutup $50M+ dalam kesepakatan kemitraan. Ahli dalam kemitraan fintech dan B2B SaaS.",
      availability: "Open to opportunities",
    },
    {
      id: "p5",
      type: "person",
      name: "Dewi Lestari",
      role: "Operations Consultant",
      industry: "Logistics",
      location: "Makassar",
      rating: 4.5,
      skills: ["Process Optimization", "Supply Chain", "Project Management"],
      expertise: ["Operations Strategy", "Logistics", "Efficiency Improvement"],
      bio: "Menyederhanakan operasi untuk bisnis yang berkembang. Rata-rata mengurangi biaya 30%.",
      availability: "Available for projects",
    },
    {
      id: "p6",
      type: "person",
      name: "Hendra Kusuma",
      role: "Financial Analyst",
      industry: "Finance",
      location: "Jakarta",
      rating: 4.8,
      skills: ["Financial Modeling", "Data Analysis", "Forecasting"],
      expertise: ["Financial Planning", "Investment Analysis", "Risk Management"],
      bio: "Membantu bisnis membuat keputusan keuangan berbasis data. Pemegang CFA.",
      availability: "Available for projects",
    },
    {
      id: "p7",
      type: "company",
      name: "TechVentures Indonesia",
      industry: "Technology",
      location: "Jakarta",
      rating: 4.7,
      skills: ["Venture Capital", "Mentorship", "Network Access"],
      expertise: ["Early-stage Investment", "Product Strategy", "Go-to-Market"],
      bio: "Firma VC tahap seed yang berinvestasi dalam B2B SaaS. Portfolio mencakup 20+ exit yang sukses.",
      availability: "Actively investing",
    },
    {
      id: "p8",
      type: "company",
      name: "Creative Studio Yogyakarta",
      industry: "Creative",
      location: "Yogyakarta",
      rating: 4.6,
      skills: ["Branding", "Content Creation", "Video Production"],
      expertise: ["Brand Strategy", "Creative Direction", "Digital Content"],
      bio: "Agensi kreatif pemenang penghargaan. Bekerja dengan perusahaan Fortune 500 dan startup.",
      availability: "Taking new clients",
    },
  ]

  const placeholderBusinessOwner = {
    companyName: "PT TechVenture Solutions",
    industry: "Technology",
    location: "Jakarta",
    website: "https://techventure.example.com",
    description:
      "Perusahaan SaaS B2B yang mengkhususkan diri dalam solusi manajemen proyek enterprise. Didirikan pada 2020, kami telah berkembang menjadi 50+ karyawan dan melayani 200+ klien enterprise.",
    founded: "2020",
    teamSize: "50-100",
    revenue: "$5M ARR",
  }

  const placeholderPartner = {
    name: "Matthew Anthony",
    role: "Full-Stack Developer & Product Consultant",
    industry: "Technology",
    location: "Surabaya",
    bio: "10+ tahun membangun aplikasi web yang scalable dan membantu startup meluncurkan produk yang sukses. Spesialis dalam React, Node.js, dan cloud architecture.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    expertise: ["Web Development", "Product Strategy", "Technical Architecture"],
    portfolio: "https://github.com/roxyhook",
    availability: "Available for projects",
    yearsExperience: "10+",
    projectsCompleted: "50+",
  }

  const sampleMessages = [
    {
      id: "conv1",
      listingName: "PT TechStart Indonesia",
      otherParty: "Budi Santoso",
      lastMessage:
        "Hi, I'm interested in your co-founder role. My background in SaaS growth aligns well with your objectives.",
      timestamp: "2025-03-10T10:00:00Z",
      unread: true,
    },
    {
      id: "conv2",
      listingName: "GreenEats Indonesia",
      otherParty: "Dewi Lestari",
      lastMessage:
        "We received your application for a strategic partnership. We'll review it and get back to you shortly.",
      timestamp: "2025-03-09T14:30:00Z",
      unread: false,
    },
    {
      id: "conv3",
      listingName: "FinanceFlow Indonesia",
      otherParty: "Hendra Kusuma",
      lastMessage: "Looking forward to discussing potential investment opportunities.",
      timestamp: "2025-03-08T09:15:00Z",
      unread: false,
    },
    {
      id: "conv4",
      listingName: "DesignHub Bandung",
      otherParty: "Siti Nurhaliza",
      lastMessage: "Can you share your portfolio link?",
      timestamp: "2025-03-07T11:45:00Z",
      unread: true,
    },
  ]

  function getAllPartnerships() {
    return [...samplePartnerships, ...state.partnerships]
  }

  function navigate(page) {
    state.currentPage = page
    window.history.pushState({ page }, "", `#${page}`)
    render()
  }

  function renderHeader() {
    const isLoggedIn = state.userRole !== null
    const roleLabel = state.userRole === "business-owner" ? "Business Owner" : "Partner"
    const unreadCount = state.messages.filter((m) => m.unread).length

    return `
      <header class="site-header" role="banner">
        <div class="container nav">
          <a href="#" class="brand" aria-label="Collabify Home" data-nav="home">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO-removebg-preview-o875nsGBgjrZqtQvBd8OXnJuzGSyjP.png" alt="Collabify Logo" class="brand-logo" />
            <span class="brand-text">Collabify</span>
          </a>
          ${
            isLoggedIn
              ? `
            <nav aria-label="Main navigation">
              <ul class="nav-list">
                <li><a href="#dashboard" data-nav="dashboard">Dashboard</a></li>
                <li><a href="#explore" data-nav="explore">Explore</a></li>
                ${state.userRole === "business-owner" ? '<li><a href="#create-listing" data-nav="create-listing">Create Listing</a></li>' : ""}
                <li><a href="#messages" data-nav="messages">Messages ${unreadCount > 0 ? `<span class="unread-badge">${unreadCount}</span>` : ""}</a></li>
                <li><a href="#profile" data-nav="profile">Profile</a></li>
              </ul>
            </nav>
            <div class="nav-cta">
              <span class="role-badge">${roleLabel}</span>
              <button class="btn btn-ghost" data-action="logout">Logout</button>
            </div>
          `
              : `
            <div class="nav-cta">
              <a class="btn btn-secondary" href="#" data-nav="home">Get Started</a>
            </div>
          `
          }
        </div>
      </header>
    `
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container footer-inner">
          <p>&copy; ${new Date().getFullYear()} Collabify. All rights reserved.</p>
          <nav aria-label="Footer links">
            <a href="#home" data-nav="home">Home</a>
            <a href="#explore" data-nav="explore">Explore</a>
            <a href="#profile" data-nav="profile">Profile</a>
          </nav>
        </div>
      </footer>
    `
  }

  function renderHomePage() {
    return `
      ${renderHeader()}
      <main class="hero" role="main">
        <div class="container hero-inner">
          <div class="hero-copy">
            <h1 class="text-balance">Connect, Collaborate, Create.</h1>
            <p class="lead">
              Collabify is the platform where business owners find partners and professionals discover opportunities. 
              Choose your role to get started.
            </p>
            
            <div class="role-selection">
              <div class="role-card" data-role="business-owner">
                <div class="role-icon">🏢</div>
                <h3>I'm a Business Owner</h3>
                <p>Looking for partners to expand my business and create strategic collaborations.</p>
                <ul class="role-features">
                  <li>Create partnership listings</li>
                  <li>Review applications</li>
                  <li>Connect with professionals</li>
                  <li>Track engagement metrics</li>
                </ul>
                <button class="btn btn-primary" data-action="select-role" data-role="business-owner">
                  Continue as Business Owner
                </button>
              </div>
              
              <div class="role-card" data-role="partner">
                <div class="role-icon">💼</div>
                <h3>I'm a Partner</h3>
                <p>Looking for business opportunities to collaborate, invest, or contribute my expertise.</p>
                <ul class="role-features">
                  <li>Browse opportunities</li>
                  <li>Apply to listings</li>
                  <li>Showcase your skills</li>
                  <li>Build your portfolio</li>
                </ul>
                <button class="btn btn-primary" data-action="select-role" data-role="partner">
                  Continue as Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderDashboardPage() {
    if (state.userRole === "business-owner") {
      return renderBusinessOwnerDashboard()
    } else {
      return renderPartnerDashboard()
    }
  }

  function renderBusinessOwnerDashboard() {
    const myListings = state.partnerships.filter((p) => p.ownerId === "current-user")
    const activeListings = myListings.length
    const totalApplications = state.applications.filter((app) =>
      myListings.some((listing) => listing.id === app.opportunityId),
    ).length
    const pendingApplications = state.applications.filter(
      (app) => app.status === "pending" && myListings.some((listing) => listing.id === app.opportunityId),
    ).length
    const unreadMessages = state.messages.filter((m) => m.unread).length

    const recentApplications = state.applications
      .filter((app) => myListings.some((listing) => listing.id === app.opportunityId))
      .slice(0, 3)

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Welcome back, ${placeholderBusinessOwner.companyName}!</h2>
            <p class="muted">Here's an overview of your partnership activity.</p>
          </header>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📋</div>
              <div class="stat-value">${activeListings}</div>
              <div class="stat-label">Active Listings</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📨</div>
              <div class="stat-value">${totalApplications}</div>
              <div class="stat-label">Total Applications</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏳</div>
              <div class="stat-value">${pendingApplications}</div>
              <div class="stat-label">Pending Reviews</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">💬</div>
              <div class="stat-value">${unreadMessages}</div>
              <div class="stat-label">Unread Messages</div>
            </div>
          </div>

          ${
            recentApplications.length > 0
              ? `
            <div class="dashboard-section">
              <div class="section-header">
                <h3>Recent Applications</h3>
                <a href="#profile" data-nav="profile" class="link-primary">View all</a>
              </div>
              <div class="grid cards-grid">
                ${recentApplications.map(renderBusinessOwnerApplicationCard).join("")}
              </div>
            </div>
          `
              : `
            <div class="dashboard-section">
              <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>No applications yet</h3>
                <p class="muted">When partners apply to your listings, they'll appear here.</p>
                <a href="#create-listing" data-nav="create-listing" class="btn btn-primary">Create Your First Listing</a>
              </div>
            </div>
          `
          }

          <div class="dashboard-section">
            <div class="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div class="quick-actions">
              <a href="#create-listing" data-nav="create-listing" class="action-card">
                <div class="action-icon">➕</div>
                <div class="action-content">
                  <h4>Create New Listing</h4>
                  <p class="muted">Post a new partnership opportunity</p>
                </div>
              </a>
              <a href="#explore" data-nav="explore" class="action-card">
                <div class="action-icon">🔍</div>
                <div class="action-content">
                  <h4>Browse Partners</h4>
                  <p class="muted">Find professionals to collaborate with</p>
                </div>
              </a>
              <a href="#messages" data-nav="messages" class="action-card">
                <div class="action-icon">💬</div>
                <div class="action-content">
                  <h4>View Messages</h4>
                  <p class="muted">Check your conversations</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderPartnerDashboard() {
    const myApplications = state.applications.filter((app) => app.partnerId === "current-partner")
    const totalApplications = myApplications.length
    const pendingApplications = myApplications.filter((app) => app.status === "pending").length
    const acceptedApplications = myApplications.filter((app) => app.status === "accepted").length
    const unreadMessages = state.messages.filter((m) => m.unread).length

    const allOpportunities = getAllPartnerships()
    const recommendedOpportunities = allOpportunities.slice(0, 3)

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Welcome back, Matthew Anthony!</h2>
            <p class="muted">Here are your recommended opportunities and activity overview.</p>
          </header>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📨</div>
              <div class="stat-value">${totalApplications}</div>
              <div class="stat-label">Applications Sent</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏳</div>
              <div class="stat-value">${pendingApplications}</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-value">${acceptedApplications}</div>
              <div class="stat-label">Accepted</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">💬</div>
              <div class="stat-value">${unreadMessages}</div>
              <div class="stat-label">Unread Messages</div>
            </div>
          </div>

          <div class="dashboard-section">
            <div class="section-header">
              <h3>Recommended for You</h3>
              <a href="#explore" data-nav="explore" class="link-primary">View all opportunities</a>
            </div>
            <div class="grid cards-grid">
              ${recommendedOpportunities.map(renderOpportunityCard).join("")}
            </div>
          </div>

          <div class="dashboard-section">
            <div class="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div class="quick-actions">
              <a href="#explore" data-nav="explore" class="action-card">
                <div class="action-icon">🔍</div>
                <div class="action-content">
                  <h4>Browse Opportunities</h4>
                  <p class="muted">Find businesses looking for partners</p>
                </div>
              </a>
              <a href="#profile" data-nav="profile" class="action-card">
                <div class="action-icon">👤</div>
                <div class="action-content">
                  <h4>Update Profile</h4>
                  <p class="muted">Keep your profile up to date</p>
                </div>
              </a>
              <a href="#messages" data-nav="messages" class="action-card">
                <div class="action-icon">💬</div>
                <div class="action-content">
                  <h4>View Messages</h4>
                  <p class="muted">Check your conversations</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderBusinessOwnerExplorePage() {
    const filtered = filterPartners()

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Find Your Perfect Partner</h2>
            <p class="muted">Browse professionals and companies ready to collaborate with your business.</p>
          </header>

          <form id="filters-form" class="filters" aria-label="Filter partners">
            <div class="filters-row">
              <label>
                <span class="label">Type</span>
                <select id="filter-type" name="type">
                  <option value="">All</option>
                  <option value="person">Individual</option>
                  <option value="company">Company</option>
                </select>
              </label>
              <label>
                <span class="label">Industry</span>
                <select id="filter-industry" name="industry">
                  <option value="">All</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Creative</option>
                  <option>Logistics</option>
                  <option>Marketing</option>
                </select>
              </label>
              <label>
                <span class="label">Location</span>
                <select id="filter-location" name="location">
                  <option value="">All</option>
                  <option>Jakarta</option>
                  <option>Surabaya</option>
                  <option>Bandung</option>
                  <option>Yogyakarta</option>
                  <option>Medan</option>
                  <option>Makassar</option>
                </select>
              </label>
              <label>
                <span class="label">Skill</span>
                <select id="filter-skill" name="skill">
                  <option value="">All</option>
                  <option>Digital Marketing</option>
                  <option>Development</option>
                  <option>Design</option>
                  <option>Business Development</option>
                  <option>Operations</option>
                  <option>Finance</option>
                </select>
              </label>
            </div>
            <div class="filters-row">
              <label class="grow">
                <span class="label">Search</span>
                <input id="filter-search" name="search" type="search" placeholder="Search by name, role, or expertise..." />
              </label>
              <button type="button" id="filters-clear" class="btn btn-ghost">Reset</button>
            </div>
          </form>

          <div class="results-head">
            <div id="results-count" aria-live="polite">${filtered.length} ${filtered.length === 1 ? "result" : "results"}</div>
          </div>

          <div id="results" class="grid cards-grid" aria-live="polite">
            ${filtered.length > 0 ? filtered.map(renderPartnerCard).join("") : '<div class="card">No partners match your filters.</div>'}
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderPartnerCard(partner) {
    const initials = partner.name
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

    const skillChips = partner.skills
      .slice(0, 4)
      .map((s) => `<span class="chip chip--cap">${s}</span>`)
      .join("")
    const expertiseChips = partner.expertise
      .slice(0, 3)
      .map((e) => `<span class="chip chip--need">${e}</span>`)
      .join("")

    const badge =
      partner.type === "person"
        ? `<span class="badge badge--person">Individual</span>`
        : `<span class="badge badge--company">Company</span>`

    const rating = `<span aria-label="rating">★ ${partner.rating.toFixed(1)}</span>`

    return `
      <article class="card partner-card">
        <div class="partner-header">
          <div class="avatar" aria-hidden="true">${initials}</div>
          <div class="partner-info">
            <h3>${partner.name} ${badge}</h3>
            <div class="meta muted">${partner.role || partner.industry}</div>
            <div class="meta muted">${partner.location} • ${rating}</div>
          </div>
        </div>
        <p class="partner-bio">${partner.bio}</p>
        <div class="partner-section">
          <h4>Skills</h4>
          <div class="chips">${skillChips}</div>
        </div>
        <div class="partner-section">
          <h4>Expertise</h4>
          <div class="chips">${expertiseChips}</div>
        </div>
        <div class="partner-footer">
          <span class="availability">${partner.availability}</span>
          <button class="btn btn-primary" data-action="contact-partner" data-partner-id="${partner.id}">
            Contact
          </button>
        </div>
      </article>
    `
  }

  function filterPartners() {
    const reorderedPartners = [
      partnerProfiles.find((p) => p.id === "p_keyla"),
      partnerProfiles.find((p) => p.id === "p_putri"),
      partnerProfiles.find((p) => p.id === "p_nathanael"),
      ...partnerProfiles.filter((p) => !["p_keyla", "p_putri", "p_nathanael"].includes(p.id)),
    ]

    return reorderedPartners.filter((p) => {
      const typeMatch = !state.filters.type || p.type === state.filters.type
      const industryMatch = !state.filters.industry || p.industry === state.filters.industry
      const locationMatch = !state.filters.location || p.location === state.filters.location
      const skillMatch =
        !state.filters.skill ||
        p.skills.some((s) => s.toLowerCase().includes(state.filters.skill.toLowerCase())) ||
        p.expertise.some((e) => e.toLowerCase().includes(state.filters.skill.toLowerCase()))
      const searchMatch =
        !state.filters.search ||
        p.name.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        (p.role && p.role.toLowerCase().includes(state.filters.search.toLowerCase())) ||
        p.bio.toLowerCase().includes(state.filters.search.toLowerCase()) ||
        p.skills.some((s) => s.toLowerCase().includes(state.filters.search.toLowerCase())) ||
        p.expertise.some((e) => e.toLowerCase().includes(state.filters.search.toLowerCase()))

      return typeMatch && industryMatch && locationMatch && skillMatch && searchMatch
    })
  }

  function renderPartnerExplorePage() {
    const filtered = filterOpportunities()

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Discover Business Opportunities</h2>
            <p class="muted">Find businesses looking for partners with your expertise and skills.</p>
          </header>

          <form id="partner-filters-form" class="filters" aria-label="Filter opportunities">
            <div class="filters-row">
              <label>
                <span class="label">Industry</span>
                <select id="partner-filter-industry" name="industry">
                  <option value="">All</option>
                  <option>Technology</option>
                  <option>Finance</option>
                  <option>Food & Beverage</option>
                  <option>Creative</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Retail</option>
                </select>
              </label>
              <label>
                <span class="label">Location</span>
                <select id="partner-filter-location" name="location">
                  <option value="">All</option>
                  <option>Jakarta</option>
                  <option>Surabaya</option>
                  <option>Bandung</option>
                  <option>Yogyakarta</option>
                  <option>Medan</option>
                  <option>Makassar</option>
                </select>
              </label>
              <label>
                <span class="label">Partnership Type</span>
                <select id="partner-filter-type" name="partnershipType">
                  <option value="">All</option>
                  <option>Co-founder</option>
                  <option>Strategic Partner</option>
                  <option>Investor</option>
                  <option>Service Provider</option>
                  <option>Distribution Partner</option>
                  <option>Technology Partner</option>
                </select>
              </label>
              <label>
                <span class="label">Budget</span>
                <select id="partner-filter-budget" name="budget">
                  <option value="">All</option>
                  <option>Under $10k</option>
                  <option>$10k - $50k</option>
                  <option>$50k - $100k</option>
                  <option>$100k - $500k</option>
                  <option>$500k+</option>
                  <option>Equity-based</option>
                  <option>Revenue share</option>
                </select>
              </label>
            </div>
            <div class="filters-row">
              <label class="grow">
                <span class="label">Search</span>
                <input id="partner-filter-search" name="search" type="search" placeholder="Search by business name, description, or expertise..." />
              </label>
              <button type="button" id="partner-filters-clear" class="btn btn-ghost">Reset</button>
            </div>
          </form>

          <div class="results-head">
            <div id="results-count" aria-live="polite">${filtered.length} ${filtered.length === 1 ? "opportunity" : "opportunities"}</div>
          </div>

          <div id="results" class="grid cards-grid" aria-live="polite">
            ${filtered.length > 0 ? filtered.map(renderOpportunityCard).join("") : '<div class="card">No opportunities match your filters.</div>'}
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderOpportunityCard(opportunity) {
    const initials = opportunity.businessName
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()

    const expertiseChips = opportunity.requiredExpertise
      .slice(0, 4)
      .map((e) => `<span class="chip chip--need">${e}</span>`)
      .join("")

    const hasApplied = state.applications.some(
      (app) => app.opportunityId === opportunity.id && app.partnerId === "current-partner",
    )

    return `
      <article class="card opportunity-card">
        <div class="partner-header">
          <div class="avatar" aria-hidden="true">${initials}</div>
          <div class="partner-info">
            <h3>${opportunity.businessName}</h3>
            <div class="meta muted">${opportunity.industry} • ${opportunity.location}</div>
            <div class="meta muted">
              <span class="badge badge--company">${opportunity.partnershipType}</span>
              ${opportunity.budget ? `<span style="margin-left: 0.5rem">${opportunity.budget}</span>` : ""}
            </div>
          </div>
        </div>
        <p class="partner-bio">${opportunity.description}</p>
        <div class="partner-section">
          <h4>Required Expertise</h4>
          <div class="chips">${expertiseChips}</div>
        </div>
        <div class="partner-section">
          <h4>Objectives</h4>
          <p class="objectives-text">${opportunity.objectives}</p>
        </div>
        <div class="partner-footer">
          <div class="opportunity-meta">
            ${opportunity.timeline ? `<span class="muted">Timeline: ${opportunity.timeline}</span>` : ""}
          </div>
          ${
            hasApplied
              ? `<button class="btn btn-ghost" disabled>Applied</button>`
              : `<button class="btn btn-primary" data-action="apply-opportunity" data-opportunity-id="${opportunity.id}">
              Apply Now
            </button>`
          }
        </div>
      </article>
    `
  }

  function filterOpportunities() {
    const allOpportunities = getAllPartnerships()
    return allOpportunities.filter((opp) => {
      const industryMatch = !state.partnerFilters.industry || opp.industry === state.partnerFilters.industry
      const locationMatch = !state.partnerFilters.location || opp.location === state.partnerFilters.location
      const typeMatch =
        !state.partnerFilters.partnershipType || opp.partnershipType === state.partnerFilters.partnershipType
      const budgetMatch = !state.partnerFilters.budget || opp.budget === state.partnerFilters.budget
      const searchMatch =
        !state.partnerFilters.search ||
        opp.businessName.toLowerCase().includes(state.partnerFilters.search.toLowerCase()) ||
        opp.description.toLowerCase().includes(state.partnerFilters.search.toLowerCase()) ||
        opp.objectives.toLowerCase().includes(state.partnerFilters.search.toLowerCase()) ||
        opp.requiredExpertise.some((e) => e.toLowerCase().includes(state.partnerFilters.search.toLowerCase()))

      return industryMatch && locationMatch && typeMatch && budgetMatch && searchMatch
    })
  }

  function renderCreateListingPage() {
    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Create Partnership Listing</h2>
            <p class="muted">Describe your business opportunity and attract the right partners.</p>
          </header>

          <div class="wizard">
            <form id="listing-form" class="listing-form">
              <div class="form-section">
                <h3>Business Information</h3>
                <div class="grid form-grid">
                  <label class="grow">
                    <span class="label">Business Name *</span>
                    <input type="text" id="business-name" name="businessName" placeholder="e.g., TechStart Inc" required />
                  </label>
                  <label>
                    <span class="label">Industry *</span>
                    <select id="industry" name="industry" required>
                      <option value="">Select industry</option>
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>Food & Beverage</option>
                      <option>Retail</option>
                      <option>Logistics</option>
                      <option>Creative</option>
                      <option>Healthcare</option>
                      <option>Education</option>
                    </select>
                  </label>
                  <label>
                    <span class="label">Location *</span>
                    <select id="location" name="location" required>
                      <option value="">Select location</option>
                      <option>San Francisco</option>
                      <option>New York</option>
                      <option>Austin</option>
                      <option>Chicago</option>
                      <option>Seattle</option>
                      <option>Boston</option>
                      <option>Los Angeles</option>
                      <option>Remote</option>
                    </select>
                  </label>
                  <label class="grow">
                    <span class="label">Website (optional)</span>
                    <input type="url" id="website" name="website" placeholder="https://example.com" />
                  </label>
                </div>
                <label class="block">
                  <span class="label">Business Description *</span>
                  <textarea id="description" name="description" rows="4" placeholder="Describe your business, target market, and current stage..." required></textarea>
                </label>
              </div>

              <div class="form-section">
                <h3>Partnership Details</h3>
                <label class="block">
                  <span class="label">Partnership Type *</span>
                  <select id="partnership-type" name="partnershipType" required>
                    <option value="">Select type</option>
                    <option>Co-founder</option>
                    <option>Strategic Partner</option>
                    <option>Investor</option>
                    <option>Service Provider</option>
                    <option>Distribution Partner</option>
                    <option>Technology Partner</option>
                  </select>
                </label>
                <label class="block">
                  <span class="label">Required Expertise *</span>
                  <input type="text" id="required-expertise" name="requiredExpertise" placeholder="e.g., Marketing, Sales, Product Development (comma-separated)" required />
                  <span class="hint">Enter skills separated by commas</span>
                </label>
                <div class="grid form-grid">
                  <label>
                    <span class="label">Budget Range</span>
                    <select id="budget" name="budget">
                      <option value="">Select budget</option>
                      <option>Under $10k</option>
                      <option>$10k - $50k</option>
                      <option>$50k - $100k</option>
                      <option>$100k - $500k</option>
                      <option>$500k+</option>
                      <option>Equity-based</option>
                      <option>Revenue share</option>
                    </select>
                  </label>
                  <label>
                    <span class="label">Timeline</span>
                    <select id="timeline" name="timeline">
                      <option value="">Select timeline</option>
                      <option>Immediate</option>
                      <option>1-3 months</option>
                      <option>3-6 months</option>
                      <option>6-12 months</option>
                      <option>Long-term</option>
                    </select>
                  </label>
                </div>
                <label class="block">
                  <span class="label">Partnership Objectives *</span>
                  <textarea id="objectives" name="objectives" rows="5" placeholder="What do you hope to achieve with this partnership? What value can you offer?" required></textarea>
                </label>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-ghost" data-action="cancel-listing">Cancel</button>
                <button type="submit" class="btn btn-primary">Publish Listing</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderBusinessOwnerProfilePage() {
    const existingListings = state.partnerships.filter((p) => p.ownerId === "current-user")
    const listingApplications = state.applications.filter((app) =>
      existingListings.some((listing) => listing.id === app.opportunityId),
    )

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Company Profile</h2>
            <p class="muted">Your company information and partnership listings.</p>
          </header>

          <div class="card profile-preview">
            <div class="partner-header">
              <div class="avatar" aria-hidden="true">${placeholderBusinessOwner.companyName
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}</div>
              <div class="partner-info">
                <h3>${placeholderBusinessOwner.companyName} <span class="badge badge--company">Company</span></h3>
                <div class="meta muted">${placeholderBusinessOwner.industry} • ${placeholderBusinessOwner.location}</div>
                ${placeholderBusinessOwner.website ? `<div class="meta"><a href="${placeholderBusinessOwner.website}" target="_blank" rel="noopener" class="portfolio-link">${placeholderBusinessOwner.website}</a></div>` : ""}
              </div>
            </div>
            <p class="partner-bio">${placeholderBusinessOwner.description}</p>
            <div class="profile-stats">
              <div class="profile-stat">
                <div class="stat-label">Founded</div>
                <div class="stat-value">${placeholderBusinessOwner.founded}</div>
              </div>
              <div class="profile-stat">
                <div class="stat-label">Team Size</div>
                <div class="stat-value">${placeholderBusinessOwner.teamSize}</div>
              </div>
              <div class="profile-stat">
                <div class="stat-label">Revenue</div>
                <div class="stat-value">${placeholderBusinessOwner.revenue}</div>
              </div>
            </div>
            <div class="partner-footer">
              <button class="btn btn-primary" data-action="edit-company-profile">Edit Profile</button>
            </div>
          </div>

          ${
            listingApplications.length > 0
              ? `
            <div class="applications-section">
              <h3>Applications Received</h3>
              <div class="grid cards-grid">
                ${listingApplications.map(renderBusinessOwnerApplicationCard).join("")}
              </div>
            </div>
          `
              : ""
          }

          ${
            existingListings.length > 0
              ? `
            <div class="existing-listings">
              <h3>Your Listings</h3>
              <div class="grid cards-grid">
                ${existingListings.map(renderListingCard).join("")}
              </div>
            </div>
          `
              : `
            <div class="empty-state">
              <div class="empty-icon">📋</div>
              <h3>No listings yet</h3>
              <p class="muted">Create your first partnership listing to start connecting with partners.</p>
              <a href="#create-listing" data-nav="create-listing" class="btn btn-primary">Create Listing</a>
            </div>
          `
          }
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderBusinessOwnerApplicationCard(application) {
    const opportunity = getAllPartnerships().find((o) => o.id === application.opportunityId)
    const statusBadge =
      application.status === "pending"
        ? "badge--pending"
        : application.status === "accepted"
          ? "badge--accepted"
          : "badge--rejected"

    return `
      <article class="card application-card">
        <div class="application-header">
          <div>
            <h3>Application for ${opportunity?.businessName || "Unknown Listing"}</h3>
            <div class="meta muted">Applied ${new Date(application.appliedAt).toLocaleDateString()}</div>
          </div>
          <span class="badge ${statusBadge}">
            ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </span>
        </div>
        ${application.message ? `<p class="application-message">${application.message}</p>` : ""}
        ${application.portfolio ? `<div class="meta"><strong>Portfolio:</strong> <a href="${application.portfolio}" target="_blank" rel="noopener">${application.portfolio}</a></div>` : ""}
        ${
          application.status === "pending"
            ? `
          <div class="application-actions">
            <button class="btn btn-primary" data-action="accept-application" data-application-id="${application.id}">
              Accept
            </button>
            <button class="btn btn-ghost" data-action="reject-application" data-application-id="${application.id}">
              Reject
            </button>
          </div>
        `
            : ""
        }
      </article>
    `
  }

  function renderListingCard(listing) {
    const expertiseChips = listing.requiredExpertise
      .slice(0, 4)
      .map((e) => `<span class="chip chip--need">${e}</span>`)
      .join("")

    const applicationCount = state.applications.filter((app) => app.opportunityId === listing.id).length

    return `
      <article class="card listing-card">
        <div class="listing-header">
          <h3>${listing.businessName}</h3>
          <span class="badge badge--company">${listing.partnershipType}</span>
        </div>
        <div class="meta muted">${listing.industry} • ${listing.location}</div>
        <p class="listing-description">${listing.description}</p>
        <div class="partner-section">
          <h4>Required Expertise</h4>
          <div class="chips">${expertiseChips}</div>
        </div>
        <div class="listing-footer">
          <div class="listing-stats">
            <span class="muted">${applicationCount} ${applicationCount === 1 ? "application" : "applications"}</span>
          </div>
          <div class="listing-actions">
            <button class="btn btn-ghost" data-action="edit-listing" data-listing-id="${listing.id}">Edit</button>
            <button class="btn btn-ghost" data-action="delete-listing" data-listing-id="${listing.id}">Delete</button>
          </div>
        </div>
      </article>
    `
  }

  function renderExplorePage() {
    if (state.userRole === "business-owner") {
      return renderBusinessOwnerExplorePage()
    } else {
      return renderPartnerExplorePage()
    }
  }

  function renderPartnerProfilePage() {
    const profile = state.userProfile || placeholderPartner
    const skillChips = (profile.skills || []).map((s) => `<span class="chip chip--cap">${s}</span>`).join("")
    const expertiseChips = (profile.expertise || []).map((e) => `<span class="chip chip--need">${e}</span>`).join("")

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Your Profile</h2>
            <p class="muted">This is how business owners will see your profile.</p>
          </header>

          <div class="card profile-preview">
            <div class="partner-header">
              <div class="avatar" aria-hidden="true">${profile.name
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}</div>
              <div class="partner-info">
                <h3>${profile.name} <span class="badge badge--person">Individual</span></h3>
                <div class="meta muted">${profile.role || "Professional"}</div>
                <div class="meta muted">${profile.industry} • ${profile.location}</div>
              </div>
            </div>
            <p class="partner-bio">${profile.bio}</p>
            
            <div class="profile-stats">
              <div class="profile-stat">
                <div class="stat-label">Experience</div>
                <div class="stat-value">${profile.yearsExperience || "N/A"}</div>
              </div>
              <div class="profile-stat">
                <div class="stat-label">Projects</div>
                <div class="stat-value">${profile.projectsCompleted || "N/A"}</div>
              </div>
              <div class="profile-stat">
                <div class="stat-label">Status</div>
                <div class="stat-value">${profile.availability || "Available"}</div>
              </div>
            </div>

            ${
              profile.skills && profile.skills.length > 0
                ? `
              <div class="partner-section">
                <h4>Skills</h4>
                <div class="chips">${skillChips}</div>
              </div>
            `
                : ""
            }
            ${
              profile.expertise && profile.expertise.length > 0
                ? `
              <div class="partner-section">
                <h4>Expertise</h4>
                <div class="chips">${expertiseChips}</div>
              </div>
            `
                : ""
            }
            ${
              profile.portfolio
                ? `
              <div class="partner-section">
                <h4>Portfolio</h4>
                <a href="${profile.portfolio}" target="_blank" rel="noopener" class="portfolio-link">${profile.portfolio}</a>
              </div>
            `
                : ""
            }
            <div class="partner-footer">
              <button class="btn btn-primary" data-action="edit-profile">Edit Profile</button>
            </div>
          </div>

          ${
            state.applications.length > 0
              ? `
            <div class="applications-section">
              <h3>Your Applications</h3>
              <div class="grid cards-grid">
                ${state.applications.map(renderApplicationCard).join("")}
              </div>
            </div>
          `
              : `
            <div class="empty-state">
              <div class="empty-icon">📭</div>
              <h3>No applications yet</h3>
              <p class="muted">Start applying to partnership opportunities to see them here.</p>
              <a href="#explore" data-nav="explore" class="btn btn-primary">Browse Opportunities</a>
            </div>
          `
          }
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderApplicationCard(application) {
    return `
      <article class="card application-card">
        <div class="application-header">
          <h3>${application.businessName}</h3>
          <span class="badge ${application.status === "pending" ? "badge--pending" : application.status === "accepted" ? "badge--accepted" : "badge--rejected"}">
            ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </span>
        </div>
        <div class="meta muted">Applied ${new Date(application.appliedAt).toLocaleDateString()}</div>
        <div class="application-footer">
          <button class="btn btn-ghost" data-action="view-opportunity" data-opportunity-id="${application.opportunityId}">
            View Opportunity
          </button>
        </div>
      </article>
    `
  }

  function getTimeAgo(timestamp) {
    const now = new Date()
    const date = new Date(timestamp)
    const secondsPast = (now - date) / 1000

    if (secondsPast < 60) {
      return `${Math.floor(secondsPast)}s ago`
    }
    if (secondsPast < 3600) {
      return `${Math.floor(secondsPast / 60)}m ago`
    }
    if (secondsPast <= 86400) {
      return `${Math.floor(secondsPast / 3600)}h ago`
    }
    if (secondsPast > 86400) {
      const days = Math.floor(secondsPast / 86400)
      return days === 1 ? "1d ago" : `${days}d ago`
    }
  }

  function renderMessagesPage() {
    const conversations = state.messages.length > 0 ? state.messages : sampleMessages

    return `
      ${renderHeader()}
      <main class="section" role="main">
        <div class="container">
          <header class="section-head">
            <h2 class="text-balance">Messages</h2>
            <p class="muted">Communicate with your partners and business owners.</p>
          </header>

          ${
            conversations.length > 0
              ? `
            <div class="messages-container">
              <div class="conversations-list">
                ${conversations.map(renderConversationCard).join("")}
              </div>
            </div>
          `
              : `
            <div class="empty-state">
              <div class="empty-icon">💬</div>
              <h3>No messages yet</h3>
              <p class="muted">When you connect with partners or business owners, your conversations will appear here.</p>
              <a href="#explore" data-nav="explore" class="btn btn-primary">Start Exploring</a>
            </div>
          `
          }
        </div>
      </main>
      ${renderFooter()}
    `
  }

  function renderConversationCard(conversation) {
    const timeAgo = getTimeAgo(conversation.timestamp)

    return `
      <article class="card conversation-card ${conversation.unread ? "unread" : ""}" data-action="open-chat" data-conversation-id="${conversation.id}">
        <div class="conversation-header">
          <div class="avatar" aria-hidden="true">${conversation.otherParty
            .split(" ")
            .map((s) => s[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}</div>
          <div class="conversation-info">
            <h3>${conversation.otherParty}</h3>
            <div class="meta muted">Re: ${conversation.listingName}</div>
          </div>
          ${conversation.unread ? '<div class="unread-indicator"></div>' : ""}
        </div>
        <p class="conversation-preview">${conversation.lastMessage}</p>
        <div class="conversation-timestamp">${timeAgo}</div>
      </article>
    `
  }

  function renderChatBox(conversation) {
    const messages = conversation.messages || [
      {
        id: "msg1",
        sender: conversation.otherParty,
        text: conversation.lastMessage,
        timestamp: conversation.timestamp,
        isOwn: false,
      },
    ]

    const messagesHtml = messages
      .map(
        (msg) => `
      <div class="chat-message ${msg.isOwn ? "own" : "other"}">
        <div class="message-content">
          <p>${msg.text}</p>
          <span class="message-time">${new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    `,
      )
      .join("")

    return `
      <div class="chat-overlay" id="chat-overlay" data-action="close-chat">
        <div class="chat-box" data-action="prevent-close">
          <div class="chat-header">
            <div class="chat-header-info">
              <div class="avatar" aria-hidden="true">${conversation.otherParty
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}</div>
              <div>
                <h3>${conversation.otherParty}</h3>
                <p class="muted">${conversation.listingName}</p>
              </div>
            </div>
            <button class="chat-close" data-action="close-chat" aria-label="Close chat">&times;</button>
          </div>
          <div class="chat-messages" id="chat-messages">
            ${messagesHtml}
          </div>
          <div class="chat-input-area">
            <form id="chat-form" class="chat-form">
              <input type="text" id="chat-input" placeholder="Type your message..." required />
              <button type="submit" class="btn btn-primary" aria-label="Send message">Send</button>
            </form>
          </div>
        </div>
      </div>
    `
  }

  function handleOpenChat(conversationId) {
    const conversation =
      state.messages.find((m) => m.id === conversationId) || sampleMessages.find((m) => m.id === conversationId)
    if (!conversation) return

    if (conversation.unread) {
      conversation.unread = false
      localStorage.setItem("collabify_messages", JSON.stringify(state.messages))
    }

    const app = $("#app")
    const chatHtml = renderChatBox(conversation)
    app.insertAdjacentHTML("afterend", chatHtml)
    addChatEventListeners(conversation)
  }

  function addChatEventListeners(conversation) {
    const overlay = $("#chat-overlay")
    const chatForm = $("#chat-form")
    const chatInput = $("#chat-input")
    const chatMessages = $("#chat-messages")

    if (!overlay) return

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeChat()
      }
    })

    $$(".chat-close").forEach((btn) => {
      btn.addEventListener("click", closeChat)
    })

    $$("[data-action='prevent-close']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    })

    if (chatForm) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const messageText = chatInput.value.trim()
        if (!messageText) return

        if (!conversation.messages) {
          conversation.messages = []
        }

        const newMessage = {
          id: `msg${Date.now()}`,
          sender: "You",
          text: messageText,
          timestamp: new Date().toISOString(),
          isOwn: true,
        }

        conversation.messages.push(newMessage)
        conversation.lastMessage = messageText
        conversation.timestamp = new Date().toISOString()

        const messageIndex = state.messages.findIndex((m) => m.id === conversation.id)
        if (messageIndex > -1) {
          state.messages[messageIndex] = conversation
        }
        localStorage.setItem("collabify_messages", JSON.stringify(state.messages))

        const messageHtml = `
          <div class="chat-message own">
            <div class="message-content">
              <p>${messageText}</p>
              <span class="message-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
        `
        chatMessages.insertAdjacentHTML("beforeend", messageHtml)
        chatInput.value = ""
        chatMessages.scrollTop = chatMessages.scrollHeight

        setTimeout(() => {
          const replyMessage = {
            id: `msg${Date.now()}`,
            sender: conversation.otherParty,
            text: "Thanks for your message! I'll get back to you soon.",
            timestamp: new Date().toISOString(),
            isOwn: false,
          }
          conversation.messages.push(replyMessage)
          const replyHtml = `
            <div class="chat-message other">
              <div class="message-content">
                <p>${replyMessage.text}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          `
          chatMessages.insertAdjacentHTML("beforeend", replyHtml)
          chatMessages.scrollTop = chatMessages.scrollHeight
        }, 1000)
      })
    }
  }

  function closeChat() {
    const overlay = $("#chat-overlay")
    if (overlay) {
      overlay.remove()
    }
  }

  function handleLogin(role) {
    state.userRole = role
    localStorage.setItem("collabify_role", role)
    if (role === "partner") {
      state.userProfile = placeholderPartner
      localStorage.setItem("collabify_profile", JSON.stringify(state.userProfile))
    }
    navigate("dashboard")
  }

  function handleLogout() {
    state.userRole = null
    state.userProfile = null
    state.partnerships = []
    state.applications = []
    state.messages = []
    localStorage.removeItem("collabify_role")
    localStorage.removeItem("collabify_profile")
    localStorage.removeItem("collabify_partnerships")
    localStorage.removeItem("collabify_applications")
    localStorage.removeItem("collabify_messages")
    navigate("home")
  }

  function handleSelectRole(role) {
    handleLogin(role)
  }

  function handleCreateListingSubmit(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const newListing = {
      id: `opp${Date.now()}`,
      ownerId: "current-user",
      createdAt: new Date().toISOString(),
      ...Object.fromEntries(formData.entries()),
    }

    newListing.requiredExpertise = newListing.requiredExpertise
      .split(",")
      .map((exp) => exp.trim())
      .filter(Boolean)

    state.partnerships.push(newListing)
    localStorage.setItem("collabify_partnerships", JSON.stringify(state.partnerships))
    alert("Listing created successfully!")
    navigate("profile")
  }

  function handleApplyOpportunity(opportunityId) {
    const opportunity = getAllPartnerships().find((o) => o.id === opportunityId)
    if (!opportunity) return

    const application = {
      id: `app${Date.now()}`,
      opportunityId: opportunityId,
      businessName: opportunity.businessName,
      partnerId: "current-partner",
      appliedAt: new Date().toISOString(),
      status: "pending",
      message: "I'm very interested in this opportunity and believe my skills align well.",
      portfolio: "https://example.com/myportfolio",
    }
    state.applications.push(application)
    localStorage.setItem("collabify_applications", JSON.stringify(state.applications))
    alert("Application submitted successfully!")
    render()
  }

  function handleAcceptApplication(applicationId) {
    const applicationIndex = state.applications.findIndex((app) => app.id === applicationId)
    if (applicationIndex > -1) {
      state.applications[applicationIndex].status = "accepted"
      const newMessage = {
        id: `msg${Date.now()}`,
        conversationId: `conv${Date.now()}`,
        listingId: state.applications[applicationIndex].opportunityId,
        otherParty: "Applicant Name",
        lastMessage: `Congratulations! We'd like to accept your application for ${state.applications[applicationIndex].businessName}. Let's schedule a call.`,
        timestamp: new Date().toISOString(),
        unread: true,
      }
      state.messages.push(newMessage)

      localStorage.setItem("collabify_applications", JSON.stringify(state.applications))
      localStorage.setItem("collabify_messages", JSON.stringify(state.messages))
      render()
    }
  }

  function handleRejectApplication(applicationId) {
    const applicationIndex = state.applications.findIndex((app) => app.id === applicationId)
    if (applicationIndex > -1) {
      state.applications[applicationIndex].status = "rejected"
      localStorage.setItem("collabify_applications", JSON.stringify(state.applications))
      render()
    }
  }

  function handleContactPartner(partnerId) {
    alert(`Initiating contact with partner ${partnerId}...`)
    const partner = partnerProfiles.find((p) => p.id === partnerId)
    const newMessage = {
      id: `msg${Date.now()}`,
      conversationId: `conv${Date.now()}`,
      listingId: null,
      otherParty: partner?.name || "Partner",
      lastMessage: "Hello! I saw your profile and wanted to connect.",
      timestamp: new Date().toISOString(),
      unread: true,
    }
    state.messages.push(newMessage)
    localStorage.setItem("collabify_messages", JSON.stringify(state.messages))
    navigate("messages")
  }

  function handleEditProfile() {
    openModal("edit-profile")
  }

  function handleEditCompanyProfile() {
    openModal("edit-company")
  }

  function handleDeleteListing(listingId) {
    if (confirm("Are you sure you want to delete this listing?")) {
      state.partnerships = state.partnerships.filter((listing) => listing.id !== listingId)
      state.applications = state.applications.filter((app) => app.opportunityId !== listingId)
      localStorage.setItem("collabify_partnerships", JSON.stringify(state.partnerships))
      localStorage.setItem("collabify_applications", JSON.stringify(state.applications))
      render()
    }
  }

  function handleCancelListing() {
    navigate("profile")
  }

  function render() {
    const pageElement = $("#app")
    let html = ""

    switch (state.currentPage) {
      case "home":
        html = renderHomePage()
        break
      case "dashboard":
        html = renderDashboardPage()
        break
      case "explore":
        html = renderExplorePage()
        break
      case "create-listing":
        html = renderCreateListingPage()
        break
      case "profile":
        if (state.userRole === "business-owner") {
          html = renderBusinessOwnerProfilePage()
        } else {
          html = renderPartnerProfilePage()
        }
        break
      case "messages":
        html = renderMessagesPage()
        break
      default:
        html = renderHomePage()
    }

    pageElement.innerHTML = html
    addEventListeners()
  }

  function addEventListeners() {
    $$("a[data-nav]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault()
        const page = el.dataset.nav
        navigate(page)
      })
    })

    $$("[data-action]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const action = el.dataset.action
        const role = el.dataset.role
        const partnerId = el.dataset.partnerId
        const opportunityId = el.dataset.opportunityId
        const applicationId = el.dataset.applicationId
        const listingId = el.dataset.listingId
        const conversationId = el.dataset.conversationId

        if (action === "select-role") {
          handleSelectRole(role)
        } else if (action === "logout") {
          handleLogout()
        } else if (action === "create-listing") {
          navigate("create-listing")
        } else if (action === "edit-profile") {
          handleEditProfile()
        } else if (action === "edit-company-profile") {
          handleEditCompanyProfile()
        } else if (action === "contact-partner") {
          handleContactPartner(partnerId)
        } else if (action === "apply-opportunity") {
          handleApplyOpportunity(opportunityId)
        } else if (action === "accept-application") {
          handleAcceptApplication(applicationId)
        } else if (action === "reject-application") {
          handleRejectApplication(applicationId)
        } else if (action === "delete-listing") {
          handleDeleteListing(listingId)
        } else if (action === "cancel-listing") {
          handleCancelListing()
        } else if (action === "view-opportunity") {
          alert(`Viewing opportunity ${opportunityId}...`)
        } else if (action === "open-chat") {
          handleOpenChat(conversationId)
        } else if (action === "close-chat") {
          closeChat()
        }
      })
    })

    // Business Owner Filter Form
    const filtersForm = $("#filters-form")
    if (filtersForm) {
      filtersForm.querySelectorAll("select, input[type='search']").forEach((el) => {
        el.addEventListener("change", (e) => {
          state.filters[el.name] = el.value
          render()
        })
        el.addEventListener("input", (e) => {
          state.filters[el.name] = el.value
          render()
        })
      })
    }

    // Partner Filter Form
    const partnerFiltersForm = $("#partner-filters-form")
    if (partnerFiltersForm) {
      partnerFiltersForm.querySelectorAll("select, input[type='search']").forEach((el) => {
        el.addEventListener("change", (e) => {
          state.partnerFilters[el.name] = el.value
          render()
        })
        el.addEventListener("input", (e) => {
          state.partnerFilters[el.name] = el.value
          render()
        })
      })
    }

    $("#filters-clear")?.addEventListener("click", () => {
      state.filters = { type: "", industry: "", location: "", skill: "", search: "" }
      filtersForm?.querySelectorAll("input, select").forEach((el) => (el.value = ""))
      render()
    })

    $("#partner-filters-clear")?.addEventListener("click", () => {
      state.partnerFilters = { industry: "", location: "", partnershipType: "", budget: "", search: "" }
      partnerFiltersForm?.querySelectorAll("input, select").forEach((el) => (el.value = ""))
      render()
    })

    $("#listing-form")?.addEventListener("submit", handleCreateListingSubmit)
  }

  function renderEditProfileModal() {
    const profile = state.userProfile || placeholderPartner
    const skillsStr = (profile.skills || []).join(", ")
    const expertiseStr = (profile.expertise || []).join(", ")

    return `
      <div class="modal-overlay" id="edit-profile-modal" data-action="close-modal">
        <div class="modal" data-action="prevent-close">
          <div class="modal-header">
            <h3>Edit Profile</h3>
            <button class="modal-close" data-action="close-modal" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            <form id="edit-profile-form">
              <label class="block">
                <span class="label">Name *</span>
                <input type="text" id="profile-name" name="name" value="${profile.name}" required />
              </label>
              <label class="block">
                <span class="label">Role *</span>
                <input type="text" id="profile-role" name="role" value="${profile.role || ""}" required />
              </label>
              <label class="block">
                <span class="label">Industry *</span>
                <input type="text" id="profile-industry" name="industry" value="${profile.industry || ""}" required />
              </label>
              <label class="block">
                <span class="label">Location *</span>
                <input type="text" id="profile-location" name="location" value="${profile.location || ""}" required />
              </label>
              <label class="block">
                <span class="label">Bio *</span>
                <textarea id="profile-bio" name="bio" rows="4" required>${profile.bio || ""}</textarea>
              </label>
              <label class="block">
                <span class="label">Skills (comma-separated)</span>
                <input type="text" id="profile-skills" name="skills" value="${skillsStr}" placeholder="e.g., React, Node.js, AWS" />
              </label>
              <label class="block">
                <span class="label">Expertise (comma-separated)</span>
                <input type="text" id="profile-expertise" name="expertise" value="${expertiseStr}" placeholder="e.g., Web Development, Product Strategy" />
              </label>
              <label class="block">
                <span class="label">Portfolio URL</span>
                <input type="url" id="profile-portfolio" name="portfolio" value="${profile.portfolio || ""}" placeholder="https://example.com" />
              </label>
              <label class="block">
                <span class="label">Years of Experience</span>
                <input type="text" id="profile-years" name="yearsExperience" value="${profile.yearsExperience || ""}" placeholder="e.g., 10+" />
              </label>
              <label class="block">
                <span class="label">Projects Completed</span>
                <input type="text" id="profile-projects" name="projectsCompleted" value="${profile.projectsCompleted || ""}" placeholder="e.g., 50+" />
              </label>
              <label class="block">
                <span class="label">Availability</span>
                <input type="text" id="profile-availability" name="availability" value="${profile.availability || ""}" placeholder="e.g., Available for projects" />
              </label>
              <div class="modal-actions">
                <button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `
  }

  function renderEditCompanyProfileModal() {
    const company = placeholderBusinessOwner

    return `
      <div class="modal-overlay" id="edit-company-modal" data-action="close-modal">
        <div class="modal" data-action="prevent-close">
          <div class="modal-header">
            <h3>Edit Company Profile</h3>
            <button class="modal-close" data-action="close-modal" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            <form id="edit-company-form">
              <label class="block">
                <span class="label">Company Name *</span>
                <input type="text" id="company-name" name="companyName" value="${company.companyName}" required />
              </label>
              <label class="block">
                <span class="label">Industry *</span>
                <input type="text" id="company-industry" name="industry" value="${company.industry}" required />
              </label>
              <label class="block">
                <span class="label">Location *</span>
                <input type="text" id="company-location" name="location" value="${company.location}" required />
              </label>
              <label class="block">
                <span class="label">Website</span>
                <input type="url" id="company-website" name="website" value="${company.website || ""}" placeholder="https://example.com" />
              </label>
              <label class="block">
                <span class="label">Description *</span>
                <textarea id="company-description" name="description" rows="5" required>${company.description}</textarea>
              </label>
              <label class="block">
                <span class="label">Founded</span>
                <input type="text" id="company-founded" name="founded" value="${company.founded}" placeholder="e.g., 2020" />
              </label>
              <label class="block">
                <span class="label">Team Size</span>
                <input type="text" id="company-team" name="teamSize" value="${company.teamSize}" placeholder="e.g., 50-100" />
              </label>
              <label class="block">
                <span class="label">Revenue</span>
                <input type="text" id="company-revenue" name="revenue" value="${company.revenue}" placeholder="e.g., $5M ARR" />
              </label>
              <div class="modal-actions">
                <button type="button" class="btn btn-ghost" data-action="close-modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `
  }

  function openModal(modalType) {
    const app = $("#app")
    let modalHtml = ""

    if (modalType === "edit-profile") {
      modalHtml = renderEditProfileModal()
    } else if (modalType === "edit-company") {
      modalHtml = renderEditCompanyProfileModal()
    }

    app.insertAdjacentHTML("afterend", modalHtml)
    addModalEventListeners()
  }

  function closeModal() {
    const modal = $(".modal-overlay")
    if (modal) {
      modal.remove()
    }
  }

  function addModalEventListeners() {
    const overlay = $(".modal-overlay")
    if (!overlay) return

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModal()
      }
    })

    $$(".modal-close").forEach((btn) => {
      btn.addEventListener("click", closeModal)
    })

    $$("[data-action='prevent-close']").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation()
      })
    })

    const editProfileForm = $("#edit-profile-form")
    if (editProfileForm) {
      editProfileForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(editProfileForm)
        const updatedProfile = {
          ...state.userProfile,
          name: formData.get("name"),
          role: formData.get("role"),
          industry: formData.get("industry"),
          location: formData.get("location"),
          bio: formData.get("bio"),
          skills: formData
            .get("skills")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          expertise: formData
            .get("expertise")
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean),
          portfolio: formData.get("portfolio"),
          yearsExperience: formData.get("yearsExperience"),
          projectsCompleted: formData.get("projectsCompleted"),
          availability: formData.get("availability"),
        }
        state.userProfile = updatedProfile
        localStorage.setItem("collabify_profile", JSON.stringify(updatedProfile))
        closeModal()
        render()
      })
    }

    const editCompanyForm = $("#edit-company-form")
    if (editCompanyForm) {
      editCompanyForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(editCompanyForm)
        Object.assign(placeholderBusinessOwner, {
          companyName: formData.get("companyName"),
          industry: formData.get("industry"),
          location: formData.get("location"),
          website: formData.get("website"),
          description: formData.get("description"),
          founded: formData.get("founded"),
          teamSize: formData.get("teamSize"),
          revenue: formData.get("revenue"),
        })
        closeModal()
        render()
      })
    }
  }

  function init() {
    const savedRole = localStorage.getItem("collabify_role")
    if (savedRole) {
      state.userRole = savedRole
      if (savedRole === "partner") {
        const savedProfile = localStorage.getItem("collabify_profile")
        if (savedProfile) {
          state.userProfile = JSON.parse(savedProfile)
        }
      }
    }
    render()
  }

  init()
})()
