/*
 * Bibliography of the study section (lab/study/): the published papers of the research line, in chronological order
 * (date available online; when the article prints no online date, the acceptance date). Read by assets/study.js
 * (paper pages: citation, chronological strip, previous and next) and by lab/study/index.html (the timeline).
 *
 * Fields: slug (page and bundle name), date (ISO; the order key), date_kind ("online" | "accepted"),
 * date_precision ("day" | "month": the vaccination article prints only the month of acceptance), year (the citation year,
 * i.e. the volume year printed on the article, which can differ from the year of the date), title (original English title),
 * authors, venue, venue_short, volume_pages, doi, line ("cooperative" | "security" | "stochastic"), href (the study page),
 * ready (true once the study page exists; cards and dots of the other papers are shown without a link).
 *
 * Bibliographic fields are copied from the first page of each article. Two typographic changes follow the site rules
 * (no en or em dashes in visible text): page ranges use a hyphen, and the em dash in the parcel locker title is written
 * as " - " (the freight consolidation title prints a hyphen in the same place).
 */
window.STUDY = {
  papers: [
    {
      slug: "2020-vaccination", date: "2020-03-01", date_kind: "accepted", date_precision: "month", year: 2020,
      title: "Core Allocations for Cooperation Problems in Vaccination",
      authors: ["Lotty E. Westerink-Duijzer", "Loe P. J. Schlicher", "Marieke Musegaas"],
      venue: "Production and Operations Management", venue_short: "POM",
      volume_pages: "29(7), 1720-1737", doi: "10.1111/poms.13184",
      line: "cooperative", href: "2020-vaccination.html", ready: true
    },
    {
      slug: "2021-production-protection", date: "2021-04-18", date_kind: "online", date_precision: "day", year: 2022,
      title: "Stackelberg production-protection games: Defending crop production against intentional attacks",
      authors: ["Marieke Musegaas", "Loe Schlicher", "Herman Blok"],
      venue: "European Journal of Operational Research", venue_short: "EJOR",
      volume_pages: "297, 102-119", doi: "10.1016/j.ejor.2021.04.012",
      line: "security", href: "2021-production-protection.html", ready: true
    },
    {
      slug: "2021-3d-printing", date: "2021-04-30", date_kind: "online", date_precision: "day", year: 2021,
      title: "Using 3D-printing in disaster response: The two-stage stochastic 3D-printing knapsack problem",
      authors: ["Denise D. Tönissen", "Loe Schlicher"],
      venue: "Computers & Operations Research", venue_short: "C&OR",
      volume_pages: "133, 105356", doi: "10.1016/j.cor.2021.105356",
      line: "stochastic", href: "2021-3d-printing.html", ready: true
    },
    {
      slug: "2022-choice-based-pricing", date: "2022-01-31", date_kind: "online", date_precision: "day", year: 2022,
      title: "Stable allocations for choice-based collaborative price setting",
      authors: ["Loe Schlicher", "Virginie Lurkin"],
      venue: "European Journal of Operational Research", venue_short: "EJOR",
      volume_pages: "302, 1242-1254", doi: "10.1016/j.ejor.2022.01.036",
      line: "cooperative", href: "2022-choice-based-pricing.html", ready: true
    },
    {
      slug: "2023-pickpocketing", date: "2023-12-09", date_kind: "online", date_precision: "day", year: 2024,
      title: "Fighting pickpocketing using a choice-based resource allocation model",
      authors: ["Loe Schlicher", "Virginie Lurkin"],
      venue: "European Journal of Operational Research", venue_short: "EJOR",
      volume_pages: "315, 580-595", doi: "10.1016/j.ejor.2023.12.007",
      line: "security", href: "2023-pickpocketing.html", ready: true
    },
    {
      slug: "2023-rapid-response-teams", date: "2023-12-12", date_kind: "accepted", date_precision: "day", year: 2024,
      title: "Fighting terrorism: How to position rapid response teams?",
      authors: ["Lotte van Aken", "Loe Schlicher", "Marco Slikker", "Geert-Jan van Houtum"],
      venue: "Naval Research Logistics", venue_short: "NRL",
      volume_pages: "71(5), 709-727", doi: "10.1002/nav.22170",
      line: "security", href: "2023-rapid-response-teams.html", ready: true
    },
    {
      slug: "2023-streaming-platforms", date: "2023-12-19", date_kind: "online", date_precision: "day", year: 2024,
      title: "Stable streaming platforms: a cooperative game approach",
      authors: ["Loe Schlicher", "Bas Dietzenbacher", "Marieke Musegaas"],
      venue: "Omega", venue_short: "Omega",
      volume_pages: "125, 103020", doi: "10.1016/j.omega.2023.103020",
      line: "cooperative", href: "2023-streaming-platforms.html", ready: true
    },
    {
      slug: "2024-freight-consolidation", date: "2024-07-08", date_kind: "online", date_precision: "day", year: 2024,
      title: "Freight consolidation through carrier collaboration - A cooperative game",
      authors: ["Fabio Mercurio", "Loe Schlicher", "Sonja U.K. Rohmer", "Tom Van Woensel"],
      venue: "Operations Research Letters", venue_short: "ORL",
      volume_pages: "56, 107142", doi: "10.1016/j.orl.2024.107142",
      line: "cooperative", href: "2024-freight-consolidation.html", ready: true
    },
    {
      slug: "2025-protection-location", date: "2025-03-13", date_kind: "online", date_precision: "day", year: 2025,
      title: "Time-dependent Stackelberg protection location games",
      authors: ["Lotte van Aken", "Loe Schlicher", "Marco Slikker"],
      venue: "Operations Research Letters", venue_short: "ORL",
      volume_pages: "60, 107278", doi: "10.1016/j.orl.2025.107278",
      line: "security", href: "2025-protection-location.html", ready: true
    },
    {
      slug: "2025-bodyguards", date: "2025-07-02", date_kind: "accepted", date_precision: "day", year: 2026,
      title: "Scheduling Bodyguards",
      authors: ["Loe Schlicher", "Kyle Y. Lin", "Moshe Kress"],
      venue: "Naval Research Logistics", venue_short: "NRL",
      volume_pages: "73(3), 334-351", doi: "10.1002/nav.70006",
      line: "security", href: "2025-bodyguards.html", ready: true
    },
    {
      slug: "2026-parcel-lockers", date: "2026-06-04", date_kind: "online", date_precision: "day", year: 2026,
      title: "Collaboration in parcel locker networks - A cooperative game for the joint placement of lockers",
      authors: ["Fabio Mercurio", "Loe Schlicher", "Sonja U.K. Rohmer", "Tom Van Woensel"],
      venue: "International Journal of Production Economics", venue_short: "IJPE",
      volume_pages: "300, 110096", doi: "10.1016/j.ijpe.2026.110096",
      line: "cooperative", href: "2026-parcel-lockers.html", ready: true
    }
  ]
};
