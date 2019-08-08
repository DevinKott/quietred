import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import axios from 'axios'
import stuff from './stuff.json'
import snoowrap from 'snoowrap'

function QuietRed() {
  const [links, setLinks] = useState([]);

  useEffect(
    () => {
      const tempLinks = stuff.links.map(link => {
        return {
          title: link.title,
          link: link.link
        };
      });
      setLinks(tempLinks);

      axios.get('https://oauth.reddit.com/grants/installed_client').then(
        resp => {
          console.log(resp);
        }
      );
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
              There are currently no links to display.
            </div>
          }
          {
            links.length > 0 &&
            <List>
              {
                links.map(link => {
                  return (
                    <ListItem
                      key={link.title}
                    >
                      <a
                        href={link.link}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        {link.title}
                      </a>
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
