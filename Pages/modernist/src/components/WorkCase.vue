<template>
    <figure class="work-case">
        <img src="http://placehold.it/290x190" alt="placehold img" class="work-case__img">
        <figcaption class="work-case__abstract">LOREM IPSUM DOLOR</figcaption>
    </figure>
</template>

<script>
    
</script>

<style lang="scss">
.work-case {
    flex: 0 1 auto;
    max-width: 290px;
    margin: 15px 0;
    border: solid 5px #fff;
    background-color: #151515;
    overflow: hidden;
    transition: border-color .5s ease;
    &:hover {
        border-color: #76c38f;
    }
}
.work-case__img {
    max-width: 100%;
}
.work-case__abstract {
    margin: 10px 0;
    font-size: 10px;
    text-align: center;
}
</style>
