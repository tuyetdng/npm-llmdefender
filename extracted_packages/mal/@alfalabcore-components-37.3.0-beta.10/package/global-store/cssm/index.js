var GlobalStore = require('./GlobalStore.js');
require('./ModalStore.js');

var getCoreComponentsStore = function () {
    if (!window.coreComponentsStore) {
        window.coreComponentsStore = new GlobalStore.GlobalStore();
        return window.coreComponentsStore;
    }
    return window.coreComponentsStore;
};
var getModalStore = function () { return getCoreComponentsStore().getModalStore(); };

exports.getModalStore = getModalStore;
