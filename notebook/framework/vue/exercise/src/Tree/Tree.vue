<template>
    <p> (You can double click on an item to turn it into a folder.) </p>
    <ul>
        <item
            class="item"
            :model="treeData">
        </item>
    </ul>
</template>

<script>
let data = {
    name: 'My Tree',
    children: [
        { name: 'hello' },
        { name: 'wat' },
        {
            name: 'child folder',
            children: [
                {
                    name: 'child folder',
                    children: [
                        { name: 'hello' },
                        { name: 'wat' }
                    ]
                },
                { name: 'hello' },
                { name: 'wat' },
                {
                    name: 'child folder',
                    children: [
                        { name: 'hello' },
                        { name: 'wat' }
                    ]
                }
            ]
        }
    ]
};
import item from './TreeItem.vue';
export default {
    data () {
        return {
            treeData: data
        }
    },
    components: {
        item,
    }
}
</script>

<style lang="css">
</style>
