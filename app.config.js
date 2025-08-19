import 'dotenv/config';

export default {
  expo: {
    name: 'PracticePath',
    slug: 'practicepath',
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};
