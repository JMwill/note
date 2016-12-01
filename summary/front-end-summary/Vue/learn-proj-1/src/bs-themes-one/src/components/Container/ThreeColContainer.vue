<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-3 col-xs-12">
                <slot name="left"></slot>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <slot name="middle"></slot>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>