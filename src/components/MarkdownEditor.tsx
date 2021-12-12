import React, { FC, useCallback } from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import { useField } from "formik";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

type MarkdownEditorProps = {
  height: string;
  width: string;
  name: string;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ height, width, name }) => {
  const [field, meta, helpers] = useField<string>({
    name,
  });

  const markdownRenderer = useCallback(
    (text) => <ReactMarkdown children={text} />,
    []
  );

  const handleChange = useCallback(
    ({ html, text }) => helpers.setValue(text),
    []
  );

  return (
    <MdEditor
      {...field}
      name="body"
      style={{ height, width }}
      renderHTML={markdownRenderer}
      onChange={handleChange}
    />
  );
};

export default MarkdownEditor;
