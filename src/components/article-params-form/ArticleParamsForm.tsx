import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState } from 'react';
import { useInsideClickClose } from './hooks/useInsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	rootRef: React.RefObject<HTMLDivElement>;
	children: React.ReactNode;
	onApplyClick: () => void;
	onResetClick: () => void;
	onClose: () => void;
};
export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { rootRef, children, onApplyClick, onResetClick, onClose } = props;
	const [isOpen, setIsOpen] = useState(false);

	useInsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					{children}
					<div className={styles.bottomContainer}>
						<Button onClick={onResetClick} title='Сбросить' type='reset' />
						<Button onClick={onApplyClick} title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
