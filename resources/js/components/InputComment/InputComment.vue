<template>
    <form class="comment-form" v-on:submit.prevent="submitComment">
        <input class="comment-form__author" v-model="newComment.name" required placeholder="Your name">
        <textarea v-model="newComment.text" class="comment-form__text" required placeholder="Your comment"></textarea>
        <div class="comment-form__date">
            <label class="comment-form__label">Date: </label>
            <VueDatePicker v-model="newComment.date" required/>
        </div>
        <button class="comment-form__button" type="submit">Отправить комментарий</button>
    </form>
</template>
<script>
import VueDatePicker from "vue2-datepicker";

export default {
    components: {
        VueDatePicker
    },
    computed: {},
    data() {
        return {
            newComment: {name: '', text: '', date: new Date()},
        }
    },
    methods: {
        submitComment() {
            this.$store.dispatch('submitComment', this.newComment);
            this.newComment.text = '';
            this.newComment.date = new Date();
        },
    }
}

</script>
<style>
.comment-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 5px;
    border: 1px solid #b6b7bb;
    padding: 20px;
}

.comment-form__author {
    outline: none;
    border: none;
    border-bottom: 1px solid #b6b7bb;
    width: 30%;
    padding: 5px 10px;
}

.comment-form__text {
    resize: vertical;
    border: none;
    border-bottom: 1px solid #b6b7bb;
    outline: none;
    width: 100%;
    padding: 10px;
}

.comment-form__date {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
}

.comment-form__label {
    color: gray;
}

.comment-form__button {
    cursor: pointer;
    background-color: #1f75cb;
    box-shadow: inset 0 0 0 1px #1068bf;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-size: 18px;
    padding: 10px;
}
</style>
