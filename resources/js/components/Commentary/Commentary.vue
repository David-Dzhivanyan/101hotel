<template>
    <div class="commentary">
        <div class="commentary__inner">
            <h1 class="commentary__header">Комментарии:</h1>
            <div class="commentary__sort-buttons">
                <SortButton
                    :text="'Sort by ID'"
                    :criterion="'id'"
                    :direction="sortedBy.direction"
                    v-if="sortedBy.criterion === 'date'"
                />
                <SortButton
                    :text="'Sort by date'"
                    :criterion="'date'"
                    :direction="sortedBy.direction"
                    v-if="sortedBy.criterion === 'id'"
                />
                <SortButton
                    :text="'Sort by ascending'"
                    :criterion="sortedBy.criterion"
                    :direction="['asc', 'desc']"
                    v-if="sortedBy.direction[0] === 'desc'"
                />
                <SortButton
                    :text="'Sort by descending'"
                    :criterion="sortedBy.criterion"
                    :direction="['desc', 'asc']"
                    v-if="sortedBy.direction[0] === 'asc'"
                />
            </div>

            <ul class="commentary__list">
                <Comment v-for="comment in currentComments" :comment="comment" :key="comment.id"/>
            </ul>
            <InputComment/>
            <Pagination :pages="pages"/>
        </div>
    </div>
</template>

<script>
import {ceil} from "lodash/math";
import Comment from "../Comment/Comment.vue";
import InputComment from "../InputComment/InputComment.vue";
import Pagination from "../Pagination/Pagination.vue";
import SortButton from "../SortButton/SortButton.vue";

export default {
    components: {
        Pagination,
        Comment,
        InputComment,
        SortButton
    },
    computed: {
        allComments: function () {
            return this.$store.getters.allComments;
        },
        currentComments: function() {
            const start = this.currentPage * 3 - 3;
            const end = this.currentPage * 3;
            let result = this.allComments.slice(start, end);

            if (result.length === 0 && this.currentPage !== 1) {
                this.$store.dispatch('changeCurrentPage', this.currentPage - 1);
                result = this.currentComments;
            }

            return result;
        },
        pages: function () {
            return ceil(this.allComments.length / 3);
        },
        currentPage: function () {
            return this.$store.getters.currentPage;
        },
        sortedBy: function () {
            return this.$store.getters.sortedBy;
        }
    },
    mounted() {
        this.$store.dispatch('fetchComments');
    },
};
</script>

<style>
.commentary {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: auto auto;
    padding: 20px 40px;
}

.commentary__header {
    font-size: 40px;
    margin-bottom: 10px;
}

.commentary__sort-buttons {
    margin-bottom: 16px;
}
</style>
