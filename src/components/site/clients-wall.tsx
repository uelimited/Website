import { getAllSectors, getFeaturedClients } from "@/lib/cms";

export function ClientsWall() {
  const clients = getFeaturedClients();
  const sectors = getAllSectors();
  const sectorById = new Map(sectors.map((s) => [s.id, s]));

  return (
    <section className="ue-section">
      <div className="ue-container">
        <header className="ue-clients-wall__head">
          <p className="ue-eyebrow">Trusted by</p>
          <h2
            className="ue-clients-wall__title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.022em",
              lineHeight: 1.1,
              margin: "8px auto 0",
              color: "var(--ink-950)",
              maxWidth: "28ch",
            }}
          >
            Operators across India&apos;s most demanding industries.
          </h2>
        </header>
        <div className="ue-clients-wall__grid">
          {clients.map((c) => {
            const sector = c.primary_sector_id
              ? sectorById.get(c.primary_sector_id)
              : undefined;
            const image = sector?.hero_image_url ?? null;

            return (
              <div
                key={c.id}
                className="ue-clients-wall__tile"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  background: image
                    ? `linear-gradient(180deg, rgba(10,12,16,0.10) 0%, rgba(10,12,16,0.72) 100%), url(${image}) center/cover no-repeat`
                    : "linear-gradient(135deg, rgba(18,92,63,0.10), rgba(15,23,42,0.04))",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.82)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    borderRadius: 999,
                    backdropFilter: "blur(6px)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 13,
                    letterSpacing: "-0.012em",
                    color: "var(--ink-950)",
                  }}
                >
                  {c.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
