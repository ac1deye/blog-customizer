import { CSSProperties, useState, useRef } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	const rootRef = useRef<HTMLDivElement>(null);

	const [pageStyle, setPageStyle] = useState(defaultArticleState);
	const [formStyle, setFormStyle] = useState(defaultArticleState);

	const onFormSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
		e.preventDefault();
		setPageStyle(formStyle);
	};

	const onFormReset = () => {
		setFormStyle(defaultArticleState);
		setPageStyle(defaultArticleState);
	};

	const onFormClose = () => {
		setFormStyle(pageStyle);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageStyle.fontFamilyOption.value,
					'--font-size': pageStyle.fontSizeOption.value,
					'--font-color': pageStyle.fontColor.value,
					'--container-width': pageStyle.contentWidth.value,
					'--bg-color': pageStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				rootRef={rootRef}
				formStyle={formStyle}
				setFormStyle={setFormStyle}
				onSubmit={onFormSubmit}
				onReset={onFormReset}
				onClose={onFormClose}
			/>
			<div ref={rootRef}>
				<Article />
			</div>
		</main>
	);
};
