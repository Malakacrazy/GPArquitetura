/**
 * IndexNow Utility
 *
 * This utility provides functions to submit URLs to IndexNow API
 * for instant indexing by search engines (Bing, Yandex, etc.)
 */

const INDEXNOW_KEY = '443b27cedafc4b518ebf4bd84be1a987';
const HOST = 'gparquitetura.vercel.app';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Default endpoint (you can use any IndexNow-supported search engine)
const DEFAULT_ENDPOINT = 'https://api.indexnow.org/indexnow';

interface IndexNowResponse {
  success: boolean;
  status?: number;
  statusText?: string;
  error?: string;
}

/**
 * Submit a single URL to IndexNow
 *
 * @param url - The full URL to submit (e.g., 'https://gparquitetura.vercel.app/portfolio/project-slug')
 * @param endpoint - Optional custom endpoint (defaults to api.indexnow.org)
 * @returns Promise with submission result
 */
export async function submitUrl(
  url: string,
  endpoint: string = DEFAULT_ENDPOINT
): Promise<IndexNowResponse> {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: [url]
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Submit multiple URLs to IndexNow
 *
 * @param urls - Array of full URLs to submit
 * @param endpoint - Optional custom endpoint (defaults to api.indexnow.org)
 * @returns Promise with submission result
 */
export async function submitUrls(
  urls: string[],
  endpoint: string = DEFAULT_ENDPOINT
): Promise<IndexNowResponse> {
  try {
    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    return {
      success: response.ok,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Submit the current page URL to IndexNow
 * Useful for client-side submission when new content is created/updated
 *
 * @param endpoint - Optional custom endpoint (defaults to api.indexnow.org)
 * @returns Promise with submission result
 */
export async function submitCurrentPage(
  endpoint: string = DEFAULT_ENDPOINT
): Promise<IndexNowResponse> {
  if (typeof window === 'undefined') {
    return {
      success: false,
      error: 'This function can only be called in browser environment'
    };
  }

  return submitUrl(window.location.href, endpoint);
}

/**
 * Helper function to notify IndexNow when a project is created/updated
 *
 * @param projectSlug - The project slug
 * @returns Promise with submission result
 */
export async function notifyProjectUpdate(projectSlug: string): Promise<IndexNowResponse> {
  const projectUrl = `https://${HOST}/portfolio/${projectSlug}`;
  const portfolioUrl = `https://${HOST}/portfolio`;

  // Submit both the project page and the portfolio listing page
  return submitUrls([projectUrl, portfolioUrl]);
}

/**
 * Constants for external use
 */
export const INDEXNOW_CONFIG = {
  key: INDEXNOW_KEY,
  host: HOST,
  keyLocation: KEY_LOCATION,
  endpoints: {
    default: 'https://api.indexnow.org/indexnow',
    bing: 'https://www.bing.com/indexnow',
    yandex: 'https://yandex.com/indexnow',
  }
} as const;
