import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import snoowrap from 'snoowrap'
import config from './config'

const r = new snoowrap(
  {
    userAgent: 'desktop:com.devinkott.quietred:v0.0.1 (by Devin Kott)',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.redditUser,
    password: config.redditPass
  }
);

function QuietRed() {
  const [links, setLinks] = useState([]);

  useEffect(
    () => {
      r.getSubreddit('All').getHot({amount: 100}).then(posts => {
        console.log(posts);
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

  return (
    <Root>
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
            links.length === 0 &&
            <div>
              There are currently no links to display. We are either loading or failed to retrieve posts.
            </div>
          }
          {
            links.length > 0 &&
            <List>
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
            </List>
          }
        </Links>
      </Application>

    </Root>
  );
}

const NSFWTag = styled.span`
  color: red;
`

const ListItem = styled.li`
  margin-bottom: 1em;
`

const List = styled.ol``

const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Title = styled.div`
  font-size: 4em;
`

const Application = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2em;
  font-size: 1em;
`

export default QuietRed;
