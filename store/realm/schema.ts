import Realm from 'realm';

export class Song extends Realm.Object<Song> {
  _id!: Realm.BSON.ObjectId;
  number!: number;
  title!: string;
  category!: string;
  lyrics!: string;
  key?: string;
  author?: string;
  isFavorite!: boolean;
  createdAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Song',
    properties: {
      _id: 'objectId',
      number: { type: 'int', indexed: true },
      title: { type: 'string', indexed: true },
      category: 'string',
      lyrics: 'string',
      key: 'string?',
      author: 'string?',
      isFavorite: { type: 'bool', default: false },
      createdAt: { type: 'date', default: () => new Date() },
    },
    primaryKey: '_id',
  };
}
