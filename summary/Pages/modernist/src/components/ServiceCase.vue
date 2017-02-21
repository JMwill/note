<template>
    <div class="service-case">
        <div class="service-case__thumb-cnt">
            <img src="http://placehold.it/380x380" alt="placehold img" class="service-case__thumb">
        </div>
        <p class="service-case__title">Service Title</p>
        <p class="service-case__desc">Short ribs landjaeger prosciutto pork chop meatball boudin pork loin ham hock strip steak shoulder filet mignon alcatra t-bone tongue tenderloin.</p>
    </div>
</template>

<style lang="scss">
.service-case {
    flex: 1 1 auto;
    max-width: 192px;
    padding: 22px 33px;
    margin: 10px 0;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    transition: background-color .5s ease;
    &:hover {
        background-color: #76c38f;
    }

    &:hover .service-case__title,
    &:hover .service-case__desc {
        color: #fff;
    }
}
.service-case__thumb-cnt {
    min-height: 120px;
    &::before {
        content: '';
        height: 100%;
    }
}
.service-case__thumb {
    max-height: 120px;
    max-width: 120px;
    vertical-align: middle;
}
.service-case__title {
    font-size: 24px;
    margin: 17px 0;
    color: #333333;
}
.service-case__desc {
    font-size: 9px;
    line-height: 1.4;
    color: #979797;
}
</style>
