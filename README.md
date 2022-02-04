# Personal website

## Tech Stack
- [Next.JS](https://nextjs.org/) as framework
- Style with [TailwindCSS](https://tailwindcss.com/)
- MDX with [ContentLayer](https://github.com/contentlayerdev/contentlayer) 
- [ReactQuery](https://react-query.tanstack.com/) for client side data fetching
- [Prisma](https://www.prisma.io/) as ORM
- [PlanetScale](https://planetscale.com/) as DB

## Features
- Each post views will update automatically after a visit.
- Vistors can like, comment post, the only requirement is a valid email.
- There is Admin role in DB, where user and comment can be deleted.

## Running locally

Connection to PlanetScale is not required as long as you have your local databse setup, then run `prisma migrate dev`. As I'm using Postgres as database, please refer to Prisma [documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres).

If you want to create an Admin role, simply uncomment the code inside `pages/api/auth/login` and allow it to run once, once you see your admin user in [Prisma Studio](https://www.prisma.io/studio), comment it back.

Then run 
```bash
yarn
``` 
install dependencies then

```bash
yarn dev
```