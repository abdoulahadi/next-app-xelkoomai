"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ArrowRight, Search, Tag, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type Article = {
  slug: string
  title: string
  description: string
  image: string
  tags: string[]
  readTime: string
  publishedAt: Date | null
  author: string
}

interface BlogListClientProps {
  articles: Article[]
  total: number
  page: number
  totalPages: number
  newsletterEnabled: boolean
  allTags: string[]
  currentSearch: string
  currentTag: string
}

export function BlogListClient({
  articles,
  total,
  page,
  totalPages,
  newsletterEnabled,
  allTags,
  currentSearch,
  currentTag,
}: BlogListClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchInput, setSearchInput] = useState(currentSearch)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (searchInput) {
      params.set("search", searchInput)
    } else {
      params.delete("search")
    }
    params.delete("page") // Reset to page 1 on search
    router.push(`/blog?${params.toString()}`)
  }

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentTag === tag) {
      params.delete("tag")
    } else {
      params.set("tag", tag)
    }
    params.delete("page")
    router.push(`/blog?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearchInput("")
    router.push("/blog")
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#F9FAFB]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5">
        <div className="absolute -top-40 -right-40 w-80 h-80 [background:var(--primary)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 [background:var(--secondary)]/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 [background:var(--primary)]/10 [color:var(--primary)] px-4 py-2 rounded-full mb-6">
              <Tag className="w-4 h-4" />
              <span className="text-sm font-medium">Blog & Insights</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Actualités & Expertise
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Découvrez nos derniers articles sur l'intelligence artificielle,
              le machine learning et la data science
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:[border-color:var(--primary)] shadow-lg"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Tags Section */}
      {allTags.length > 0 && (
        <section className="py-8 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-700">Filtrer par tag:</span>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={currentTag === tag ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handleTagClick(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
              {(currentSearch || currentTag) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Effacer les filtres
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Active Filters */}
      {(currentSearch || currentTag) && (
        <section className="py-4 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{total} résultat(s) trouvé(s)</span>
              {currentSearch && (
                <Badge variant="outline">
                  Recherche: "{currentSearch}"
                </Badge>
              )}
              {currentTag && (
                <Badge variant="outline">
                  Tag: {currentTag}
                </Badge>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <Button onClick={clearFilters} variant="outline">
                Voir tous les articles
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${article.slug}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="group-hover:[color:var(--primary)] transition-colors line-clamp-2">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {article.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {article.publishedAt
                                ? new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                Précédent
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? "primary" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(p)}
                    className="w-10 h-10"
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Suivant
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      {newsletterEnabled && (
        <section className="py-20 bg-gradient-to-br [--tw-gradient-from:var(--primary)]/5 to-[var(--secondary)]/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ne manquez aucune actualité
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Recevez nos derniers articles directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre email..."
                className="flex-1"
                required
              />
              <Button type="submit" size="lg">
                S'abonner
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </section>
      )}
    </main>
  )
}
