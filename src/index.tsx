import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { Select } from './components/select/Select';
import { RadioGroup } from './components/radio-group';
import { Separator } from './components/separator';
import { Text } from './components/text';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const rootRef = useRef<HTMLDivElement>(null);

	const [pageStyle, setPageStyle] = useState(defaultArticleState);
	const [formStyle, setFormStyle] = useState(defaultArticleState);

	const onApplyClick = () => {
		setPageStyle(formStyle);
	};

	const onResetClick = () => {
		setFormStyle(defaultArticleState);
		setPageStyle(defaultArticleState);
	};

	const onClose = () => {
		setFormStyle(pageStyle);
	};

	return (
		<div
			className={clsx(styles.main)}
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
				onApplyClick={onApplyClick}
				onResetClick={onResetClick}
				onClose={onClose}>
				<Text as='h1' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>
				<Select
					selected={formStyle.fontFamilyOption}
					onChange={(value) =>
						setFormStyle({ ...formStyle, fontFamilyOption: value })
					}
					options={fontFamilyOptions}
					title='Шрифт'
				/>
				<RadioGroup
					selected={formStyle.fontSizeOption}
					name='radio'
					onChange={(value) =>
						setFormStyle({ ...formStyle, fontSizeOption: value })
					}
					options={fontSizeOptions}
					title='Размер шрифта'
				/>
				<Select
					selected={formStyle.fontColor}
					onChange={(value) => setFormStyle({ ...formStyle, fontColor: value })}
					options={fontColors}
					title='Цвет шрифта'
				/>
				<Separator />
				<Select
					selected={formStyle.backgroundColor}
					onChange={(value) =>
						setFormStyle({ ...formStyle, backgroundColor: value })
					}
					options={backgroundColors}
					title='Цвет фона'
				/>
				<Select
					selected={formStyle.contentWidth}
					onChange={(value) =>
						setFormStyle({ ...formStyle, contentWidth: value })
					}
					options={contentWidthArr}
					title='Ширина контента'
				/>
			</ArticleParamsForm>
			<div ref={rootRef}>
				<Article />
			</div>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
