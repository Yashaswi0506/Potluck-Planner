import { Migration } from '@mikro-orm/migrations';

export class Migration20230605200105 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "fooditems" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "event_id" int not null, "claim_id" varchar(255) null, "item_name" varchar(255) not null, "item_type" varchar(255) not null, "item_quantity" varchar(255) not null);');

    this.addSql('alter table "fooditems" add constraint "fooditems_event_id_foreign" foreign key ("event_id") references "events" ("id") on update cascade;');
    this.addSql('alter table "fooditems" add constraint "fooditems_claim_id_foreign" foreign key ("claim_id") references "users" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "fooditems" cascade;');
  }

}
