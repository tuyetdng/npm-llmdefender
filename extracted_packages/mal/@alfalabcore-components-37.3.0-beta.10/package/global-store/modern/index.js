import { GlobalStore } from './GlobalStore.js';
import './ModalStore.js';

const getCoreComponentsStore = () => {
    if (!window.coreComponentsStore) {
        window.coreComponentsStore = new GlobalStore();
        return window.coreComponentsStore;
    }
    return window.coreComponentsStore;
};
const getModalStore = () => getCoreComponentsStore().getModalStore();

export { getModalStore };
