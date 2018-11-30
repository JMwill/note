<template>
    <header class="main-header">
        <h1 class="title"><img class="logo" src="../assets/logo.png">
            <a href="/">
                <span class="material-font">material</span>
                <span class="palette-font">palette</span>
            </a>
        </h1>
    </header>
</template>

<style lang="css">
.main-header {
    min-height: 55px;
    line-height: 55px;
    background-color: #3e464c;
    overflow: hidden;
}
.title {
    margin: 0;
    font-size: 30px;
    color: #35495e;
    float: left;
}
.logo {
    height: 36px;
    margin-right: 10px;
    vertical-align: middle;

    transition: transform 0.2s ease;
}
.title:hover .logo {
    transform: rotate(180deg);
}
.title:hover .material-font {
    color: #4fc3f7;
}
.title:hover .palette-font {
    color: #9575cd;
}
</style>
