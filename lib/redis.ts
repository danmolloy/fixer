import { Redis } from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL);  // Use your Redis URL

redis.on('error', (err) => {
  console.error('Redis error:', err);
});