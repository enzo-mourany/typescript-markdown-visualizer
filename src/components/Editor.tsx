import React, { useCallback, useEffect } from 'react';
import useCodeMirror from "../utils/codeMirror";

interface Props {
  initialDoc: string,
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props;
  const handleChange = useCallback(
    (state: { doc: { toString: () => string; }; }) => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange
  });

  useEffect(() => {
    if (editorView) {
      editorView.focus();
    }
  }, [editorView]);

  return <div ref={refContainer}></div>;
};

export default Editor;

