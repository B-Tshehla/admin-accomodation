import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Import Firebase 

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyAecUgcC2uJt384wXhwWDPGg7oFzFZSvgQ",

    authDomain: "accomodationapp-fec16.firebaseapp.com",

    projectId: "accomodationapp-fec16",


    storageBucket: "gs://accomodationapp-fec16.appspot.com",

    messagingSenderId: "504433362980",

    appId: "1:504433362980:web:256e5cee9b95a36d9070b1"

};

// initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    app,
    db,
    storage,
    router,
    render: h => h(App),
}).$mount('#app')