import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || process.env.murgialiquori_REDIS_URL;

let redis: Redis | null = null;

if (redisUrl) {
  try {
    const options: any = {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      connectTimeout: 5000,
    };

    // If using rediss:// protocol, enable TLS
    if (redisUrl.startsWith("rediss://")) {
      options.tls = { rejectUnauthorized: false };
    }

    redis = new Redis(redisUrl, options);
    console.log("CMS: Redis Client Manifested");
    
    redis.on("error", (err) => {
      console.error("CMS: Redis Connection Ritual Failed:", err);
    });
  } catch (e) {
    console.error("CMS: Redis Initialization Ritual Failed:", e);
  }
}

export { redis };
