<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap — UpwardDigital</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noindex, nofollow"/>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f7f5f2;
            color: #1c1917;
            min-height: 100vh;
          }

          /* Header */
          header {
            background: #0c0c10;
            padding: 28px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 16px;
          }
          .header-left { display: flex; align-items: center; gap: 16px; }
          .logo-wrap {
            width: 44px; height: 44px;
            background: #1d4ed8;
            border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-weight: 900; font-size: 18px; color: #fff; letter-spacing: -1px;
          }
          .site-name { color: #fff; font-size: 18px; font-weight: 700; }
          .site-sub  { color: #6b7280; font-size: 12px; margin-top: 2px; }
          .badge {
            background: #1d4ed8;
            color: #fff;
            font-size: 11px;
            font-weight: 600;
            padding: 4px 12px;
            border-radius: 999px;
            letter-spacing: 0.5px;
          }

          /* Stats bar */
          .stats-bar {
            background: #fff;
            border-bottom: 1px solid #e7e5e4;
            padding: 18px 40px;
            display: flex;
            align-items: center;
            gap: 32px;
            flex-wrap: wrap;
          }
          .stat { display: flex; align-items: center; gap: 8px; }
          .stat-num { font-size: 22px; font-weight: 800; color: #1d4ed8; }
          .stat-label { font-size: 12px; color: #78716c; font-weight: 500; }
          .stat-divider { width: 1px; height: 32px; background: #e7e5e4; }
          .stats-note { margin-left: auto; font-size: 12px; color: #a8a29e; }

          /* Main */
          main { max-width: 960px; margin: 40px auto; padding: 0 24px 60px; }

          /* Section heading */
          .section-head {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            margin-top: 40px;
          }
          .section-bar { width: 4px; height: 22px; border-radius: 2px; background: #1d4ed8; }
          .section-title { font-size: 13px; font-weight: 700; color: #44403c; text-transform: uppercase; letter-spacing: 0.8px; }
          .section-count { font-size: 12px; color: #a8a29e; margin-left: auto; }

          /* Table */
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          }
          thead tr { background: #f7f5f2; }
          th {
            text-align: left;
            padding: 12px 20px;
            font-size: 11px;
            font-weight: 700;
            color: #78716c;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            border-bottom: 1px solid #e7e5e4;
          }
          td {
            padding: 14px 20px;
            font-size: 14px;
            border-bottom: 1px solid #f5f5f4;
            vertical-align: middle;
          }
          tr:last-child td { border-bottom: none; }
          tbody tr:hover td { background: #fafaf9; }

          /* URL cell */
          .url-cell a {
            color: #1d4ed8;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          .url-cell a:hover { text-decoration: underline; }

          /* Priority pill */
          .priority {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
          }
          .p-high   { background: #dbeafe; color: #1e40af; }
          .p-mid    { background: #d1fae5; color: #065f46; }
          .p-low    { background: #f3f4f6; color: #6b7280; }

          /* Freq badge */
          .freq {
            font-size: 12px;
            color: #57534e;
            background: #f5f5f4;
            padding: 3px 9px;
            border-radius: 6px;
            font-weight: 500;
          }

          /* Footer */
          footer {
            text-align: center;
            padding: 32px 16px;
            font-size: 12px;
            color: #a8a29e;
          }
          footer a { color: #1d4ed8; text-decoration: none; }
          footer a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>

        <header>
          <div class="header-left">
            <div class="logo-wrap">UD</div>
            <div>
              <div class="site-name">UpwardDigital</div>
              <div class="site-sub">upwarddigitalco.com</div>
            </div>
          </div>
          <span class="badge">XML Sitemap</span>
        </header>

        <div class="stats-bar">
          <div class="stat">
            <span class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span>
            <span class="stat-label">Total URLs</span>
          </div>
          <div class="stat-divider"/>
          <div class="stat">
            <span class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority >= 0.9])"/></span>
            <span class="stat-label">High Priority</span>
          </div>
          <div class="stat-divider"/>
          <div class="stat">
            <span class="stat-num"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:changefreq = 'weekly'])"/></span>
            <span class="stat-label">Updated Weekly</span>
          </div>
          <span class="stats-note">This sitemap is used by search engines to index this site.</span>
        </div>

        <main>
          <div class="section-head">
            <div class="section-bar"/>
            <span class="section-title">All Pages</span>
            <span class="section-count"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs indexed</span>
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>URL</th>
                <th>Priority</th>
                <th>Change Frequency</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td style="color:#a8a29e;font-size:12px;width:40px;">
                    <xsl:value-of select="position()"/>
                  </td>
                  <td class="url-cell">
                    <a href="{sitemap:loc}" target="_blank" rel="noopener">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:variable name="p" select="sitemap:priority"/>
                    <xsl:choose>
                      <xsl:when test="$p >= 0.9">
                        <span class="priority p-high"><xsl:value-of select="$p"/></span>
                      </xsl:when>
                      <xsl:when test="$p >= 0.7">
                        <span class="priority p-mid"><xsl:value-of select="$p"/></span>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="priority p-low"><xsl:value-of select="$p"/></span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <span class="freq"><xsl:value-of select="sitemap:changefreq"/></span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>

        <footer>
          Generated by <a href="https://upwarddigitalco.com">UpwardDigital</a> ·
          <a href="https://www.sitemaps.org/protocol.html" target="_blank" rel="noopener">Sitemap Protocol</a>
        </footer>

      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
