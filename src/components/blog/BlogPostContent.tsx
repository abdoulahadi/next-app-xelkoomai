"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { TableOfContents } from "./TableOfContents"
import { CommentsSection } from "./CommentsSection"
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  User,
  Eye,
  ChevronRight,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link2 as LinkIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import toast from "react-hot-toast"

type Article = {
  title: string
  description: string
  publishedAt: Date | null
  author: string
  readTime: string
  tags: string[]
  image: string
  content: string
  views: number
}

type RelatedArticle = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  readTime: string
  publishedAt: Date | null
}

type BlogPostContentProps = {
  article: Article
  relatedArticles: RelatedArticle[]
  articleId: string
}

export function BlogPostContent({ article, relatedArticles, articleId }: BlogPostContentProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`, '_blank')
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank')
  }

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl)
    toast.success('Lien copié dans le presse-papiers!')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Hero Section - Simplified */}
      <section className="relative bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5 py-12 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:[color:var(--primary)] mb-6 group transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux articles
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs [background:var(--primary)]/10 [color:var(--primary)] px-3 py-1 rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{article.author}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Non publié"}
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {article.views} vues
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-8"
            >
              <Card className="p-8 md:p-12 shadow-lg">
                <style jsx global>{`
                  .article-content h1 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin: 2rem 0 1rem;
                    line-height: 1.2;
                    color: #1f2937;
                    padding-bottom: 0.5rem;
                    border-bottom: 3px solid var(--primary);
                  }
                  .article-content h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin: 1.75rem 0 1rem;
                    line-height: 1.3;
                    color: #1f2937;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #e5e7eb;
                  }
                  .article-content h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 1.5rem 0 0.75rem;
                    line-height: 1.4;
                    color: #1f2937;
                  }
                  .article-content h4 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 1.25rem 0 0.5rem;
                    color: #374151;
                  }
                  .article-content h5 {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin: 1rem 0 0.5rem;
                    color: #374151;
                  }
                  .article-content h6 {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 1rem 0 0.5rem;
                    color: #374151;
                  }
                  .article-content p {
                    margin: 1.25rem 0;
                    line-height: 1.8;
                    color: #374151;
                    font-size: 1.125rem;
                  }
                  .article-content ul,
                  .article-content ol {
                    margin: 1.5rem 0;
                    padding-left: 2rem;
                    color: #374151;
                    font-size: 1.125rem;
                  }
                  .article-content li {
                    margin: 0.75rem 0;
                    line-height: 1.8;
                  }
                  .article-content ul[data-type="taskList"] {
                    list-style: none;
                    padding-left: 0;
                  }
                  .article-content ul[data-type="taskList"] li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                  }
                  .article-content ul[data-type="taskList"] input[type="checkbox"] {
                    margin-top: 0.5rem;
                    width: 1.25rem;
                    height: 1.25rem;
                  }
                  .article-content blockquote {
                    border-left: 4px solid var(--primary);
                    background: linear-gradient(to right, #f0fdf4, transparent);
                    padding: 1.25rem 1.5rem;
                    margin: 2rem 0;
                    font-style: italic;
                    color: #374151;
                    border-radius: 0 0.5rem 0.5rem 0;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                  }
                  .article-content blockquote p {
                    margin: 0.5rem 0;
                  }
                  .article-content code {
                    background-color: #f3f4f6;
                    color: var(--primary);
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.375rem;
                    font-size: 0.9em;
                    font-family: 'Courier New', Courier, monospace;
                    font-weight: 500;
                    border: 1px solid #e5e7eb;
                  }
                  .article-content pre {
                    background-color: #1f2937;
                    color: #f3f4f6;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    margin: 2rem 0;
                    overflow-x: auto;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                  }
                  .article-content pre code {
                    background: transparent;
                    color: inherit;
                    padding: 0;
                    font-size: 0.95rem;
                    line-height: 1.7;
                    font-weight: 400;
                    border: none;
                  }
                  .article-content a {
                    color: var(--primary);
                    text-decoration: none;
                    border-bottom: 2px solid #86efac;
                    transition: all 0.2s;
                    font-weight: 500;
                  }
                  .article-content a:hover {
                    color: var(--primary);
                    border-bottom-color: var(--primary);
                  }
                  .article-content hr {
                    margin: 3rem 0;
                    border: none;
                    border-top: 2px solid #e5e7eb;
                  }
                  .article-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.75rem;
                    margin: 2rem auto;
                    display: block;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                  }
                  .article-content mark {
                    background-color: #fef08a;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                  }
                  .article-content strong {
                    font-weight: 700;
                    color: #1f2937;
                  }
                  .article-content em {
                    font-style: italic;
                  }
                  .article-content u {
                    text-decoration: underline;
                    text-decoration-color: var(--primary);
                    text-decoration-thickness: 2px;
                  }
                  .article-content s {
                    text-decoration: line-through;
                    opacity: 0.7;
                  }
                `}</style>
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-4"
            >
              <div className="space-y-6">
                {/* Table of Contents */}
                <TableOfContents />

                {/* Share Card */}
                <Card className="p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 [color:var(--primary)]" />
                    Partager cet article
                  </h3>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-500"
                      onClick={shareOnTwitter}
                    >
                      <Twitter className="w-5 h-5 text-blue-400" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-700"
                      onClick={shareOnFacebook}
                    >
                      <Facebook className="w-5 h-5 text-blue-600" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 hover:bg-blue-50 hover:border-blue-800"
                      onClick={shareOnLinkedin}
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 hover:bg-gray-50"
                      onClick={copyLink}
                    >
                      <LinkIcon className="w-5 h-5 text-gray-600" />
                      Copier le lien
                    </Button>
                  </div>
                </Card>

                {/* Author Card */}
                <Card className="p-6 shadow-lg bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br [--tw-gradient-from:var(--primary)] to-[var(--secondary)] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {article.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{article.author}</h3>
                      <p className="text-sm text-gray-600">Auteur</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expert en Intelligence Artificielle et solutions digitales
                  </p>
                </Card>

                {/* Tags */}
                <Card className="p-6 shadow-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:[background:var(--primary)]/10 hover:[color:var(--primary)] transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Articles similaires
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {related.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs [background:var(--primary)]/10 [color:var(--primary)] px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:[color:var(--primary)] transition-colors line-clamp-2">
                          {related.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {related.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {related.readTime}
                          </div>
                          <div className="[color:var(--primary)] group-hover:translate-x-2 transition-transform">
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Comments Section */}
      <CommentsSection articleId={articleId} />

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-2 [border-color:var(--primary)]/20 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5">
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
                  Prêt à transformer votre entreprise ?
                </h2>
                <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                  Discutons de vos besoins en IA et découvrez comment nous pouvons vous aider
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r [--tw-gradient-from:var(--primary)] to-[var(--secondary)] text-white hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contact">Demander une démo gratuite</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
