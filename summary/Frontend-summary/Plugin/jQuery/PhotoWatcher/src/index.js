import $ from '../node_modules/jquery';
import PhotoWatcher from './js/model/photo-watcher.js';

require('./css/index.css');


$(() => {
    let photoWatcher = new PhotoWatcher({
        cnt: '.pw-contaier'
    });

    photoWatcher.init();
});
