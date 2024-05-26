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
                <div class="comment__message-wrapper">
                    <div v-if="!changing" class="comment__message">{{ comment.text }}</div>
                    <textarea
                        v-else
                        v-model="comment.text"
                        class="comment__textarea"
                        required
                        placeholder="Your comment"
                    />
                </div>
            </div>
        </div>
        <div class="comment__footer">
            <span class="comment__label">{{id}}</span>
            <div class="comment__buttons">
                <button v-if="!changing" class="comment__edit" @click="editCommentMode" >Edit</button>
                <button v-else class="comment__submit" :disabled="isSubmitBtnDisabled" @click="editComment(id)">Submit</button>
                <button class="comment__delete" :disabled="isDeleteBtnDisabled" @click="deleteComment(id)">Delete</button>
            </div>
        </div>
    </li>
</template>

<script>

export default {
    props: {
        name: {
            type: String,
        },
        text: {
            type: String,
        },
        date: {
            type: String,
        },
        id: {
            type: Number,
        },
    },
    computed: {
        formatDate() {
            const date = new Date(this.comment.date);

            return date.toLocaleString();
        },
        comment() {
            return { name: this.name, text: this.text, date: this.date };
        }
    },
    data() {
        return {
            isDeleteBtnDisabled: false,
            isSubmitBtnDisabled: false,
            changing: false,
        }
    },
    methods: {
        deleteComment(id) {
            this.isDeleteBtnDisabled = true;

            this.$store.dispatch('deleteComment', id)
                .catch(() => {
                    this.isDeleteBtnDisabled = false;
                })
        },
        editComment(id) {
            this.isSubmitBtnDisabled = true;

            const data = { id: id, comment: this.comment };
            this.$store.dispatch('editComment', data)
                .then(() => {
                    this.isSubmitBtnDisabled = false;
                    this.changing = false;
                })
        },
        editCommentMode() {
            this.changing = true;
        }
    }
}
</script>
<style>
.comment {
    list-style-type: none;
    border: 1px solid #b6b7bb;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    padding: 10px 10px 0;
    margin-bottom: 10px;
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

.comment__message-wrapper {
    margin-bottom: 12px;
    padding-right: 60px;
}

.comment__message {
    word-break: break-all;
}

.comment__textarea {
    resize: vertical;
    border: none;
    border-bottom: 1px solid #b6b7bb;
    outline: none;
    width: 100%;
    padding: 10px;
}

.comment__footer {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    margin: 0 -10px;
}

.comment__buttons {
    display: flex;
    gap: 10px;
}

.comment__edit {
    border: 1px solid #b6b7bb;
}

.comment__submit {
    background-color: #108548;
    color: white;
}

.comment__delete {
    background-color: #dd2b0e;
    box-shadow: inset 0 0 0 1px #c91c00;
    color: white;
}

@media (max-width: 768px) {
    .comment__header {
        flex-direction: column;
        align-items: flex-start;
        font-size: 16px;
        gap: 5px;
    }

    .comment__avatar {
        width: 40px;
        height: 40px;
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

    .comment__message-wrapper {
        padding-right: 0;
    }

    .comment__message {
        font-size: 18px;
    }

}
</style>
