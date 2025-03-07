import IORedis from 'ioredis';

export const redis = new IORedis({ maxRetriesPerRequest: null });

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

redis.on('close', () => {
  console.log('Redis connection closed');
});
