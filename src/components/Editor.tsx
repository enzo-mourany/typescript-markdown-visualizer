import React, { useCallback, useEffect } from 'react';
import useCodeMirror from "../utils/codeMirror";

interface Props {
  initialDoc: string,
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (state: { doc: { toString: () => string; }; }) => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: 'Welcome',
    onChange: handleChange
  });

  useEffect(() => {
    if (editorView) {

    }
  }, [editorView]);

  return <div ref={refContainer}>Editor</div>;
};

export default Editor;

