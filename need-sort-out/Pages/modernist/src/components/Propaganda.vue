<template>
    <div class="propaganda">
        <div class="propaganda__intr">
            <p class="propaganda__title">Cursus penati  saccum nulla</p>
            <p class="propaganda__desc">Spicy jalapeno bacon ipsum dolor amet jerky alcatra turkey, sirloin ground round bacon shankle tri-tip leberkas ham shoulder. Brisket burgdoggen tri-tip bacon turkey.</p>
            <a href="javascript: void 0;">
                <button class="propaganda__more">Read More Here &gt;</button>
            </a>
        </div>
        <div class="propaganda__img-box">
            <img src="http://placehold.it/380x380" alt="placeholder img" class="propaganda__img">
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="scss">
.propaganda__intr {
    max-width: 315px;
    margin-left: 58px;
}
.propaganda__intr,
.propaganda__img-box {
    display: inline-block;
    vertical-align: middle;
}
.propaganda__title {
    color: #fff;
    font-size: 34px;
    margin-top: 0;
    margin-bottom: 34px;
}
.propaganda__desc {
    color: #979797;
    font-size: 9px;
    margin-bottom: 23px;
}
.propaganda__more {
    background-color: #76c38f;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
}
.propaganda__img-box {
    width: 380px;
    height: 380px;
    border-radius: 50%;
    overflow: hidden;
    border: solid 25px #6b6b6b;
    margin-left: 97px;
}
.propaganda__img {
    max-width: 100%;
    height: auto;
}
.propaganda__more {
    color: #fff;
}
@media (max-width: 1160px) {
    .propaganda__intr {
        display: block;
        margin: 10px auto;
        text-align: center;
    }
    .propaganda__img-box {
        display: block;
        margin: 10px auto;
    }
}
</style>
