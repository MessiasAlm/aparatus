# Copilot Instructions for Aparatus

## Project Overview

This project is a **Next.js** application designed for managing barbershop services. It utilizes **Prisma** for database interactions and follows a modular architecture.

## Architecture

- **Components**: The application is structured into reusable components located in the `components/` directory. Key components include:
  - `barbershop-item.tsx`: Displays individual barbershop details.
  - `booking-item.tsx`: Manages booking information.
  - `header.tsx` and `footer.tsx`: Common layout components.
  - **UI Components** are located in `components/ui/` and are sourced from **Shadcn/ui**, a collection of unstyled, accessible components built with Radix UI and Tailwind CSS.

- **Pages**: The main entry point is `app/page.tsx`, which serves as the landing page. The application follows the Next.js routing conventions.

- **Data Models**: The data models are defined in `prisma/schema.prisma`, with key models like `Barbershop` and `BarbershopService` that represent the core entities of the application.

## Developer Workflows

- **Starting the Development Server**: Use the following command to run the development server:

  ```bash
  npm run dev
  ```

  This will start the application on [http://localhost:3000](http://localhost:3000).

- **Building the Application**: To create an optimized production build, run:

  ```bash
  npm run build
  ```

- **Linting**: The project uses ESLint for code quality. Run the linter with:
  ```bash
  npm run lint
  ```

## Project Conventions

- **TypeScript**: The project is written in TypeScript, with strict type checking enabled. Ensure to follow TypeScript conventions as defined in `tsconfig.json`.
- **ESLint Configuration**: Custom ESLint rules are defined in `eslint.config.mjs`. Ensure to adhere to these rules to maintain code quality.

## Integration Points

- **Database**: The application connects to a PostgreSQL database as defined in the Prisma schema. Ensure the database is set up and migrations are applied using Prisma commands.
- **External Dependencies**: The project relies on several external libraries, including `@prisma/client` for database interactions and `@radix-ui/react` for UI components. Refer to `package.json` for a complete list of dependencies.

## Communication Patterns

- Components communicate through props and context. Ensure to follow the established patterns for passing data between components.

## Additional Resources

- For more information on Next.js, refer to the [Next.js Documentation](https://nextjs.org/docs).
- For Prisma, refer to the [Prisma Documentation](https://pris.ly/d/prisma-schema).
