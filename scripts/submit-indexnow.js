import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

// IndexNow configuration
const INDEXNOW_KEY = 'GPArquitetura-3d9f8c2e1a7b4d6f';
const HOST = 'gparquitetura.vercel.app';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// IndexNow endpoints (you can submit to any of these)
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  // You can also use Yandex, Naver, etc.
  // 'https://yandex.com/indexnow',
];

/**
 * Extract URLs from sitemap.xml
 */
async function extractUrlsFromSitemap() {
  try {
    const sitemapPath = resolve(process.cwd(), 'public', 'sitemap.xml');
    const sitemapContent = readFileSync(sitemapPath, 'utf-8');

    const result = await parseXML(sitemapContent);
    const urls = result.urlset.url.map(urlEntry => urlEntry.loc[0]);

    return urls;
  } catch (error) {
    console.error('Error reading sitemap:', error);
    throw error;
  }
}

/**
 * Submit URLs to IndexNow
 */
async function submitToIndexNow(urls, endpoint) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    return {
      endpoint,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      endpoint,
      status: 'error',
      ok: false,
      error: error.message
    };
  }
}

/**
 * Submit a single URL to IndexNow (useful for immediate updates)
 */
async function submitSingleUrl(url, endpoint) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: [url]
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload)
    });

    return {
      endpoint,
      url,
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      endpoint,
      url,
      status: 'error',
      ok: false,
      error: error.message
    };
  }
}

/**
 * Main function to submit all URLs from sitemap to IndexNow
 */
async function main() {
  console.log('🚀 Starting IndexNow submission...\n');

  try {
    // Extract URLs from sitemap
    console.log('📄 Reading sitemap.xml...');
    const urls = await extractUrlsFromSitemap();
    console.log(`✅ Found ${urls.length} URLs to submit\n`);

    // Display URLs being submitted
    console.log('URLs to be submitted:');
    urls.forEach((url, index) => {
      console.log(`   ${index + 1}. ${url}`);
    });
    console.log('');

    // Submit to each IndexNow endpoint
    console.log('📤 Submitting to IndexNow endpoints...\n');

    const results = await Promise.all(
      INDEXNOW_ENDPOINTS.map(endpoint => submitToIndexNow(urls, endpoint))
    );

    // Display results
    console.log('📊 Submission Results:\n');
    results.forEach(result => {
      const endpointName = new URL(result.endpoint).hostname;
      const statusEmoji = result.ok ? '✅' : '❌';

      console.log(`${statusEmoji} ${endpointName}`);
      console.log(`   Status: ${result.status} ${result.statusText || ''}`);

      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }

      if (result.ok) {
        console.log(`   ✓ Successfully submitted ${urls.length} URLs`);
      }
      console.log('');
    });

    // Summary
    const successCount = results.filter(r => r.ok).length;
    const failCount = results.length - successCount;

    console.log('═══════════════════════════════════════');
    console.log(`📈 Summary:`);
    console.log(`   Total URLs: ${urls.length}`);
    console.log(`   Endpoints: ${results.length}`);
    console.log(`   Successful: ${successCount}`);
    console.log(`   Failed: ${failCount}`);
    console.log('═══════════════════════════════════════\n');

    if (successCount > 0) {
      console.log('✅ IndexNow submission completed successfully!');
      console.log('ℹ️  Note: IndexNow responses:');
      console.log('   - 200 OK: URL submitted successfully');
      console.log('   - 202 Accepted: URL received (typical response)');
      console.log('   - 400: Bad request');
      console.log('   - 403: Forbidden (check key)');
      console.log('   - 422: Unprocessable (check URL format)\n');
    } else {
      console.error('❌ All submissions failed. Please check your configuration.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Check if running directly or being imported
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { submitToIndexNow, submitSingleUrl, extractUrlsFromSitemap };
