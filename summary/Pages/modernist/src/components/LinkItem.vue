<template>
    <div class="link-item">
        <a class="link-item__link" :href="linkObj.src">{{linkObj.name}}</a>
    </div>
</template>

<script>
export default {
    name: 'link-item',
    props: ['linkObj'],
};
</script>

<style>
.link-item {
    padding-top: 6px;
    border-bottom: solid 1px #404040;
    overflow: hidden;
}
.link-item::before {
    content: '\226B';
    font-size: 5px;
    vertical-align: middle;
    margin-right: 5px;
    color: #979797;
}
.link-item__link {
    display: inline-block;
    margin: 10px 0;
    color: #76c38f;
    text-decoration: none;
    vertical-align: middle;
}
</style>
