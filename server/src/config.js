import "dotenv/config";

export const PORT = Number(process.env.PORT ?? 4000);

export const CLIENT_ORIGINS = (
  process.env.CLIENT_ORIGIN ?? "http://localhost:8080,http://localhost:4173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

export const JWT_SECRET = process.env.JWT_SECRET ?? "dev-only-change-me";
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

if (JWT_SECRET === "dev-only-change-me") {
  console.warn(
    "[config] Using an insecure default JWT secret. Set JWT_SECRET in .env before deploying.",
  );
}
