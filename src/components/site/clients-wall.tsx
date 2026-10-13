import { getAllSectors, getFeaturedClients } from "@/lib/cms";
import Image from "next/image";

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
            const image = c.hero_image_url ?? sector?.hero_image_url ?? null;

            return (
              <div
                key={c.id}
                className="ue-clients-wall__tile"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  background: "var(--paper)",
                  overflow: "hidden",
                }}
              >
                {image ? (
                  <div className="ue-clients-wall__image">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 33vw, 20vw"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                ) : null}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    minHeight: 30,
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 13,
                    letterSpacing: "-0.012em",
                    color: "var(--ink-950)",
                    flexShrink: 0,
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
