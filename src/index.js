import React  from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('file?name=[name].[ext]!./index.html');

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('content'));