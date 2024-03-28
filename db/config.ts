import { defineDb, defineTable, column } from 'astro:db';

const Post = defineTable({
  columns: {
    id: column.text(),
    content: column.text(),
    isVisible: column.boolean(),
    userId: column.text(),
    userImg: column.text(),
    userName: column.text(),
    category: column.text(),
  }
})

const Categories = defineTable({
  columns: {
    name: column.text(),
    id: column.text(),
  }
})

export default defineDb({
  tables: { Post, Categories }
});
