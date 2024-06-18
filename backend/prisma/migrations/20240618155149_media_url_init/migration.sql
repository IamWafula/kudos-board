-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "mediaUrl" TEXT NOT NULL DEFAULT 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg';

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "gifUrl" TEXT NOT NULL DEFAULT 'https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fm=pjpg';
