<template>
    <div class="blog-card">
        <header class="blog-card__header">From The Blog</header>
        <div class="blog-card__abstract">
            <p class="blog-card__title">Post Title</p>
            <p class="blog-card__from">
                <span class="blog-card__auth">Admin</span>, domainname.com
            </p>
            <p class="blog-card__date">Friday, 6th April 2017</p>
            <p class="blog-card__content">Bacon ipsum dolor amet biltong ground round beef rump. Shankle chuck short ribs alcatra boudin ball tip doner ham hock porchetta jerky flank brisket pastrami biltong. Venison boudin burgdoggen swine alcatra bacon salami t-bone kevin andouille tongue shankle chuck ham. T-bone ground round porchetta tenderloin sirloin. Chicken jowl alcatra pork pork belly, andouille tail frankfurter jerky rump. Bresaola kielbasa pig, boudin meatball turducken corned beef landjaeger fatback ham prosciutto swine.</p>
        </div>
        <a class="blog-card__more" href="javascript: void 0;">Read More &gt;</a>
    </div>
</template>

<style>
.blog-card {
    max-width: 223px;
}
.blog-card__header {
    margin-bottom: 36px;
}
.blog-card__title,
.blog-card__auth,
.blog-card__more {
    color: #76c38f;
}
.blog-card__title {
    margin: 17px 0;
    font-size: 14px;
}
.blog-card__from,
.blog-card__date {
    margin: 14px 0;
    font-size: 12px;
}
.blog-card__from {
    color: #666;
}
.blog-card__date {
    color: #979797;
}
.blog-card__content {
    color: #979797;
    font-size: 13px;
}
.blog-card__more {
    font-size: 14px;
    text-decoration: none;
}
</style>
