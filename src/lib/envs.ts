export const envs = {
  nodeEnv: {
    production: import.meta.env.PROD || false,
    development: import.meta.env.DEV || false,
  },
  apiBackend: import.meta.env.VITE_API_BACKEND || 'apiBackend',
};
