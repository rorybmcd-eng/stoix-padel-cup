const TOTAL_TEAMS = 16;
const COUNTER_KEY = "registrations";

// Seed the initial count (8 already signed up before the form went live)
const SEED_COUNT = 8;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // GET /count — return current count
    if (request.method === "GET" && url.pathname === "/count") {
      const raw = await env.PADEL_COUNTER.get(COUNTER_KEY);
      const count = raw !== null ? parseInt(raw) : SEED_COUNT;
      const remaining = Math.max(0, TOTAL_TEAMS - count);

      return new Response(
        JSON.stringify({
          total: TOTAL_TEAMS,
          registered: count,
          remaining: remaining,
          percent: Math.round((count / TOTAL_TEAMS) * 100),
          full: remaining === 0,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...CORS_HEADERS,
          },
        }
      );
    }

    // POST /increment — called after successful form submission
    if (request.method === "POST" && url.pathname === "/increment") {
      const raw = await env.PADEL_COUNTER.get(COUNTER_KEY);
      let count = raw !== null ? parseInt(raw) : SEED_COUNT;

      // Don't go over total
      if (count < TOTAL_TEAMS) {
        count += 1;
        await env.PADEL_COUNTER.put(COUNTER_KEY, count.toString());
      }

      const remaining = Math.max(0, TOTAL_TEAMS - count);

      return new Response(
        JSON.stringify({
          total: TOTAL_TEAMS,
          registered: count,
          remaining: remaining,
          percent: Math.round((count / TOTAL_TEAMS) * 100),
          full: remaining === 0,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...CORS_HEADERS,
          },
        }
      );
    }

    return new Response("Not found", { status: 404 });
  },
};
