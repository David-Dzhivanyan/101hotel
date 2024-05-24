<template>
    <div class="pagination">
        <div
            class="pagination__elem"
            v-for="page in pages"
            v-on:click="changeCurrentPage(page)"
            :class="{'active': currentPage === page}"
        >
            {{page}}
        </div>
    </div>
</template>
<script>
export default {
    props: ['pages'],
    computed: {
        currentPage: function () {
            return this.$store.getters.currentPage;
        },
    },
    data() {
        return {}
    },
    methods: {
        changeCurrentPage(page) {
            this.$store.dispatch('changeCurrentPage', page);
        }
    }
}
</script>
<style>

.pagination {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.pagination__elem {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    cursor: pointer;
    padding: 10px;
    width: 40px;
    height: 40px;
}

.pagination__elem.active {
    font-size: 26px;
    font-weight: bold;
}

</style>
