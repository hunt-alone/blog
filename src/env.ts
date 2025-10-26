import { z } from 'zod'

const envSchema = z.object({
  GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),
  REPO_NAME: z.string().min(1, 'REPO_NAME is required'),
  REPO_OWNER: z.string().min(1, 'REPO_OWNER is required'),
  OPENAI_API_KEY: z.string().optional(),
})

export type Env = z.infer<typeof envSchema>

// 验证环境变量
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map(issue => issue.path.join('.'))
        .join(', ')
      throw new Error(
        `Missing or invalid environment variables: ${missingVars}\n` +
          'Please check your .env file and ensure all required variables are set.',
      )
    }
    throw error
  }
}

export const env = validateEnv()
