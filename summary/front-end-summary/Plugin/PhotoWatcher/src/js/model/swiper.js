/* global $, Hammer */
function Swiper(opt) {
    if (!(this instanceof Swiper)) {
        return new Swiper(opt);
    }
    this.default = {

    };
    this.cnt = $(opt.cnt);
    this.cnt.hammer();
    this.cntHam = this.cnt.data('hammer');
    this.cntHam
        .get('pan')
        .set({
            direction: Hammer.DIRECTION_ALL
        });
}

Swiper.prototype.init = function() {
    this.cnt.on('panleft', this.handlePanLeft);
};

Swiper.prototype.handlePanLeft = function(e) {
};
