import { Migration } from '@mikro-orm/migrations';

export class Migration20230515191927 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "name" varchar(255) not null, "role" text check ("role" in (\'Admin\', \'User\')) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "notification" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "host_id" int not null, "participant_id" int not null, "message" varchar(255) not null);');

    this.addSql('alter table "notification" add constraint "notification_host_id_foreign" foreign key ("host_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "notification" add constraint "notification_participant_id_foreign" foreign key ("participant_id") references "users" ("id") on update cascade;');
  }

}
