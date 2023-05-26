import { Migration } from "@mikro-orm/migrations";

export class Migration20230517193640 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "events" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "event_name" varchar(255) not null, "event_location" varchar(255) not null, "event_date" varchar(255) not null);'
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists "events" cascade;');
	}
}
