import { useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';

const PortalProvider = ({ children, wrapperId = 'portal-wrapper' }) => {
	const [wrapperElement, setWrapperElement] = useState(null);

	useLayoutEffect(() => {
		let element = document.getElementById(wrapperId);
		let systemCreated = false;

		if (!element) {
			systemCreated = true;
			element = createWrapperAndAppendToBody(wrapperId);
		}
		setWrapperElement(element);

		return () => {
			if (systemCreated && element.parentNode) {
				element.parentNode.removeChild(element);
			}
		};
	}, [wrapperId]);

	if (wrapperElement === null) return null;

	return createPortal(children, wrapperElement);
};

function createWrapperAndAppendToBody(wrapperId) {
	const wrapperElement = document.createElement('div');
	wrapperElement.setAttribute('id', wrapperId);
	wrapperElement.classList.add('portal-wrapper');
	document.body.appendChild(wrapperElement);
	return wrapperElement;
}

export default PortalProvider;
