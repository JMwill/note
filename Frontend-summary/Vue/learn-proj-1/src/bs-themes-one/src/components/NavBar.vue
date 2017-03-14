<style>
.personal-entry {
    display: inline-block;
}
.notification {
    vertical-align: middle;
    padding-left: .5rem;
    padding-right: .5rem;
}
.bg-cyan {
    background-color: #3097d1;
}
.navbar-brand__1rem {
    font-size: 1rem;
}
.avatar {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158b84b52fe%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158b84b52fe%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2224.140625%22%20y%3D%2254.5%22%3E100x100%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    background-position: 50%;
    vertical-align: middle;
}
.img-brand {
    vertical-align: middle;
}
</style>
<template>
    <nav class="navbar navbar-dark bg-cyan">
        <a href="#" class="navbar-brand navbar-brand__1rem">
            <img class="img-brand" width="70" height="20" src="../assets/brand-white.png" alt="商标">
        </a>
        <ul class="nav navbar-nav">
            <li class="nav-item active">
                <a href="#" class="nav-link">Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item"><a href="#" class="nav-link">Profile</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Messages</a></li>
            <li class="nav-item"><a href="#" class="nav-link">Docs</a></li>
        </ul>
        <div class="personal-setting float-xs-right">
            <form class="form-inline">
                <input type="text" class="form-control" placeholder="Search">
                <a href="notification" class="text-white notification">bell</a>
                <span class="rounded-circle avatar"></span>
            </form>
        </div>
    </nav>
</template>