import AppRouter from "@routers/index";
import { LocaleProvider } from 'antd-mobile';
import 'moment/locale/zh-cn';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less'

// configure({ enforceActions: true });

const render = (Component: any) => {
	ReactDOM.render(
		<LocaleProvider locale={undefined}>
			<Component/>
		</LocaleProvider>,
		document.getElementById("react-app") as HTMLElement,
	);
};

render(AppRouter);


