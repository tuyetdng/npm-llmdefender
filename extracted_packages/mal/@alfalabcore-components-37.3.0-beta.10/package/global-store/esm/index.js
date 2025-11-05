import { GlobalStore } from './GlobalStore.js';
import './ModalStore.js';

var getCoreComponentsStore = function () {
    if (!window.coreComponentsStore) {
        window.coreComponentsStore = new GlobalStore();
        return window.coreComponentsStore;
    }
    return window.coreComponentsStore;
};
var getModalStore = function () { return getCoreComponentsStore().getModalStore(); };

export { getModalStore };
