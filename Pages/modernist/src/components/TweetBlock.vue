<template>
    <p class="tweet-block"><a class="tweet-block__auth" :href="tweetData.authSrc">{{tweetData.authName}}</a> {{tweetData.tweetContent}}</p>
</template>

<script>
export default {
    name: 'tweet-block',
    props: ['tweetData'],
};
</script>

<style>
.tweet-block {
    margin: 35px 0;
    font-size: 11px;
}
.tweet-block__auth {
    color: #76c38e;
}
</style>
