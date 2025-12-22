import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@xelkoom-ai.com' },
    update: {},
    create: {
      email: 'admin@xelkoom-ai.com',
      name: 'Administrateur',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Migrate existing articles
  const articles = [
    {
      slug: 'introduction-machine-learning',
      title: 'Introduction au Machine Learning pour les Entreprises',
      description: 'Découvrez comment le machine learning peut transformer votre business et par où commencer votre parcours IA.',
      content: `
<h1>Introduction au Machine Learning pour les Entreprises</h1>

<p>Le Machine Learning (ML) n'est plus réservé aux géants de la technologie. Aujourd'hui, les entreprises de toutes tailles peuvent bénéficier de cette technologie pour améliorer leurs processus et prendre de meilleures décisions.</p>

<h2>Qu'est-ce que le Machine Learning ?</h2>

<p>Le Machine Learning est une branche de l'intelligence artificielle qui permet aux systèmes d'apprendre et de s'améliorer à partir de l'expérience sans être explicitement programmés.</p>

<h2>Applications Concrètes</h2>

<h3>1. Prédiction des Ventes</h3>
<p>Utilisez vos données historiques pour prévoir les tendances futures et optimiser vos stocks.</p>

<h3>2. Segmentation Client</h3>
<p>Identifiez automatiquement des groupes de clients similaires pour personnaliser vos offres.</p>

<h3>3. Détection d'Anomalies</h3>
<p>Repérez rapidement les comportements inhabituels dans vos données pour prévenir la fraude.</p>

<h2>Par Où Commencer ?</h2>

<ol>
<li><strong>Identifiez un problème business concret</strong></li>
<li><strong>Collectez et nettoyez vos données</strong></li>
<li><strong>Commencez petit avec un projet pilote</strong></li>
<li><strong>Mesurez les résultats</strong></li>
<li><strong>Itérez et améliorez</strong></li>
</ol>

<h2>Conclusion</h2>

<p>Le Machine Learning est un outil puissant mais son succès dépend d'une bonne compréhension de vos besoins business et de la qualité de vos données.</p>

<p>Contactez-nous pour discuter de votre projet ML !</p>
      `,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80',
      tags: JSON.stringify(['Machine Learning', 'Business', 'Guide']),
      published: true,
      readTime: '5 min',
      views: 0,
      publishedAt: new Date('2025-10-20'),
    },
    {
      slug: 'nlp-chatbots-senegal',
      title: 'Les Chatbots IA au Sénégal : Opportunités et Défis',
      description: 'Analyse du marché des chatbots intelligents en Afrique de l\'Ouest et comment ils transforment le service client.',
      content: `
<h1>Les Chatbots IA au Sénégal : Opportunités et Défis</h1>

<p>L'Afrique de l'Ouest connaît une transformation numérique rapide, et le Sénégal est à l'avant-garde de cette révolution.</p>

<h2>Le Marché des Chatbots en Afrique</h2>

<p>Les chatbots intelligents transforment la façon dont les entreprises interagissent avec leurs clients.</p>

<h2>Opportunités</h2>

<h3>Service Client 24/7</h3>
<p>Offrez un support continu à vos clients sans augmenter vos coûts.</p>

<h3>Multilinguisme</h3>
<p>Servez vos clients en wolof, français et anglais simultanément.</p>

<h2>Défis à Relever</h2>

<ol>
<li>Infrastructure internet</li>
<li>Langues locales</li>
<li>Formation des équipes</li>
</ol>

<h2>Conclusion</h2>

<p>Les chatbots représentent une opportunité unique pour les entreprises sénégalaises de se démarquer.</p>
      `,
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
      tags: JSON.stringify(['NLP', 'Chatbots', 'Sénégal']),
      published: true,
      readTime: '8 min',
      views: 0,
      publishedAt: new Date('2025-10-15'),
    },
    {
      slug: 'data-science-pme',
      title: 'Data Science pour les PME : Par Où Commencer ?',
      description: 'Un guide pratique pour les petites et moyennes entreprises qui souhaitent exploiter leurs données.',
      content: `
<h1>Data Science pour les PME : Par Où Commencer ?</h1>

<p>Vous pensez que la Data Science est réservée aux grandes entreprises ? Détrompez-vous !</p>

<h2>Pourquoi les PME Ont Besoin de Data Science</h2>

<p>Les données sont partout, et leur analyse peut vous donner un avantage concurrentiel décisif.</p>

<h2>Premières Étapes</h2>

<h3>1. Audit de Données</h3>
<p>Identifiez les données que vous collectez déjà.</p>

<h3>2. Questions Business</h3>
<p>Quelles questions voulez-vous résoudre ?</p>

<h3>3. Quick Wins</h3>
<p>Commencez par des projets simples avec un ROI rapide.</p>

<h2>Outils Accessibles</h2>

<ul>
<li>Google Analytics</li>
<li>Excel/Google Sheets</li>
<li>Power BI</li>
<li>Python (gratuit et open-source)</li>
</ul>

<h2>Conclusion</h2>

<p>Pas besoin d'être une grande entreprise pour bénéficier de la Data Science. Commencez petit et évoluez progressivement.</p>
      `,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      tags: JSON.stringify(['Data Science', 'PME', 'Guide']),
      published: true,
      readTime: '6 min',
      views: 0,
      publishedAt: new Date('2025-10-10'),
    },
  ]

  for (const articleData of articles) {
    const article = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        ...articleData,
        authorId: admin.id,
      },
    })
    console.log('✅ Article created:', article.title)
  }

  // Create realizations (use cases)
  const realizations = [
    {
      title: 'Jaari - Chatbot Agricole Intelligent',
      description: 'Assistant virtuel dédié au secteur agricole sénégalais, offrant des conseils personnalisés aux agriculteurs en wolof et français.',
      benefits: JSON.stringify([
        'Conseils agricoles 24/7 en wolof et français',
        'Recommandations personnalisées selon les cultures',
        'Alertes météo et prévisions adaptées',
        'Base de connaissances locale et contextualisée'
      ]),
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
      link: 'https://jaari.xelkoomai.sn',
      icon: 'MessageSquare',
      published: true,
      order: 1
    },
    {
      title: 'Agriteam - Réseau Social Agricole',
      description: 'Plateforme collaborative connectant agriculteurs, experts et fournisseurs pour partager connaissances et bonnes pratiques.',
      benefits: JSON.stringify([
        'Communauté d\'agriculteurs et d\'experts',
        'Partage de connaissances et d\'expériences',
        'Marketplace pour équipements et intrants',
        'Forums de discussion thématiques'
      ]),
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80',
      link: 'https://agriteam.xelkoomai.sn',
      icon: 'Users',
      published: true,
      order: 2
    },
    {
      title: 'FarmSpace - Monitoring Agricole',
      description: 'Système de surveillance et gestion intelligente des exploitations agricoles utilisant l\'IoT et l\'analyse de données.',
      benefits: JSON.stringify([
        'Surveillance en temps réel des cultures',
        'Optimisation de l\'irrigation et des ressources',
        'Prévention des maladies et parasites',
        'Tableaux de bord et analytics avancés'
      ]),
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
      link: 'https://agrispace.xelkoomai.sn',
      icon: 'BarChart3',
      published: true,
      order: 3
    },
    {
      title: 'Samadoc - Plateforme Académique',
      description: 'Espace de partage et collaboration pour documents académiques, facilitant l\'accès au savoir pour les étudiants et chercheurs.',
      benefits: JSON.stringify([
        'Bibliothèque numérique collaborative',
        'Recherche avancée de documents',
        'Système de notation et recommandations',
        'Espaces de travail collaboratifs'
      ]),
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
      link: 'https://samadoc.xelkoomai.sn',
      icon: 'BookOpen',
      published: true,
      order: 4
    }
  ]

  for (const realizationData of realizations) {
    const realization = await prisma.realization.upsert({
      where: { id: realizationData.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: realizationData,
    })
    console.log('✅ Realization created:', realization.title)
  }

  // Create or update settings with SEO configuration
  await prisma.settings.upsert({
    where: { id: 'default-settings' },
    update: {
      seoTitle: 'Xelkoom-AI : Solutions d\'Intelligence Artificielle au Sénégal | IA & Machine Learning',
      seoDescription: 'Expert en Intelligence Artificielle au Sénégal. Xelkoom-AI développe des solutions IA sur mesure : chatbots, analyse de données, computer vision, NLP. Transformez votre entreprise avec l\'IA. Devis gratuit.',
      seoKeywords: 'intelligence artificielle Sénégal, IA Sénégal, machine learning Afrique, solutions IA, développement IA, chatbot Sénégal, analyse de données, computer vision, traitement langage naturel, NLP, deep learning, automatisation IA, conseil IA, startup IA Dakar, entreprise intelligence artificielle, IA sur mesure, transformation digitale IA, data science Sénégal, apprentissage automatique, AI consulting Africa',
    },
    create: {
      id: 'default-settings',
      siteName: 'Xelkoom-AI',
      siteDescription: 'Votre partenaire en solutions d\'Intelligence Artificielle',
      siteUrl: 'https://xelkoomai.sn',
      contactEmail: 'contact@xelkoomai.sn',
      contactPhone: '+221781743559',
      // Couleurs principales
      primaryColor: '#0d7330',
      secondaryColor: '#5B8B17',
      accentColor: '#10b981',
      // Couleurs de base
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      grayLightColor: '#F9FAFB',
      // Couleurs sémantiques
      successColor: '#10B981',
      errorColor: '#EF4444',
      warningColor: '#F59E0B',
      infoColor: '#3B82F6',
      // Couleurs de texte
      textPrimaryColor: '#000000',
      textSecondaryColor: '#6b7280',
      textMutedColor: '#9ca3af',
      // Admin
      adminSidebarColor: '#0D7330',
      adminAccentColor: '#5B8B17',
      seoTitle: 'Xelkoom-AI : Solutions d\'Intelligence Artificielle au Sénégal | IA & Machine Learning',
      seoDescription: 'Expert en Intelligence Artificielle au Sénégal. Xelkoom-AI développe des solutions IA sur mesure : chatbots, analyse de données, computer vision, NLP. Transformez votre entreprise avec l\'IA. Devis gratuit.',
      seoKeywords: 'intelligence artificielle Sénégal, IA Sénégal, machine learning Afrique, solutions IA, développement IA, chatbot Sénégal, analyse de données, computer vision, traitement langage naturel, NLP, deep learning, automatisation IA, conseil IA, startup IA Dakar, entreprise intelligence artificielle, IA sur mesure, transformation digitale IA, data science Sénégal, apprentissage automatique, AI consulting Africa',
    }
  })
  console.log('✅ Settings created/updated with SEO configuration')

  console.log('🎉 Database seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
