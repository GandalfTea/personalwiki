
import React from 'react';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
//import rehypeKatex from 'rehype-katex';

function MarkdownRender(props) {
	const newProps = {
		...props,
		plugins: [
			RemarkMathPlugin,
		],
//		rehypePlugins: [
//			rehypeKatex,
//		],
		components: {
			...props.renderers,
			math: (props) =>
				<MathJax.Node formula={props.value} />,
			inlineMath: (props) =>
				<MathJax.Node inline formula={props.value} />
		}
	};
	return(
		<MathJax.Provider input="tex">
			<ReactMarkdown  {...newProps}></ReactMarkdown>
		</MathJax.Provider>
	);
}

export default MarkdownRender;
