import { z } from 'zod';

type CamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>;

const envSchema = z.object({
  URL: z.string().url().endsWith('/'),
  USERNAME: z.string(),
  PASSWORD: z.string(),
  MAILINATOR_KEY: z.string(),
  MAILINATOR_DOMAIN: z.string(),
  HAS_LOGIN_WALL: z
    .enum(['true', 'false'])
    .optional()
    .default('false')
    .transform((val) => val === 'true'),
});

type RawEnv = z.infer<typeof envSchema>;

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables, check the errors below:');
  for (const err of parsed.error.errors) {
    console.error(`${err.path.join('.')} - ${err.message}`);
  }
  process.exit(-1);
}

type EnvData = {
  [K in keyof RawEnv as CamelCase<K>]: RawEnv[K];
};

const toCamelCase = (str: string) =>
  str
    .split('_')
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word[0].toUpperCase() + word.substr(1).toLowerCase()
    )
    .join('');

const envData = Object.fromEntries(
  Object.entries(parsed.data).map(([key, value]) => [toCamelCase(key), value])
) as EnvData;

export const env = {
  ...envData,
};
