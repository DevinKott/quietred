This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# QuietRed

This project was inspirated by [QuietHN](https://quiethn.com/), which is a site focused on only provided the current Hacker News posts' links without the comment section.
QuietRed is similar, but shows the current Reddit top posts.

On every refresh, the current top 25 posts of r/all are scraped and provided as links.
Each link is opened in a new tab.
While some links point back to the commend section of the reddit post (mostly videos uploaded through Reddit), most lead to external news sites or pictures.

NSFW posts should be tagged accordingly.

## How to build

Clone this repository.

Once that is done, run `yarn` in the top-level directory to install node modules.
Once everything has installed, run `yarn start`.


## Future Features

- ~~Fetch posts on my API and then pull from there. That way, I can set limits to how much my test account pulls from the Reddit API. I would also feel better since publishing this application as-is would give everyone the ability to use this dev Reddit account that I just made.~~
- Add in filters such as `show only pictures`, `show only news`
- Have an option to hide viewed links, or move them to a separate space
- Change the favicon to something else.
- ~~Make sure the site is responsive on mobile devices and smaller screens in general.~~