# Shortster

Shortster shortens long URLs. This process can be automatic or the user can enter their own short URL. It also has statistics views, where the user can see how many times that shortcode has been used, its creation and last access date, and also the name and description associated with that shortcode. The user can add a name and description to the shortcode.

![logo](/public/images/logo.jpg)

1.[Setup](#setup)

2.[Deploy](#deploy)

3.[Stories](#user-stories)

4.[Routes](#routes)

5.[Model](#model)

## Setup

Install dependencies

`npm install`

Run dev mode

`npm run dev `

Open http://localhost:3000 to view it in the browser.

## Deploy

Check the app deployed on heroku!
[Shortster](https://shorster.herokuapp.com/)

<br/>

## User Stories

**Homepage** -As a user, I want to share a long URL as a short URL so it's easier to copy/paste in emails.

**Edit** -As a user, sometimes I will want to customize the short URL so that I can recall what URL it is referencing or give it a cool name.

**Stats** -As a user, I will want to see a report of my short URLs, when I created it, and how many times it was clicked.

<br/>

## Routes

| **Method** | **Route**    | **Description**                                              |
| ---------- | ------------ | ------------------------------------------------------------ |
| `GET`      | `/`          | Main page. Renders `index`                                   |
| `POST`     | `/shortcode` | Creates short Urls. Redirects to `index`                     |
| `GET`      | `/stats`     | Renders `stats` view                                         |
| `GET`      | `/edit`      | Renders `edit` view                                          |
| `POST`     | `/edit`      | Update name and description of a short Url. Redirects to `/` |
| `GET`      | `/:shorturl` | Links short Url to long Url                                  |

<br/>

## Model

```javascript
{
  long: String,
    short: String,
    clicks: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: Date.now
    },
    name: String,
    description: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
```
