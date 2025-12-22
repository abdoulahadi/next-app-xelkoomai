/**
 * XSS Sanitization utilities
 * Uses DOMPurify to clean HTML content
 *
 * Installation: npm install isomorphic-dompurify
 */

// @ts-ignore - Will be available after npm install
import DOMPurify from "isomorphic-dompurify"

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHTML(html: string): string {
  if (!html) return ""

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      // Headings
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      // Text formatting
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
      "ins",
      "mark",
      "small",
      "sub",
      "sup",
      // Links
      "a",
      // Lists
      "ul",
      "ol",
      "li",
      // Code
      "code",
      "pre",
      // Quotes
      "blockquote",
      "q",
      "cite",
      // Tables
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      // Media
      "img",
      // Containers
      "div",
      "span",
      "section",
      "article",
    ],
    ALLOWED_ATTR: [
      "href",
      "title",
      "target",
      "rel",
      "class",
      "id",
      "src",
      "alt",
      "width",
      "height",
      "style", // Limited style attributes
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_TRUSTED_TYPE: false,
  })
}

/**
 * Sanitize plain text (strip all HTML)
 */
export function sanitizeText(text: string): string {
  if (!text) return ""

  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  })
}

/**
 * Sanitize URL to prevent javascript: and data: URLs
 */
export function sanitizeURL(url: string): string {
  if (!url) return ""

  // Remove javascript: and data: URLs
  if (
    url.toLowerCase().startsWith("javascript:") ||
    url.toLowerCase().startsWith("data:")
  ) {
    return ""
  }

  return url
}

/**
 * Escape HTML special characters
 */
export function escapeHTML(text: string): string {
  if (!text) return ""

  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  }

  return text.replace(/[&<>"'/]/g, (char) => map[char])
}

/**
 * Validate and sanitize article content before saving
 */
export function sanitizeArticleContent(content: string): string {
  // First pass: sanitize HTML
  let sanitized = sanitizeHTML(content)

  // Remove any script tags that might have slipped through
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")

  // Remove inline javascript
  sanitized = sanitized.replace(/javascript:/gi, "")

  return sanitized
}
