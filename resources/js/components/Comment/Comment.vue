<template>
    <li class="comment">
        <div class="comment__inner">
            <div class="comment__avatar"></div>
            <div class="comment__content">
                <div class="comment__header">
                    <div class="comment__author">
                        <span class="comment__label">Author:</span>
                        {{ comment.name }}
                    </div>
                    <div class="comment__date">
                        <span class="comment__label">Date:</span>
                        {{ formatDate }}
                    </div>
                </div>
                <div class="comment__message">{{ comment.text }}</div>
            </div>
        </div>
        <div class="comment__footer">
            <span class="comment__label">{{comment.id}}</span>
            <button class="comment__button" v-on:click="deleteComment(comment.id)" :disabled="isButtonDisabled">Delete</button>
        </div>
    </li>
</template>

<script>
export default {
    props: ['comment'],
    computed: {
        formatDate() {
            const date = new Date(this.comment.date);

            return date.toLocaleString();
        }
    },
    data() {
        return {
            isButtonDisabled: false,
        }
    },
    methods: {
        deleteComment(id) {
            this.isButtonDisabled = true;

            this.$store.dispatch('deleteComment', id)
                .catch(() => {
                    this.isButtonDisabled = false;
                })
        }
    }
}
</script>
<style>
.comment {
    list-style-type: none; /* Убираем маркеры */
    border: 1px solid #b6b7bb;
    border-radius: 10px;
    max-width: 1024px;
    min-height: 120px;
    padding: 10px 10px 0;
    margin-bottom: 10px;
    overflow: hidden;
}

.comment__inner {
    display: flex;
    gap: 10px;
}

.comment__avatar {
    border: 1px solid #b6b7bb;
    border-radius: 50%;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
}

.comment__content {
    flex-basis: 100%;
}

.comment__label {
    font-size: 18px;
    color: #b6b7bb;
    font-weight: normal;
}

.comment__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 16px;
}

.comment__author {
    font-weight: bold;
    word-break: break-all;
}

.comment__message {
    word-break: break-all;
    margin-bottom: 12px;
}

.comment__footer {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin: 0 -10px;
}

.comment__button {
    cursor: pointer;
    background-color: #dd2b0e;
    box-shadow: inset 0 0 0 1px #c91c00;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-size: 16px;
    padding: 5px;
}

@media (max-width: 768px) {
    .comment__header {
        flex-direction: column;
        align-items: flex-start;
        font-size: 16px;
        gap: 5px;
    }

    .comment__author {
        font-size: 18px;
    }

    .comment__label {
        font-size: 14px;
    }

    .comment__date {
        font-size: 18px;
    }
}
</style>
