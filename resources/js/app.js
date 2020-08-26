const { includes } = require("lodash");

window._ = require("lodash");

try {
    // include jquery
    window.$ = window.jQuery = require("jquery");
    // utils
    require("@fortawesome/fontawesome-free/js/all");
    require("./utils/updateVh");
    // pages / sections
    require("./layout/alerts");
    require("./layout/header");
    require("./layout/sidebar");
    require("./pages/email/verify");
    require("./pages/dispatch/show");
} catch (e) {
    console.log(e);
}
