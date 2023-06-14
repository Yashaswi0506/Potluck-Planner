import { Migration } from '@mikro-orm/migrations';

export class Migration20230605201001 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "notification" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "event_id_id" int not null, "host_id" varchar(255) not null, "participant_id" varchar(255) not null, "message" varchar(255) not null);');

    this.addSql('alter table "notification" add constraint "notification_event_id_id_foreign" foreign key ("event_id_id") references "events" ("id") on update cascade;');
    this.addSql('alter table "notification" add constraint "notification_host_id_foreign" foreign key ("host_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "notification" add constraint "notification_participant_id_foreign" foreign key ("participant_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "notification" cascade;');
  }

}
