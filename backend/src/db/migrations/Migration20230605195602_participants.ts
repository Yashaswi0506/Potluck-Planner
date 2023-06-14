import { Migration } from '@mikro-orm/migrations';

export class Migration20230605195602 extends Migration {

  async up(): Promise<void> {
   

    this.addSql('create table "participant" ("user_id" varchar(255) not null, "event_id" int not null, "is_host" varchar(255) not null default \'false\', "rsvp_response" varchar(255) not null default \'maybe\', constraint "participant_pkey" primary key ("user_id", "event_id"));');

    this.addSql('alter table "participant" add constraint "participant_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "participant" add constraint "participant_event_id_foreign" foreign key ("event_id") references "events" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "participant" drop constraint "participant_event_id_foreign";');

    this.addSql('alter table "participant" drop constraint "participant_user_id_foreign";');

    this.addSql('drop table if exists "events" cascade;');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "participant" cascade;');
  }

}
