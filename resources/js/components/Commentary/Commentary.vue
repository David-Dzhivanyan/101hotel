<template>
    <div class="commentary">
        <div class="commentary__inner">
            <h1 class="commentary__header">Комментарии:</h1>
            <div class="commentary__sort-buttons">
                <template v-for="(button, index) in buttons">
                    <SortButton
                        v-bind="button"
                        v-if="button.condition"
                        :key="index"
                    />
                </template>
            </div>
            <ul class="commentary__list">
                <Comment v-for="comment in currentComments" v-bind="comment" :key="comment.id"/>
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
import {mapGetters} from "vuex";

export default {
    components: {
        Pagination,
        Comment,
        InputComment,
        SortButton
    },
    computed: {
        ...mapGetters(['currentPage', 'sortedBy', 'allComments']),
        currentComments() {
            const start = this.currentPage * 3 - 3;
            const end = this.currentPage * 3;
            let result = this.allComments.slice(start, end);

            if (result.length === 0 && this.currentPage !== 1) {
                this.$store.dispatch('changeCurrentPage', this.currentPage - 1);
                result = this.currentComments;
            }

            return result;
        },
        pages() {
            return ceil(this.allComments.length / 3);
        },
        buttons() {
            return [
                {
                    text: 'Sort by ID',
                    criterion: 'id',
                    direction: this.sortedBy.direction,
                    condition: this.sortedBy.criterion === 'date'
                },
                {
                    text: 'Sort by date',
                    criterion: 'date',
                    direction: this.sortedBy.direction,
                    condition: this.sortedBy.criterion === 'id'
                },
                {
                    text: 'Sort by ascending',
                    criterion: this.sortedBy.criterion,
                    direction: ['asc', 'desc'],
                    condition: this.sortedBy.direction[0] === 'desc'
                },
                {
                    text: 'Sort by descending',
                    criterion: this.sortedBy.criterion,
                    direction: ['desc', 'asc'],
                    condition: this.sortedBy.direction[0] === 'asc'
                },
            ]
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
    max-width: 960px;
    width: 100%;
    margin: auto auto;
    padding: 20px 40px;
}

.commentary__inner {
    width: 100%;
}

.commentary__header {
    font-size: 40px;
    margin-bottom: 10px;
}

.commentary__sort-buttons {
    display: flex;
    gap: 10px;
    margin-bottom: 16px;
}

@media (max-width: 768px) {
    .commentary {
        display: flex;
        justify-content: center;
        max-width: 960px;
        width: 100%;
        margin: auto auto;
        padding: 10px 20px;
    }


    .commentary__header {
        font-size: 30px;
        margin-bottom: 8px;
    }
}
</style>
