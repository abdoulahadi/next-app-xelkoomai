import { prisma } from "@/lib/prisma"

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://xelkoomai.sn"

  const articles = await prisma.article.findMany({
    where: { published: true },
    select: {
      slug: true,
      title: true,
      description: true,
      content: true,
      publishedAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { publishedAt: "desc" },
    take: 20,
  })

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Xelkoom-AI Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles et actualités sur l'intelligence artificielle, le machine learning et la data science en Afrique</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/blog/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
      <pubDate>${article.publishedAt?.toUTCString() || new Date().toUTCString()}</pubDate>
      <author>${article.author.email} (${article.author.name || article.author.email})</author>
    </item>`
      )
      .join("")}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
