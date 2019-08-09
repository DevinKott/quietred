import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import axios from 'axios';

const LINK = 'https://www.reddit.com/r/all.json';

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
      axios.get(LINK).then(resp => {
        if (resp !== null && resp.data !== null && resp.data.data !== null) {
          const data = resp.data.data;
          const posts = data.children;
          if (posts !== null && posts.length > 0) {
            let tempLinks = [];
            posts.forEach((p, index) => {
              tempLinks.push(
                {
                  title: p.data.title,
                  link: p.data.url,
                  subreddit: p.data.subreddit_name_prefixed,
                  nsfw: p.data.over_18,
                  id: index
                }
              );
            });
            setLinks(tempLinks);
          }
        }
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

        <Footer>
          © <NoStyleLink href='https://devinkott.com/'>Devin Kott</NoStyleLink> 2019.
          All rights reserved | <NoStyleLink href='https://github.com/DevinKott/quietred'>View Source</NoStyleLink>
        </Footer>
      </Application>

    </Root>
  );
}

const NoStyleLink = styled.a`
  text-decoration: underline;
  color: black;
`

const Footer = styled.div`
  padding-bottom: 2em;
`

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

  @media (max-width: 750px) {
    font-size: 3em;
  }

  @media (max-width: 450px) {
    font-size: 2.5em;
  }
`

// Center the main application
const Application = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1300px) {
    width: 80%;
  }

  @media (max-width: 750px) {
    width: 90%;
  }
`

// Global settings not overridden by
// farther-down children. Center everything.
const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.2em;

  @media (max-width: 770px) {
    font-size: 1em;
    padding: 0em;
  }

  @media (max-width: 450px) {
    font-size: 0.8em;
  }
`

export default QuietRed;
