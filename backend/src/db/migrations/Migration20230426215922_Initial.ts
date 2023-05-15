import { Migration } from '@mikro-orm/migrations';

export class Migration20230426215922 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "name" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

}
