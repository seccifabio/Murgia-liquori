import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

let redis: Redis | null = null;

if (redisUrl) {
  try {
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 1,
      lazyConnect: true,
      connectTimeout: 5000,
    });
    
    redis.on("error", (err) => {
      console.error("Redis Connection Error:", err);
    });
  } catch (e) {
    console.error("Redis Initialization Failed:", e);
  }
}

export { redis };
