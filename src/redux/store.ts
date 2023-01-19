
import reducer from './reducer';
import {legacy_createStore as createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'main-root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(
	applyMiddleware(thunk),
));
const persistor = persistStore(store);

export {persistor};
export default (store);
