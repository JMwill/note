<template>
    <li>
        <div
            :class="{bold: isFolder}"
            @click="toggle"
            @dblclick="changeType">
            {{model.name}}
            <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        </div>
        <ul v-show="open" v-if="isFolder">
            <item
                class="item"
                v-for="model in model.children"
                :model="model">
            </item>
            <li @click="addChild">+</li>
        </ul>
    </li>
</template>

<script>
import Vue from 'vue';
export default {
    name: 'item', // 内部引用自己的时候需要为组件起一个内部名称，用与引用
    props: {
        model: Object,
    },
    data() {
        return {
            open: false,
        }
    },
    computed: {
        isFolder() {
            return (
                this.model.children &&
                this.model.children.length
            );
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.open = !this.open;
            }
        },
        changeType() {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', []);
                this.addChild();
                this.open = true;
            }
        },
        addChild() {
            this.model.children.push({
                name: 'new stuff'
            });
        }
    }
}
</script>

<style lang="css">
</style>
