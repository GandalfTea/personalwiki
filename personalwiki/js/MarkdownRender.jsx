
//import React from 'react';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import remarkMath from 'remark-math';
//import rehypeKatex from 'rehype-katex';

/*
	Markdown Object renders Markdown Syntax and LaTeX
	
	For now, div and span are used instead of the original <math> 
	and <inlineMath> HTML objects.
*/

function MarkdownRender(props) {
	const newProps = {
		...props,
		remarkPlugins: [
			remarkMath,
		],
		components: {
			div: (props) =>
				<MathJax.Node formula={props.children} />,
			span: (props) =>
				<MathJax.Node inline formula={props.children} />
		}
	};
	return(
		<MathJax.Provider input="tex">
			<ReactMarkdown  {...newProps}></ReactMarkdown>
		</MathJax.Provider>
	);
}

export default MarkdownRender;
