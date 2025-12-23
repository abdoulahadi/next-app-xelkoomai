import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { LoadingProvider } from "@/components/providers/loading-provider";
import { SettingsProvider } from "@/contexts/settings-context";
import { getSettings } from "@/actions/settings";
import { Toaster } from "react-hot-toast";
import { SkipLinks } from "@/components/accessibility/SkipLinks";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()

  return {
    title: {
      default: settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteDescription,
    keywords: settings.seoKeywords
      ? settings.seoKeywords.split(',').map(k => k.trim())
      : [
          "Intelligence Artificielle",
          "IA",
          "Machine Learning",
          "Data Science",
          "Sénégal",
          "Solutions IA",
        ],
    authors: [
      {
        name: settings.siteName,
        url: settings.siteUrl,
      },
    ],
    creator: settings.siteName,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: settings.siteUrl,
      title: settings.seoTitle || settings.siteName,
      description: settings.seoDescription || settings.siteDescription,
      siteName: settings.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle || settings.siteName,
      description: settings.seoDescription || settings.siteDescription,
      creator: settings.twitterHandle || "@xelkoomai",
    },
    icons: {
      icon: [
        { url: settings.logoUrl || "/logo-icone.png" },
        { url: settings.logoUrl || "/logo-icone.png", sizes: "32x32", type: "image/png" },
      ],
      apple: settings.logoUrl || "/logo-icone.png",
    },
    manifest: "/manifest.json",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings()

  return (
    <html
      lang="fr"
      className="scroll-smooth"
      suppressHydrationWarning
      style={{
        // @ts-ignore
        '--primary': settings.primaryColor,
        '--secondary': settings.secondaryColor,
        '--accent': settings.accentColor,
        '--background': settings.backgroundColor,
        '--foreground': settings.foregroundColor,
        '--gray-light': settings.grayLightColor,
        '--success': settings.successColor,
        '--error': settings.errorColor,
        '--warning': settings.warningColor,
        '--info': settings.infoColor,
        '--text-primary': settings.textPrimaryColor,
        '--text-secondary': settings.textSecondaryColor,
        '--text-muted': settings.textMutedColor,
        '--admin-sidebar': settings.adminSidebarColor,
        '--admin-accent': settings.adminAccentColor,
      } as React.CSSProperties}
    >
      <head>
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registered:', registration.scope);
                  },
                  function(err) {
                    console.log('Service Worker registration failed:', err);
                  }
                );
              });
            }
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipLinks />
        <SettingsProvider settings={settings}>
          <LoadingProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </LoadingProvider>
        </SettingsProvider>
        <InstallPrompt />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#374151',
              borderRadius: '0.75rem',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
              padding: '1rem',
            },
            success: {
              iconTheme: {
                primary: settings.successColor,
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: settings.errorColor,
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
