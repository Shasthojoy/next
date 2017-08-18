## Migrations

Migrations in Brgiadehub are managed via [node-pg-migrate](https://github.com/theoephraim/node-pg-migrate). For advanced usage, please visit their documentation.

### Apply most recent

to run a migration manually, in `/api/`, run:

```
npm run migrate -- up
```

### Roll back

```
npm run migrate -- down
```

### Create

```
npm run migrate -- create <name-of-migration>
```

This will create a new timestamped migration in the `/api/migrations` folder. Edit this file to build your migration.
