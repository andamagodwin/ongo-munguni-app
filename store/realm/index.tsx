import { createRealmContext } from '@realm/react';
import { Song } from './schema';
import Realm from 'realm';
import initialData from '../../assets/initialData.json';
import { useEffect } from 'react';
import React from 'react';

const RealmContext = createRealmContext({
    schema: [Song],
    schemaVersion: 1, // Keep or increment if needed, but Seeder handles it now
});

export const { useRealm, useQuery, useObject } = RealmContext;

const RealmSeeder = ({ children }: { children: React.ReactNode }) => {
    const realm = useRealm();

    useEffect(() => {
        // Check if database is empty and seed if necessary
        // This runs on every app mount, ensuring data exists
        if (realm && !realm.isClosed && realm.objects('Song').isEmpty()) {
            console.log('Seeding database...');
            const songs = realm.objects('Song');
            if (songs.isEmpty()) {
                realm.write(() => {
                    initialData.forEach((songData) => {
                        realm.create('Song', {
                            _id: new Realm.BSON.ObjectId(),
                            ...songData,
                            createdAt: new Date(),
                            isFavorite: false
                        });
                    });
                });
                console.log('Database seeded!');
            }
        }
    }, [realm]);

    return <>{children}</>;
};

export const RealmProvider = ({ children }: { children: React.ReactNode }) => {
    const { RealmProvider: BaseRealmProvider } = RealmContext;
    return (
        <BaseRealmProvider>
            <RealmSeeder>{children}</RealmSeeder>
        </BaseRealmProvider>
    );
};
