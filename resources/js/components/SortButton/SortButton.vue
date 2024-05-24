<template>
    <button
        class="sort-button"
        v-on:click="sortComments(criterion, direction)"
    >
    {{text}}
    </button>
</template>

<script>
export default {
    props: ['text', 'criterion', 'direction'],
    methods: {
        sortComments(criterion, direction) {
            const arg = {criterion, direction};
            this.$store.commit('sortComments', arg);
        }
    }
}

</script>

<style>
.sort-button {
    cursor: pointer;
    background-color: #dedee0;
    box-shadow: inset 0 0 0 1px #bebebe;
    border: none;
    border-radius: 0.25rem;
    font-size: 18px;
    padding: 10px;
}
</style>
