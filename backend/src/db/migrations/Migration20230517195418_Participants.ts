import { Migration } from "@mikro-orm/migrations";

export class Migration20230517195418 extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table "participant" ("user_id" int not null, "event_id" int not null, "is_host" varchar(255) not null default \'false\', "rsvp_response" varchar(255) not null default \'maybe\', constraint "participant_pkey" primary key ("user_id", "event_id"));'
		);

		this.addSql(
			'alter table "participant" add constraint "participant_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;'
		);
		this.addSql(
			'alter table "participant" add constraint "participant_event_id_foreign" foreign key ("event_id") references "events" ("id") on update cascade;'
		);
	}

	async down(): Promise<void> {
		this.addSql('drop table if exists "participant" cascade;');
	}
}
