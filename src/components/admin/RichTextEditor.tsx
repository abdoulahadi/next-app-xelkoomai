"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image as ImageIcon,
  Code2,
  Highlighter,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputDialog } from "@/components/ui/input-dialog"
import { useCallback, useState } from "react"

const lowlight = createLowlight(common)

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Commencez à écrire votre article...",
}: RichTextEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [currentLinkUrl, setCurrentLinkUrl] = useState("")

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use lowlight version
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "hljs not-prose bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[500px] p-6",
        style: "font-size: 16px; line-height: 1.6;",
      },
    },
  })

  const openLinkDialog = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes("link").href || ""
    setCurrentLinkUrl(previousUrl)
    setLinkDialogOpen(true)
  }, [editor])

  const handleSetLink = useCallback((url: string) => {
    if (!editor) return

    if (!url || url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const openImageDialog = useCallback(() => {
    if (!editor) return
    setImageDialogOpen(true)
  }, [editor])

  const handleAddImage = useCallback((url: string) => {
    if (!editor || !url) return
    editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {/* Text formatting */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-200" : ""}
            title="Gras"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-200" : ""}
            title="Italique"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-gray-200" : ""}
            title="Souligné"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-200" : ""}
            title="Barré"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "bg-gray-200" : ""}
            title="Code"
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "bg-gray-200" : ""}
            title="Surligner"
          >
            <Highlighter className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headings */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}
            title="Titre 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}
            title="Titre 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""}
            title="Titre 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
            title="Liste à puces"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
            title="Liste numérotée"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive("taskList") ? "bg-gray-200" : ""}
            title="Liste de tâches"
          >
            <ListChecks className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Quote and Code Block */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
            title="Citation"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-gray-200" : ""}
            title="Bloc de code"
          >
            <Code2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Ligne horizontale"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}
            title="Aligner à gauche"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}
            title="Centrer"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}
            title="Aligner à droite"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Link and Image */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={openLinkDialog}
            className={editor.isActive("link") ? "bg-gray-200" : ""}
            title="Lien"
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={openImageDialog}
            title="Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Undo/Redo */}
        <div className="flex gap-1 items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Annuler"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rétablir"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor with custom styles for headings */}
      <div className="bg-white editor-content">
        <style jsx global>{`
          .editor-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin: 1.5rem 0 1rem;
            line-height: 1.2;
            color: #1f2937;
          }
          .editor-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin: 1.25rem 0 0.75rem;
            line-height: 1.3;
            color: #1f2937;
          }
          .editor-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1rem 0 0.5rem;
            line-height: 1.4;
            color: #1f2937;
          }
          .editor-content p {
            margin: 0.75rem 0;
            line-height: 1.6;
            color: #374151;
          }
          .editor-content ul,
          .editor-content ol {
            margin: 1rem 0;
            padding-left: 1.5rem;
          }
          .editor-content li {
            margin: 0.5rem 0;
            line-height: 1.6;
          }
          .editor-content ul[data-type="taskList"] {
            list-style: none;
            padding-left: 0;
          }
          .editor-content ul[data-type="taskList"] li {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .editor-content ul[data-type="taskList"] input[type="checkbox"] {
            margin-top: 0.25rem;
          }
          .editor-content blockquote {
            border-left: 4px solid #0d7330;
            padding-left: 1rem;
            margin: 1rem 0;
            font-style: italic;
            color: #6b7280;
          }
          .editor-content code {
            background-color: #f3f4f6;
            color: #0d7330;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            font-family: monospace;
          }
          .editor-content pre {
            margin: 1rem 0;
          }
          .editor-content pre code {
            background: transparent;
            color: inherit;
            padding: 0;
          }
          .editor-content a {
            color: #0d7330;
            text-decoration: underline;
          }
          .editor-content hr {
            margin: 2rem 0;
            border: none;
            border-top: 2px solid #e5e7eb;
          }
          .editor-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }
          .editor-content mark {
            background-color: #fef08a;
            padding: 0.125rem 0.25rem;
            border-radius: 0.125rem;
          }
        `}</style>
        <EditorContent editor={editor} />
      </div>

      {/* Link Dialog */}
      <InputDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        title="Insérer un lien"
        description="Ajoutez une URL pour créer un lien hypertexte"
        label="URL du lien"
        placeholder="https://example.com"
        defaultValue={currentLinkUrl}
        onConfirm={handleSetLink}
        confirmText="Insérer"
        cancelText="Annuler"
      />

      {/* Image Dialog */}
      <InputDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        title="Insérer une image"
        description="Ajoutez l'URL d'une image pour l'insérer dans l'article"
        label="URL de l'image"
        placeholder="https://example.com/image.jpg"
        onConfirm={handleAddImage}
        confirmText="Insérer"
        cancelText="Annuler"
      />
    </div>
  )
}
