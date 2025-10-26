import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import { Client } from '@discublog/api/client'
import { Octokit } from '@octokit/core'

import { repoName, repoOwner } from '~/blog-config'

import { env } from '@/env'

import type { RepositoryFile, PinnedItems } from './interface'

const { graphql } = new Octokit({ auth: env.GITHUB_TOKEN })

const client = new Client({
  token: env.GITHUB_TOKEN,
  name: repoName,
  owner: repoOwner,
})

// 查询缓存时间（秒）
const queryTime: number = 60 * 60 * 3 // 3 hours (10800 seconds)

export const queryProfileREADME = cache(
  async () => {
    const [masterResult, mainResult] = await Promise.allSettled([
      graphql<RepositoryFile>(
        `
          query queryProfileREADME($owner: String!, $file: String!) {
            repository(owner: $owner, name: $owner) {
              object(expression: $file) {
                ... on Blob {
                  text
                }
              }
            }
          }
        `,
        {
          owner: repoOwner,
          file: 'master:README.md',
        },
      ),
      graphql<RepositoryFile>(
        `
          query queryProfileREADME($owner: String!, $file: String!) {
            repository(owner: $owner, name: $owner) {
              object(expression: $file) {
                ... on Blob {
                  text
                }
              }
            }
          }
        `,
        {
          owner: repoOwner,
          file: 'main:README.md',
        },
      ),
    ])

    if (masterResult.status === 'fulfilled') {
      const { repository } = masterResult.value
      if (repository?.object?.text) {
        return masterResult.value
      }
    }

    if (mainResult.status === 'fulfilled') {
      const { repository } = mainResult.value
      if (repository?.object?.text) {
        return mainResult.value
      }
    }

    return {
      repository: {
        object: {
          text: 'create [GitHub profile repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile) to use Bio block.',
        },
      },
    }
  },
  ['queryProfileREADME'],
  { revalidate: queryTime },
)

export const queryPinnedItems = cache(
  () =>
    graphql<PinnedItems>(
      `
        query queryPinnedItems($owner: String!) {
          user(login: $owner) {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  url
                  description
                  homepageUrl
                  visibility
                  stargazerCount
                  forkCount
                  languages(
                    first: 1
                    orderBy: { field: SIZE, direction: DESC }
                  ) {
                    nodes {
                      name
                      color
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner: repoOwner,
      },
    ),
  ['queryPinnedItems'],
  { revalidate: queryTime },
)

export const queryAllLabels = cache(
  () => client.queryLabels(),
  ['queryAllLabels'],
  { revalidate: queryTime },
)

export const queryAllPosts = cache(
  () => client.search({ bodyText: true }),
  ['queryAllPosts'],
  { revalidate: queryTime },
)

export const queryByLabel = cache(
  (label: string) => client.search({ label }),
  ['queryByLabel'],
  { revalidate: queryTime },
)

export const queryByNumber = cache(
  (number: number) =>
    client.queryByNumber({ number, body: true, bodyText: true }),
  ['queryByNumber'],
  { revalidate: queryTime },
)
