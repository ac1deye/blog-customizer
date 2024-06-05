import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState } from 'react';
import { useInsideClickClose } from './hooks/useInsideClickClose';
import clsx from 'clsx';

import { Select } from '../../components/select/Select';
import { RadioGroup } from '../../components/radio-group';
import { Separator } from '../../components/separator';
import { Text } from '../../components/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	rootRef: React.RefObject<HTMLDivElement>;
	formStyle: ArticleStateType;
	setFormStyle: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	onSubmit: (event: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
	onReset: (event: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
	onClose: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { rootRef, formStyle, setFormStyle, onSubmit, onReset, onClose } =
		props;
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useInsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose,
		onChange: setIsMenuOpen,
	});

	return (
		<>
			<ArrowButton
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				isOpen={isMenuOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
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
						onChange={(value) =>
							setFormStyle({ ...formStyle, fontColor: value })
						}
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
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
