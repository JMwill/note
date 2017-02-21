<template>
    <div class="contact-card">
        <header class="contact-card__header">Contact Us</header>
        <form action="javascript: void 0;" class="contact-card__form">
            <input class="contact-card__full-name" type="text" name="fullName" placeholder="Full Name">
            <input class="contact-card__email" type="text" name="emailAddress" placeholder="Email Address">
            <input class="contact-card__subject" type="text" name="subject" placeholder="Subject">
            <textarea class="contact-card__message" name="message" placeholder="Message"></textarea>
            <input class="contact-card__submit" type="submit" value="SUBMIT">
        </form>
    </div>
</template>

<style>
.contact-card__header {
    margin-bottom: 34px;
}
.contact-card__full-name,
.contact-card__email,
.contact-card__subject,
.contact-card__message {
    width: 100%;
    margin-bottom: 10px;
    padding: 13px 10px;
    border: none;
    border-radius: 9px;
    background-color: #222;
    color: #fff;
}
.contact-card__message {
    resize: none;
    min-height: 80px;
}
.contact-card__submit {
    padding: 10px 10px;
    border: none;
    border-radius: 10px;
    background-color: #76c38f;
    color: #303030;
    font-weight: bold;
}
</style>
