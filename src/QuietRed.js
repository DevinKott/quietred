import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import snoowrap from 'snoowrap'
import config from './config'

/**
 * This constant variable is an instance of snoowrap, which allows us to
 * login to Reddit and grab links/titles
 */
const r = new snoowrap(
  {
    userAgent: 'desktop:com.devinkott.quietred:v0.0.1 (by Devin Kott)',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.redditUser,
    password: config.redditPass
  }
);

/**
 * Since this application is so small, the QuietRed function
 * is the only render function.
 */
function QuietRed() {
  // Used to hold the link objects shown to the user.
  const [links, setLinks] = useState([]);

  /**
   * Should run only once on render.
   * Grabs the top 25 posts currently on r/all and
   * pushes them to the `links` list.
   */
  useEffect(
    () => {
      r.getSubreddit('All').getHot().then(posts => {
        let tempLinks = [];
        posts.forEach((post, index) => {
          tempLinks.push(
            {
              title: post.title,
              link: post.url,
              subreddit: post.subreddit_name_prefixed,
              nsfw: post.over_18,
              id: index
            }
          );
        });
        setLinks(tempLinks)
      });
    },
    []
  );

  // Main rendering
  return (
    <Root>
      {/** Helmet is a react module used to set the header tags
      in an application. */}
      <Helmet>
        <title>QuietRed</title>
        <meta
          name='description'
          content='Application that displays just the links from the top of reddit.com/r/all.'
        />
      </Helmet>
      
      <Application>
        <Title>
        QuietRed
        </Title>

        <Links>
          {
            /** Display an error/message when no links can be shown. */
            links.length === 0 &&
            <div>
              There are currently no links to display. We are either loading or failed to retrieve posts.
            </div>
          }
          {
            /** Show a list of links from the `links` list */
            links.length > 0 &&
            <ol>
              {
                links.map(link => {
                  return (
                    <ListItem
                      key={'post-' + link.id}
                    >
                      <a
                        href={link.link}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        {link.title}
                      </a>
                      {' '}
                      ({link.subreddit})
                      {
                        link.nsfw ? <NSFWTag>{' '}(NSFW)</NSFWTag> : <span></span>
                      }
                      
                    </ListItem>
                  );
                })
              }
            </ol>
          }
        </Links>
      </Application>

    </Root>
  );
}

// We want the NSFW tag to be highly visible.
const NSFWTag = styled.span`
  color: red;
`

// Space out each list item.
const ListItem = styled.li`
  margin-bottom: 1em;
`

// Specifies the div in which all links live.
// We want them organized in a column, one on
// top of each other
const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

// Make the title big!
const Title = styled.div`
  font-size: 4em;
`

// Center the main application
const Application = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

// Global settings not overridden by
// farther-down children. Center everything.
const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2em;
  font-size: 1.2em;
`

export default QuietRed;
