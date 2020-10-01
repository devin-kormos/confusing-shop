# Confusing Shop

[![Version](https://img.shields.io/badge/Version-v1.4.3-blue)]()

A shop with seemingly no purpose and yet, it exists

## Technologies

- Bootstrap
- ReactJS
- Javascript
- HTMl5
- CSS3
- SQL

## Live Demo

Try the application here [https://meme.cx/apps/confusing-shop](https://meme.cx/apps/confusing-shop)

## Features

- View assortment of items from the lovely products page.
- View individual items details on its own page.
- Add items to your cart.
- Checkout after providing proper details.

## Preview

[![ImageOfThing](/server/public/images/demo.png)]()

## Development

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/devin-kormos/confusing-shop.git
    ```

1. Navigate to the directory on your bash terminal and install the dependencies through
    ```js
    npm install
    ```

1. Create an SQL database.

1. Create a '.env' file in your root directory. Configure it accordingly with your hostname, password, and database name.
    ```txt
    PORT=3001
    DEV_SERVER_PORT=3000
    DATABASE_URL=postgres://HOSTNAME:PASSWORD@localhost/DATABASENAME
    SESSION_SECRET=secret
    ```

1. To start this locally, from the 'confusing-shop' directory, type <code>npm run dev</code>
