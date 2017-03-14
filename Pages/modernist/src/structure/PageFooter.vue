<template>
    <footer class="footer">
        <div class="footer__content">
            <blog-card class="footer__card"></blog-card>
            <link-card class="footer__card"></link-card>
            <tweets-card class="footer__card"></tweets-card>
            <contact-card class="footer__card"></contact-card>
        </div>
        <div class="footer__copyright">
            <p class="footer__copyright-content">
                Copyright &copy; 2017 Domain Name - All Rights Reversed
            </p>
        </div>
    </footer>
</template>

<script>
import BlogCard from './BlogCard';
import LinkCard from './LinkCard';
import TweetsCard from './TweetsCard';
import ContactCard from './ContactCard';

export default {
    name: 'page-footer',
    components: {
        BlogCard,
        LinkCard,
        TweetsCard,
        ContactCard,
    },
};
</script>

<style lang="scss">
.footer {
    overflow: hidden;
}
.footer__content {
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    align-items: stretch;
    flex-wrap: wrap;
    
    padding: 41px 120px 0;
    background-color: #303030;
}
.footer__card {
    max-width: 225px;
    color: #fff;
}
.footer__copyright {
    padding: 0 120px;
    border-top: solid 1px #3a3a3a;
    color: #979797;
    background-color: #2b2b2b;
}
.footer__copyright-content {
    margin: 0;
    padding: 24px 0;
    font-size: 10px;
}
</style>
