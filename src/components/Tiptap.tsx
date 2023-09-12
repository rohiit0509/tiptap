"use client";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import ImageIcon from "@mui/icons-material/Image";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import Mention from "@tiptap/extension-mention";
import suggestion from "./suggestion";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Tiptap = () => {
  const [content, setContent] = useState("<p>Start typing here...</p>");

  const editor: any = useEditor({ 
    extensions: [StarterKit, Image, TextAlign, TextStyle, Underline,Mention.configure({
      HTMLAttributes: {
        class: 'mention',
      },
      suggestion,
    }),],
    content: `
    ${content}
       `,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div>
      <div style={{ display: "flex", height: "43px" }}>
        <button onClick={addImage}>
          <ImageIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FormatBoldIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FormatItalicIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FormatStrikethroughIcon />
        </button>
        <button
          className="hTag"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          className="hTag"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          // className="hTag"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <FormatListBulletedIcon/>
        </button>
      </div>
      <EditorContent
        style={{ width: "100%", height: "90vh" }}
        editor={editor}
      />
    </div>
  );
};

export default Tiptap;
