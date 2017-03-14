<template>
    <div class="link-card">
        <header class="link-card__header">Quick Links</header>
        <div class="link-card__item-cnt">
            <link-item v-for="item in linkItems" :link-obj="item"></link-item>
        </div>
    </div>
</template>

<script>
import LinkItem from '../components/LinkItem';

export default {
    name: 'link-card',
    components: {
        LinkItem,
    },
    data() {
        return {
            linkItems: [
                { name: 'Lorem ipsum dolor sit', src: 'http://placehold.it/100x100' },
                { name: 'Amet consectetur', src: 'http://placehold.it/100x100' },
                { name: 'Praesent velsem id', src: 'http://placehold.it/100x100' },
                { name: 'Curabitur hendrerit est', src: 'http://placehold.it/100x100' },
                { name: 'Aliquam eget erat nec sapien', src: 'http://placehold.it/100x100' },
                { name: 'Cras id augue nunc', src: 'http://placehold.it/100x100' },
                { name: 'Sed a nulla urna', src: 'http://placehold.it/100x100' },
            ],
        };
    },
};
</script>

<style>
.link-card__header {
    margin-bottom: 24px;
}
</style>
