<template>
    <div class="tweets-card">
        <header class="tweets-card__header">Latest Tweets</header>
        <tweet-block v-for="data in tweetsData" :tweet-data="data"></tweet-block>
    </div>
</template>

<script>
import TweetBlock from '../components/TweetBlock';

const tweetContent = 'Bacon ipsum dolor amet short loin leberkas chuck, picanha tri-tip venison ham pancetta. Turkey andouille tongue, pork picanha short loin pork chop bacon chicken. Turducken turkey salami, filet mignon landjaeger swine pig pork chop tongue. Sirloin beef turkey flank, fatback short loin sausage picanha brisket ham.';
export default {
    name: 'tweets-card',
    components: {
        TweetBlock,
    },
    data() {
        return {
            tweetsData: [
                { authSrc: 'http://placehold.it/100x100', authName: '@namehere', tweetContent },
                { authSrc: 'http://placehold.it/100x100', authName: '@namehere', tweetContent },
            ],
        };
    },
};
</script>

<style>
.tweets-card {
    margin-bottom: 40px;
}
</style>
