<template>
    <div @click="clickPalette" class="color-palette-container">
        <div v-for="palette in palettes" class="color-palette {{palette.color}}-color-palette {{palette.checked ? 'palette-checked' : ''}}">
            <i class="icon icon-check"></i>
            <label>{{palette.name}}</label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            palettes: [
                { color: 'red', name: 'RED', checked: false },
                { color: 'pink', name: 'PINK', checked: false },
                { color: 'purple', name: 'PURPLE', checked: false },
                { color: 'deeppurple', name: 'DEEP PURPLE', checked: false },
                { color: 'indigo', name: 'INDIGO', checked: false },
                { color: 'blue', name: 'BLUE', checked: false },
                { color: 'lightblue', name: 'LIGHT BLUE', checked: false },
                { color: 'cyan', name: 'CYAN', checked: false },
            ],
        };
    },
    props: {
        selectedColors: {
            type: Array,
            required: true,
            twoWay: true,
        },
    },
    methods: {
        clickPalette(evt) {
            const elem = evt.target;
            const elemParent = elem.parentNode;
            if (elemParent.classList.contains('main')) { return; }
            const childElems = Array.prototype.slice.call(elemParent.children);
            const index = childElems.indexOf(elem);

            this.palettes[index].checked = !this.palettes[index].checked;
            this.updateSelectedColors(elem, index);
        },
        updateSelectedColors(elem, index) {
            let colorNameStr = /\b([^\s]+)-color-palette\b/.exec(
                Array.prototype.slice.call(elem.classList).join(' ')
            );
            if (!colorNameStr[1]) { return; }

            colorNameStr = colorNameStr[1];
            if (this.selectedColors.length < 2) {
                this.selectedColors.push(colorNameStr);
            } else {
                this.selectedColors = [];
                this.selectedColors.push(colorNameStr);
                /* eslint no-param-reassign: ["error", { "props": false }] */
                this.palettes.forEach(item => (item.checked = false));
                this.palettes[index].checked = !this.palettes[index].checked;
            }
        },
    },
};
</script>

<style lang="css">
.color-palette-container {
    width: 50%;
    position: absolute;
    left: 0;
    top: 55px;
    bottom: 0;
    right: 50%;
}
.color-palette {
    color: #fff;
    position: relative;
    float: left;
    width: 25%;
    height: 25%;
    background-color: #374046;
    transition: transform 0.2s ease-in;
}
.color-palette:hover {
    transform: scale(0.9);
}
.red-color-palette {
    background-color: #f44336;
}
.color-palette label,
.color-palette .icon {
    pointer-events: none;
}

label {
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
}

.icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 32px;
    font-weight: bold;
    transition: transform 0.2s ease-in;
}
.icon-check::before {
    content: '√';
}
.icon-check {
    opacity: 0.2;
}
.palette-checked {
    transform: scale(0.9);
}
.palette-checked .icon-check {
    transform: rotate(360deg);
    opacity: 1;
}
</style>
