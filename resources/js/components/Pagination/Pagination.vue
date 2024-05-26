<template>
    <div class="pagination">
        <div
            v-for="page in pages"
            :class="{'active': currentPage === page}"
            class="pagination__elem"
            @click="changeCurrentPage(page)"
        >
            {{page}}
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    props: {
        pages: {
            type: Number,
            required: true,
        }
    },
    computed: {
        ...mapGetters(['currentPage']),
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
