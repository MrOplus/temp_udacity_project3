import * as style from './style/styles.scss';
import { onSubmit } from './js/handlers';

document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector("#submit");
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        onSubmit(e);
    });
});

if(process.env.NODE_ENV === 'production'){ 
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/service-worker.js');
        });
    }
}