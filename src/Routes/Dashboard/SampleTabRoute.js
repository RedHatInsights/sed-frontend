import React, { Fragment } from 'react';
import {
  Stack,
  StackItem,
  Switch,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';

import '@patternfly/react-styles/css/components/Table/table.css';

const SampleTabRoute = () => {
  return (
    <Stack hasGutter className="dashboard__sample-route pf-u-p-md">
      <StackItem>
        <Title headingLevel="h2" size="2xl">
          Red hat Insights
        </Title>
        <TextContent>
          <Text component="p">
            Esse culpa anim do incididunt non cillum nisi esse officia. Culpa
            elit amet dolore aliqua veniam adipisicing qui anim ea magna. Est
            anim ex proident tempor nostrud. Veniam aliqua sunt est Lorem
            proident voluptate. Laboris labore mollit irure officia. Dolore sit
            velit cillum ut irure esse velit exercitation esse consectetur.
            Aliquip reprehenderit duis deserunt fugiat proident ex in eiusmod
            pariatur ipsum sint. Lorem ipsum reprehenderit veniam in esse velit
            qui ad. Reprehenderit laborum laboris aute ipsum.
          </Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <Title headingLevel="h3" size="xl">
          Settings
        </Title>
        <Stack hasGutter className="pf-u-mt-lg">
          <StackItem>
            <Switch
              id="top-foo"
              aria-label="foo"
              label={
                <Fragment>
                  <Title headingLevel="h4" size="md">
                    Connect to Red Hat Insights
                  </Title>
                  <TextContent>
                    <Text component="small">
                      Id culpa nostrud magna cupidatat commodo dolor tempor enim
                      nisi irure duis sunt. Amet commodo dolore adipisicing
                      velit aliquip est. Id laboris aute pariatur nulla. Fugiat
                      qui exercitation ad sit. Dolore sit eiusmod et cupidatat
                      qui cillum nulla pariatur consequat nulla irure deserunt
                      incididunt esse.
                    </Text>
                  </TextContent>
                </Fragment>
              }
            />
            <div className="pf-u-pl-3xl">
              {[1, 2, 3].map((val) => (
                <Switch
                  className="pf-u-mt-md"
                  key={val}
                  id={`${val}-nested-switch`}
                  aria-label={`${val}-nested-switch`}
                  label={
                    <Fragment>
                      <Title headingLevel="h4" size="md">
                        Nested switch {val}
                      </Title>
                      <TextContent>
                        <Text component="small">
                          Id culpa nostrud magna cupidatat commodo dolor tempor
                          enim nisi irure duis sunt. Amet commodo dolore
                          adipisicing velit aliquip est. Id laboris aute
                          pariatur nulla. Fugiat qui exercitation ad sit. Dolore
                          sit eiusmod et cupidatat qui cillum nulla pariatur
                          consequat nulla irure deserunt incididunt esse.
                        </Text>
                      </TextContent>
                    </Fragment>
                  }
                />
              ))}
            </div>
          </StackItem>
          <StackItem>
            <Title headingLevel="h3" size="xl">
              Exclusions
            </Title>
            <table className="pf-c-table pf-m-grid-md">
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Settings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>tag=&quot;prod&quot;</td>
                  <td>Red Hat Insights - Off</td>
                </tr>
                <tr>
                  <td>tag=&quot;dev&quot;</td>
                  <td>
                    Red Hat Insights - On
                    <br />
                    YARA - On
                  </td>
                </tr>
              </tbody>
            </table>
          </StackItem>
        </Stack>
      </StackItem>
    </Stack>
  );
};

export default SampleTabRoute;
